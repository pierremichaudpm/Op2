"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type VideoBackgroundProps = {
  videoSrc: string;
  posterSrc: string;
  children?: React.ReactNode;
  className?: string;
  opacity?: number;
  objectPosition?: string;
};

/**
 * Production-Ready VideoBackground Component
 *
 * Solves Safari/WebKit's video loop flash using a double-buffer relay system.
 * Chrome uses native loop (already perfect). Safari uses manual crossfade.
 *
 * Key Features:
 * - Stable DOM: Always renders 2 video tags to prevent hydration issues
 * - Hardware Acceleration: GPU-locked transforms for smooth playback
 * - Precise Timing: requestAnimationFrame for frame-accurate transitions
 * - Fallback Handling: Graceful degradation if autoplay is blocked
 * - Robust Watchdog: Periodic checks to ensure video keeps playing
 */
export function VideoBackground({
  videoSrc,
  posterSrc,
  children,
  className,
  opacity = 1,
  objectPosition = "center",
}: VideoBackgroundProps) {
  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const watchdogIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeBufferRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);
  const lastPlayTimeRef = useRef<number>(0);
  const stallCountRef = useRef<number>(0);

  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);
  const [isWebkit, setIsWebkit] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate video sources
  const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");
  const sources = [
    { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
    { src: `${basePath}_optimized.webm`, type: "video/webm" },
    { src: `${basePath}.mp4`, type: "video/mp4" },
  ];

  // Detect WebKit/Safari on mount
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari =
      /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    setIsWebkit(isSafari || isIOS);
  }, []);

  // Start video playback with retry logic
  const startPlayback = useCallback(
    (video: HTMLVideoElement): Promise<void> => {
      if (!video) return Promise.reject();

      video.muted = true;

      return video.play().catch((err) => {
        console.warn("Video autoplay blocked, waiting for interaction", err);
        // Autoplay blocked - wait for user interaction
        return new Promise<void>((resolve) => {
          const handleInteraction = () => {
            video
              .play()
              .then(resolve)
              .catch(() => resolve());
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("scroll", handleInteraction);
          };
          window.addEventListener("click", handleInteraction);
          window.addEventListener("touchstart", handleInteraction);
          window.addEventListener("scroll", handleInteraction);
        });
      });
    },
    [],
  );

  // Force restart a video from the beginning
  const forceRestartVideo = useCallback((video: HTMLVideoElement) => {
    if (!video) return;

    video.currentTime = 0;
    video.muted = true;
    video.play().catch(() => {
      // If play fails, try again after a short delay
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    });
  }, []);

  // Initialize videos and start playback
  useEffect(() => {
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    // Ensure both videos are muted for autoplay compliance
    v0.muted = true;
    v1.muted = true;

    // Start primary video
    startPlayback(v0);

    // For non-WebKit browsers, v0 handles everything with native loop
    if (!isWebkit) return;

    // WebKit Double-Buffer Relay Logic
    const checkLoop = () => {
      const currentIndex = activeBufferRef.current;
      const active = currentIndex === 0 ? v0 : v1;
      const next = currentIndex === 0 ? v1 : v0;

      // Track playback progress for stall detection
      const currentTime = active.currentTime;

      // Watchdog: Resume if video got paused or stalled
      if (
        active.paused &&
        active.readyState >= 2 &&
        !isTransitioningRef.current
      ) {
        active.play().catch(() => {
          // If play fails, force restart
          forceRestartVideo(active);
        });
      }

      // Stall detection: if currentTime hasn't changed in multiple frames
      if (
        currentTime === lastPlayTimeRef.current &&
        !active.paused &&
        !active.ended
      ) {
        stallCountRef.current++;
        if (stallCountRef.current > 60) {
          // ~1 second of no progress
          console.warn("Video stall detected, forcing restart");
          stallCountRef.current = 0;
          forceRestartVideo(active);
        }
      } else {
        stallCountRef.current = 0;
        lastPlayTimeRef.current = currentTime;
      }

      // Check if we need to transition (450ms before end)
      const duration = active.duration;

      if (
        duration > 0 &&
        !isNaN(duration) &&
        currentTime > duration / 2 &&
        duration - currentTime < 0.45 &&
        !isTransitioningRef.current
      ) {
        isTransitioningRef.current = true;

        // Prepare next buffer
        next.currentTime = 0;
        next
          .play()
          .then(() => {
            // Swap active buffer
            const nextIndex: 0 | 1 = currentIndex === 0 ? 1 : 0;
            activeBufferRef.current = nextIndex;
            setActiveBuffer(nextIndex);
            lastPlayTimeRef.current = 0;

            // Clean up after transition completes
            setTimeout(() => {
              isTransitioningRef.current = false;
              // Pause the old video to save resources
              if (activeBufferRef.current !== currentIndex) {
                active.pause();
                active.currentTime = 0;
              }
            }, 600);
          })
          .catch(() => {
            // If transition fails, reset and try simple loop
            isTransitioningRef.current = false;
            if (active.ended || duration - currentTime < 0.1) {
              active.currentTime = 0;
              active.play().catch(() => {});
            }
          });
      }

      // Handle video that ended without transitioning
      if (active.ended && !isTransitioningRef.current) {
        active.currentTime = 0;
        active.play().catch(() => {
          forceRestartVideo(active);
        });
      }

      rafRef.current = requestAnimationFrame(checkLoop);
    };

    rafRef.current = requestAnimationFrame(checkLoop);

    // Additional periodic watchdog every 2 seconds as backup
    watchdogIntervalRef.current = setInterval(() => {
      const currentIndex = activeBufferRef.current;
      const active = currentIndex === 0 ? v0 : v1;

      if (
        active &&
        (active.paused || active.ended) &&
        !isTransitioningRef.current
      ) {
        console.warn("Watchdog: Video stopped, restarting");
        forceRestartVideo(active);
      }
    }, 2000);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (watchdogIntervalRef.current) {
        clearInterval(watchdogIntervalRef.current);
      }
    };
  }, [isWebkit, startPlayback, forceRestartVideo]);

  // Error fallback
  if (hasError) {
    return (
      <div
        className={className}
        style={{
          opacity,
          backgroundImage: `url(${posterSrc})`,
          backgroundSize: "cover",
          backgroundPosition: objectPosition,
        }}
      >
        {children}
      </div>
    );
  }

  // Shared video styles for consistent sizing
  const videoStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition,
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    willChange: "opacity",
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <div
      className={className}
      style={{
        opacity,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Buffer 0: Primary video for Chrome, relay buffer for Safari */}
      <video
        ref={v0Ref}
        autoPlay
        muted
        playsInline
        loop={!isWebkit}
        preload="auto"
        poster={posterSrc}
        onError={() => setHasError(true)}
        style={{
          ...videoStyle,
          opacity: activeBuffer === 0 ? 1 : 0,
          zIndex: activeBuffer === 0 ? 1 : 0,
        }}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      {/* Buffer 1: Dormant in Chrome, relay buffer for Safari */}
      <video
        ref={v1Ref}
        muted
        playsInline
        preload={isWebkit ? "auto" : "none"}
        poster={posterSrc}
        onError={() => setHasError(true)}
        style={{
          ...videoStyle,
          opacity: activeBuffer === 1 ? 1 : 0,
          zIndex: activeBuffer === 1 ? 1 : 0,
        }}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      {/* Content overlay */}
      {children && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

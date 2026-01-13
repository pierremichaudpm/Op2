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
  const activeBufferRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);

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

  // Start video playback
  const startPlayback = useCallback((video: HTMLVideoElement) => {
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked - wait for user interaction
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
        };
        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
      });
    }
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

      // Watchdog: Resume if video got paused unexpectedly
      if (
        active.paused &&
        active.readyState >= 2 &&
        !isTransitioningRef.current
      ) {
        active.play().catch(() => {});
      }

      // Check if we need to transition (450ms before end)
      const duration = active.duration;
      const currentTime = active.currentTime;

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
            isTransitioningRef.current = false;
          });
      }

      rafRef.current = requestAnimationFrame(checkLoop);
    };

    rafRef.current = requestAnimationFrame(checkLoop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isWebkit, startPlayback]);

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

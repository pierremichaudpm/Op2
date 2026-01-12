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
 * High-Performance VideoBackground Component
 *
 * Engineered to solve the "Hydration Swap" and Safari looping bugs.
 * Uses a stable DOM structure that never changes between SSR and Client,
 * preventing Safari from blocking video elements due to DOM churn.
 */
export function VideoBackground({
  videoSrc,
  posterSrc,
  children,
  className,
  opacity = 0.6,
  objectPosition = "center",
}: VideoBackgroundProps) {
  const [isWebkit, setIsWebkit] = useState<boolean>(false);
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);
  const [hasError, setHasError] = useState(false);

  const activeBufferRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);
  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();

  // Browser Detection
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari =
      /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    if (isSafari || isIOS) {
      setIsWebkit(true);
    }
  }, []);

  const getSources = useCallback(() => {
    const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");
    return [
      { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
      { src: `${basePath}_optimized.webm`, type: "video/webm" },
      { src: `${basePath}.mp4`, type: "video/mp4" },
    ];
  }, [videoSrc]);

  const sources = getSources();

  // Core Playback & Looping Logic
  useEffect(() => {
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    // Standard Setup for both buffers
    v0.muted = true;
    v1.muted = true;

    // Initial Play
    v0.play().catch(() => {
      // Manual trigger for browsers with strict autoplay (Low Power Mode)
      const forcePlay = () => {
        if (activeBufferRef.current === 0) v0.play();
        else v1.play();
        window.removeEventListener("touchstart", forcePlay);
        window.removeEventListener("click", forcePlay);
      };
      window.addEventListener("touchstart", forcePlay);
      window.addEventListener("click", forcePlay);
    });

    const checkLoop = () => {
      // If not Webkit, we rely on the native 'loop' attribute on V0
      if (!isWebkit) {
        if (v0.paused && v0.readyState >= 2) v0.play().catch(() => {});
        rafRef.current = requestAnimationFrame(checkLoop);
        return;
      }

      // WebKit Double-Buffer Relay logic
      const currentIndex = activeBufferRef.current;
      const active = currentIndex === 0 ? v0 : v1;
      const next = currentIndex === 0 ? v1 : v0;

      // Watchdog: prevent stalling
      if (
        active.paused &&
        !isTransitioningRef.current &&
        active.readyState >= 2
      ) {
        active.play().catch(() => {});
      }

      // Transition check (pass baton 450ms before end)
      if (active.duration > 1 && active.currentTime > active.duration / 2) {
        const timeLeft = active.duration - active.currentTime;

        if (timeLeft < 0.45 && !isTransitioningRef.current) {
          isTransitioningRef.current = true;

          next.currentTime = 0;
          next
            .play()
            .then(() => {
              const nextIndex = currentIndex === 0 ? 1 : 0;
              activeBufferRef.current = nextIndex;
              setActiveBuffer(nextIndex);

              setTimeout(() => {
                isTransitioningRef.current = false;
                if (activeBufferRef.current !== currentIndex) {
                  active.pause();
                }
              }, 800);
            })
            .catch(() => {
              isTransitioningRef.current = false;
            });
        }
      }
      rafRef.current = requestAnimationFrame(checkLoop);
    };

    rafRef.current = requestAnimationFrame(checkLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isWebkit]);

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition,
    willChange: "transform, opacity",
    transform: "translateZ(0)",
    transition: "opacity 0.6s ease-in-out",
  };

  if (hasError) {
    return (
      <div className={className} style={{ opacity }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ opacity, position: "relative", overflow: "hidden" }}
    >
      {/*
        STABLE DOM STRUCTURE:
        We always render exactly two videos.
        In Chrome/Firefox, Video 1 is used with 'loop' and Video 2 is dormant.
        In Safari/WebKit, we use both for the relay transition.
        This prevents the "Hydration Swap" that causes Safari to block playback.
      */}
      <video
        ref={v0Ref}
        style={{
          ...videoStyle,
          opacity: activeBuffer === 0 ? 1 : 0.01,
          zIndex: activeBuffer === 0 ? 1 : 0,
        }}
        muted
        playsInline
        preload="auto"
        loop={!isWebkit} // Use native loop for non-webkit browsers
        poster={posterSrc}
        onError={() => setHasError(true)}
      >
        {sources.map((s, i) => (
          <source key={i} src={s.src} type={s.type} />
        ))}
      </video>

      <video
        ref={v1Ref}
        style={{
          ...videoStyle,
          opacity: activeBuffer === 1 ? 1 : 0.01,
          zIndex: activeBuffer === 1 ? 1 : 0,
        }}
        muted
        playsInline
        // Only preload the second buffer if we are actually in Webkit
        preload={isWebkit ? "auto" : "none"}
        onError={() => setHasError(true)}
      >
        {sources.map((s, i) => (
          <source key={i} src={s.src} type={s.type} />
        ))}
      </video>

      {children}
    </div>
  );
}

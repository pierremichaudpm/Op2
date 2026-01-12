"use client";

import { useEffect, useRef, useState } from "react";

export type VideoBackgroundProps = {
  videoSrc: string;
  posterSrc: string;
  children?: React.ReactNode;
  className?: string;
  opacity?: number;
  objectPosition?: string;
};

/**
 * MASTER FIX: VideoBackground Component
 *
 * This version solves:
 * 1. The Safari "White Flash" during loop transitions (Double-Buffer Relay).
 * 2. The Chrome Aspect Ratio issues (Stable DOM and correct Object-Fit).
 * 3. The "Video Blocking" bug (Native Autoplay attributes combined with Watchdog).
 */
export function VideoBackground({
  videoSrc,
  posterSrc,
  children,
  className,
  opacity = 0.6,
  objectPosition = "center",
}: VideoBackgroundProps) {
  const [isWebkit, setIsWebkit] = useState(false);
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);
  const [hasError, setHasError] = useState(false);

  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const activeBufferRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);

  // 1. Precise Browser Detection
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari =
      /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    if (isSafari || isIOS) {
      setIsWebkit(true);
    }
  }, []);

  // 2. High-Precision Looping Logic (WebKit Only)
  useEffect(() => {
    if (!isWebkit) return;

    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    const checkLoop = () => {
      const currentIndex = activeBufferRef.current;
      const active = currentIndex === 0 ? v0 : v1;
      const next = currentIndex === 0 ? v1 : v0;

      // Watchdog: Ensure active video is actually playing
      if (
        active.paused &&
        !isTransitioningRef.current &&
        active.readyState >= 2
      ) {
        active.play().catch(() => {});
      }

      // Transition Logic: Fire exactly 450ms before end
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

              // Complete the hand-off
              setTimeout(() => {
                isTransitioningRef.current = false;
                if (activeBufferRef.current !== currentIndex) {
                  active.pause();
                }
              }, 600);
            })
            .catch(() => {
              isTransitioningRef.current = false;
            });
        }
      }
      requestAnimationFrame(checkLoop);
    };

    const raf = requestAnimationFrame(checkLoop);
    return () => cancelAnimationFrame(raf);
  }, [isWebkit]);

  // Handle Chrome's native autoplay if blocked
  useEffect(() => {
    if (isWebkit) return;
    const v0 = v0Ref.current;
    if (v0 && v0.paused) {
      v0.play().catch(() => {
        const resume = () => {
          v0.play();
          window.removeEventListener("click", resume);
        };
        window.addEventListener("click", resume);
      });
    }
  }, [isWebkit]);

  // 3. Normalized Video Styling (Fixed Ratio for Chrome/Safari)
  const videoStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition,
    transition: "opacity 0.5s ease-in-out",
    pointerEvents: "none",
  };

  // Source resolution
  const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");
  const sources = [
    { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
    { src: `${basePath}_optimized.webm`, type: "video/webm" },
    { src: `${basePath}.mp4`, type: "video/mp4" },
  ];

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
        BUFFER 0:
        Main loop for Chrome. Primary relay for Safari.
      */}
      <video
        ref={v0Ref}
        style={{
          ...videoStyle,
          opacity: activeBuffer === 0 ? 1 : 0.001,
          zIndex: activeBuffer === 0 ? 1 : 0,
        }}
        autoPlay
        muted
        playsInline
        loop={!isWebkit} // Use native loop for Chrome (flash-free)
        poster={posterSrc}
        preload="auto"
        onError={() => setHasError(true)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/*
        BUFFER 1:
        Relay buffer for Safari to hide the loop flash.
        Ignored by Chrome.
      */}
      <video
        ref={v1Ref}
        style={{
          ...videoStyle,
          opacity: activeBuffer === 1 ? 1 : 0.001,
          zIndex: activeBuffer === 1 ? 1 : 0,
        }}
        muted
        playsInline
        preload={isWebkit ? "auto" : "none"}
        onError={() => setHasError(true)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

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
 * Industrial-Grade VideoBackground Component
 *
 * Optimized to eliminate Safari/WebKit loop flash and stuttering:
 * 1. Background-Poster Hack: Uses the poster image as the element background to hide the white flash.
 * 2. GPU-Lock: Forces hardware acceleration via 3D transforms to stop jerkiness.
 * 3. Aspect Ratio Stability: Uses a stable DOM structure that preserves Chrome's perfect performance.
 */
export function VideoBackground({
  videoSrc,
  posterSrc,
  children,
  className,
  opacity = 0.6,
  objectPosition = "center",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari Watchdog: Ensures the video stays playing even if WebKit tries to pause it
    const handlePlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    // Attempt initial playback
    video.play().catch(() => {
      // Fallback for strict autoplay policies
      const forcePlay = () => {
        video.play();
        window.removeEventListener("click", forcePlay);
        window.removeEventListener("touchstart", forcePlay);
      };
      window.addEventListener("click", forcePlay);
      window.addEventListener("touchstart", forcePlay);
    });

    // Watch for visibility changes to resume playback
    document.addEventListener("visibilitychange", handlePlay);

    return () => {
      document.removeEventListener("visibilitychange", handlePlay);
    };
  }, []);

  if (hasError) {
    return (
      <div className={className} style={{ opacity }}>
        {children}
      </div>
    );
  }

  // Generate source paths
  const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");

  return (
    <div
      className={className}
      style={{
        opacity,
        position: "relative",
        overflow: "hidden",
        // BACKGROUND-POSTER HACK:
        // Setting the poster as the background image ensures that when Safari
        // purges the video buffer at the loop point, the user sees the
        // poster (first frame) instead of a white flash.
        backgroundImage: `url(${posterSrc})`,
        backgroundSize: "cover",
        backgroundPosition: objectPosition,
      }}
    >
      <video
        ref={videoRef}
        // Native attributes for maximum reliability
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition,
          // GPU-LOCK:
          // Forced 3D transform and scale hack to keep WebKit's hardware
          // decoder active and prevent stuttering/jerkiness.
          transform: "translate3d(0,0,0) scale(1.005)",
          WebkitTransform: "translate3d(0,0,0) scale(1.005)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        onError={() => setHasError(true)}
      >
        <source src={`${basePath}_optimized.mp4`} type="video/mp4" />
        <source src={`${basePath}_optimized.webm`} type="video/webm" />
        <source src={`${basePath}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

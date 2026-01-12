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
 * Robust VideoBackground Component
 *
 * Uses native browser attributes for maximum compatibility and reliability.
 * Optimized for smooth playback on both Chrome and WebKit browsers.
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

    // Ensure the video is muted (required for autoplay)
    video.muted = true;

    // Trigger playback
    const startVideo = () => {
      video.play().catch((err) => {
        // If autoplay is blocked (e.g., Safari Low Power Mode),
        // we attach a one-time listener to the next user interaction.
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
        };
        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
      });
    };

    startVideo();
  }, []);

  if (hasError) {
    return (
      <div className={className} style={{ opacity }}>
        {children}
      </div>
    );
  }

  // Generate source paths (tries optimized versions first)
  const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");

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
      <video
        ref={videoRef}
        // Tailwind classes for perfect layout/ratio in Chrome and Safari
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition,
          // Force GPU acceleration to eliminate jerkiness/stuttering
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        preload="auto"
        onError={() => setHasError(true)}
      >
        {/* Source ordering optimized for modern browser performance */}
        <source src={`${basePath}_optimized.mp4`} type="video/mp4" />
        <source src={`${basePath}_optimized.webm`} type="video/webm" />
        <source src={`${basePath}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Ensure children content stays above the video */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

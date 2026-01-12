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
  const [isWebkit, setIsWebkit] = useState(false);

  // Detect WebKit after mount (client-side only)
  useEffect(() => {
    const ua = navigator.userAgent;
    const webkit =
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Chromium/.test(ua) &&
      !/Edg/.test(ua);
    setIsWebkit(webkit);
  }, []);

  // Start video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, []);

  // WebKit-only fix for loop flash
  useEffect(() => {
    if (!isWebkit) return;

    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0 && video.currentTime >= video.duration - 0.1) {
        // Seek back to 0.1s before the end to hide the flash
        video.currentTime = Math.max(0, video.duration - 0.1);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isWebkit]);

  if (hasError) {
    return (
      <div className={className} style={{ opacity }}>
        {children}
      </div>
    );
  }

  return (
    <div className={className} style={{ opacity }}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        style={{ objectPosition }}
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        preload="auto"
        onError={() => setHasError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {children}
    </div>
  );
}

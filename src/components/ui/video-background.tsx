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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, []);

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

"use client";
import { useEffect, useRef, useState } from 'react';

export type VideoBackgroundProps = {
  videoSrc: string;
  posterSrc: string;
  children?: React.ReactNode;
  className?: string;
  opacity?: number;
};

export function VideoBackground({ videoSrc, posterSrc, children, className, opacity = 0.6 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!el) return;
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={className} style={{ opacity }}>
      {!hasError && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload="metadata"
          onError={() => setHasError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {children}
    </div>
  );
}



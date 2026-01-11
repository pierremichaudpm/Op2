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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Force le volume à 0
    el.volume = 0;
    el.muted = true;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!el) return;
          if (entry.isIntersecting) {
            setShouldLoad(true);
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Extract base path without query string and extension
  const baseVideoPath = videoSrc.split("?")[0].replace(/\.(mp4|webm)$/, "");

  return (
    <div className={className} style={{ opacity }}>
      {!hasError && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload={shouldLoad ? "auto" : "none"}
          onError={() => setHasError(true)}
        >
          {shouldLoad && (
            <>
              <source
                src={`${baseVideoPath}_optimized.webm`}
                type="video/webm"
              />
              <source src={`${baseVideoPath}_optimized.mp4`} type="video/mp4" />
              <source src={videoSrc} type="video/mp4" />
            </>
          )}
        </video>
      )}
      {children}
    </div>
  );
}

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
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isWebkit, setIsWebkit] = useState(false);
  const activeVideoRef = useRef<1 | 2>(1);

  // Detect WebKit (Safari, GNOME Web) - not Chrome
  useEffect(() => {
    const ua = navigator.userAgent;
    const webkit =
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Chromium/.test(ua) &&
      !/Edg/.test(ua);
    setIsWebkit(webkit);
  }, []);

  useEffect(() => {
    const v1 = video1Ref.current;
    if (!v1) return;

    v1.volume = 0;
    v1.muted = true;
    v1.defaultMuted = true;

    const playVideo = () => {
      v1.play().catch(() => {});
    };

    if (v1.readyState >= 2) {
      playVideo();
    } else {
      v1.addEventListener("loadeddata", playVideo, { once: true });
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            v1.pause();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(v1);

    return () => {
      io.disconnect();
      v1.removeEventListener("loadeddata", playVideo);
    };
  }, []);

  // WebKit dual-video crossfade to eliminate loop flash
  useEffect(() => {
    if (!isWebkit) return;

    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Setup video2
    v2.volume = 0;
    v2.muted = true;
    v2.defaultMuted = true;
    v2.style.opacity = "0";

    const handleTimeUpdate = () => {
      const activeVideo = activeVideoRef.current === 1 ? v1 : v2;
      const standbyVideo = activeVideoRef.current === 1 ? v2 : v1;

      // When active video is ~0.4s from end, crossfade to standby
      if (
        activeVideo.duration > 0 &&
        activeVideo.duration - activeVideo.currentTime < 0.4
      ) {
        standbyVideo.currentTime = 0;
        standbyVideo.play().catch(() => {});
        standbyVideo.style.opacity = "1";
        activeVideo.style.opacity = "0";
        activeVideoRef.current = activeVideoRef.current === 1 ? 2 : 1;
      }
    };

    v1.addEventListener("timeupdate", handleTimeUpdate);
    v2.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate);
      v2.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isWebkit]);

  // Styles for WebKit to fix jerkiness
  const webkitVideoStyle = isWebkit
    ? {
        objectPosition,
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden" as const,
        WebkitBackfaceVisibility: "hidden" as const,
      }
    : { objectPosition };

  // For non-WebKit, render single video with native loop
  if (!isWebkit) {
    return (
      <div className={className} style={{ opacity }}>
        {!hasError && (
          <video
            ref={video1Ref}
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
        )}
        {children}
      </div>
    );
  }

  // For WebKit, render dual videos for crossfade
  return (
    <div
      ref={containerRef}
      className={className}
      style={{ opacity, position: "relative" }}
    >
      {!hasError && (
        <>
          <video
            ref={video1Ref}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              ...webkitVideoStyle,
              transition: "opacity 0.3s ease-out",
            }}
            autoPlay
            muted
            playsInline
            poster={posterSrc}
            preload="auto"
            onError={() => setHasError(true)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <video
            ref={video2Ref}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              ...webkitVideoStyle,
              transition: "opacity 0.3s ease-out",
              opacity: 0,
            }}
            muted
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </>
      )}
      {children}
    </div>
  );
}

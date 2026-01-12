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
  const [hasError, setHasError] = useState(false);
  const [isWebkit, setIsWebkit] = useState(false);
  const isSwapping = useRef(false);

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
    const v1 = video1Ref.current;
    if (!v1) return;

    v1.muted = true;

    const playVideo = () => {
      v1.play().catch(() => {});
    };

    // Try to play immediately
    playVideo();

    // Also listen for canplay as backup
    v1.addEventListener("canplay", playVideo, { once: true });

    return () => {
      v1.removeEventListener("canplay", playVideo);
    };
  }, []);

  // WebKit dual-video crossfade for seamless loop
  useEffect(() => {
    if (!isWebkit) return;

    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v2.muted = true;

    const handleTimeUpdate = () => {
      if (isSwapping.current) return;

      if (v1.duration > 0 && v1.currentTime >= v1.duration - 0.3) {
        isSwapping.current = true;
        v2.currentTime = 0;
        v2.play().catch(() => {});
        v2.style.opacity = "1";
        v1.style.opacity = "0";

        setTimeout(() => {
          v1.pause();
          v1.currentTime = 0;
        }, 350);
      }
    };

    const handleTimeUpdate2 = () => {
      if (!isSwapping.current) return;

      if (v2.duration > 0 && v2.currentTime >= v2.duration - 0.3) {
        isSwapping.current = false;
        v1.currentTime = 0;
        v1.play().catch(() => {});
        v1.style.opacity = "1";
        v2.style.opacity = "0";

        setTimeout(() => {
          v2.pause();
          v2.currentTime = 0;
        }, 350);
      }
    };

    v1.addEventListener("timeupdate", handleTimeUpdate);
    v2.addEventListener("timeupdate", handleTimeUpdate2);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate);
      v2.removeEventListener("timeupdate", handleTimeUpdate2);
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
    <div className={className} style={{ opacity, position: "relative" }}>
      <video
        ref={video1Ref}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition, transition: "opacity 0.3s ease" }}
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

      {isWebkit && (
        <video
          ref={video2Ref}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {children}
    </div>
  );
}

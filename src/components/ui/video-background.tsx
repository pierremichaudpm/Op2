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

export function VideoBackground({
  videoSrc,
  posterSrc,
  children,
  className,
  opacity = 0.6,
  objectPosition = "center",
}: VideoBackgroundProps) {
  const [isWebkit, setIsWebkit] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);

  // Double-buffer state for WebKit seamless loop workaround
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);
  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();

  // Detect WebKit browsers (Safari, iOS)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      const isSafari =
        /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
      const isIOS = /iPhone|iPad|iPod/.test(ua);
      setIsWebkit(isSafari || isIOS);
    }
  }, []);

  // Multi-format source selection
  const getSources = useCallback(() => {
    const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");
    if (isWebkit) {
      return [
        { src: `${basePath}_optimized.webm`, type: "video/webm" },
        { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
        { src: `${basePath}_webkit_fix.mp4`, type: "video/mp4" },
        {
          src: videoSrc.includes(".") ? videoSrc : `${videoSrc}.mp4`,
          type: "video/mp4",
        },
      ];
    }
    return [
      { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
      { src: `${basePath}_optimized.webm`, type: "video/webm" },
      {
        src: videoSrc.includes(".") ? videoSrc : `${videoSrc}.mp4`,
        type: "video/mp4",
      },
    ];
  }, [videoSrc, isWebkit]);

  const sources = getSources();

  // Seamless Loop Logic (WebKit Only)
  useEffect(() => {
    if (isWebkit !== true) return;

    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    // Ensure they are muted for autoplay
    v0.muted = true;
    v1.muted = true;

    // Play the first buffer
    v0.play().catch(() => {});

    const checkLoop = () => {
      const active = activeBuffer === 0 ? v0 : v1;
      const next = activeBuffer === 0 ? v1 : v0;

      if (active.duration > 0) {
        const timeLeft = active.duration - active.currentTime;

        // Start crossfade 400ms before the end
        if (timeLeft < 0.4 && next.paused) {
          next.currentTime = 0;
          next
            .play()
            .then(() => {
              setActiveBuffer(activeBuffer === 0 ? 1 : 0);
            })
            .catch(() => {});
        }
      }
      rafRef.current = requestAnimationFrame(checkLoop);
    };

    rafRef.current = requestAnimationFrame(checkLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isWebkit, activeBuffer]);

  const videoStyle: React.CSSProperties = {
    objectPosition,
    objectFit: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
    transform: "translate3d(0,0,0)",
    WebkitTransform: "translate3d(0,0,0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform",
  };

  if (hasError) {
    return (
      <div className={className} style={{ opacity }}>
        {children}
      </div>
    );
  }

  return (
    <div className={className} style={{ opacity }}>
      {isWebkit === true ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={v0Ref}
            style={{
              ...videoStyle,
              opacity: activeBuffer === 0 ? 1 : 0,
              zIndex: activeBuffer === 0 ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
            muted
            playsInline
            preload="auto"
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
              opacity: activeBuffer === 1 ? 1 : 0,
              zIndex: activeBuffer === 1 ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
            muted
            playsInline
            preload="auto"
            onError={() => setHasError(true)}
          >
            {sources.map((s, i) => (
              <source key={i} src={s.src} type={s.type} />
            ))}
          </video>
        </div>
      ) : (
        <video
          className="h-full w-full object-cover"
          style={{
            objectPosition,
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload="auto"
          onError={() => setHasError(true)}
        >
          {sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} />
          ))}
        </video>
      )}
      {children}
    </div>
  );
}

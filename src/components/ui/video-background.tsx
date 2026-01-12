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

/**
 * Optimized VideoBackground component
 *
 * Specifically engineered to solve Safari/WebKit's video looping "white flash" and "stutter"
 * using a high-precision double-buffering technique with GPU visibility hacks.
 */
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

  // Double-buffer state: two video elements cross-fading to bypass Safari's buffer reset bug
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);
  const activeBufferRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);
  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Detect Safari or iOS WebKit browsers
    const ua = navigator.userAgent;
    const isSafari =
      /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    setIsWebkit(isSafari || isIOS);
  }, []);

  const getSources = useCallback(() => {
    const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");
    return [
      { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
      { src: `${basePath}_optimized.webm`, type: "video/webm" },
      { src: `${basePath}.mp4`, type: "video/mp4" },
    ];
  }, [videoSrc]);

  const sources = getSources();

  useEffect(() => {
    if (isWebkit !== true) return;

    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    // Force muted for reliable autoplay in Safari
    v0.muted = true;
    v1.muted = true;

    const checkLoop = () => {
      const currentIndex = activeBufferRef.current;
      const active = currentIndex === 0 ? v0 : v1;
      const next = currentIndex === 0 ? v1 : v0;

      // WATCHDOG: If video stalled or paused accidentally, force it to resume.
      // Safari often "freezes" background videos if they aren't interaction-triggered.
      if (
        active.paused &&
        !isTransitioningRef.current &&
        active.readyState >= 2
      ) {
        active.play().catch(() => {});
      }

      // Seamless Loop Logic: Pass the baton 450ms before the end
      if (active.duration > 1 && active.currentTime > active.duration / 2) {
        const timeLeft = active.duration - active.currentTime;

        if (timeLeft < 0.45 && !isTransitioningRef.current) {
          isTransitioningRef.current = true;

          // Prepare and start next buffer early
          next.currentTime = 0;
          next
            .play()
            .then(() => {
              const nextIndex = currentIndex === 0 ? 1 : 0;
              activeBufferRef.current = nextIndex;
              setActiveBuffer(nextIndex);

              // Allow the cross-fade to complete before locking out the next transition
              setTimeout(() => {
                isTransitioningRef.current = false;
                // Only pause the old video once the new one is fully visible
                if (activeBufferRef.current !== currentIndex) {
                  active.pause();
                }
              }, 800);
            })
            .catch(() => {
              isTransitioningRef.current = false;
            });
        }
      }
      rafRef.current = requestAnimationFrame(checkLoop);
    };

    rafRef.current = requestAnimationFrame(checkLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isWebkit]);

  const videoStyle: React.CSSProperties = {
    objectPosition,
    objectFit: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
    willChange: "transform, opacity",
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
          {/*
            VISIBILITY HACK:
            Safari pauses videos at opacity: 0.
            We use opacity: 0.01 and scale(1.01) to keep the video active in the GPU pipeline
            without it being visible to the user.
          */}
          <video
            ref={v0Ref}
            style={{
              ...videoStyle,
              opacity: activeBuffer === 0 ? 1 : 0.01,
              transform:
                activeBuffer === 0
                  ? "scale(1) translateZ(0)"
                  : "scale(1.01) translateZ(0)",
              zIndex: activeBuffer === 0 ? 1 : 0,
              transition:
                "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
            }}
            autoPlay
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
              opacity: activeBuffer === 1 ? 1 : 0.01,
              transform:
                activeBuffer === 1
                  ? "scale(1) translateZ(0)"
                  : "scale(1.01) translateZ(0)",
              zIndex: activeBuffer === 1 ? 1 : 0,
              transition:
                "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
            }}
            autoPlay
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
            transform: "translateZ(0)",
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

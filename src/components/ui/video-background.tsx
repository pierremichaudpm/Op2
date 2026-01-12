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
  const [isWebkit, setIsWebkit] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect Webkit browsers
    const ua = navigator.userAgent;
    const webkit =
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Chromium/.test(ua) &&
      !/Edg/.test(ua);
    setIsWebkit(webkit);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Force le volume à 0
    el.volume = 0;
    el.muted = true;
    el.defaultMuted = true;

    // Forcer le chargement et lecture immédiate
    const playVideo = () => {
      el.play().catch(() => {
        // Retry après un court délai si échec
        setTimeout(() => {
          el.play().catch(() => {});
        }, 100);
      });
    };

    // Fix Webkit loop flash with requestAnimationFrame for precise timing
    const checkLoopWebkit = () => {
      if (!el || el.paused) {
        rafRef.current = null;
        return;
      }

      if (el.duration > 0 && el.currentTime >= el.duration - 0.05) {
        el.currentTime = 0;
      }

      rafRef.current = requestAnimationFrame(checkLoopWebkit);
    };

    if (isWebkit) {
      rafRef.current = requestAnimationFrame(checkLoopWebkit);
    }

    // Démarrer la vidéo dès que possible
    if (el.readyState >= 2) {
      // HAVE_CURRENT_DATA
      playVideo();
    } else {
      el.addEventListener("loadeddata", playVideo, { once: true });
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!el) return;
          if (entry.isIntersecting) {
            playVideo();
            if (isWebkit && !rafRef.current) {
              rafRef.current = requestAnimationFrame(checkLoopWebkit);
            }
          } else {
            el.pause();
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", playVideo);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isWebkit]);

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
          preload="auto"
          onError={() => setHasError(true)}
        >
          <source src={`${baseVideoPath}_webkit_fix.mp4`} type="video/mp4" />
          <source src={`${baseVideoPath}_perfect_loop.mp4`} type="video/mp4" />
          <source src={`${baseVideoPath}_seamless.mp4`} type="video/mp4" />
          <source src={`${baseVideoPath}_optimized.mp4`} type="video/mp4" />
          <source src={videoSrc} type="video/mp4" />
          <source src={`${baseVideoPath}_optimized.webm`} type="video/webm" />
        </video>
      )}
      {children}
    </div>
  );
}

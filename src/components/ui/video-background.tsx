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

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Force le volume à 0
    el.volume = 0;
    el.muted = true;

    // Forcer le chargement et lecture immédiate pour Webkit
    const playVideo = () => {
      el.play().catch(() => {
        // Retry après un court délai si échec
        setTimeout(() => {
          el.play().catch(() => {});
        }, 100);
      });
    };

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
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", playVideo);
    };
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
          preload="auto"
          onError={() => setHasError(true)}
        >
          <source src={`${baseVideoPath}_optimized.mp4`} type="video/mp4" />
          <source src={videoSrc} type="video/mp4" />
          <source src={`${baseVideoPath}_optimized.webm`} type="video/webm" />
        </video>
      )}
      {children}
    </div>
  );
}

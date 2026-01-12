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
  const [isWebkit, setIsWebkit] = useState<boolean | null>(null);

  // Detect WebKit browser (Safari, GNOME Web)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isWebkitBrowser =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent) &&
        !/Chromium/.test(navigator.userAgent) &&
        !/Edg/.test(navigator.userAgent);
      setIsWebkit(isWebkitBrowser);
    }
  }, []);

  // Extract base video path without extension
  const getOptimizedVideoSources = () => {
    const basePath = videoSrc.replace(/\.(mp4|webm)$/, "");

    // For WebKit browsers, prioritize WebM format (better performance)
    if (isWebkit === true) {
      return [
        { src: `${basePath}_optimized.webm`, type: "video/webm" },
        { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
        { src: `${basePath}_webkit_fix.mp4`, type: "video/mp4" }, // WebKit-specific fix
        { src: videoSrc, type: "video/mp4" }, // Fallback to original
      ];
    }

    // For Chrome/Firefox/Edge, use optimized MP4 first
    return [
      { src: `${basePath}_optimized.mp4`, type: "video/mp4" },
      { src: `${basePath}_optimized.webm`, type: "video/webm" },
      { src: `${basePath}_perfect_loop.mp4`, type: "video/mp4" }, // Perfect loop version
      { src: videoSrc, type: "video/mp4" }, // Fallback to original
    ];
  };

  const videoSources = getOptimizedVideoSources();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // WebKit-specific optimizations
    if (isWebkit === true) {
      // Force hardware acceleration for WebKit
      video.style.transform = "translate3d(0,0,0)";
      video.style.webkitTransform = "translate3d(0,0,0)";

      // Additional WebKit CSS optimizations
      video.style.webkitBackfaceVisibility = "hidden";
      video.style.webkitPerspective = "1000px";
      video.style.imageRendering = "crisp-edges";

      // Prefer 'metadata' preload for WebKit to avoid stuttering
      video.preload = "metadata";

      // Set video attributes for WebKit optimization
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("x-webkit-airplay", "deny");

      // Add event listeners for WebKit smooth playback
      const handleCanPlay = () => {
        // Small delay to ensure video is ready for WebKit
        setTimeout(() => {
          video.play().catch((e) => {
            console.log("WebKit video play error:", e);
            // Fallback: try again with different approach
            video.load();
            setTimeout(() => video.play().catch(() => {}), 100);
          });
        }, 50);
      };

      const handleLoadedMetadata = () => {
        // WebKit benefits from waiting for metadata
        if (video.readyState >= 1) {
          handleCanPlay();
        }
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Also try to play immediately if already loaded
      if (video.readyState >= 1) {
        handleCanPlay();
      }

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    } else {
      // Chrome/Firefox/Edge - use standard approach
      video.muted = true;
      video.play().catch(() => {});
    }
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
        style={{
          objectPosition,
          // Hardware acceleration for all browsers
          transform: "translate3d(0,0,0)",
          WebkitTransform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          // Force GPU rendering
          willChange: "transform",
          // WebKit-specific optimizations
          ...(isWebkit === true && {
            WebkitPerspective: "1000",
            WebkitBackfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
            // Additional WebKit video optimizations
            WebkitTransformStyle: "preserve-3d",
            WebkitFilter: "blur(0)",
            // Prevent subpixel rendering issues
            imageRendering: "crisp-edges",
            // Optimize for video playback
            WebkitVideoPlaybackInline: true,
            // Force hardware video decoding
            WebkitTransformOrigin: "0 0",
          }),
        }}
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        preload="auto"
        onError={() => setHasError(true)}
        // WebKit-specific attributes
        {...(isWebkit === true && {
          webkitPlaysInline: true,
          playsInline: true,
          // Additional WebKit video attributes
          webkitInlinePlaysInline: true,
        })}
      >
        {videoSources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
      {children}
    </div>
  );
}

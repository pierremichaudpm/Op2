import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/GlobeCircle_1.module.css";

export default function GlobeCircle_1() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
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
    const video = video1Ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", playVideo);
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
  const webkitStyle: React.CSSProperties = isWebkit
    ? {
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }
    : {};

  // For non-WebKit, render single video with native loop
  if (!isWebkit) {
    return (
      <div className={styles.GlobeCircle_1_311_218}>
        <video
          ref={video1Ref}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/globe4.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  // For WebKit, render dual videos for crossfade
  return (
    <div
      className={styles.GlobeCircle_1_311_218}
      style={{ position: "relative" }}
    >
      <video
        ref={video1Ref}
        className={styles.video}
        style={{
          ...webkitStyle,
          position: "absolute",
          inset: 0,
          transition: "opacity 0.3s ease-out",
        }}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/globe4.mp4" type="video/mp4" />
      </video>
      <video
        ref={video2Ref}
        className={styles.video}
        style={{
          ...webkitStyle,
          position: "absolute",
          inset: 0,
          transition: "opacity 0.3s ease-out",
          opacity: 0,
        }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/globe4.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

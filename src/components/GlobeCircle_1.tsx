import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/GlobeCircle_1.module.css";

export default function GlobeCircle_1() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isWebkit, setIsWebkit] = useState(false);

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
    const video = videoRef.current;
    if (!video) return;

    // Force muted and ensure smooth playback
    video.muted = true;
    video.defaultMuted = true;

    // Preload and play as soon as possible
    video.load();

    const playVideo = () => {
      video.play().catch(() => {
        // Retry if autoplay blocked
        setTimeout(() => {
          video.play().catch(() => {});
        }, 100);
      });
    };

    // Fix Webkit loop flash: seek to beginning just before loop
    const handleTimeUpdate = () => {
      if (
        isWebkit &&
        video.duration > 0 &&
        video.currentTime > video.duration - 0.1
      ) {
        video.currentTime = 0;
      }
    };

    if (isWebkit) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      if (isWebkit) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [isWebkit]);

  return (
    <div className={styles.GlobeCircle_1_311_218}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/globe4_perfect_loop.mp4" type="video/mp4" />
        <source src="/videos/globe4_optimized.mp4" type="video/mp4" />
        <source src="/videos/globe4.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

import React, { useRef, useEffect } from "react";
import styles from "../styles/GlobeCircle_1.module.css";

export default function GlobeCircle_1() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
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
        <source src="/videos/globe4.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

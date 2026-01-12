import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/GlobeCircle_1.module.css";

export default function GlobeCircle_1() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const isSwapping = useRef(false);

  // Check if WebKit on client side only
  const isWebkit =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    !/Chrome/.test(navigator.userAgent) &&
    !/Chromium/.test(navigator.userAgent) &&
    !/Edg/.test(navigator.userAgent);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1) return;

    v1.muted = true;
    v1.playsInline = true;

    const playVideo = () => {
      v1.play().catch(() => {});
    };

    if (v1.readyState >= 2) {
      playVideo();
    } else {
      v1.addEventListener("canplay", playVideo, { once: true });
    }

    // WebKit: dual video crossfade to prevent loop flash
    if (isWebkit && v2) {
      v2.muted = true;
      v2.playsInline = true;

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
        v1.removeEventListener("canplay", playVideo);
      };
    }

    return () => {
      v1.removeEventListener("canplay", playVideo);
    };
  }, [isWebkit]);

  return (
    <div
      className={styles.GlobeCircle_1_311_218}
      style={{ position: "relative" }}
    >
      <video
        ref={video1Ref}
        className={styles.video}
        style={{ position: "absolute", inset: 0 }}
        autoPlay
        muted
        loop={!isWebkit}
        playsInline
        preload="auto"
      >
        <source src="/videos/globe4.mp4" type="video/mp4" />
      </video>

      {isWebkit && (
        <video
          ref={video2Ref}
          className={styles.video}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/globe4.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

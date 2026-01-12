import React from "react";
import styles from "../styles/GlobeCircle_1.module.css";
import { VideoBackground } from "@/components/ui/video-background";

/**
 * GlobeCircle_1 Component
 *
 * This component renders the interactive globe in the Expertise section.
 * It uses the optimized VideoBackground component to ensure seamless
 * looping in WebKit browsers while maintaining performance in Chrome.
 */
export default function GlobeCircle_1() {
  return (
    <div
      className={styles.GlobeCircle_1_311_218}
      style={{ position: "relative" }}
    >
      <VideoBackground
        videoSrc="/videos/globe4"
        posterSrc=""
        opacity={1}
        objectPosition="center"
        className={styles.video}
      />
    </div>
  );
}

import React from 'react';
import styles from '../styles/GlobeCircle_1.module.css';

export default function GlobeCircle_1() {
  return (
    <div className={styles.GlobeCircle_1_311_218}>
      <video 
        className={styles.video}
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/globe4.mp4" type="video/mp4" />
        {/* Fallback pour les navigateurs qui ne supportent pas la vidéo */}
      </video>
    </div>
  );
}

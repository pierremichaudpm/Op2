"use client";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

export function MobileHero() {
  const { t, locale } = useI18n();
  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const activeBufferRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);

  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);
  const [isWebkit, setIsWebkit] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect pure Safari/Webkit (not Chrome/Edge) or iOS
    const ua = navigator.userAgent;
    const isSafari =
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Chromium/.test(ua) &&
      !/Edg/.test(ua);
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    setIsWebkit(isSafari || isIOS);
  }, []);

  // Start video playback
  const startPlayback = useCallback((video: HTMLVideoElement) => {
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked - wait for user interaction
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
        };
        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
      });
    }
  }, []);

  // Initialize videos and start playback
  useEffect(() => {
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    // Ensure both videos are muted for autoplay compliance
    v0.muted = true;
    v1.muted = true;

    // Start primary video
    startPlayback(v0);

    // For non-WebKit browsers, v0 handles everything with native loop
    if (!isWebkit) return;

    // WebKit Double-Buffer Relay Logic
    const checkLoop = () => {
      const currentIndex = activeBufferRef.current;
      const active = currentIndex === 0 ? v0 : v1;
      const next = currentIndex === 0 ? v1 : v0;

      // Watchdog: Resume if video got paused unexpectedly
      if (
        active.paused &&
        active.readyState >= 2 &&
        !isTransitioningRef.current
      ) {
        active.play().catch(() => {});
      }

      // Check if we need to transition (450ms before end)
      const duration = active.duration;
      const currentTime = active.currentTime;

      if (
        duration > 0 &&
        !isNaN(duration) &&
        currentTime > duration / 2 &&
        duration - currentTime < 0.45 &&
        !isTransitioningRef.current
      ) {
        isTransitioningRef.current = true;

        // Prepare next buffer
        next.currentTime = 0;
        next
          .play()
          .then(() => {
            // Swap active buffer
            const nextIndex: 0 | 1 = currentIndex === 0 ? 1 : 0;
            activeBufferRef.current = nextIndex;
            setActiveBuffer(nextIndex);

            // Clean up after transition completes
            setTimeout(() => {
              isTransitioningRef.current = false;
              // Pause the old video to save resources
              if (activeBufferRef.current !== currentIndex) {
                active.pause();
                active.currentTime = 0;
              }
            }, 600);
          })
          .catch(() => {
            isTransitioningRef.current = false;
          });
      }

      rafRef.current = requestAnimationFrame(checkLoop);
    };

    rafRef.current = requestAnimationFrame(checkLoop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isWebkit, startPlayback]);

  // Shared video styles
  const videoStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center bottom",
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    willChange: "opacity",
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        marginTop: "80px",
        marginBottom: "20px",
        padding: "0 4.5%",
      }}
    >
      {/* Hero container avec les VRAIES dimensions Figma (358x459) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "459px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Video Buffer 0: Primary for Chrome, relay buffer for Safari */}
        <video
          ref={v0Ref}
          autoPlay
          muted
          playsInline
          loop={!isWebkit}
          preload="auto"
          style={{
            ...videoStyle,
            opacity: activeBuffer === 0 ? 1 : 0,
            zIndex: activeBuffer === 0 ? 1 : 0,
          }}
        >
          <source src="/videos/hero_mobile_animation.mp4" type="video/mp4" />
        </video>

        {/* Video Buffer 1: Dormant in Chrome, relay buffer for Safari */}
        <video
          ref={v1Ref}
          muted
          playsInline
          preload={isWebkit ? "auto" : "none"}
          style={{
            ...videoStyle,
            opacity: activeBuffer === 1 ? 1 : 0,
            zIndex: activeBuffer === 1 ? 1 : 0,
          }}
        >
          <source src="/videos/hero_mobile_animation.mp4" type="video/mp4" />
        </video>

        {/*
          CHROME/FIREFOX: Use blend modes for glittery color effect
          WEBKIT/SAFARI: Use simple overlays without blend modes to avoid blur
        */}

        {isWebkit === true ? (
          <>
            {/* WebKit: Simple semi-transparent overlays without blend modes */}
            {/* Navy overlay - top portion */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(36,55,104,0.55) 0%, rgba(36,55,104,0.3) 50%, transparent 70%)",
                borderRadius: "20px",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Orange overlay - bottom portion */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(0deg, rgba(243,105,17,0.6) 0%, rgba(243,105,17,0.35) 25%, transparent 50%)",
                borderRadius: "20px",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Soft bottom glow */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "35%",
                background:
                  "linear-gradient(0deg, rgba(243,105,17,0.45) 0%, transparent 100%)",
                filter: "blur(20px)",
                borderRadius: "0 0 20px 20px",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </>
        ) : (
          <>
            {/* Chrome/Firefox: Original blend mode approach */}
            {/* Overlay bleu */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#243768",
                opacity: 0.6,
                zIndex: 2,
              }}
            />

            {/* Overlay gradient */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #243768 0%, #F36911 100%)",
                opacity: 0.42,
                mixBlendMode: "color",
                zIndex: 2,
              }}
            />

            {/* Bottom orange emphasis (blurred) */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "45%",
                background:
                  "linear-gradient(0deg, rgba(243,105,17,0.92) 0%, rgba(243,105,17,0.65) 35%, rgba(243,105,17,0) 70%)",
                mixBlendMode: "color",
                filter: "blur(12px)",
                borderRadius: "0 0 20px 20px",
                zIndex: 2,
              }}
            />
          </>
        )}

        {/* Contenu textuel avec proportions améliorées */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 20px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85%",
            textAlign: "center",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
          }}
        >
          {/* Titre principal - plus grand et plus impactant */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              color: "#FFFFFF",
              fontFamily: "Gotham, sans-serif",
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: "26px",
              textTransform: "uppercase",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              margin: 0,
              letterSpacing: "-0.3px",
              whiteSpace: "pre-line",
            }}
          >
            {locale === "en"
              ? "Your partner in\nexcellence for\ncomplex projects"
              : "Votre partenaire\nd'excellence en\nprojets complexes"}
          </motion.h1>

          {/* Sous-titre - plus lisible */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              color: "#FFFFFF",
              fontFamily: "Gotham, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              margin: 0,
              maxWidth: "320px",
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {locale === "en"
              ? "Industrial experience. Field approach.\nConcrete results. Our consultants master your reality\nbecause they have lived it."
              : "Expérience industrielle. Approche terrain.\nRésultats concrets. Nos consultants maîtrisent\nvotre réalité parce qu'ils l'ont vécue."}
          </motion.p>

          {/* CTA Button - proportions ajustées */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            onClick={() => {
              const element = document.querySelector("#experts");
              if (element) {
                const yOffset = -80;
                const y =
                  element.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            style={{
              backgroundColor: "#F36911",
              color: "#FFFFFF",
              fontFamily: "Gotham, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              width: "260px",
              height: "42px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(243, 105, 17, 0.3)",
              transition: "all 0.3s ease",
              marginTop: "-5px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(243, 105, 17, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(243, 105, 17, 0.3)";
            }}
          >
            {locale === "en"
              ? "Let's talk about your project"
              : "Parlons de votre projet"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}

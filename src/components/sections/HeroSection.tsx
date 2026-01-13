"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { VideoBackground } from "@/components/ui/video-background";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const [isWebkit, setIsWebkit] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect pure Safari/Webkit (not Chrome/Edge)
    const isWebkitBrowser =
      typeof window !== "undefined" &&
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent) &&
      !/Chromium/.test(navigator.userAgent) &&
      !/Edg/.test(navigator.userAgent);
    setIsWebkit(isWebkitBrowser);
  }, []);

  // Chrome/Firefox values (default) - uses 'color' blend mode for glittery effect
  const chromeStyles = {
    solidOverlayOpacity: 0.6,
    gradientOverlayOpacity: 0.48,
    gradientBlend: "color" as const,
    bottomGradient:
      "linear-gradient(0deg, rgba(243,105,17,0.92) 0%, rgba(243,105,17,0.65) 35%, rgba(243,105,17,0) 70%)",
    bottomBlur: 12,
  };

  // WebKit/Safari values - uses 'multiply' blend mode which Safari handles without blur
  // Multiply darkens, so we use lighter colors and lower opacity for similar effect
  const webkitStyles = {
    solidOverlayOpacity: 0.35,
    gradientOverlayOpacity: 0.55,
    gradientBlend: "multiply" as const,
    bottomGradient:
      "linear-gradient(0deg, rgba(255,140,60,0.85) 0%, rgba(255,150,80,0.5) 35%, rgba(255,150,80,0) 70%)",
    bottomBlur: 10,
  };

  const styles = isWebkit === true ? webkitStyles : chromeStyles;

  // GPU isolation styles for WebKit - prevents compositing blur
  const gpuIsolation: React.CSSProperties = {
    transform: "translate3d(0,0,0)",
    WebkitTransform: "translate3d(0,0,0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    perspective: 1000,
    WebkitPerspective: 1000,
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container-wrapper pt-1 pb-5 max-w-[1728px]">
        <div
          className="relative mx-auto overflow-hidden rounded-[50px] border border-primary/10 w-[1728px]"
          style={{
            isolation: "isolate", // Create new stacking context
          }}
        >
          {/* Fixed height per design (Figma: 896px) */}
          <div className="relative h-[896px] w-full">
            {/* Video as true background (poster = slider 1.png) */}
            <VideoBackground
              videoSrc="/videos/hero_animation"
              posterSrc="/images/slider-1.png"
              opacity={1}
              objectPosition="center bottom"
              className="absolute inset-0 z-0"
            />

            {/* Solid navy overlay - GPU isolated for WebKit */}
            <div
              className="absolute inset-0 z-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[50px]"
              style={{
                backgroundColor: "#243768",
                opacity: styles.solidOverlayOpacity,
                ...(isWebkit === true ? gpuIsolation : {}),
              }}
            />

            {/* Gradient overlay (navy to orange) - uses appropriate blend mode per browser */}
            <div
              className="absolute inset-0 z-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[50px] pointer-events-none"
              style={{
                background:
                  isWebkit === true
                    ? "linear-gradient(180deg, rgba(50,80,140,0.9) 0%, rgba(255,120,40,0.8) 100%)"
                    : "linear-gradient(180deg, #243768 0%, #F36911 100%)",
                mixBlendMode: styles.gradientBlend,
                opacity: styles.gradientOverlayOpacity,
                ...(isWebkit === true ? gpuIsolation : {}),
              }}
            />

            {/* Bottom orange emphasis (blurred) */}
            <div
              className="absolute left-0 right-0 bottom-0 z-10 rounded-b-[50px] pointer-events-none"
              style={{
                height: "45%",
                background: styles.bottomGradient,
                mixBlendMode: styles.gradientBlend,
                filter: `blur(${styles.bottomBlur}px)`,
                ...(isWebkit === true ? gpuIsolation : {}),
              }}
            />

            {/* Centered content */}
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center gap-4"
              style={{ transform: "translateY(-40px)" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-display subpixel-antialiased text-white uppercase text-[66px] leading-[80px] font-bold tracking-[0.01em] max-w-[1426px] text-outline-light text-stroke-navy"
              >
                {t("hero.title.l1")}
                <br />
                {t("hero.title.l2")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="font-display subpixel-antialiased text-[#FFD3B7] text-[30px] leading-[44px] font-semibold tracking-[0.03em] max-w-[1100px] text-outline-light text-stroke-white"
                style={{
                  textShadow:
                    "0 2px 6px rgba(0,0,0,0.28), 0 0 2px rgba(0,0,0,0.22)",
                }}
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-2"
              >
                <CTAButton
                  href="#equipe"
                  hoverIcon
                  size="sm"
                  textWeight="bold"
                  className="relative w-[461px] h-[77px] rounded-[40px] bg-[#F36911]"
                >
                  {t("hero.cta")}
                </CTAButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

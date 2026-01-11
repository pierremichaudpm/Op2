"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { VideoBackground } from "@/components/ui/video-background";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="container-wrapper pt-1 pb-5 max-w-[1728px]">
        <div className="relative mx-auto overflow-hidden rounded-[50px] border border-primary/10 w-[1728px]">
          {/* Fixed height per design (Figma: 896px) */}
          <div className="relative h-[896px] w-full">
            {/* Video as true background (poster = slider 1.png) */}
            <VideoBackground
              videoSrc="/videos/hero_animation.mp4"
              posterSrc="/images/slider-1.png"
              opacity={1}
              objectPosition="center bottom"
              className="absolute inset-0 z-0"
            />

            {/* Overlays above video (adoucies) */}
            <div
              className="absolute inset-0 z-10 opacity-[0.6] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[50px]"
              style={{ backgroundColor: "#243768" }}
            />
            <div
              className="hero-gradient-overlay absolute inset-0 z-10 opacity-[0.48] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[50px] pointer-events-none"
              style={{
                background: "linear-gradient(180deg, #243768 0%, #F36911 100%)",
                mixBlendMode: "color",
              }}
            />
            {/* Bottom orange emphasis (blurred) */}
            <div
              className="hero-bottom-gradient absolute left-0 right-0 bottom-0 z-10 rounded-b-[50px] pointer-events-none"
              style={{
                height: "45%",
                background:
                  "linear-gradient(0deg, rgba(243,105,17,0.92) 0%, rgba(243,105,17,0.65) 35%, rgba(243,105,17,0) 70%)",
                mixBlendMode: "color",
                filter: "blur(12px)",
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

      {/* CSS styles for Safari/Webkit-specific overlays */}
      <style jsx>{`
        /* Safari-specific: reduce overlay intensity */
        @media not all and (min-resolution: 0.001dpcm) {
          @supports (-webkit-appearance: none) {
            .hero-gradient-overlay {
              opacity: 0.125 !important;
              mix-blend-mode: multiply !important;
            }

            .hero-bottom-gradient {
              background: linear-gradient(
                0deg,
                rgba(243, 105, 17, 0.225) 0%,
                rgba(243, 105, 17, 0.125) 35%,
                rgba(243, 105, 17, 0) 70%
              ) !important;
              mix-blend-mode: multiply !important;
            }
          }
        }
      `}</style>
    </section>
  );
}

"use client";
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CTAButton } from '@/components/ui/cta-button';
import { VideoBackground } from '@/components/ui/video-background';

export function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div className="container-wrapper pt-2 pb-5 max-w-[1728px]">
        <div className="relative mx-auto overflow-hidden rounded-[50px] border border-primary/10 w-[1728px]">
          {/* Fixed height per design (Figma: 896px) */}
          <div className="relative h-[896px] w-full">
            {/* Video as true background (poster = slider 1.png) */}
            <VideoBackground
              videoSrc="/videos/hero_animation.mp4"
              posterSrc="/images/slider-1.png"
              opacity={1}
              className="absolute inset-0 z-0"
            />

            {/* Overlays above video (adoucies) */}
            <div className="absolute inset-0 z-10 opacity-[0.5] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[50px]" style={{ backgroundColor: '#243768' }} />
            <div
              className="absolute inset-0 z-10 opacity-[0.6] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[50px] pointer-events-none"
              style={{ background: 'linear-gradient(180deg, #243768 0%, #F36911 100%)', mixBlendMode: 'color' }}
            />
            {/* Bottom orange emphasis (blurred) */}
            <div
              className="absolute left-0 right-0 bottom-0 z-10 rounded-b-[50px] pointer-events-none"
              style={{
                height: '45%',
                background:
                  'linear-gradient(0deg, rgba(243,105,17,0.92) 0%, rgba(243,105,17,0.65) 35%, rgba(243,105,17,0) 70%)',
                mixBlendMode: 'color',
                filter: 'blur(12px)'
              }}
            />

            {/* Centered content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center gap-4">
              <motion.h1
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6, margin: '-10% 0% -10% 0%' }}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.5 }}
                className="font-display subpixel-antialiased text-white uppercase text-[66px] leading-[80px] font-bold tracking-[0.01em] max-w-[1426px] text-outline-light text-stroke-navy"
              >
                Votre partenaire d&apos;excellence
                <br />
                en projets complexes
              </motion.h1>

              <motion.p
                initial={reduce ? undefined : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.6, margin: '-10% 0% -10% 0%' }}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.8 }}
                className="font-display subpixel-antialiased text-[#FFD3B7] text-[30px] leading-[44px] font-medium tracking-[0.02em] capitalize max-w-[1100px] text-outline-light text-stroke-white"
              >
                Plus que du conseil: nous redressons, optimisons et pérennisons vos projets industriels.
              </motion.p>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6, margin: '-10% 0% -10% 0%' }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 1.1 }}
                className="mt-2"
              >
                <CTAButton
                  href="#contact"
                  hoverIcon
                  size="sm"
                  textWeight="bold"
                  className="relative w-[461px] h-[77px] rounded-[40px] bg-[#F36911]"
                >
                  Échanger avec un expert
                </CTAButton>
              </motion.div>
            </div>

            {/* Bottom-left logotype (color-dodge) */}
            <img
              src="/images/logo-shape2-1.png"
              alt="Logotype"
              className="absolute left-0 z-20"
              style={{ width: '480px', height: '288px', bottom: '1px', mixBlendMode: 'color-dodge' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}



"use client";
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';

function useCounter(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            setValue(Math.floor(target * t));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);
  return { value, ref } as const;
}

export function Statistics() {
  const { t } = useI18n();
  const c1 = useCounter(250, 1500);
  const c2 = useCounter(300, 1500);
  const c3 = useCounter(100, 1500);
  
  // Valeurs de fallback si l'animation ne fonctionne pas
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <section className="pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 bg-white">
      <div className="container-wrapper max-w-[1728px]">
        {/* Rectangle 1728x256 avec coins de 50px et décors (cercles plein #213E76) */}
        <div className="relative overflow-hidden rounded-[50px] text-white w-full h-[256px]" style={{ background: '#243768' }}>
          {/* Cercles décoratifs selon Figma (576x576) */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{ width: 576, height: 576, background: '#213E76', left: -170, bottom: -100, opacity: 0.9 }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{ width: 576, height: 576, background: '#213E76', left: '50%', transform: 'translateX(-50%)', top: -380, opacity: 0.9 }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{ width: 576, height: 576, background: '#213E76', right: -140, top: -40, opacity: 0.9 }}
          />

          {/* Contenu centré */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 text-center items-center justify-center h-full px-6 md:px-10">
            <div ref={c1.ref}>
              <div className="font-display uppercase text-[64px] leading-[64px] md:text-[120px] md:leading-[84px] font-bold">+{mounted ? c1.value || 250 : 250}</div>
              <div className="text-accent text-[24px] leading-[48px] md:text-[36px] md:leading-[84px] uppercase">{t('stats.consultants')}</div>
            </div>
            <div ref={c2.ref}>
              <div className="font-display uppercase text-[64px] leading-[64px] md:text-[120px] md:leading-[84px] font-bold">+{mounted ? c2.value || 300 : 300}</div>
              <div className="text-accent text-[24px] leading-[48px] md:text-[36px] md:leading-[84px] uppercase">{t('stats.projectsPerYear')}</div>
            </div>
            <div ref={c3.ref}>
              <div className="font-display uppercase text-[64px] leading-[64px] md:text-[120px] md:leading-[84px] font-bold">+{mounted ? c3.value || 100 : 100}<span className="align-top text-[48px] md:text-[80px]">M$</span></div>
              <div className="text-accent text-[24px] leading-[48px] md:text-[36px] md:leading-[84px] uppercase">{t('stats.revenue')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



"use client";
import Expertise from '../Expertise';
import { useI18n } from '@/lib/i18n';

export function WorldExpertise() {
  const { t } = useI18n();
  return (
    <section id="expertise" className="relative bg-white pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 overflow-hidden">
      <div className="container-wrapper">
        <div className="relative w-full mx-auto max-w-[1728px]" style={{ minHeight: '800px' }}>
          <h2 className="text-left font-display text-[#243768] uppercase text-[48px] leading-[84px] font-bold mb-4" style={{ letterSpacing: '0.02em' }}>
            {t('world.title')}
          </h2>
          <div className="relative w-full flex justify-center">
            <Expertise />
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";
import { CTAButton } from '@/components/ui/cta-button';
import { useI18n } from '@/lib/i18n';

export function ContactSection() {
  const { t } = useI18n();
  return (
    <section id="contact" className="pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 bg-white">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold">
          {t('contact.title')}
        </h2>
        <p className="mt-4 max-w-3xl text-primary text-[18px] leading-[28px] md:text-[32px] md:leading-[40px]">
          {t('contact.text')}
        </p>
        <div className="mt-[59px]">
          <CTAButton
            href="#contact"
            hoverIcon
            size="md"
            textWeight="bold"
            className="relative w-[576px] h-24 rounded-[50px] bg-[#F36911]"
          >
            {t('contact.cta')}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}



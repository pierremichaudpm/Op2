"use client";
import { CTAButton } from '@/components/ui/cta-button';
import { useI18n } from '@/lib/i18n';

export function ContactSection() {
  const { t, locale } = useI18n();
  return (
    <section id="contact" className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 bg-white">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold mb-8 md:mb-12">
          {t('contact.title')}
        </h2>
        <div className="max-w-[75%] space-y-6 md:space-y-8">
          <p className="text-primary text-[18px] leading-[32px] md:text-[32px] md:leading-[48px]">
            {locale === 'en' 
              ? <>At Op2 NA, every project is an opportunity to create value.</>
              : <>Chez Op2 NA, chaque projet est une occasion de créer de la valeur.</>}
          </p>
          
          <p className="text-primary text-[18px] leading-[32px] md:text-[32px] md:leading-[48px]">
            {locale === 'en' 
              ? <>Our difference? We are an operational consulting firm that stays by your side until full deployment.</>
              : <>Notre différence? Nous sommes une firme de consultation opérationnelle qui reste à vos côtés jusqu&apos;au déploiement complet.</>}
          </p>
          
          <p className="text-primary text-[18px] leading-[32px] md:text-[32px] md:leading-[48px]">
            {locale === 'en' 
              ? <>Strategic vision, field expertise, and lasting results.</>
              : <>Vision stratégique, expertise terrain et résultats durables.</>}
          </p>
          
          <p className="text-primary text-[18px] leading-[32px] md:text-[32px] md:leading-[48px]">
          {locale === 'en' 
              ? <>Let&apos;s transform your ambitions into concrete outcomes.</>
              : <>Transformons vos ambitions en résultats concrets.</>}
          </p>
        </div>
        
        <div className="mt-12 md:mt-16">
          <CTAButton
            href="mailto:na.contact@orlade.com"
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



"use client";
import { CTAButton } from '@/components/ui/cta-button';
import { useI18n } from '@/lib/i18n';

export function ContactSection() {
  const { t, locale } = useI18n();
  return (
    <section id="contact" className="pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 bg-white">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold">
          {t('contact.title')}
        </h2>
        <p className="mt-4 max-w-[66.67%] text-primary text-[18px] leading-[28px] md:text-[32px] md:leading-[40px]">
          {locale === 'en' 
            ? <>At Op2 NA, we see every project <strong>as an opportunity to create value and accelerate change</strong>.
            <br /><br />
            <strong>Our difference?</strong> We are an operational consulting firm. We don&apos;t just make recommendations: we stay by your side, in the field, <strong>until full deployment and achievement of the objectives</strong> we build together.
            <br /><br />
            <strong>Our promise?</strong> Support that combines strategic vision, field expertise, and tangible, lasting results. <strong>Because a well-guided project always becomes a success</strong>.
            <br /><br />
            <strong>Let&apos;s talk about your project</strong> today and <strong>transform your ambitions into concrete results</strong>.</>
            : <>Chez Op2 NA, nous voyons chaque projet <strong>comme une occasion de créer de la valeur et d&apos;accélérer le changement</strong>.
            <br /><br />
            <strong>Notre différence?</strong> Nous sommes une firme de consultation opérationnelle. Nous ne nous limitons pas aux recommandations : nous restons à vos côtés, sur le terrain, <strong>jusqu&apos;au déploiement complet et l&apos;atteinte des objectifs</strong> que nous construisons ensemble.
            <br /><br />
            <strong>Notre promesse?</strong> Un accompagnement qui allie vision stratégique, expertise terrain, résultats tangibles et durables. <strong>Parce qu&apos;un projet bien guidé devient toujours une réussite</strong>.
            <br /><br />
            <strong>Parlons de votre projet</strong> dès aujourd&apos;hui et <strong>transformons vos ambitions en résultats concrets</strong>.</>}
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



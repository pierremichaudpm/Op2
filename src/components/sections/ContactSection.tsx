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
        <p className="mt-4 max-w-3xl text-primary text-[18px] leading-[28px] md:text-[32px] md:leading-[40px]">
          {locale === 'en' 
            ? <>Starting a complex initiative, facing project difficulties, or need team support?<br /><br />Our experts are here to help.</>
            : <>Chez Op2 NA, nous voyons chaque projet <strong>comme une occasion de créer de la valeur et d&apos;accélérer le changement</strong>.
            <br /><br />
            <strong>Notre différence?</strong> Nous sommes une firme de consultation opérationnelle. Nous ne limitons pas aux recommandations : nous restons à vos côtés, sur le terrain, <strong>jusqu&apos;au déploiement complet et l&apos;atteinte des objectifs</strong> que nous construisons ensemble.
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



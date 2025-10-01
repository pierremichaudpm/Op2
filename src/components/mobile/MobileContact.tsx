"use client";

import { useI18n } from '@/lib/i18n';

export function MobileContact() {
  const { locale } = useI18n();
  return (
    <section id="contact" style={{
      width: '100%',
      padding: '0 16px',
      marginTop: '20px',
      marginBottom: '20px'
    }}>
      {/* Titre - Aligné avec les autres sections */}
      <h2 style={{
        color: '#243768',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '19px',
        fontWeight: 700,
        textTransform: 'uppercase',
        textAlign: 'left',
        marginBottom: '30px'
      }}>
        {locale === 'en' ? "Let's talk about your project" : 'Parlons de votre projet'}
      </h2>

      {/* Description - Augmentée de 20% */}
      <p style={{
        color: '#243768',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '14.4px', // 12px * 1.2
        fontWeight: 400,
        lineHeight: '1.35em', // Ajusté proportionnellement
        textAlign: 'left',
        width: '100%',
        maxWidth: '353px',
        marginBottom: '40px'
      }}>
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

      {/* Container pour le bouton */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: '1px' // Position x:1 dans Figma
      }}>
        {/* CTA Button - Style exact Figma */}
        <button style={{
          backgroundColor: '#F36911',
          color: '#FFFFFF',
          fontFamily: 'Gotham, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '3.076923076923077em', // Comme dans Figma
          padding: '0',
          borderRadius: '50px',
          border: 'none',
          cursor: 'pointer',
          width: '237px',
          height: '33px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {locale === 'en' ? 'Talk to an expert' : 'Échanger avec un expert'}
        </button>
      </div>
    </section>
  );
}
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
          ? <>Starting a complex project, your current project is in difficulty, or your teams need support?
            <br /><br />
            Our experts are here to guide you.</>
          : <>Vous démarrez un projet complexe, votre projet en cours est en 
            difficulté, ou vos équipes ont besoin d&apos;accompagnement ? 
            <br /><br />
            Nos experts sont là pour vous guider.</>}
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
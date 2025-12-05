"use client";

import { useI18n } from '@/lib/i18n';

export function MobileFooter() {
  const { locale } = useI18n();
  return (
    <footer style={{
      position: 'relative',
      width: '100%',
      maxWidth: '393px',
      height: '393px',
      margin: '60px auto 0',
      overflow: 'hidden'
    }}>
      {/* Div pour le gradient background - EXACT du Figma */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(0deg, rgba(36, 55, 104, 1) 0%, rgba(23, 36, 69, 1) 100%)',
        zIndex: 0
      }} />
      {/* Logo OP2 footer - Image exacte du Figma */}
      <img 
        src="/images/logo-footer.png" 
        alt="OP2" 
        style={{
          position: 'absolute',
          left: '50.58px',
          top: '31.66px',
          width: '46px',
          height: '45.72px',
          opacity: 0.7,
          zIndex: 1
        }}
      />

      {/* Slogan - Position: x:108, y:43.67 */}
      <p style={{
        position: 'absolute',
        left: '108px',
        top: '43.67px',
        width: '231px',
        height: '24.26px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '0.957em',
        color: '#FFFFFF',
        opacity: 0.7,
        margin: 0
      }}>
        {locale === 'en' 
          ? <>Your partner in excellence<br />for complex projects</>
          : <>Votre partenaire d&apos;excellence<br />en projets complexes</>}
      </p>

      {/* Menu principal - EXACT Figma node 2082:361 - Orange */}
      <nav style={{
        position: 'absolute',
        left: '23px',
        top: '105.12px',
        width: '97px',
        height: '97.04px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '1.5em',
        textAlign: 'left',
        color: '#F36911',
        zIndex: 1
      }}>
        <div>{locale === 'en' ? 'Home' : 'Accueil'}</div>
        <div>Expertise</div>
        <div>{locale === 'en' ? 'Offer' : 'Offre'}</div>
        <div>{locale === 'en' ? 'Projects' : 'Réalisations'}</div>
        <div>{locale === 'en' ? 'Team' : 'Équipe'}</div>
      </nav>

      {/* Services - Titre orange, sous-éléments blancs */}
      <div style={{
        position: 'absolute',
        left: '148px',
        top: '105px',
        width: '214px',
        height: '96px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1.5em',
        textAlign: 'left',
        zIndex: 1
      }}>
        <div style={{ color: '#F36911' }}>Services</div>
        <div style={{ color: '#FFFFFF' }}>{locale === 'en' ? 'Project management consulting' : 'Conseil en gestion de projet'}</div>
        <div style={{ color: '#FFFFFF' }}>{locale === 'en' ? 'Staff augmentation' : 'Placement de personnel'}</div>
        <div style={{ color: '#FFFFFF' }}>{locale === 'en' ? 'Training' : 'Formation'}</div>
      </div>

      {/* Contact - Titre orange, détails blancs */}
      <div style={{
        position: 'absolute',
        left: '151px',
        top: '220px',
        width: '210px',
        height: '72px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1.5em',
        zIndex: 1
      }}>
        <div style={{ color: '#F36911' }}>Contact</div>
        <div style={{ color: '#FFFFFF' }}>
          <a href="mailto:na.contact@orlade.com" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
            na.contact@orlade.com
          </a>
        </div>
        <div style={{ color: '#FFFFFF' }}>{locale === 'en' ? 'Montreal, QC, Canada' : 'Montréal, QC, Canada'}</div>
      </div>

      {/* Suivez-nous - Position relative au footer: y:325px environ */}
      <p style={{
        position: 'absolute',
        left: '148px',
        top: '325px',
        width: '110px',
        height: '55px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '3.055em',
        color: 'rgba(255, 255, 255, 0.5)',
        margin: 0,
        zIndex: 1
      }}>
        {locale === 'en' ? 'Follow us' : 'Suivez-nous'}
      </p>

      {/* Icône LinkedIn uniquement */}
      <a href="https://www.linkedin.com/company/op%C2%B2-na" target="_blank" rel="noopener noreferrer" style={{
        position: 'absolute',
        left: '262px',
        top: '332px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        cursor: 'pointer'
      }}>
        <img 
          src="/images/social-linkedin.png" 
          alt="LinkedIn"
          style={{
            width: '21px',
            height: '22px'
          }}
        />
      </a>

      {/* Copyright - Couleur #243768 selon Figma */}
      <p style={{
        position: 'absolute',
        left: '67px',
        bottom: '12px',
        width: '235px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '3.928em',
        color: '#243768',
        margin: 0,
        textAlign: 'left'
      }}>
        © 2025 Op2. Tous droits réservés.
      </p>
    </footer>
  );
}
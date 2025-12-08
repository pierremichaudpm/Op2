"use client";
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';

export function MobileHeader() {
  const { t, locale } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%', // Utiliser toute la largeur disponible
      height: '80px', // Hauteur augmentée pour un header plus grand
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '18px', // Marge gauche forcée
      paddingRight: '18px', // Marge droite forcée
      paddingTop: 0,
      paddingBottom: 0,
      boxSizing: 'border-box',
      zIndex: 50
    }}>
      {/* Logos Op2 + Part of Accenture */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'flex-start'
      }}>
        {/* Logo Op2 principal - réduit */}
        <div style={{
          width: '140px',
          height: '45px',
          backgroundImage: `url(/images/${locale === 'en' ? 'logo-site-en.png' : 'logo-1.png'})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center'
        }} />
        {/* Logo Part of Accenture */}
        <img
          src="/images/PartofAccenture_logo.png"
          alt="Part of Accenture"
          style={{
            width: '110px',
            height: 'auto',
            marginLeft: '22px'
          }}
        />
      </div>

      {/* Container pour toggle langue et burger */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Toggle langue FR/EN */}
        <a
          href={locale === 'en' ? '/mobile' : '/en/mobile'}
          style={{
            color: '#F36911',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            textDecoration: 'none',
            textTransform: 'lowercase'
          }}
        >
          {locale === 'en' ? 'fr' : 'eng'}
        </a>

        {/* Menu hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            width: '55px', // Zone de clic agrandie
            height: '55px', // Carré pour meilleur équilibre
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}
        >
          <img 
            src="/images/burger.svg" 
            alt="Menu"
            style={{
              width: '44px', // Grossi de 25% supplémentaires (35 * 1.25 = 43.75 arrondi à 44)
              height: '44px'
            }}
          />
        </button>
      </div>

      {/* Menu mobile ouvert */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '180px',
          height: '370px',
          backgroundColor: '#243768',
          borderBottomLeftRadius: '17px',
          borderTopLeftRadius: '17px',
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          padding: '14px',
          boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Burger orange dans le menu - positionné exactement comme dans le header */}
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '12.5px', // Centré verticalement comme dans le header (80px - 55px) / 2
              right: '18px', // Exactement la même marge droite que le header
              width: '55px',
              height: '55px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              zIndex: 1
            }}
          >
            <img
              src="/images/burger-orange.svg"
              alt="Fermer"
              style={{
                width: '44px',
                height: '44px'
              }}
            />
          </button>
          
          {/* Spacer pour éviter que le contenu ne se superpose avec le burger */}
          <div style={{ height: '90px' }}></div>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            flex: 1,
            marginBottom: '15px'
          }}>
            {[
              { name: locale === 'en' ? 'Home' : 'Accueil', href: locale === 'en' ? '/en/mobile' : '/mobile' },
              { name: 'Expertise', href: '#expertise' },
              { name: locale === 'en' ? 'Offer' : 'Offre', href: '#offre' },
              { name: locale === 'en' ? 'Projects' : 'Réalisations', href: '#realisations' },
              { name: locale === 'en' ? 'Team' : 'Équipe', href: '#experts' }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      const yOffset = -100; // Offset pour le header fixe
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({top: y, behavior: 'smooth'});
                    }
                    setIsMenuOpen(false);
                  }
                }}
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  lineHeight: '36px',
                  textDecoration: 'none',
                  textTransform: 'none',
                  paddingLeft: '8px'
                }}
              >
                {item.name}
              </a>
            ))}
            
            {/* Toggle langue */}
            <a
              href={locale === 'en' ? '/mobile' : '/en/mobile'}
              style={{
                color: '#F36911',
                fontFamily: 'Gotham, sans-serif',
                fontSize: '17px',
                fontWeight: 700,
                lineHeight: '36px',
                textDecoration: 'none',
                paddingLeft: '8px'
              }}
            >
              {locale === 'en' ? 'FR' : 'ENG'}
            </a>
          </nav>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 50
          }}
        />
      )}
    </header>
  );
}
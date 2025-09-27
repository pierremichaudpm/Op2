"use client";
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function MobileHero() {
  const { t, locale } = useI18n();

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      marginTop: '100px', // Ajusté pour le nouveau header (80px + 20px d'espace)
      marginBottom: '20px',
      padding: '0 4.5%' // Padding proportionnel (17.5/393 = 4.5%)
    }}>
      {/* Hero container avec les VRAIES dimensions Figma (358x459) */}
      <div style={{
        position: 'relative',
        width: '100%', // Prend toute la largeur disponible (393 - 34 = 359px)
        height: '459px', // Hauteur EXACTE du Figma
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        {/* Image de fond - train */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/train.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />

        {/* Overlay bleu */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#243768',
          opacity: 0.5
        }} />

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #243768 0%, #F36911 100%)',
          opacity: 0.6,
          mixBlendMode: 'color'
        }} />

        {/* Contenu textuel avec proportions améliorées */}
        <div style={{
          position: 'absolute',
          top: 'calc(50% + 20px)', // Descendu de 20px
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '85%', // Largeur optimisée pour le texte
          textAlign: 'center',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px' // Espacement uniforme entre les éléments
        }}>
          {/* Titre principal - plus grand et plus impactant */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              color: '#FFFFFF',
              fontFamily: 'Gotham, sans-serif',
              fontSize: '22px', // Réduit de 26px à 22px
              fontWeight: 500, // Poids moyen, moins bold
              lineHeight: '26px', // Proportionnel
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              margin: 0,
              letterSpacing: '-0.3px', // Resserrer légèrement les lettres
              whiteSpace: 'pre-line' // Force le respect des sauts de ligne
            }}>
            {locale === 'en' 
              ? 'Your partner in\nexcellence for\ncomplex projects'
              : 'Votre partenaire\nd\'excellence en\nprojets complexes'}
          </motion.h1>

          {/* Sous-titre - plus lisible */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              color: '#FFFFFF', // Blanc pour meilleure lisibilité
              fontFamily: 'Gotham, sans-serif',
              fontSize: '14px', // Réduit de 17px à 14px
              fontWeight: 400,
              lineHeight: '20px', // Proportionnel à la nouvelle taille
              margin: 0,
              maxWidth: '320px', // Limite la largeur pour une meilleure lecture
              textShadow: '0 1px 3px rgba(0,0,0,0.3)' // Ombre légère pour garantir la lisibilité
            }}>
            {locale === 'en'
              ? 'Beyond consulting: we recover,\noptimise and sustain your industrial projects.'
              : 'Plus que du conseil: nous redressons,\noptimisons et pérennisons vos projets industriels.'}
          </motion.p>

          {/* CTA Button - proportions ajustées */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }} 
          onClick={() => {
            const element = document.querySelector('#experts');
            if (element) {
              const yOffset = -80; // Offset pour arriver aux Experts
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({top: y, behavior: 'smooth'});
            }
          }}
          style={{
            backgroundColor: '#F36911',
            color: '#FFFFFF',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '15px', // Légèrement plus grand
            fontWeight: 700, // Plus bold
            width: '260px', // Légèrement plus large
            height: '42px', // Plus de hauteur pour meilleur toucher mobile
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(243, 105, 17, 0.3)', // Ombre pour profondeur
            transition: 'all 0.3s ease',
            marginTop: '115px' // Descendu de 15px supplémentaires
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(243, 105, 17, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(243, 105, 17, 0.3)';
          }}>
            {locale === 'en' ? "Let's talk about your project" : 'Parlons de votre projet'}
          </motion.button>
        </div>
      </div>
    </section>
  );
}

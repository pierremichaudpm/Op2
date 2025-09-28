'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isFadingToWhite, setIsFadingToWhite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Start fading logo after 1.2 seconds
    const fadeToWhiteTimer = setTimeout(() => {
      setIsFadingToWhite(true);
    }, 1200);
    
    // Start fade out animation after 2.2 seconds (fond vers le site) - Plus de temps de blanc
    const fadeOutTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 2200);

    // Remove splash screen completely after 3 seconds
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeToWhiteTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#FDFCFB', // Fond très légèrement teinté (pas blanc pur)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: isAnimatingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        willChange: 'opacity',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      {/* Gradient overlay subtil orange/bleu qui reste tout le long - légèrement plus visible */}
      <div
        style={{
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 150% 100% at 20% 30%, rgba(243, 105, 17, 0.09) 0%, transparent 50%),
            radial-gradient(ellipse 120% 90% at 80% 70%, rgba(14, 58, 91, 0.08) 0%, transparent 45%),
            radial-gradient(ellipse 140% 110% at 50% 50%, rgba(243, 105, 17, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 100% 80% at 70% 20%, rgba(14, 58, 91, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(243, 105, 17, 0.03), rgba(255, 255, 255, 0.94), rgba(14, 58, 91, 0.03))
          `,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 1 // Reste visible tout le long
        }}
      />

      {/* Logo extrait en haute qualité avec disparition rapide */}
      {mounted && (
        <img 
          src="/images/logo-op2-clean.png" 
          alt="OP2" 
          className="splash-logo"
          style={{
            width: 'clamp(200px, 30vw, 350px)', // Taille optimale pour la résolution native
            height: 'auto',
            opacity: isFadingToWhite ? 0 : 1,
            animation: 'fadeInScale 0.3s ease-out forwards', // Logo arrive TRÈS vite
            transition: 'opacity 0.3s ease-out', // Disparition rapide
            // Pas de filter ni d'ombres pour un rendu propre
            position: 'relative',
            zIndex: 3,
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)'
          }}
        />
      )}

      {/* Animations CSS élégantes */}
      <style jsx>{`
        @keyframes fadeInSoft {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOutSoft {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

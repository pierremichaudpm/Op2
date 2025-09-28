'use client';

import { useEffect, useState } from 'react';
import { splashSingleton } from '@/lib/splash-singleton';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isFadingToWhite, setIsFadingToWhite] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    // Vérifier si on doit montrer le splash
    if (!splashSingleton.shouldShowSplash()) {
      setIsVisible(false);
      // S'assurer que le site est visible
      if (typeof document !== 'undefined') {
        document.body.classList.add('site-ready');
        document.body.style.background = '';
        document.body.style.backgroundImage = '';
      }
      return;
    }
    
    // Marquer le splash comme affiché
    splashSingleton.markAsShown();
    setIsMounted(true);
    
    // Start logo animation immediately after mount
    const logoTimer = setTimeout(() => {
      setLogoAnimated(true);
    }, 50);
    
    // Start fading logo after 1.86 seconds (ajout de 0.66s au total)
    const fadeToWhiteTimer = setTimeout(() => {
      setIsFadingToWhite(true);
    }, 1860);
    
    // Start fade out animation after 2.2 seconds (fond vers le site plus tôt)
    const fadeOutTimer = setTimeout(() => {
      setIsAnimatingOut(true);
      // Show the site now while splash fades
      if (typeof document !== 'undefined') {
        document.body.classList.add('site-ready');
        // Remove inline style to let CSS take over
        document.body.style.background = '';
        document.body.style.backgroundImage = '';
      }
    }, 2200);

    // Remove splash screen completely after 3.4 seconds
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      splashSingleton.markAsComplete();
    }, 3400);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeToWhiteTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
      // Si le composant est démonté avant la fin, marquer comme complet
      splashSingleton.markAsComplete();
    };
  }, []);

  // Don't render on server
  if (typeof window === 'undefined') return null;
  
  // Don't render if not mounted or not visible
  if (!isMounted || !isVisible) return null;

  const splashContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 999999,
        background: '#FDFCFB', // Fond très légèrement teinté (pas blanc pur)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: isAnimatingOut ? 0 : 1,
        transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isAnimatingOut ? 'none' : 'auto'
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

      {/* Logo extrait en haute qualité avec effet d'entrée et disparition rapide */}
      <img 
        src="/images/logo-op2-clean.png" 
        alt="OP2" 
        style={{
          width: 'clamp(200px, 30vw, 350px)', // Taille optimale pour la résolution native
          height: 'auto',
          opacity: logoAnimated ? (isFadingToWhite ? 0 : 1) : 0,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: logoAnimated ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(10px)',
          position: 'relative',
          zIndex: 3,
          filter: logoAnimated ? 'none' : 'blur(2px)'
        }}
      />
    </div>
  );

  // Don't use portal - render directly
  return splashContent;
}
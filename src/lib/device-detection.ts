import { headers } from 'next/headers';

/**
 * Détecte si l'appareil est mobile basé sur le user-agent
 */
export function isMobileUserAgent(userAgent: string): boolean {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

/**
 * Détecte le type d'appareil côté serveur (Server Component)
 */
export async function getDeviceType(): Promise<'mobile' | 'desktop'> {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  
  // Détection primaire par user-agent
  if (isMobileUserAgent(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
}

/**
 * Hook pour la détection côté client avec fallback sur la largeur d'écran
 * Utilise window.innerWidth < 768px comme fallback
 */
export function useDeviceDetection() {
  if (typeof window === 'undefined') {
    return { isMobile: false, isDesktop: true };
  }

  // Détection par user-agent
  const userAgent = navigator.userAgent || '';
  const isMobileUA = isMobileUserAgent(userAgent);
  
  // Fallback sur la largeur d'écran
  const isMobileWidth = window.innerWidth < 768;
  
  // Un appareil est considéré mobile si l'un ou l'autre est vrai
  const isMobile = isMobileUA || isMobileWidth;
  
  return {
    isMobile,
    isDesktop: !isMobile,
    detectionMethod: isMobileUA ? 'user-agent' : (isMobileWidth ? 'screen-width' : 'desktop')
  };
}

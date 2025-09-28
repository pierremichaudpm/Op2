'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationMarker() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Marquer toute navigation future comme interne
    const markNavigation = () => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('internalNavigation', 'true');
      }
    };
    
    // Attendre un peu pour s'assurer que le splash a eu le temps de vérifier
    const timer = setTimeout(markNavigation, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return null;
}

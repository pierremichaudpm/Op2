// Utiliser localStorage au lieu d'un singleton en mémoire
// pour que le splash se réaffiche à chaque refresh complet de page

export const splashSingleton = {
  shouldShowSplash(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Vérifier si le splash est déjà en cours pour cette page
    const isCurrentlyShowing = sessionStorage.getItem('splash-currently-showing') === 'true';
    return !isCurrentlyShowing;
  },
  
  markAsShown(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splash-currently-showing', 'true');
    }
  },
  
  markAsComplete(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('splash-currently-showing');
    }
  }
};

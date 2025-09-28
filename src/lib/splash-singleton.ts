// Singleton pour gérer l'état global du splash screen
class SplashSingleton {
  private static instance: SplashSingleton;
  private hasShown: boolean = false;
  private isShowing: boolean = false;
  
  private constructor() {}
  
  public static getInstance(): SplashSingleton {
    if (!SplashSingleton.instance) {
      SplashSingleton.instance = new SplashSingleton();
    }
    return SplashSingleton.instance;
  }
  
  public shouldShowSplash(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Si un splash est déjà en cours, ne pas en montrer un autre
    if (this.isShowing) return false;
    
    // Si on a déjà montré le splash dans cette instance, ne pas le remontrer
    if (this.hasShown) return false;
    
    // Vérifier si c'est une navigation interne (après le premier chargement)
    // Si performance.navigation existe et type === 1, c'est un refresh
    // Si sessionStorage a une marque de navigation interne, c'est une navigation
    const isInternalNavigation = sessionStorage.getItem('internalNavigation');
    if (isInternalNavigation === 'true') {
      return false;
    }
    
    return true;
  }
  
  public markAsShown(): void {
    this.hasShown = true;
    this.isShowing = true;
    // Marquer qu'on est maintenant dans une session avec navigation interne
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('internalNavigation', 'true');
    }
  }
  
  public markAsComplete(): void {
    this.isShowing = false;
  }
}

export const splashSingleton = SplashSingleton.getInstance();

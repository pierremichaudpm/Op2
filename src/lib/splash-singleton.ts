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
    
    // Si on a déjà montré le splash dans cette instance de la classe, ne pas le remontrer
    if (this.hasShown) return false;
    
    // Toujours montrer le splash (chaque refresh de page)
    // La variable this.hasShown empêche le double affichage dans une même session React
    return true;
  }
  
  public markAsShown(): void {
    this.hasShown = true;
    this.isShowing = true;
  }
  
  public markAsComplete(): void {
    this.isShowing = false;
  }
}

export const splashSingleton = SplashSingleton.getInstance();

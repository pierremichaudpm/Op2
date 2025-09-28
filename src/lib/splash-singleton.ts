// Singleton pour gérer l'état global du splash screen
class SplashSingleton {
  private static instance: SplashSingleton;
  private hasShown: boolean = false;
  
  private constructor() {}
  
  public static getInstance(): SplashSingleton {
    if (!SplashSingleton.instance) {
      SplashSingleton.instance = new SplashSingleton();
    }
    return SplashSingleton.instance;
  }
  
  public shouldShowSplash(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Vérifier si on a déjà montré le splash dans cette session
    if (this.hasShown) return false;
    
    // Vérifier sessionStorage pour éviter de montrer le splash après navigation
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown === 'true') {
      this.hasShown = true;
      return false;
    }
    
    return true;
  }
  
  public markAsShown(): void {
    this.hasShown = true;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashShown', 'true');
    }
  }
}

export const splashSingleton = SplashSingleton.getInstance();

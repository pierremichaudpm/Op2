// Singleton pour gérer l'état global du splash screen
class SplashSingleton {
  private static instance: SplashSingleton;
  private isShowing: boolean = false;
  private pageLoadId: string = '';
  
  private constructor() {}
  
  public static getInstance(): SplashSingleton {
    if (!SplashSingleton.instance) {
      SplashSingleton.instance = new SplashSingleton();
    }
    return SplashSingleton.instance;
  }
  
  private getCurrentPageLoadId(): string {
    if (typeof window === 'undefined') return '';
    // Utiliser le timestamp de navigation comme ID unique pour chaque chargement de page
    return performance.timeOrigin.toString();
  }
  
  public shouldShowSplash(): boolean {
    if (typeof window === 'undefined') return false;
    
    const currentPageLoadId = this.getCurrentPageLoadId();
    
    // Si c'est un nouveau chargement de page (F5 ou première visite), montrer le splash
    if (currentPageLoadId !== this.pageLoadId) {
      this.pageLoadId = currentPageLoadId;
      this.isShowing = false; // Réinitialiser pour le nouveau chargement
      return true;
    }
    
    // Si le splash est déjà en cours pour ce chargement de page
    if (this.isShowing) return false;
    
    return false; // Déjà montré pour ce chargement
  }
  
  public markAsShown(): void {
    this.isShowing = true;
  }
  
  public markAsComplete(): void {
    this.isShowing = false;
  }
}

export const splashSingleton = SplashSingleton.getInstance();

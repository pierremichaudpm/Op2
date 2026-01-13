import { headers } from "next/headers";

/**
 * Détecte si l'appareil est mobile basé sur le user-agent
 * IMPORTANT: iPad is NOT considered mobile - it always gets desktop version
 */
export function isMobileUserAgent(userAgent: string): boolean {
  // Check if it's an iPad first - if yes, return false (desktop version)
  const isIPad = /iPad/i.test(userAgent);
  if (isIPad) {
    return false;
  }

  // For other devices, check if mobile
  const mobileRegex =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

/**
 * Détecte le type d'appareil côté serveur (Server Component)
 */
export async function getDeviceType(): Promise<"mobile" | "desktop"> {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  // Détection primaire par user-agent
  if (isMobileUserAgent(userAgent)) {
    return "mobile";
  }

  return "desktop";
}

/**
 * Hook pour la détection côté client avec fallback sur la largeur d'écran
 * Utilise window.innerWidth < 768px comme fallback
 * IMPORTANT: iPad always gets desktop version
 */
export function useDeviceDetection() {
  if (typeof window === "undefined") {
    return { isMobile: false, isDesktop: true };
  }

  // Détection par user-agent
  const userAgent = navigator.userAgent || "";

  // Check if iPad first - always desktop
  const isIPad =
    /iPad/i.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIPad) {
    return {
      isMobile: false,
      isDesktop: true,
      detectionMethod: "iPad-always-desktop",
    };
  }

  const isMobileUA = isMobileUserAgent(userAgent);

  // Fallback sur la largeur d'écran
  const isMobileWidth = window.innerWidth < 768;

  // Un appareil est considéré mobile si l'un ou l'autre est vrai
  const isMobile = isMobileUA || isMobileWidth;

  return {
    isMobile,
    isDesktop: !isMobile,
    detectionMethod: isMobileUA
      ? "user-agent"
      : isMobileWidth
        ? "screen-width"
        : "desktop",
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { isMobileUserAgent } from '@/lib/device-detection';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = isMobileUserAgent(userAgent);
  const pathname = request.nextUrl.pathname;
  
  // Déterminer la locale actuelle
  const isEnglish = pathname.startsWith('/en');
  const locale = isEnglish ? 'en' : 'fr';
  
  // Ignorer les fichiers statiques et API
  if (
    pathname.includes('/_next') ||
    pathname.includes('/api') ||
    pathname.includes('.') // fichiers avec extension
  ) {
    return NextResponse.next();
  }
  
  // Chemins mobile et desktop
  const mobilePath = isEnglish ? '/en/mobile' : '/mobile';
  const desktopPath = isEnglish ? '/en' : '/';
  
  // Redirection selon le type d'appareil
  if (isMobile && !pathname.includes('/mobile')) {
    // Rediriger vers la version mobile
    const url = request.nextUrl.clone();
    if (pathname === '/' || pathname === '/en') {
      url.pathname = mobilePath;
    } else {
      // Préserver le reste du chemin
      const restPath = pathname.replace('/en', '').replace('/', '');
      url.pathname = `${mobilePath}${restPath ? `/${restPath}` : ''}`;
    }
    return NextResponse.redirect(url);
  }
  
  if (!isMobile && pathname.includes('/mobile')) {
    // Rediriger vers la version desktop
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/mobile', '');
    if (url.pathname === '') url.pathname = '/';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

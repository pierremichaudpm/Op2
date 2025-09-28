import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { fr } from '@/lib/dictionaries/fr';
import { SplashScreen } from '@/components/SplashScreen';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Op² | Amérique du nord',
  description: 'Votre partenaire d\'excellence en projets complexes. Plus que du conseil: nous redressons, optimisons et pérennisons vos projets industriels.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#F36911',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Op²',
  },
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${montserrat.variable}`}>
        {/* Initial splash to prevent flash of content */}
        <div 
          id="initial-splash"
          dangerouslySetInnerHTML={{
            __html: `
              <div style="
                position: absolute;
                inset: 0;
                background: radial-gradient(ellipse 150% 100% at 20% 30%, rgba(243, 105, 17, 0.09) 0%, transparent 50%),
                           radial-gradient(ellipse 120% 90% at 80% 70%, rgba(14, 58, 91, 0.08) 0%, transparent 45%),
                           radial-gradient(ellipse 140% 110% at 50% 50%, rgba(243, 105, 17, 0.05) 0%, transparent 60%),
                           radial-gradient(ellipse 100% 80% at 70% 20%, rgba(14, 58, 91, 0.06) 0%, transparent 50%),
                           linear-gradient(135deg, rgba(243, 105, 17, 0.03), rgba(255, 255, 255, 0.94), rgba(14, 58, 91, 0.03));
              "></div>
              <img src="/images/logo-op2-clean.png" alt="OP2" style="
                width: clamp(200px, 30vw, 350px);
                height: auto;
                position: relative;
                z-index: 3;
              "/>
              <script>
                // Remove initial splash when React splash is ready
                setTimeout(function() {
                  var splash = document.getElementById('initial-splash');
                  if (splash) splash.className = 'hide';
                  setTimeout(function() {
                    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
                  }, 300);
                }, 100);
              </script>
            `
          }}
        />
        <SplashScreen />
        <I18nProvider locale="fr" dict={fr}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}




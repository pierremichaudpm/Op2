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
      <body 
        className={`${inter.className} ${montserrat.variable}`}
        style={{ visibility: 'hidden' }}
      >
        <SplashScreen />
        <I18nProvider locale="fr" dict={fr}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}




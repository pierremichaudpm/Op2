import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '../globals.css';
import { I18nProvider } from '@/lib/i18n';
import { en } from '@/lib/dictionaries/en';
import { SplashScreen } from '@/components/SplashScreen';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Op² | North America',
  description: 'Your partner in excellence for complex projects. Beyond consulting: we recover, optimise and sustain your industrial projects.',
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

export default function RootLayoutEN({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              opacity: 0 !important; 
            }
            body.ready { 
              opacity: 1 !important; 
              transition: opacity 0.3s ease-in;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} ${montserrat.variable}`}>
        <SplashScreen />
        <I18nProvider locale="en" dict={en}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}



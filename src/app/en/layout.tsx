import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '../globals.css';
import { I18nProvider } from '@/lib/i18n';
import { en } from '@/lib/dictionaries/en';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Op2 | Agency',
  description: 'Showcase site Next.js 14 + Tailwind',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayoutEN({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable}`}>
        <I18nProvider locale="en" dict={en}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}



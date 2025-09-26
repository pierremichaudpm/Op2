import { I18nProvider } from '@/lib/i18n';
import { fr } from '@/lib/dictionaries/fr';

export default function MobileLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <I18nProvider locale="fr" dict={fr}>
      <div className="mobile-container" style={{ maxWidth: '100%', padding: '0', margin: '0 auto' }}>
        {children}
      </div>
    </I18nProvider>
  );
}

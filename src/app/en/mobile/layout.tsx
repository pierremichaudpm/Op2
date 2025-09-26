import { I18nProvider } from '@/lib/i18n';
import { en } from '@/lib/dictionaries/en';

export default function MobileLayoutEN({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <I18nProvider locale="en" dict={en}>
      <div className="mobile-container" style={{ maxWidth: '100%', padding: '0 20px', margin: '0 auto' }}>
        {children}
      </div>
    </I18nProvider>
  );
}

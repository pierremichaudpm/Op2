import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileHero } from '@/components/mobile/MobileHero';
import { MobileStatistics } from '@/components/mobile/MobileStatistics';
import { MobileExpertiseMondiale } from '@/components/mobile/MobileExpertiseMondiale';
import { MobileOffreGlobale } from '@/components/mobile/MobileOffreGlobale';
import { MobileRealisations } from '@/components/mobile/MobileRealisations';
import { MobileExperts } from '@/components/mobile/MobileExperts';
import { MobileContact } from '@/components/mobile/MobileContact';
import { MobileFooter } from '@/components/mobile/MobileFooter';

export default function MobileHomePage() {
  return (
    <main style={{
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '430px', // Légèrement plus large que 393px original
      margin: '0 auto'  // Centrer sur grands écrans
    }}>
      <MobileHeader />
      <MobileHero />
      <MobileStatistics />
      <MobileExpertiseMondiale />
      <MobileOffreGlobale />
      <MobileRealisations />
      <MobileExperts />
      <MobileContact />
      <MobileFooter />
    </main>
  );
}
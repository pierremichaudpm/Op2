import { HeroSection } from '@/components/sections/HeroSection';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { WorldExpertise } from '@/components/sections/WorldExpertise';
import { Statistics } from '@/components/sections/Statistics';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { ContactSection } from '@/components/sections/ContactSection';
import { TeamSection } from '@/components/sections/TeamSection';

export default function HomePageEN() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <WorldExpertise />
      <Statistics />
      <Services />
      <Portfolio />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}



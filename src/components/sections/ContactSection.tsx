import { CTAButton } from '@/components/ui/cta-button';

export function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold">
          Parlons de votre projet
        </h2>
        <p className="mt-4 max-w-3xl text-primary text-[18px] leading-[28px] md:text-[32px] md:leading-[40px]">
          Vous démarrez un projet complexe, votre projet en cours est en difficultés, ou vos équipes ont besoin d&apos;accompagnement ?
          <br />
          Nos experts sont là pour vous guider.
        </p>
        <div className="mt-6">
          <CTAButton href="#contact">Échanger avec un expert</CTAButton>
        </div>
      </div>
    </section>
  );
}



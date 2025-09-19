import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-primary/10 bg-gradient-to-t from-primary/90 to-primary/70 text-white">
      <div className="container-wrapper max-w-[1728px] py-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-1.png" alt="Op2 logo" width={40} height={40} className="rounded" />
            <span className="font-semibold">Op2</span>
          </div>
          <p className="text-white/80 text-sm">Votre partenaire d&apos;excellence en projets complexes.</p>
        </div>
        <nav>
          <h4 className="font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-white/90">
            <li><a href="#">Accueil</a></li>
            <li><a href="#expertise">Expertise</a></li>
            <li><a href="#offres">Offre</a></li>
            <li><a href="#realisations">Réalisations</a></li>
            <li><a href="#equipe">Équipe</a></li>
          </ul>
        </nav>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-white/90">
            <li>Conseil en gestion de projet</li>
            <li>Placement de personnel</li>
            <li>Formation</li>
          </ul>
        </div>
        <address className="not-italic space-y-2">
          <h4 className="font-semibold mb-3">Contact</h4>
          <p>contact@op2.com</p>
          <p>+1 514 123 4567</p>
          <p>Montréal, QC, Canada</p>
          <div className="flex gap-3 pt-2 text-white/90">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </address>
      </div>
      <div className="border-t border-white/20">
        <div className="container-wrapper max-w-[1728px] py-4 text-sm text-white/80">
          © 2025 Op2. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}



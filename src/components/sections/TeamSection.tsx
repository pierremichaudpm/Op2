"use client";
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';

const team = [
  { name: 'John Doe', role: 'Project Manager', image: '/images/nos_realisations/image-10.png', description: 'Texte fictif pour test. Passionné par la réussite des projets, John sécurise coûts, délais et qualité avec une approche pragmatique et terrain. Il coordonne les équipes pluridisciplinaires et clarifie les priorités pour livrer sans compromis.' },
  { name: 'Jane Smith', role: 'Lead Planner', image: '/images/nos_realisations/image-11.png', description: 'Texte fictif pour test. Jane structure la planification, anticipe les risques majeurs et fluidifie les dépendances critiques. Elle conçoit des plannings fiables qui soutiennent réellement les décisions.' },
  { name: 'Alex Martin', role: 'Delivery Manager', image: '/images/nos_realisations/image-12.png', description: 'Texte fictif pour test. Alex pilote la livraison multi-équipes et accélère la prise de décision avec des rituels efficaces. Il garantit un rythme soutenu et une exécution maîtrisée.' },
  { name: 'Sophie Dupont', role: 'PMO Program', image: '/images/nos_realisations/image-13.png', description: 'Texte fictif pour test. Sophie met en place une gouvernance PMO claire et des indicateurs utiles pour décider vite. Elle aligne sponsors, métiers et delivery autour d’objectifs mesurables.' },
  { name: 'Marc Leroy', role: 'Change Manager', image: '/images/nos_realisations/image-14.png', description: 'Texte fictif pour test. Marc engage les parties prenantes et conduit le changement sans créer de friction. Il facilite l’adoption des nouveaux modes opératoires.' },
  { name: 'Nadia Ben', role: 'Risk Lead', image: '/images/nos_realisations/image-15.png', description: 'Texte fictif pour test. Nadia identifie tôt les risques critiques et pilote des plans de mitigation concrets. Elle sécurise les jalons et la marge de manœuvre.' }
];

export function TeamSection() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const photoPool = [
    '/images/experts/jack.png',
    '/images/experts/joe.png',
    '/images/experts/mike.png',
    '/images/experts/ted.png'
  ];
  const [randomPhotos, setRandomPhotos] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // Mélange le pool unique puis répète en alternant sans doublons adjacents
    const pool = [...photoPool];
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = pool[i];
      pool[i] = pool[j];
      pool[j] = tmp;
    }
    const offset = Math.floor(Math.random() * pool.length);
    const sequence: string[] = [];
    for (let i = 0; i < 6; i += 1) {
      const candidate = pool[(offset + i) % pool.length];
      // Sécurité: évite doublons adjacents si pool length == 1 (cas extrême)
      if (sequence.length > 0 && candidate === sequence[sequence.length - 1]) {
        const alt = pool[(offset + i + 1) % pool.length];
        sequence.push(alt);
      } else {
        sequence.push(candidate);
      }
    }
    setRandomPhotos(sequence);
  }, []);
  const STEP = 448 + 24; // largeur carte (448) + gap-6 (24)
  const scrollBy = (delta: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, team.length - 1));
    el.scrollTo({ left: clamped * STEP, behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  return (
    <section id="equipe" className="pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 bg-white">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="text-left font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold">
          {t('team.title')}
        </h2>

        {/* Contrôles carrousel (déplacés sous le module) */}

        {/* Carrousel horizontal */}
        <div
          ref={scrollRef}
          className="mt-6 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1"
          style={{ scrollbarWidth: 'none' }}
          onScroll={(e) => {
            const target = e.currentTarget;
            const idx = Math.round(target.scrollLeft / STEP);
            if (idx !== activeIndex) setActiveIndex(Math.max(0, Math.min(idx, team.length - 1)));
          }}
        >
          {team.map((m, idx) => (
            <article
              key={`${m.name}-${idx}`}
              className="group relative overflow-hidden rounded-[50px] border border-primary/20 shrink-0 snap-start"
              style={{ width: '448px', height: '735px', maxWidth: '100%' }}
            >
              <Image src={randomPhotos[idx] || photoPool[idx % photoPool.length]} alt={m.name} fill className="object-cover" />

              {/* Dégradé bas pour lisibilité des noms (atténué au hover) */}
              <div className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(36,55,104,0.65) 100%)' }} />

              {/* Infos principales (position bas suivant la maquette) */}
              <header className="absolute transition-opacity duration-200 group-hover:opacity-0" style={{ width: '59.82%', height: '11.43%', top: '78.10%', left: '7.14%' }}>
                <h3 className="[font-family:'Gotham-Bold',Helvetica] font-bold text-white text-5xl text-center tracking-[0] leading-[84px] whitespace-nowrap uppercase">
                  {m.name}
                </h3>
              </header>
              <div className="absolute transition-opacity duration-200 group-hover:opacity-0" style={{ width: '73.44%', height: '11.43%', top: '86.26%', left: '7.14%' }}>
                <p className={`[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[84px] whitespace-nowrap ${m.name === 'Jane Smith' ? 'text-left' : 'text-center'}`}>
                  <span className="[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[84px]">
                    {m.role?.charAt(0) || ''}
                  </span>
                  <span className="[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[84px]">
                    {m.role?.slice(1) || ''}
                  </span>
                </p>
              </div>

              {/* Overlay hover avec maquette fournie */}
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'transparent' }}>
                {/* Voile bleu léger et graduel sur la moitié basse (remonte jusqu'au nom) */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{ height: '80%', background: 'linear-gradient(180deg, rgba(36,55,104,0) 0%, rgba(36,55,104,0.72) 68%, rgba(36,55,104,0.90) 100%)' }}
                />
                {/* Nom */}
                <header className="absolute" style={{ width: '59.82%', height: '11.43%', top: '41.36%', left: '7.14%' }}>
                  <h3 className="[font-family:'Gotham-Bold',Helvetica] font-bold text-white text-5xl text-center tracking-[0] leading-[84px] whitespace-nowrap uppercase">
                    {m.name}
                  </h3>
                </header>

                {/* Titre */}
                <div className="absolute" style={{ width: '73.44%', height: '11.43%', top: '49.52%', left: '7.14%' }}>
                  <p className={`[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[84px] whitespace-nowrap ${m.name === 'Jane Smith' ? 'text-left' : 'text-center'}`}>
                    <span className="[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[84px]">
                      {m.role?.charAt(0) || ''}
                    </span>
                    <span className="[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[84px]">
                      {m.role?.slice(1) || ''}
                    </span>
                  </p>
                </div>

                {/* Description */}
                <section className="absolute" style={{ top: '440px', left: '39px', width: '370px' }}>
                  <p className="[font-family:'Gotham-Book',Helvetica] font-normal text-white text-[22px] tracking-[0] leading-[30px]">
                    {m.description}
                  </p>
                </section>
              </div>
            </article>
          ))}
        </div>

        {/* Contrôles et pagination sous le carrousel */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition"
            aria-label={t('team.aria.prev')}
            onClick={() => scrollBy(-STEP)}
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {team.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                aria-label={`${t('team.aria.goto')} ${i + 1}`}
                aria-current={i === activeIndex}
                onClick={() => scrollToIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${i === activeIndex ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition"
            aria-label={t('team.aria.next')}
            onClick={() => scrollBy(STEP)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}



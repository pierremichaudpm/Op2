"use client";
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';

const teamData = [
  {
    name: 'Sébastien Klein',
    role_fr: 'Expert en Redressement de Projets',
    role_en: 'Project Turnaround Expert',
    description_fr: "Depuis 10 ans, il pilote des projets complexes en Amérique, Asie et Europe. Spécialisé dans le redressement de situations critiques, son approche pragmatique débloque les enjeux stratégiques.",
    description_en: "For 10 years, he has led complex projects in America, Asia and Europe. Specialized in turnaround of critical situations, his pragmatic approach unlocks strategic issues with impact.",
    image: '/images/experts-optimized/Sébastien.jpg'
  },
  {
    name: 'Cindy Ehounou',
    role_fr: 'Experte en Gestion de Projet',
    role_en: 'Project Management Expert',
    description_fr: "Issue du génie civil, elle se distingue par sa rigueur et sa maîtrise des outils de planification. Son approche proactive optimise la performance. Animée par la qualité et l'excellence.",
    description_en: "From civil engineering, she stands out for her rigor and mastery of planning tools. Her proactive approach optimizes performance. Driven by quality and excellence.",
    image: '/images/experts-optimized/Cindy.jpg'
  },
  {
    name: 'Abdesalam Paes',
    role_fr: 'Expert en Infrastructures et Gouvernance',
    role_en: 'Infrastructure and Governance Expert',
    description_fr: "13 ans d'expérience en infrastructures. Il pilote des projets complexes avec vision et clarté. Expert en gouvernance et leadership, il génère cohérence et résultats durables par son anticipation.",
    description_en: "13 years of infrastructure experience. He leads complex projects with vision and clarity. Expert in governance and leadership, he generates coherence and lasting results through foresight.",
    image: '/images/experts-optimized/Abdesalam.jpg'
  },
  {
    name: 'Daniel Lone',
    role_fr: 'Consultant Senior en Transformation',
    role_en: 'Senior Transformation Consultant',
    description_fr: "10 ans d'expérience en transformations organisationnelles. Expert en gestion de programmes, risques et gouvernance, il clarifie les enjeux complexes pour soutenir la décision. MBA HEC Montréal distinction.",
    description_en: "10 years of experience in organizational transformations. Expert in program management, risk and governance, he clarifies complex issues to support decision-making. MBA HEC Montreal distinction.",
    image: '/images/experts-optimized/Daniel.jpg'
  },
  {
    name: 'Roxane Toumi',
    role_fr: 'Consultante Senior en Gestion de Projets',
    role_en: 'Senior Project Management Consultant',
    description_fr: "Ingénieure passionnée par les projets industriels complexes. PMO et consultante senior, elle excelle en planification, coordination multi-sites et conduite du changement. Rigoureuse et agile.",
    description_en: "Engineer passionate about complex industrial projects. PMO and senior consultant, she excels at planning, multi-site coordination and change management. Rigorous and agile.",
    image: '/images/experts-optimized/Roxane.jpg'
  },
  {
    name: 'Sandra Medina',
    role_fr: 'Consultante Senior en Planification',
    role_en: 'Senior Planning Consultant',
    description_fr: "15 ans d'expérience en projets EPC et programmes industriels sur trois continents. Spécialiste en planification stratégique, elle accompagne maîtres d'ouvrage et entrepreneurs avec expertise.",
    description_en: "15 years of experience in EPC projects and industrial programs on three continents. Specialist in strategic planning, she supports owners and contractors with proven expertise.",
    image: '/images/experts-optimized/Sandra.jpg'
  },
  {
    name: 'Benjamin Bouvier',
    role_fr: 'Consultant en Projets Industriels',
    role_en: 'Industrial Projects Consultant',
    description_fr: "7 ans d'expérience en aéronautique, spatial, BTP et ferroviaire au Maroc, Luxembourg, France et Canada. Expert en planification et chefferie de projet, il apporte une approche structurée.",
    description_en: "7 years of experience in aerospace, space, construction and rail in Morocco, Luxembourg, France and Canada. Expert in planning and project management, he brings a structured approach.",
    image: '/images/experts-optimized/Benjamin.jpg'
  },
  {
    name: 'Ahmed Houf',
    role_fr: 'Consultant Confirmé en Gouvernance',
    role_en: 'Senior Governance Consultant',
    description_fr: "12 ans d'expérience sur des projets industriels et d'infrastructures. À l'intersection de la gouvernance, du PMO et de la performance, il rend visibles les enjeux pour sécuriser délais et budgets.",
    description_en: "12 years of experience in industrial and infrastructure projects. At the intersection of governance, PMO and performance, he makes issues visible to secure timelines and budgets.",
    image: '/images/experts-optimized/Ahmed.jpg'
  },
  {
    name: 'Noureddine Attar',
    role_fr: 'Consultant en Gestion de Projets Complexes',
    role_en: 'Complex Project Management Consultant',
    description_fr: "Expert en planification et pilotage par la donnée. Il maîtrise les technologies BI et l'IA pour optimiser les projets complexes. Son approche rigoureuse éclaire la décision et génère des résultats.",
    description_en: "Expert in planning and data-driven management. He masters BI technologies and AI to optimize complex projects. His rigorous approach enlightens decision-making and generates results.",
    image: '/images/experts-optimized/Noureddine.jpg'
  },
  {
    name: 'Chahinez Chellali',
    role_fr: 'Coordonnatrice Administrative et RH',
    role_en: 'Administrative and HR Coordinator',
    description_fr: "Experte en RH, recrutement et communication, elle soutient les consultants au quotidien. Elle facilite leur intégration et veille à un environnement structuré et humain propice au bien-être.",
    description_en: "Expert in HR, recruitment and communication, she supports consultants daily. She facilitates their integration and ensures a structured and human environment conducive to well-being.",
    image: '/images/experts-optimized/Chahinez.jpg'
  },
  {
    name: 'Alcides Santopietro',
    role_fr: 'Vice-Président Centre d\'Excellence',
    role_en: 'Vice President Center of Excellence',
    description_fr: "25 ans d'expérience en transformations et PMO à l'international. Il dirige le Centre d'Excellence Op2 et forme des leaders sur l'IA en gestion de portefeuilles pour une performance accrue.",
    description_en: "25 years of experience in transformations and PMO internationally. He leads Op2's Center of Excellence and trains leaders on AI in portfolio management for enhanced performance.",
    image: '/images/experts-optimized/Alcides.jpg'
  },
  {
    name: 'Thierry Bosom',
    role_fr: 'Directeur Général',
    role_en: 'Chief Executive Officer',
    description_fr: "30 ans d'expérience au Canada et à l'international. Expert en stratégie, développement d'affaires et pilotage d'environnements complexes. À la tête d'Op2 Amérique du Nord, il assure croissance et excellence.",
    description_en: "30 years of experience in Canada and internationally. Expert in strategy, business development and management of complex environments. Leading Op2 North America, he ensures growth and excellence.",
    image: '/images/experts-optimized/Thierry.jpg'
  }
];

export function TeamSection() {
  const { t, locale } = useI18n();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Préparer les données de l'équipe avec la bonne langue
  const team = teamData.map(member => ({
    name: member.name,
    role: locale === 'fr' ? member.role_fr : member.role_en,
    description: locale === 'fr' ? member.description_fr : member.description_en,
    image: member.image
  }));
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
              <Image src={m.image} alt={m.name} fill className="object-cover" />

              {/* Dégradé bas pour lisibilité des noms (atténué au hover) */}
              <div className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(36,55,104,0.85) 100%)' }} />

              {/* Infos principales (position bas suivant la maquette) */}
              <header className="absolute transition-opacity duration-200 group-hover:opacity-0" style={{ width: '90%', top: '73%', left: '7.5%' }}>
                <h3 className="[font-family:'Gotham-Bold',Helvetica] font-bold text-white text-[30px] text-left tracking-[0] leading-[38px] uppercase pl-4">
                  {m.name}
                </h3>
              </header>
              <div className="absolute transition-opacity duration-200 group-hover:opacity-0" style={{ width: '85%', top: '82%', left: '7.5%' }}>
                <p className="[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[28px] tracking-[0] leading-[36px] text-left pl-4">
                  {m.role}
                </p>
              </div>

              {/* Overlay hover avec maquette fournie */}
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'transparent' }}>
                {/* Voile bleu léger et graduel sur la moitié basse (remonte jusqu'au nom) */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{ height: '90%', background: 'linear-gradient(180deg, rgba(36,55,104,0) 0%, rgba(36,55,104,0.85) 65%, rgba(36,55,104,0.95) 100%)' }}
                />
                {/* Nom */}
                <header className="absolute" style={{ width: '90%', top: 'calc(36% + 80px)', left: '7.5%' }}>
                  <h3 className="[font-family:'Gotham-Bold',Helvetica] font-bold text-white text-[30px] text-left tracking-[0] leading-[38px] uppercase pl-4">
                    {m.name}
                  </h3>
                </header>

                {/* Titre */}
                <div className="absolute" style={{ width: '85%', top: 'calc(46% + 80px)', left: '7.5%' }}>
                  <p className="[font-family:'Gotham-Regular',Helvetica] font-normal text-white text-[28px] tracking-[0] leading-[36px] text-left pl-4">
                    {m.role}
                  </p>
                </div>

                {/* Description */}
                <section className="absolute" style={{ top: 'calc(56% + 90px)', left: '7.5%', width: '85%' }}>
                  <p className="[font-family:'Gotham-Book',Helvetica] font-normal text-white text-[20px] tracking-[0] leading-[28px] pl-4">
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



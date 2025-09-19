
const projects = [
  { w: 642, h: 286, title: 'Éolien' },
  { w: 512, h: 415, title: 'Aéronautique' },
  { w: 768, h: 449, title: 'Ferroviaire' },
  { w: 224, h: 416, title: 'Hydrotechnique' },
  { w: 544, h: 352, title: 'Maritime' },
  { w: 695, h: 450, title: 'Pharma' }
];

export function Portfolio() {
  return (
    <section id="realisations" className="py-12 md:py-20">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="text-center font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold">
          Nos Réalisations
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <article key={i} className="group relative overflow-hidden rounded-[28px] border border-primary/20" style={{ width: `${p.w}px`, height: `${p.h}px`, maxWidth: '100%' }}>
              <div className="absolute inset-0 bg-gray-200" />
              <div className={`absolute ${i % 2 === 0 ? 'bg-[#F36911]/80' : 'bg-[#243768]/80'}`} style={{ width: i % 2 === 0 ? '128px' : '224px', height: '64px', left: i % 2 === 0 ? '50%' : '60%', top: i % 2 === 0 ? '50%' : '45%' }} />
              <h3 className="absolute bottom-3 left-3 rounded bg-white/80 px-3 py-1 text-sm font-medium text-primary shadow">
                {p.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



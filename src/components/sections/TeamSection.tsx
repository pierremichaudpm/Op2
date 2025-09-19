const team = [
  { name: 'John Doe', role: 'Project Manager' },
  { name: 'Jane Smith', role: 'Lead Planner' },
  { name: 'Alex Martin', role: 'Delivery Manager' },
  { name: 'Sophie Dupont', role: 'PMO Program' }
];

export function TeamSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container-wrapper max-w-[1728px]">
        <h2 className="text-center font-display text-primary uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold">
          Nos Experts
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {team.map((m) => (
            <article key={m.name} className="overflow-hidden rounded-[50px] border border-primary/20 bg-gray-200" style={{ width: '448px', height: '735px', maxWidth: '100%' }}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gray-200" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(36,55,104,0.49) 100%)' }} />
                <div className="absolute left-8 right-8" style={{ bottom: '101px' }}>
                  <h3 className="text-white uppercase" style={{ fontSize: '48px', fontWeight: 700, lineHeight: '84px' }}>{m.name}</h3>
                </div>
                <div className="absolute left-8 right-8" style={{ bottom: '41px' }}>
                  <p className="text-white" style={{ fontSize: '40px', fontWeight: 400, lineHeight: '84px' }}>{m.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



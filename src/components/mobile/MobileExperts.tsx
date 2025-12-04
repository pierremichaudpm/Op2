"use client";
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

export function MobileExperts() {
  const { locale } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Liste des 12 experts - Nouvel ordre avec vraies photos
  const experts: Expert[] = [
    {
      id: 1,
      name: 'Sébastien Klein',
      role: locale === 'en' ? 'Project Turnaround Expert' : 'Expert en Redressement de Projets',
      image: '/images/experts-optimized/Sébastien.jpg',
      description: locale === 'en'
        ? "For 10 years, he has led complex projects in America, Asia and Europe. Specialized in turnaround of critical situations, his pragmatic approach unlocks strategic issues with impact."
        : "Depuis 10 ans, il pilote des projets complexes en Amérique, Asie et Europe. Spécialisé dans le redressement de situations critiques, son approche pragmatique débloque les enjeux stratégiques."
    },
    {
      id: 2,
      name: 'Cindy Ehounou',
      role: locale === 'en' ? 'Project Management Expert' : 'Experte en Gestion de Projet',
      image: '/images/experts-optimized/Cindy.jpg',
      description: locale === 'en'
        ? "From civil engineering, she stands out for her rigor and mastery of planning tools. Her proactive approach optimizes performance. Driven by quality and excellence."
        : "Issue du génie civil, elle se distingue par sa rigueur et sa maîtrise des outils de planification. Son approche proactive optimise la performance. Animée par la qualité et l'excellence."
    },
    {
      id: 3,
      name: 'Abdesalam Paes',
      role: locale === 'en' ? 'Infrastructure and Governance Expert' : 'Expert en Infrastructures et Gouvernance',
      image: '/images/experts-optimized/Abdesalam.jpg',
      description: locale === 'en'
        ? "13 years of infrastructure experience. He leads complex projects with vision and clarity. Expert in governance and leadership, he generates coherence and lasting results through foresight."
        : "13 ans d'expérience en infrastructures. Il pilote des projets complexes avec vision et clarté. Expert en gouvernance et leadership, il génère cohérence et résultats durables par son anticipation."
    },
    {
      id: 4,
      name: 'Daniel Lone',
      role: locale === 'en' ? 'Senior Transformation Consultant' : 'Consultant Senior en Transformation',
      image: '/images/experts-optimized/Daniel.jpg',
      description: locale === 'en'
        ? "10 years of experience in organizational transformations. Expert in program management, risk and governance, he clarifies complex issues to support decision-making. MBA HEC Montreal distinction."
        : "10 ans d'expérience en transformations organisationnelles. Expert en gestion de programmes, risques et gouvernance, il clarifie les enjeux complexes pour soutenir la décision. MBA HEC Montréal distinction."
    },
    {
      id: 5,
      name: 'Roxane Toumi',
      role: locale === 'en' ? 'Senior Project Management Consultant' : 'Consultante Senior en Gestion de Projets',
      image: '/images/experts-optimized/Roxane.jpg',
      description: locale === 'en'
        ? "Engineer passionate about complex industrial projects. PMO and senior consultant, she excels at planning, multi-site coordination and change management. Rigorous and agile."
        : "Ingénieure passionnée par les projets industriels complexes. PMO et consultante senior, elle excelle en planification, coordination multi-sites et conduite du changement. Rigoureuse et agile."
    },
    {
      id: 6,
      name: 'Sandra Medina',
      role: locale === 'en' ? 'Senior Planning Consultant' : 'Consultante Senior en Planification',
      image: '/images/experts-optimized/Sandra.jpg',
      description: locale === 'en'
        ? "15 years of experience in EPC projects and industrial programs on three continents. Specialist in strategic planning, she supports owners and contractors with proven expertise."
        : "15 ans d'expérience en projets EPC et programmes industriels sur trois continents. Spécialiste en planification stratégique, elle accompagne maîtres d'ouvrage et entrepreneurs avec expertise."
    },
    {
      id: 7,
      name: 'Benjamin Bouvier',
      role: locale === 'en' ? 'Industrial Projects Consultant' : 'Consultant en Projets Industriels',
      image: '/images/experts-optimized/Benjamin.jpg',
      description: locale === 'en'
        ? "7 years of experience in aerospace, space, construction and rail in Morocco, Luxembourg, France and Canada. Expert in planning and project management, he brings a structured approach."
        : "7 ans d'expérience en aéronautique, spatial, BTP et ferroviaire au Maroc, Luxembourg, France et Canada. Expert en planification et chefferie de projet, il apporte une approche structurée."
    },
    {
      id: 8,
      name: 'Ahmed Houf',
      role: locale === 'en' ? 'Senior Governance Consultant' : 'Consultant Confirmé en Gouvernance',
      image: '/images/experts-optimized/Ahmed.jpg',
      description: locale === 'en'
        ? "12 years of experience in industrial and infrastructure projects. At the intersection of governance, PMO and performance, he makes issues visible to secure timelines and budgets."
        : "12 ans d'expérience sur des projets industriels et d'infrastructures. À l'intersection de la gouvernance, du PMO et de la performance, il rend visibles les enjeux pour sécuriser délais et budgets."
    },
    {
      id: 9,
      name: 'Noureddine Attar',
      role: locale === 'en' ? 'Complex Project Management Consultant' : 'Consultant en Gestion de Projets Complexes',
      image: '/images/experts-optimized/Noureddine.jpg',
      description: locale === 'en'
        ? "Expert in planning and data-driven management. He masters BI technologies and AI to optimize complex projects. His rigorous approach enlightens decision-making and generates results."
        : "Expert en planification et pilotage par la donnée. Il maîtrise les technologies BI et l'IA pour optimiser les projets complexes. Son approche rigoureuse éclaire la décision et génère des résultats."
    },
    {
      id: 10,
      name: 'Chahinez Chellali',
      role: locale === 'en' ? 'Administrative and HR Coordinator' : 'Coordonnatrice Administrative et RH',
      image: '/images/experts-optimized/Chahinez.jpg',
      description: locale === 'en'
        ? "Expert in HR, recruitment and communication, she supports consultants daily. She facilitates their integration and ensures a structured and human environment conducive to well-being."
        : "Experte en RH, recrutement et communication, elle soutient les consultants au quotidien. Elle facilite leur intégration et veille à un environnement structuré et humain propice au bien-être."
    },
    {
      id: 11,
      name: 'Alcides Santopietro',
      role: locale === 'en' ? 'Vice President Center of Excellence' : "Vice-Président Centre d'Excellence",
      image: '/images/experts-optimized/Alcides.jpg',
      description: locale === 'en'
        ? "25 years of experience in transformations and PMO internationally. He leads Op2's Center of Excellence and trains leaders on AI in portfolio management for enhanced performance."
        : "25 ans d'expérience en transformations et PMO à l'international. Il dirige le Centre d'Excellence Op2 et forme des leaders sur l'IA en gestion de portefeuilles pour une performance accrue."
    },
    {
      id: 12,
      name: 'Thierry Bosom',
      role: locale === 'en' ? 'Chief Executive Officer' : 'Directeur Général',
      image: '/images/experts-optimized/Thierry.jpg',
      description: locale === 'en'
        ? "30 years of experience in Canada and internationally. Expert in strategy, business development and management of complex environments. Leading Op2 North America, he ensures growth and excellence."
        : "30 ans d'expérience au Canada et à l'international. Expert en stratégie, développement d'affaires et pilotage d'environnements complexes. À la tête d'Op2 Amérique du Nord, il assure croissance et excellence."
    }
  ];

  // Nombre d'experts visibles (3 sur mobile)
  const expertsPerView = 3;
  // Permettre un scroll supplémentaire pour voir le dernier expert complètement
  const maxIndex = Math.max(0, experts.length - expertsPerView + 1);

  // Gestion du swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  // Navigation avec les boutons
  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  // Gérer le clic externe pour fermer la modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedExpert !== null) {
        const target = event.target as HTMLElement;
        // Si on clique en dehors d'une carte d'expert
        if (!target.closest('[data-expert-card]')) {
          setSelectedExpert(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedExpert]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(243, 105, 17, 0.6);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(243, 105, 17, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(243, 105, 17, 0.6) rgba(255, 255, 255, 0.15);
        }
      `}} />
      
      <section id="experts" style={{
        width: '100%',
        margin: '20px 0',
        padding: '0 4.5%',
        position: 'relative'
      }}>
      {/* Titre */}
      <h2 style={{
        color: '#243768',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '19px',
        fontWeight: 700,
        textTransform: 'uppercase',
        textAlign: 'left',
        marginBottom: '30px'
      }}>
        {locale === 'en' ? 'Our Experts' : 'Nos Experts'}
      </h2>

      {/* Container du carrousel */}
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          marginBottom: '30px'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Liste des experts avec translation */}
        <div style={{
          display: 'flex',
          gap: '18px',
          transform: `translateX(-${currentIndex * (136 + 18)}px)`,
          transition: 'transform 0.3s ease-out',
          paddingRight: '100px'
        }}>
          {experts.map((expert) => {
            const isSelected = selectedExpert === expert.id;
            
            return (
              <div 
                key={expert.id}
                onClick={() => setSelectedExpert(isSelected ? null : expert.id)}
                style={{
                  minWidth: '136px',
                  width: '136px',
                  height: '223px',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundImage: isSelected 
                    ? `linear-gradient(180deg, rgba(36,55,104,0.85) 0%, rgba(36,55,104,0.95) 100%), url(${expert.image})`
                    : `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(36,55,104,0.85) 100%), url(${expert.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* État normal */}
                {!isSelected && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '0 6px 22px',
                    color: 'white',
                    textAlign: 'left'
                  }}>
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                      marginBottom: '4px'
                    }}>
                      {expert.name}
                    </div>
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'lowercase',
                      lineHeight: '1.3'
                    }}>
                      {expert.role}
                    </div>
                  </div>
                )}
                
                {/* État sélectionné - Tout scrollable */}
                {isSelected && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: 0,
                      right: 0,
                      bottom: '20px',
                      padding: '0 8px 0 12px',
                      overflowY: 'auto'
                    }}
                    className="custom-scrollbar"
                  >
                    {/* Contenu scrollable : Nom + Titre + Description */}
                    <div style={{
                      paddingRight: '4px'
                    }}>
                      {/* Nom en orange - aligné à gauche */}
                      <div style={{
                        fontFamily: 'Gotham, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        lineHeight: '1.2',
                        textAlign: 'left',
                        color: '#F36911',
                        marginBottom: '5px'
                      }}>
                        {expert.name}
                      </div>
                      
                      {/* Rôle en orange - aligné à gauche */}
                      <div style={{
                        fontFamily: 'Gotham, sans-serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'lowercase',
                        lineHeight: '1.3',
                        textAlign: 'left',
                        color: '#F36911',
                        marginBottom: '12px'
                      }}>
                        {expert.role}
                      </div>
                      
                      {/* Description */}
                      <div style={{
                        fontFamily: 'Gotham, sans-serif',
                        fontSize: '11px',
                        fontWeight: 400,
                        lineHeight: '1.4',
                        textAlign: 'left',
                        color: '#FFFFFF',
                        opacity: 0.95
                      }}>
                        {expert.description}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Boutons de navigation - Seulement si plus de 3 experts */}
      {experts.length > expertsPerView && (
        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Bouton précédent */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            style={{
              width: '27px',
              height: '27px',
              border: '1px solid #DE5600',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === 0 ? 0.3 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
          >
            <svg 
              width="10" 
              height="10" 
              viewBox="0 0 10 10" 
              fill="none"
              style={{ transform: 'rotate(180deg)' }}
            >
              <path 
                d="M3 2L6 5L3 8" 
                stroke="#DE5600" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Indicateurs de pagination */}
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: i === currentIndex ? '#DE5600' : '#D3D3D3',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={goToNext}
            disabled={currentIndex === maxIndex}
            style={{
              width: '27px',
              height: '27px',
              border: '1px solid #DE5600',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              cursor: currentIndex === maxIndex ? 'not-allowed' : 'pointer',
              opacity: currentIndex === maxIndex ? 0.3 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
          >
            <svg 
              width="10" 
              height="10" 
              viewBox="0 0 10 10" 
              fill="none"
            >
              <path 
                d="M3 2L6 5L3 8" 
                stroke="#DE5600" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      </section>
    </>
  );
}
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

  // Liste des experts
  const experts: Expert[] = [
    { 
      id: 1, 
      name: 'Jack Smith', 
      role: 'Project Manager', 
      image: '/images/experts/jack.png',
      description: locale === 'en' 
        ? 'Passionate about project success, Jack secures costs, deadlines and quality with a pragmatic, hands-on approach. He coordinates multidisciplinary teams and clarifies priorities to deliver without compromise.'
        : 'Passionné par la réussite des projets, Jack sécurise coûts, délais et qualité avec une approche pragmatique et terrain. Il coordonne les équipes pluridisciplinaires et clarifie les priorités pour livrer sans compromis.'
    },
    { 
      id: 2, 
      name: 'Joe Martin', 
      role: 'Technical Lead', 
      image: '/images/experts/joe.png',
      description: locale === 'en'
        ? 'Technical expert with 15 years of experience, Joe guides teams through critical architectural choices. His strategic vision and technical leadership ensure robust and scalable solutions.'
        : 'Expert technique avec 15 ans d\'expérience, Joe guide les équipes dans les choix architecturaux critiques. Sa vision stratégique et son leadership technique garantissent des solutions robustes et évolutives.'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      role: 'Business Analyst', 
      image: '/images/experts/mike.png',
      description: locale === 'en'
        ? 'Mike transforms complex needs into concrete solutions. His business analysis expertise and ability to bridge technical and business worlds are major assets for your projects.'
        : 'Mike transforme les besoins complexes en solutions concrètes. Son expertise en analyse d\'affaires et sa capacité à faire le pont entre technique et métier sont des atouts majeurs pour vos projets.'
    },
    { 
      id: 4, 
      name: 'Ted Wilson', 
      role: 'Scrum Master', 
      image: '/images/experts/ted.png',
      description: locale === 'en'
        ? 'Ted optimizes agile team performance. His mastery of Scrum and SAFe methodologies accelerates delivery while maintaining exceptional quality.'
        : 'Ted optimise la performance des équipes agiles. Sa maîtrise des méthodologies Scrum et SAFe permet d\'accélérer la livraison tout en maintenant une qualité exceptionnelle.'
    },
    { 
      id: 5, 
      name: 'Sarah Lee', 
      role: 'Product Owner', 
      image: '/images/experts/jack.png',
      description: locale === 'en'
        ? 'Sarah maximizes product value by aligning business vision and execution. Her data-driven approach and proximity to users ensure products that make a difference.'
        : 'Sarah maximise la valeur produit en alignant vision business et exécution. Son approche data-driven et sa proximité avec les utilisateurs garantissent des produits qui font la différence.'
    },
    { 
      id: 6, 
      name: 'Emma Davis', 
      role: 'UX Designer', 
      image: '/images/experts/joe.png',
      description: locale === 'en'
        ? 'Emma creates exceptional user experiences. Her user-centered methodology and design thinking expertise transform constraints into innovation opportunities.'
        : 'Emma crée des expériences utilisateur exceptionnelles. Sa méthodologie centrée utilisateur et son expertise en design thinking transforment les contraintes en opportunités d\'innovation.'
    }
  ];

  // Nombre d'experts visibles (3 sur mobile)
  const expertsPerView = 3;
  const maxIndex = Math.max(0, experts.length - expertsPerView);

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
          transition: 'transform 0.3s ease-out'
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
                    : `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(36,55,104,1) 100%), url(${expert.image})`,
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
                    padding: '0 6px 26px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      lineHeight: '1.1',
                      marginBottom: '5px'
                    }}>
                      {expert.name}
                    </div>
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'lowercase',
                      lineHeight: '1.1'
                    }}>
                      {expert.role}
                    </div>
                  </div>
                )}
                
                {/* État sélectionné - Variant2 */}
                {isSelected && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: '13px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px'
                    }}>
                    {/* Nom en orange */}
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      lineHeight: '1.1',
                      textAlign: 'center',
                      color: '#F36911'
                    }}>
                      {expert.name}
                    </div>
                    
                    {/* Rôle en orange */}
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'lowercase',
                      lineHeight: '1.1',
                      textAlign: 'center',
                      color: '#F36911',
                      marginBottom: '15px'
                    }}>
                      {expert.role}
                    </div>
                    
                    {/* Description */}
                    <div style={{
                      fontFamily: 'Gotham, sans-serif',
                      fontSize: '11px',
                      fontWeight: 400,
                      lineHeight: '1.3',
                      textAlign: 'left',
                      color: '#FFFFFF',
                      opacity: 0.9,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 7,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis'
                    }}>
                      {expert.description}
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
  );
}
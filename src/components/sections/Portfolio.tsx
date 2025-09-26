"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, ArrowRight, Wind, Zap, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Configuration des projets - tous affichent le même contenu pour l'instant
const projectsData = [
  {
    id: 1,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-10.png',
  },
  {
    id: 2,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-11.png',
  },
  {
    id: 3,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-12.png',
  },
  {
    id: 4,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-13.png',
  },
  {
    id: 5,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-14.png',
  },
  {
    id: 6,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-15.png',
  },
  {
    id: 7,
    title: 'Des projets au cœur de la transition énergétique',
    image: '/images/nos_realisations/image-16.png',
  }
];

export function Portfolio() {
  const { t } = useI18n();
  const [activeVariant, setActiveVariant] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // Mapping des indices aux projets
  const indexToProject = [3, 5, 0, 2, 4, 6, 1]; // Correspondance entre l'index de l'image cliquée et l'ID du projet

  // Fermer avec la touche Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Gestion de la fermeture avec animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenIdx(null);
      setIsClosing(false);
    }, 300);
  };

  // Obtenir le projet actuel
  const getCurrentProject = () => {
    if (openIdx === null) return null;
    const projectId = indexToProject[openIdx];
    return projectsData[projectId];
  };

  return (
    <section id="realisations" className="pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 bg-white overflow-hidden">
      {/* Overlay fullscreen pour fermer la modale au clic extérieur */}
      {openIdx !== null && (
        <div 
          className="fixed inset-0 z-[45]" 
          onClick={handleClose}
          style={{ cursor: 'pointer' }}
        />
      )}
      
      <div className="container-wrapper max-w-[1728px] px-4 md:px-8 lg:px-0">
        <div className="relative w-full lg:w-[1692px] mx-auto">
            {/* Titre de la section aligné à gauche */}
          <h2 className="text-left font-display text-[#243768] uppercase text-[48px] leading-[84px] font-bold mb-8" style={{ letterSpacing: '0.02em' }}>
            {t('portfolio.title')}
          </h2>

            {/* Grille d'images style Figma */}
          <div className="relative group" style={{ height: '767px', left: '-15px', width: 'calc(100% + 30px)' }}>
            {/* Image-13 portrait étroite à droite (image-5 dans Figma) */}
            <div 
            className="absolute overflow-hidden border-t border-r border-b border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
            style={{
              left: 'calc(61.52% + 26.56% - 1px)',
              top: '0',
              width: '11.62%',
              height: '416px',
              zIndex: openIdx !== null ? 1 : 2,
              pointerEvents: openIdx !== null ? 'none' : 'auto' }}
            onClick={() => setOpenIdx(0)}>
            <Image
              src="/images/nos_realisations/image-13.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

              {/* Image-15 centrale (img dans Figma) */}
            <div 
            className="absolute overflow-hidden border border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
            style={{
              left: '39.52%',
              top: '347px',
              width: '33.51%',
              height: '390px',
              zIndex: openIdx !== null ? 1 : 2,
              pointerEvents: openIdx !== null ? 'none' : 'auto' }}
          onClick={() => setOpenIdx(1)}>
            <Image
              src="/images/nos_realisations/image-15.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-10 en haut à gauche (image-2 dans Figma) */}
            <div 
              className="absolute overflow-hidden border-t border-l border-r border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
              style={{
                left: '0',
                top: '0',
                width: '33.30%',
                height: '286px',
                zIndex: openIdx !== null ? 1 : 2,
                pointerEvents: openIdx !== null ? 'none' : 'auto' }}
            onClick={() => setOpenIdx(2)}>
            <Image
              src="/images/nos_realisations/image-10.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-12 droite centre (image-3 dans Figma) */}
            <div 
            className="absolute overflow-hidden border-l border-t border-b border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
            style={{
              left: '61.52%',
              top: '0',
              width: '26.56%',
              height: '415px',
              zIndex: openIdx !== null ? 1 : 2,
              pointerEvents: openIdx !== null ? 'none' : 'auto' }}
            onClick={() => setOpenIdx(3)}>
            <Image
              src="/images/nos_realisations/image-12.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-14 en bas à gauche (image-4 dans Figma) */}
          <div 
            className="absolute overflow-hidden border-l border-r border-b border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
            style={{
              left: '0',
              top: '286px',
              width: '39.83%',
              height: '451px',
              zIndex: openIdx !== null ? 1 : 2,
              pointerEvents: openIdx !== null ? 'none' : 'auto' }}
          onClick={() => setOpenIdx(4)}>
            <Image
              src="/images/nos_realisations/image-14.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-16 en bas à droite (image dans Figma) */}
          <div 
            className="absolute overflow-hidden border-l border-r border-b border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
            style={{
              right: '6px',
              top: '409px',
              width: 'calc(26.97% - 1px)',
              height: '328px',
              zIndex: openIdx !== null ? 1 : 2,
              pointerEvents: openIdx !== null ? 'none' : 'auto' }}
          onClick={() => setOpenIdx(5)}>
            <Image
              src="/images/nos_realisations/image-16.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

              {/* Image-11 centre gauche (image-6 dans Figma) */}
            <div 
              className="absolute overflow-hidden border-t border-r border-b border-[#243768]/20 transition-transform duration-150 hover:scale-[1.015] cursor-pointer"
              style={{
                left: 'calc(33.30% - 1px)',
                top: '0',
                width: 'calc(28.22% + 1px)',
                height: '352px',
                zIndex: openIdx !== null ? 1 : 2,
                pointerEvents: openIdx !== null ? 'none' : 'auto' }}
            onClick={() => setOpenIdx(6)}>
            <Image
              src="/images/nos_realisations/image-11.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>
          {/* Modal qui couvre exactement la grille - Style Figma exact */}
          {openIdx !== null && (() => {
            const project = getCurrentProject();
            if (!project) return null;
            
            return (
              <div 
                className={`absolute z-[46] ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'} realisations`}
                style={{ 
                  top: 0,
                  left: 0,
                  right: '4px', // Compense les 4 pixels de trop à droite
                  bottom: '31px', // Compense tous les pixels de trop (27 + 4 = 31)
                  background: 'rgba(36, 55, 104, 0.96)' // Moins transparent, plus opaque
                }}
                onClick={handleClose} // Fermer au clic sur le fond bleu
              >
                {/* Image avec arrondis sans cadre */}
                <div 
                  onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic sur l'image
                  style={{
                    position: 'absolute',
                    left: '60px',
                    top: '70px',
                    width: '45%',
                    height: '580px',
                    overflow: 'hidden',
                    borderRadius: '24px', // Arrondis directement sur l'image
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}>
                    <Image 
                      className="untitled"
                      src={project.image} 
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                </div>
                
                {/* Conteneur du texte à droite */}
                <div 
                  onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic sur le texte
                  style={{
                    position: 'absolute',
                    right: '60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42%',
                    color: 'white'
                  }}>
                  <p className="des-projets-au-c-ur" style={{
                    fontSize: '44px',
                    fontWeight: 'bold',
                    lineHeight: '1.15',
                    marginBottom: '35px',
                    letterSpacing: '0.02em'
                  }}>
                    {t('portfolio.modal.headline_l1')}
                    <br />
                    {t('portfolio.modal.headline_l2')}
                  </p>
                  
                  <p className="notre-client-est-un" style={{
                    fontSize: '17px',
                    lineHeight: '1.65',
                    opacity: 0.95
                  }}>
                    {t('portfolio.modal.body_1')}
                    <br />
                    <br />
                    {t('portfolio.modal.body_2')}
                    <br />
                    <br />
                    {t('portfolio.modal.body_3')}
                  </p>
                </div>
                
                {/* Bouton fermer X - Style exact Figma */}
                <button
                  type="button"
                  aria-label="Fermer"
                  onClick={handleClose}
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: '40px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#F36911',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: 'white',
                    transition: 'transform 0.2s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ×
                </button>
                
              </div>
            );
          })()}

          {/* Rectangle orange overlay */}
          <div 
            className="absolute bg-[#F36911] opacity-100"
            style={{
              left: '33.20%',
              top: 'calc(39.08% - 14px)',  // Remonté de 14px total (10 + 4)
              width: '6.64%',
              height: '8.68%',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />

          {/* Rectangle bleu overlay */}
          <div 
            className="absolute bg-[#243768] opacity-100"
            style={{
              left: 'calc(61.41% + 2px)',  // Déplacé de 2px vers la droite
              top: 'calc(47.76% - 19px)',  // Déplacé de 2px vers le bas (21px - 2px = 19px)
              width: '11.62%',
              height: '8.68%',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />
          </div>
        </div>
      </div>
    </section>
  );
}
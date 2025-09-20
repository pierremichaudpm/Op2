"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceKey = 'conseil' | 'placement' | 'formation';

type ServiceContentItem = {
  text: string;
  isBold?: boolean;
  isTitle?: boolean;
  isSmaller?: boolean;
};

const SERVICE_CONTENT: Record<
  ServiceKey,
  { title: string; image: string; modalContent: ServiceContentItem[] }
> = {
  conseil: {
    title: 'Conseil\nstratégique',
    image: '/images/image-7.png',
    modalContent: [
      { text: "Transformez vos projets en leviers de performance.", isBold: true, isTitle: true },
      { text: "Nous aidons les organisations à prendre les bonnes décisions au bon moment. En combinant vision stratégique et rigueur en gestion de projet, nous vous permettons d'anticiper les risques, d'accélérer vos initiatives et de maximiser l'impact de vos investissements.", isSmaller: true },
      { text: "• Construire des feuilles de route claires et ambitieuses.", isSmaller: true },
      { text: "• Structurer une gouvernance projet qui favorise les résultats.", isSmaller: true },
      { text: "• Définir des mécanismes de suivi qui permettent d'agir vite.", isSmaller: true },
      { text: "• Redresser les projets en difficulté.", isSmaller: true }
    ]
  },
  placement: {
    title: 'Placement\nopérationnel',
    image: '/images/image-8.png',
    modalContent: [
      { text: "Des experts qui livrent, là où ça compte.", isBold: true, isTitle: true },
      { text: "Quand vos projets exigent des renforts immédiats et qualifiés, nous intégrons rapidement des consultants capables de générer de la valeur dès le premier jour. Plus que de l'expertise technique, nous apportons une capacité de redressement, d'exécution et de leadership sur le terrain.", isSmaller: true },
      { text: "• Piloter vos projets stratégiques avec rigueur et agilité.", isSmaller: true },
      { text: "• Assurer la maîtrise des coûts, délais et risques.", isSmaller: true },
      { text: "• Sécuriser l'atteinte de jalons contractuels et maitriser les risques.", isSmaller: true },
      { text: "• Renforcer vos équipes dans les moments critiques.", isSmaller: true }
    ]
  },
  formation: {
    title: 'Formation\nspécialisée',
    image: '/images/image-9.png',
    modalContent: [
      { text: "Faites monter vos équipes en puissance.", isBold: true, isTitle: true },
      { text: "Nos formations pratiques, conçues à partir de cas réels et de notre expérience multisectorielle, permettent à vos équipes d'acquérir les compétences clés pour livrer des projets performants et durables.", isSmaller: true },
      { text: "• Former vos équipes sur les meilleures pratiques de planification et de gouvernance.", isSmaller: true },
      { text: "• Outiller vos gestionnaires dans la conduite du changement.", isSmaller: true },
      { text: "• Développer le leadership et les compétences en gestion de projet.", isSmaller: true },
      { text: "• Explorer de nouveaux enjeux (IA appliquée aux projets, gestion des bénéfices, etc.).", isSmaller: true }
    ]
  }
};

export function Services() {
  const [open, setOpen] = useState<null | ServiceKey>(null);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    // Ne pas toucher au scroll pour éviter le saut
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [open]);

  // Ouvrir au clic uniquement
  const handleOpenModal = (service: ServiceKey) => {
    setOpen(service);
  };

  
  return (
    <section 
      id="offres" 
      className="pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 bg-white overflow-hidden relative"
    >
      <div className="container-wrapper max-w-[1728px] px-4 md:px-8 lg:px-0">
        <div ref={sectionRef} className="relative w-full lg:w-[1692px] mx-auto" style={{ minHeight: '760px' }}>
          
          {/* Titre principal */}
          <div 
            className="absolute font-display font-bold uppercase text-[#243768]"
            style={{ 
              left: '0px',
              top: '0px',
              fontSize: '48px',
              lineHeight: '84px',
              letterSpacing: '0.02em'
            }}
          >
            Une offre globale
          </div>

          {/* Titre Conseil */}
          <div 
            className={`absolute font-display font-medium whitespace-pre-line transition-colors cursor-pointer ${
              open === 'conseil' ? 'text-[#DE5600]' : open ? 'text-[#DE5600]/20' : 'text-[#DE5600]'
            }`}
            style={{ 
              left: '34px',
              top: '145px',
              fontSize: '45px',
              lineHeight: '50px',
              letterSpacing: '2.70px',
              zIndex: open ? 15 : 1
            }}
            onClick={() => handleOpenModal('conseil')}
          >
            {open === 'conseil' && (
              <div 
                className="absolute bg-[#DE5600] rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '-22px',
                  top: '18px',
                  boxShadow: '0px 0px 14px rgba(222, 86, 0, 0.80)'
                }}
              />
            )}
            Conseil{'\n'}stratégique
          </div>

          {/* Titre Placement */}
          <div 
            className={`absolute font-display font-medium whitespace-pre-line transition-colors cursor-pointer ${
              open === 'placement' ? 'text-[#DE5600]' : open ? 'text-[#DE5600]/20' : 'text-[#DE5600]'
            }`}
            style={{ 
              left: '609px',
              top: '144px',
              fontSize: '45px',
              lineHeight: '50px',
              letterSpacing: '2.70px',
              zIndex: open ? 15 : 1
            }}
            onClick={() => handleOpenModal('placement')}
          >
            {open === 'placement' && (
              <div 
                className="absolute bg-[#DE5600] rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '-22px',
                  top: '18px',
                  boxShadow: '0px 0px 14px rgba(222, 86, 0, 0.80)'
                }}
              />
            )}
            Placement{'\n'}opérationnel
          </div>

          {/* Titre Formation */}
          <div 
            className={`absolute font-display font-medium whitespace-pre-line transition-colors cursor-pointer ${
              open === 'formation' ? 'text-[#DE5600]' : open ? 'text-[#DE5600]/20' : 'text-[#DE5600]'
            }`}
            style={{ 
              left: '1216px',
              top: '144px',
              fontSize: '45px',
              lineHeight: '50px',
              letterSpacing: '2.70px',
              zIndex: open ? 15 : 1
            }}
            onClick={() => handleOpenModal('formation')}
          >
            {open === 'formation' && (
              <div 
                className="absolute bg-[#DE5600] rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '-22px',
                  top: '18px',
                  boxShadow: '0px 0px 14px rgba(222, 86, 0, 0.80)'
                }}
              />
            )}
            Formation{'\n'}spécialisée
          </div>

          {/* Images toujours présentes */}
          <>
            {/* Image Conseil */}
            <div
              onClick={() => handleOpenModal('conseil')}
              className="absolute overflow-hidden rounded-[50px] border border-[#243768] cursor-pointer"
              style={{
                width: '508px',
                height: '479px',
                left: '3px',
                top: '281px',
                opacity: open && open !== 'conseil' ? 0 : 1,
                transform: open && open !== 'conseil' ? 'scale(0.98)' : 'scale(1)',
                visibility: open && open !== 'conseil' ? 'hidden' : 'visible',
                transition: 'all 0.2s ease-out'
              }}
            >
              <Image 
                src={SERVICE_CONTENT.conseil.image}
                alt="Conseil en gestion de projet"
                fill
                className="object-cover"
              />
            </div>

            {/* Image Placement */}
            <div
              onClick={() => handleOpenModal('placement')}
              className="absolute overflow-hidden rounded-[50px] border border-[#243768] cursor-pointer"
              style={{
                width: '509px',
                height: '479px',
                left: '593px',
                top: '281px',
                opacity: open && open !== 'placement' ? 0 : 1,
                transform: open && open !== 'placement' ? 'scale(0.98)' : 'scale(1)',
                visibility: open && open !== 'placement' ? 'hidden' : 'visible',
                transition: 'all 0.2s ease-out'
              }}
            >
              <Image 
                src={SERVICE_CONTENT.placement.image}
                alt="Placement opérationnel"
                fill
                className="object-cover"
              />
            </div>

            {/* Image Formation */}
            <div
              onClick={() => handleOpenModal('formation')}
              className="absolute overflow-hidden rounded-[50px] border border-[#243768] cursor-pointer"
              style={{
                width: '509px',
                height: '478px',
                left: '1183px',
                top: '282px',
                opacity: open && open !== 'formation' ? 0 : 1,
                transform: open && open !== 'formation' ? 'scale(0.98)' : 'scale(1)',
                visibility: open && open !== 'formation' ? 'hidden' : 'visible',
                transition: 'all 0.2s ease-out'
              }}
            >
              <Image 
                src={SERVICE_CONTENT.formation.image}
                alt="Formation spécialisée"
                fill
                className="object-cover"
              />
            </div>
          </>

          {/* Modal avec AnimatePresence pour transitions fluides */}
          <AnimatePresence mode="wait">
            {open && (
              <>
                {/* Zone invisible pour détecter la sortie */}
                <div 
                  className="absolute"
                  style={{
                    width: '1692px',
                    height: '900px',
                    left: '0',
                    top: '0',
                    zIndex: 9,
                  }}
                  onMouseLeave={() => setOpen(null)}
                />
                
                <motion.div 
                  className="absolute rounded-[50px] border border-[#243768] overflow-hidden"
                  style={{
                    width: '1689px',
                    height: '479px',
                    left: '3px',
                    top: '281px',
                    zIndex: 10
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.15,
                    ease: "easeOut"
                  }}
                >
              {/* Image de fond spécifique au service actif */}
              <Image 
                src={SERVICE_CONTENT[open].image}
                alt="Background"
                fill
                className="object-cover"
                style={{ 
                  objectPosition: '50% 20%',
                  filter: 'brightness(1.1) contrast(1.05)'
                }}
              />
              
              {/* Overlay bleu avec plus de transparence */}
              <div 
                className="absolute inset-0 rounded-[50px]"
                style={{ background: 'rgba(36, 55, 104, 0.82)' }}
              />
              
              {/* Contenu colonne gauche */}
              <div 
                className="absolute flex flex-col justify-center"
                style={{
                  width: '720px',
                  left: '60px',
                  top: '40px',
                  height: '400px'
                }}
              >
                {/* Titre principal */}
                {SERVICE_CONTENT[open].modalContent.filter(item => item.isTitle).map((item, idx) => (
                  <p 
                    key={`title-${idx}`}
                    className={`text-white font-inter font-bold mb-16`}
                    style={{
                      fontSize: '28px',
                      lineHeight: '38px'
                    }}
                  >
                    {item.text}
                  </p>
                ))}
                {/* Texte descriptif */}
                {SERVICE_CONTENT[open].modalContent.filter(item => !item.isTitle && !item.text.startsWith('•')).map((item, idx) => (
                  <p 
                    key={`desc-${idx}`}
                    className={`text-white font-inter ${item.isBold ? 'font-semibold' : 'font-normal'}`}
                    style={{
                      fontSize: item.isSmaller ? '22px' : '28px',
                      lineHeight: item.isSmaller ? '34px' : '38px'
                    }}
                  >
                    {item.text}
                  </p>
                ))}
              </div>
              
              {/* Contenu colonne droite - Bullets */}
              <div 
                className="absolute flex flex-col justify-center"
                style={{
                  width: '720px',
                  left: '840px',
                  top: '40px',
                  height: '400px'
                }}
              >
                <div className="space-y-4">
                  {SERVICE_CONTENT[open].modalContent.filter(item => item.text.startsWith('•')).map((item, idx) => (
                    <p 
                      key={`bullet-${idx}`}
                      className={`text-white font-inter ${item.isBold ? 'font-semibold' : 'font-normal'}`}
                      style={{
                        fontSize: item.isSmaller ? '22px' : '28px',
                        lineHeight: '34px'
                      }}
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
            </>
          )}
          </AnimatePresence>
        </div>
      </div>

      {/* Overlay transparent pour capturer les clics en dehors */}
      {open && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[98]" 
          onClick={() => setOpen(null)}
        />,
        document.body
      )}
    </section>
  );
}
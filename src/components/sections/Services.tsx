"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

type ServiceKey = 'conseil' | 'placement' | 'formation';

type ServiceContentItem = {
  text: string;
  isBold?: boolean;
  isTitle?: boolean;
  isSmaller?: boolean;
};

const SERVICE_IMAGES: Record<ServiceKey, string> = {
  conseil: '/images/image-7.png',
  placement: '/images/image-8.png',
  formation: '/images/image-9.png'
};

export function Services() {
  const { t } = useI18n();
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
            {t('services.sectionTitle')}
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
              zIndex: open ? 45 : 1
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
            {t('services.conseil.title_l1')}{'\n'}{t('services.conseil.title_l2')}
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
              zIndex: open ? 45 : 1
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
            {t('services.placement.title_l1')}{'\n'}{t('services.placement.title_l2')}
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
              zIndex: open ? 45 : 1
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
            {t('services.formation.title_l1')}{'\n'}{t('services.formation.title_l2')}
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
                src={SERVICE_IMAGES.conseil}
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
                src={SERVICE_IMAGES.placement}
                alt="Placement opérationnel"
                fill
                className="object-cover"
                style={{ objectPosition: 'calc(50% + 75px) center' }}
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
                src={SERVICE_IMAGES.formation}
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
                    zIndex: 47,
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
                    zIndex: 48
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
                src={SERVICE_IMAGES[open]}
                alt="Background"
                fill
                className="object-cover"
                style={{ 
                  objectPosition: open === 'placement' ? 'calc(50% + 75px) 20%' : '50% 20%',
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
                <p 
                  className={`text-white font-inter font-bold mb-16`}
                  style={{
                    fontSize: '28px',
                    lineHeight: '38px'
                  }}
                >
                  {open === 'conseil' && t('services.conseil.modal.title')}
                  {open === 'placement' && t('services.placement.modal.title')}
                  {open === 'formation' && t('services.formation.modal.title')}
                </p>
                {/* Texte descriptif */}
                <p 
                  className={`text-white font-inter font-normal`}
                  style={{
                    fontSize: '22px',
                    lineHeight: '34px'
                  }}
                >
                  {open === 'conseil' && t('services.conseil.modal.desc')}
                  {open === 'placement' && t('services.placement.modal.desc')}
                  {open === 'formation' && t('services.formation.modal.desc')}
                </p>
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
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'conseil' && t('services.conseil.modal.b1')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'conseil' && t('services.conseil.modal.b2')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'conseil' && t('services.conseil.modal.b3')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'conseil' && t('services.conseil.modal.b4')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'placement' && t('services.placement.modal.b1')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'placement' && t('services.placement.modal.b2')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'placement' && t('services.placement.modal.b3')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'placement' && t('services.placement.modal.b4')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'formation' && t('services.formation.modal.b1')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'formation' && t('services.formation.modal.b2')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'formation' && t('services.formation.modal.b3')}</p>
                  <p className={`text-white font-inter font-normal`} style={{ fontSize: '22px', lineHeight: '34px' }}>{open === 'formation' && t('services.formation.modal.b4')}</p>
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
          className="fixed inset-0 z-[48]" 
          onClick={() => setOpen(null)}
        />,
        document.body
      )}
    </section>
  );
}
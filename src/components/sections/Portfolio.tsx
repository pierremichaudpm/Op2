"use client";
import Image from 'next/image';
import { useState } from 'react';

// Configuration des projets avec leurs images
const projectsData = [
  {
    id: 1,
    images: {
      main: '/images/nos_realisations/image-10.png',
      secondary: '/images/nos_realisations/image-11.png',
      tertiary: '/images/nos_realisations/image-12.png',
      quaternary: '/images/nos_realisations/image-13.png',
      quinary: '/images/nos_realisations/image-14.png',
      senary: '/images/nos_realisations/image-15.png',
      septenary: '/images/nos_realisations/image-16.png'
    },
    title: 'Transport Ferroviaire',
    description: 'Gestion de projet complexe pour infrastructure ferroviaire'
  },
  {
    id: 2,
    images: {
      main: '/images/nos_realisations/image-11.png',
      secondary: '/images/nos_realisations/image-12.png',
      tertiary: '/images/nos_realisations/image-13.png',
      quaternary: '/images/nos_realisations/image -14.png',
      quinary: '/images/nos_realisations/image-15.png',
      senary: '/images/nos_realisations/image-16.png',
      septenary: '/images/nos_realisations/image-10.png'
    },
    title: 'Infrastructure Maritime',
    description: 'Développement portuaire et aménagement côtier'
  },
  {
    id: 3,
    images: {
      main: '/images/nos_realisations/image-12.png',
      secondary: '/images/nos_realisations/image-13.png',
      tertiary: '/images/nos_realisations/image-14.png',
      quaternary: '/images/nos_realisations/image-15.png',
      quinary: '/images/nos_realisations/image-16.png',
      senary: '/images/nos_realisations/image-10.png',
      septenary: '/images/nos_realisations/image-11.png'
    },
    title: 'Énergie Renouvelable',
    description: 'Projets éoliens et solaires à grande échelle'
  }
];

export function Portfolio() {
  const [activeVariant, setActiveVariant] = useState(0);
  const currentProject = projectsData[activeVariant % projectsData.length];

  return (
    <section id="realisations" className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container-wrapper max-w-[1728px] px-4 md:px-8 lg:px-0">
        <div className="relative w-full lg:w-[1692px] mx-auto">
            {/* Titre de la section aligné à gauche */}
          <h2 className="text-left font-display text-[#243768] uppercase text-[48px] leading-[84px] font-bold mb-8" style={{ letterSpacing: '0.02em' }}>
            Nos Réalisations
          </h2>

            {/* Grille d'images style Figma */}
          <div className="relative w-full" style={{ height: '737px' }}>
              {/* Image-13 portrait étroite à droite (image-5 dans Figma) */}
            <div 
            className="absolute overflow-hidden border border-[#243768]/20"
            style={{
              right: '0',
              top: '0',
              width: '11.62%',
              height: '416px'
            }}
          >
            <Image
              src="/images/nos_realisations/image-13.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

              {/* Image-15 centrale (img dans Figma) */}
            <div 
            className="absolute overflow-hidden  border border-[#243768]/20"
            style={{
              left: '39.52%',
              top: '347px',
              width: '33.51%',
              height: '389px'
            }}
          >
            <Image
              src="/images/nos_realisations/image-15.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

              {/* Image-10 en haut à gauche (image-2 dans Figma) */}
            <div 
              className="absolute overflow-hidden border border-[#243768]/20"
              style={{
                left: '0',
                top: '0',
                width: '33.30%',
                height: '286px'
              }}
            >
            <Image
              src="/images/nos_realisations/image-10.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-12 droite centre (image-3 dans Figma) */}
          <div 
            className="absolute overflow-hidden  border border-[#243768]/20"
            style={{
              left: '61.46%',
              top: '1px',
              width: '26.56%',
              height: '415px'
            }}
          >
            <Image
              src="/images/nos_realisations/image-12.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-14 en bas à gauche (image-4 dans Figma) */}
          <div 
            className="absolute overflow-hidden  border border-[#243768]/20"
            style={{
              left: '0',
              top: '288px',
              width: '39.83%',
              height: '449px'
            }}
          >
            <Image
              src="/images/nos_realisations/image-14.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Image-16 en bas à droite (image dans Figma) */}
          <div 
            className="absolute overflow-hidden  border border-[#243768]/20"
            style={{
              right: '0',
              top: '408px',
              width: '26.97%',
              height: '328px'
            }}
          >
            <Image
              src="/images/nos_realisations/image-16.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

              {/* Image-11 centre gauche (image-6 dans Figma) */}
            <div 
              className="absolute overflow-hidden border-t border-r border-b border-[#243768]/20"
              style={{
                left: 'calc(33.30% - 1px)',
                top: '0',
                width: 'calc(28.22% + 1px)',
                height: '352px'
              }}
            >
            <Image
              src="/images/nos_realisations/image-11.png"
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

            {/* Rectangle orange overlay */}
          <div 
            className="absolute bg-[#F36911] opacity-80"
            style={{
              left: '33.20%',
              top: '39.08%',
              width: '6.64%',
              height: '8.68%'
            }}
          />

            {/* Rectangle bleu overlay */}
          <div 
            className="absolute bg-[#243768] opacity-80"
            style={{
              left: '61.41%',
              top: '47.76%',
              width: '11.62%',
              height: '8.68%'
            }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
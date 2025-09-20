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
    <section id="realisations" className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="container-wrapper max-w-[1728px] px-4 md:px-0">
        {/* Titre de la section */}
        <h2 className="text-center font-display text-[#243768] uppercase text-[32px] leading-[48px] md:text-[48px] md:leading-[84px] font-bold mb-12">
          Nos Réalisations
        </h2>

        {/* Grille d'images style Figma */}
        <div className="relative w-full max-w-[1692px] mx-auto" style={{ height: '737px' }}>
          {/* Image principale en haut à droite */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              right: '0',
              top: '408px',
              width: '26.97%',
              height: '328px'
            }}
          >
            <Image
              src={currentProject.images.septenary}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Image centrale */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              left: '39.52%',
              top: '347px',
              width: '33.51%',
              height: '389px'
            }}
          >
            <Image
              src={currentProject.images.senary}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Image en haut à gauche */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              left: '0',
              top: '2px',
              width: '33.30%',
              height: '286px'
            }}
          >
            <Image
              src={currentProject.images.main}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Image droite centre */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              left: '61.46%',
              top: '1px',
              width: '26.56%',
              height: '415px'
            }}
          >
            <Image
              src={currentProject.images.tertiary}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Image en bas à gauche */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              left: '0',
              top: '288px',
              width: '39.83%',
              height: '449px'
            }}
          >
            <Image
              src={currentProject.images.quaternary}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Image extrême droite */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              right: '0',
              top: '0',
              width: '11.62%',
              height: '416px'
            }}
          >
            <Image
              src={currentProject.images.quinary}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Image centre gauche */}
          <div 
            className="absolute overflow-hidden rounded-[20px] border border-[#243768]/20"
            style={{
              left: '33.25%',
              top: '0',
              width: '28.22%',
              height: '352px'
            }}
          >
            <Image
              src={currentProject.images.secondary}
              alt="Réalisation"
              fill
              className="object-cover"
            />
          </div>

          {/* Rectangle orange overlay */}
          <div 
            className="absolute bg-[#F36911] opacity-80 rounded-[10px]"
            style={{
              left: '33.20%',
              top: '39.08%',
              width: '6.64%',
              height: '8.68%'
            }}
          />

          {/* Rectangle bleu overlay */}
          <div 
            className="absolute bg-[#243768] opacity-80 rounded-[10px]"
            style={{
              left: '61.41%',
              top: '47.76%',
              width: '11.62%',
              height: '8.68%'
            }}
          />

          {/* Titre et description du projet */}
          <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-[20px] p-6 max-w-[400px] shadow-lg">
            <h3 className="text-[#243768] font-display font-bold text-2xl mb-2">
              {currentProject.title}
            </h3>
            <p className="text-[#243768]/70 text-sm">
              {currentProject.description}
            </p>
          </div>
        </div>

        {/* Navigation entre les variantes */}
        <div className="flex justify-center mt-8 space-x-3">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveVariant(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeVariant === index 
                  ? 'bg-[#DE5600] w-8' 
                  : 'bg-[#243768]/30 hover:bg-[#243768]/50'
              }`}
              aria-label={`Voir projet ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
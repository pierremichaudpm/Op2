'use client';

import { useState } from 'react';
import Image from 'next/image';

export function MobileRealisations() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleImageClick = (projectIndex: number) => {
    setSelectedProject(projectIndex);
    setShowModal(true);
  };

  const projects = [
    {
      id: 1,
      image: '/images/nos_realisations/image-10.png',
      title: 'Parc éolien offshore',
      description: 'Installation de 80 éoliennes en mer du Nord',
      fullDescription: 'Gestion complète du projet d\'installation d\'un parc éolien offshore de 400MW. Coordination de 12 navires spécialisés, gestion des contraintes météorologiques et livraison avec 2 mois d\'avance sur le planning initial.'
    },
    {
      id: 2,
      image: '/images/nos_realisations/image-11.png', 
      title: 'Ligne ferroviaire haute vitesse',
      description: 'Nouvelle ligne TGV de 300km',
      fullDescription: 'Pilotage du projet de construction d\'une nouvelle ligne haute vitesse. Gestion de 50 ouvrages d\'art, coordination avec 200 sous-traitants et mise en service commerciale réussie.'
    },
    {
      id: 3,
      image: '/images/nos_realisations/image-12.png',
      title: 'Centrale hydroélectrique',
      description: 'Construction d\'un barrage de 150m',
      fullDescription: 'Projet de barrage hydroélectrique de 500MW. Gestion des enjeux environnementaux, déplacement de 2 villages et mise en eau réussie après 5 ans de travaux.'
    },
    {
      id: 4,
      image: '/images/nos_realisations/image-13.png',
      title: 'Centre de lancement spatial',
      description: 'Modernisation d\'un pas de tir',
      fullDescription: 'Refonte complète d\'un pas de tir pour lanceurs nouvelle génération. Intégration de systèmes cryogéniques avancés et première mise à feu réussie en 18 mois.'
    },
    {
      id: 5,
      image: '/images/nos_realisations/image-14.png',
      title: 'Construction navale militaire',
      description: 'Modernisation d\'un porte-avions',
      fullDescription: 'Refonte complète des systèmes de combat et de navigation d\'un porte-avions. Projet classifié de 800M$ livré dans les délais avec certification NATO.'
    },
    {
      id: 6,
      image: '/images/nos_realisations/image-15.png',
      title: 'Extension ligne de métro',
      description: 'Nouvelle ligne de métro automatique',
      fullDescription: 'Construction de 15km de tunnel et 12 stations de métro automatique. Gestion des interfaces avec le réseau existant et minimisation de l\'impact sur la circulation urbaine.'
    },
    {
      id: 7,
      image: '/images/nos_realisations/image-16.png',
      title: 'Usine pharmaceutique 4.0',
      description: 'Construction d\'une usine de vaccins',
      fullDescription: 'Projet greenfield d\'une usine de production de vaccins aux normes FDA. Qualification de 12 lignes de production et obtention de la certification en un temps record.'
    }
  ];

  const selectedProjectData = selectedProject !== null ? projects[selectedProject] : null;

  // Calcul des proportions depuis le Figma (largeur totale = 357px, hauteur = 340px)
  // Image 10: left:0, top:0, w:192.8, h:85.89
  // Image 11: left:179, top:0, w:178, h:104
  // Image 14: left:0, top:86, w:230.64, h:134.84
  // Image 15: left:162, top:104, w:194, h:116.82
  // Image 12: left:0.58, top:197, w:161, h:143
  // Image 13: left:154, top:221, w:70, h:119
  // Image 16: left:168, top:221, w:188, h:119

  return (
    <section id="realisations" style={{
      width: '100%',
      marginTop: '-10px', // Réduire l'espacement avec Offre Globale
      marginBottom: '20px',
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
        Nos réalisations
      </h2>

      {/* Container principal - Plus large, même largeur que les autres sections */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '95%', // Ratio hauteur/largeur maintenu (340/357 = 95%)
      }}>
        {!showModal ? (
          /* État normal - Proportions EXACTES du Figma */
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}>
            {/* Image 10 - Proportions: left:0%, top:0%, w:54%, h:25.3% */}
            <div 
              onClick={() => handleImageClick(0)}
              style={{
                position: 'absolute',
                left: '0%',
                top: '0%',
                width: '54%', // 192.8/357 = 54%
                height: '25.3%', // 85.89/340 = 25.3%
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <Image
                src={projects[0].image}
                alt={projects[0].title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Image 11 - Proportions: left:50.1%, top:0%, w:49.9%, h:30.6% */}
            <div 
              onClick={() => handleImageClick(1)}
              style={{
                position: 'absolute',
                left: '50.1%', // 179/357 = 50.1%
                top: '0%',
                width: '49.9%', // 178/357 = 49.9%
                height: '30.6%', // 104/340 = 30.6%
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <Image
                src={projects[1].image}
                alt={projects[1].title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Image 14 - Proportions: left:0%, top:25.3%, w:64.6%, h:39.7% */}
            <div 
              onClick={() => handleImageClick(4)}
              style={{
                position: 'absolute',
                left: '0%',
                top: '25.3%', // 86/340 = 25.3%
                width: '64.6%', // 230.64/357 = 64.6%
                height: '39.7%', // 134.84/340 = 39.7%
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <Image
                src={projects[4].image}
                alt={projects[4].title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Image 15 - Proportions: left:64%, top:30.6%, w:36%, h:34.4% */}
            <div 
              onClick={() => handleImageClick(5)}
              style={{
                position: 'absolute',
                left: '64%', // Redonné 1% (3px)
                top: '30.6%', // 104/340 = 30.6%
                width: '36%', // Redonné 1% (3px)
                height: '34.4%', // 116.82/340 = 34.4%
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1 // Sous le rectangle orange
              }}
            >
              <Image
                src={projects[5].image}
                alt={projects[5].title}
                fill
                style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              />
            </div>

            {/* Rectangle 7 - Petit bloc orange du Figma */}
            <div 
              style={{
                position: 'absolute',
                left: '49.9%', // Position exacte comme avant
                top: '25%', // Position exacte comme avant
                width: '14.8%', // Taille exacte comme avant
                height: '9%', // Taille exacte comme avant
                backgroundColor: '#F36911',
                pointerEvents: 'none',
                zIndex: 2 // Au-dessus de l'image du milieu
              }}
            />

            {/* Rectangle 8 - Rectangle bleu horizontal du Figma */}
            <div 
              style={{
                position: 'absolute',
                left: '38.94%', // Décalé de 5px supplémentaires vers la gauche (40.34% - 1.4%)
                top: '54.96%', // Monté de 5px supplémentaires (56.43% - 1.47%)
                width: '25.2%', // Agrandi de 5px supplémentaires (23.8% + 1.4%)
                height: '10.04%', // Agrandi de 5px supplémentaires (8.57% + 1.47%)
                backgroundColor: '#243768',
                opacity: 1, // Complètement opaque
                pointerEvents: 'none',
                zIndex: 3
              }}
            />

            {/* Image 12 - Proportions: left:0%, top:57.9%, w:45.5%, h:42.1% */}
            <div 
              onClick={() => handleImageClick(2)}
              style={{
                position: 'absolute',
                left: '0%',
                top: '57.9%', // 197/340 = 57.9%
                width: '45.5%', // Réduit de 3% (environ 10px)
                height: '42.1%', // 143/340 = 42.1%
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <Image
                src={projects[2].image}
                alt={projects[2].title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Image 13 - Proportions: left:45.5%, top:65%, w:17.5%, h:35% */}
            <div 
              onClick={() => handleImageClick(3)}
              style={{
                position: 'absolute',
                left: '45.5%', // Collé à l'image de gauche
                top: '65%', // 221/340 = 65%
                width: '17.5%', // Largeur élargie de la fusée pour combler l'espace
                height: '35%', // 119/340 = 35%
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <Image
                src={projects[3].image}
                alt={projects[3].title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Image 16 - Proportions: left:63%, top:65%, w:37%, h:35% */}
            <div 
              onClick={() => handleImageClick(6)}
              style={{
                position: 'absolute',
                left: '63%', // Décalé pour enlever les pixels
                top: '65%', // 221/340 = 65%
                width: '37%', // Réduit comme demandé
                height: '35%', // 119/340 = 35%
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <Image
                src={projects[6].image}
                alt={projects[6].title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ) : (
          /* État modale - EXACT du Figma Variant2 */
          <>
            {/* Overlay invisible pour fermer en cliquant à l'extérieur */}
            <div 
              onClick={() => setShowModal(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transparent',
                zIndex: 998
              }}
            />
            
            {/* Contenu de la modal */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                border: '1px solid #243768',
                overflow: 'hidden',
                animation: 'dissolveIn 0.3s ease-out',
                zIndex: 999
              }}
            >
            {selectedProjectData && (
              <Image
                src={selectedProjectData.image}
                alt={selectedProjectData.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            )}
            {/* Overlay bleu avec opacité 0.85 - EXACT du Figma */}
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(36, 55, 104, 0.85)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop: '20px'
              }}>
                {/* Bouton X - EXACT du Figma */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#F36911',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.9,
                    padding: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    outline: 'none',
                    lineHeight: 1,
                    textDecoration: 'none'
                  }}
                >
                  ×
                </button>

                {/* Contenu de la modale */}
                <div style={{
                  marginTop: '45px',
                  maxHeight: 'calc(100% - 60px)', // Augmenté pour voir plus de texte
                  overflowY: 'auto', // Ajoute un scroll si nécessaire
                  paddingRight: '10px',
                  // Barre de scroll visible sur mobile
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#F36911 transparent'
                }}>
                  {/* Titre du projet */}
                  <h3 style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '22px', // Réduit de 26px à 22px
                    fontWeight: 700,
                    color: '#F36911',
                    marginBottom: '12px',
                    lineHeight: '1.2'
                  }}>
                    {selectedProjectData?.title || ''}
                  </h3>

                  {/* Sous-titre */}
                  <h4 style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '16px', // Réduit de 18px à 16px
                    fontWeight: 600,
                    color: '#FFD4B3',
                    marginBottom: '20px', // Réduit de 25px à 20px
                    lineHeight: '1.3'
                  }}>
                    {selectedProjectData?.description || ''}
                  </h4>

                  {/* Description complète */}
                  <p style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '14px', // Réduit de 15px à 14px
                    fontWeight: 400,
                    color: '#FFFFFF',
                    lineHeight: '1.5', // Réduit de 1.6 à 1.5
                    textAlign: 'left'
                  }}>
                    {selectedProjectData?.fullDescription || ''}
                  </p>
                  
                  {/* Espace vide en bas */}
                  <div style={{ height: '20px' }} />
                  
                  {/* Gradient pour indiquer qu'il y a plus de contenu */}
                  <div style={{
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30px',
                    background: 'linear-gradient(to top, rgba(36, 55, 104, 0.95), transparent)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes dissolveIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
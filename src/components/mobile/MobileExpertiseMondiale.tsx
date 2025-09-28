"use client";
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';

interface LogoInfo {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Données des logos avec leurs informations
const logosData: LogoInfo[] = [
  { id: '9', name: 'Société du Grand Paris', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 9.png' },
  { id: '10', name: 'Pomerleau', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 10.png' },
  { id: '11', name: 'Partenaire 11', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 11.png' },
  { id: '8', name: 'Partenaire 8', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 8.png' },
  { id: '3', name: 'Partenaire 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 3.png' },
  { id: '7', name: 'Partenaire 7', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 7.png' },
  { id: '12', name: 'Partenaire 12', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 12.png' },
  { id: '14', name: 'Partenaire 14', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 14.png' },
  { id: '13', name: 'Partenaire 13', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 13.png' },
  { id: '15', name: 'Partenaire 15', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 15.png' },
  { id: '24', name: 'Partenaire 24', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 24.png' },
  { id: '28', name: 'Partenaire 28', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 28.png' },
  { id: '27', name: 'Partenaire 27', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 27.png' },
  { id: '22', name: 'Partenaire 22', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 22.png' },
  { id: '23', name: 'Partenaire 23', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 23.png' },
  { id: '21', name: 'Partenaire 21', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 21.png' },
  { id: '17', name: 'Partenaire 17', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 17.png' },
  { id: '18', name: 'Partenaire 18', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 18.png' },
  { id: '20', name: 'Partenaire 20', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat.', image: '/images/logos/image006 20.png' },
];

export function MobileExpertiseMondiale() {
  const { locale } = useI18n();
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);

  // Variant 1 (Default) - Adapté depuis Figma avec positionnement proportionnel
  if (!selectedLogo) {
    return (
      <section id="expertise" style={{
        width: '100%',
        marginBottom: '20px',
        padding: '0 4.5%'
      }}>
        {/* Titre */}
        <h2
          style={{
            color: '#243768',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '19px',
            fontWeight: 700,
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: '-20px'
          }}
        >
          {locale === 'en' ? 'Global expertise' : 'Une expertise mondiale'}
        </h2>

        {/* Container adaptatif basé sur Figma 385x554 */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '385px',
          aspectRatio: '385 / 554',
          margin: '0 auto'
        }}>
          {/* Globe container avec positions Figma */}
          {/* globe-circle 1 - Position Figma: x:49, y:162, w:295, h:286 */}
          <img
            src="/images/globe-circle-figma.png"
            alt=""
            style={{
              position: 'absolute',
              left: '12.73%', // 49/385
              top: '29.24%', // 162/554
              width: '76.62%', // 295/385
              height: '51.62%', // 286/554
              zIndex: 1
            }}
          />

          {/* globe - VIDEO - Position Figma: x:105, y:210, w:188, h:188 */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              left: '27%', // Déplacé de 1px vers la gauche (104/385)
              top: '37.91%', // 210/554
              width: '48.83%', // 188/385
              height: '33.94%', // 188/554
              borderRadius: '50%',
              objectFit: 'cover',
              zIndex: 2
            }}
          >
            <source src="/videos/globe4.mp4" type="video/mp4" />
          </video>

          {/* Logos avec positions exactes de Figma */}
          
          {/* image006 9 - Position: x:90, y:74, w:100, h:33 - CLICKABLE */}
          <img
            src="/images/logos/image006 9.png"
            alt=""
            onClick={() => setSelectedLogo('9')}
            style={{
              position: 'absolute',
              left: '23.38%',
              top: '13.36%',
              width: '25.97%',
              height: '5.96%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 10 - Position: x:105, y:111, w:75, h:25 - CLICKABLE */}
          <img
            src="/images/logos/image006 10.png"
            alt=""
            onClick={() => setSelectedLogo('10')}
            style={{
              position: 'absolute',
              left: '27%', // Déplacé de 1px vers la gauche
              top: '20.04%',
              width: '19.48%',
              height: '4.51%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 11 - Position: x:217, y:110, w:75, h:24 - CLICKABLE */}
          <img
            src="/images/logos/image006 11.png"
            alt=""
            onClick={() => setSelectedLogo('11')}
            style={{
              position: 'absolute',
              left: '56.36%',
              top: '19.86%',
              width: '19.48%',
              height: '4.33%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 8 - Position: x:0, y:186, w:75, h:25 - CLICKABLE */}
          <img
            src="/images/logos/image006 8.png"
            alt=""
            onClick={() => setSelectedLogo('8')}
            style={{
              position: 'absolute',
              left: '0%',
              top: '33.57%',
              width: '19.48%',
              height: '4.51%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 3 - Position: x:14, y:158, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 3.png"
            alt=""
            onClick={() => setSelectedLogo('3')}
            style={{
              position: 'absolute',
              left: '3.64%',
              top: '28.52%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 7 - Position: x:15, y:131, w:60, h:19 - CLICKABLE */}
          <img
            src="/images/logos/image006 7.png"
            alt=""
            onClick={() => setSelectedLogo('7')}
            style={{
              position: 'absolute',
              left: '3.90%',
              top: '23.65%',
              width: '15.58%',
              height: '3.43%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 12 - Position: x:310, y:186, w:75, h:25 - CLICKABLE */}
          <img
            src="/images/logos/image006 12.png"
            alt=""
            onClick={() => setSelectedLogo('12')}
            style={{
              position: 'absolute',
              left: '80.52%',
              top: '33.57%',
              width: '19.48%',
              height: '4.51%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 14 - Position: x:322, y:385, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 14.png"
            alt=""
            onClick={() => setSelectedLogo('14')}
            style={{
              position: 'absolute',
              left: '83.64%',
              top: '69.49%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 13 - Position: x:329, y:407, w:46, h:15 - CLICKABLE */}
          <img
            src="/images/logos/image006 13.png"
            alt=""
            onClick={() => setSelectedLogo('13')}
            style={{
              position: 'absolute',
              left: '85.45%',
              top: '73.47%',
              width: '11.95%',
              height: '2.71%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 15 - Position: x:322, y:426, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 15.png"
            alt=""
            onClick={() => setSelectedLogo('15')}
            style={{
              position: 'absolute',
              left: '83.64%',
              top: '76.90%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 24 - Position: x:14, y:388, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 24.png"
            alt=""
            onClick={() => setSelectedLogo('24')}
            style={{
              position: 'absolute',
              left: '3.64%',
              top: '70.04%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 28 - Position: x:16, y:413, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 28.png"
            alt=""
            onClick={() => setSelectedLogo('28')}
            style={{
              position: 'absolute',
              left: '4.16%',
              top: '74.55%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 27 - Position: x:11, y:433, w:75, h:25 - CLICKABLE */}
          <img
            src="/images/logos/image006 27.png"
            alt=""
            onClick={() => setSelectedLogo('27')}
            style={{
              position: 'absolute',
              left: '2.86%',
              top: '78.16%',
              width: '19.48%',
              height: '4.51%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 22 - Position: x:115, y:477, w:60, h:19 - CLICKABLE */}
          <img
            src="/images/logos/image006 22.png"
            alt=""
            onClick={() => setSelectedLogo('22')}
            style={{
              position: 'absolute',
              left: '29.87%',
              top: '86.10%',
              width: '15.58%',
              height: '3.43%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 23 - Position: x:115, y:504, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 23.png"
            alt=""
            onClick={() => setSelectedLogo('23')}
            style={{
              position: 'absolute',
              left: '29.87%',
              top: '90.97%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 21 - Position: x:108, y:529, w:75, h:25 - CLICKABLE */}
          <img
            src="/images/logos/image006 21.png"
            alt=""
            onClick={() => setSelectedLogo('21')}
            style={{
              position: 'absolute',
              left: '28.05%',
              top: '95.49%',
              width: '19.48%',
              height: '4.51%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 17 - Position: x:218, y:477, w:60, h:20 - CLICKABLE */}
          <img
            src="/images/logos/image006 17.png"
            alt=""
            onClick={() => setSelectedLogo('17')}
            style={{
              position: 'absolute',
              left: '56.62%',
              top: '86.10%',
              width: '15.58%',
              height: '3.61%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 18 - Position: x:226, y:499, w:48, h:16 - CLICKABLE */}
          <img
            src="/images/logos/image006 18.png"
            alt=""
            onClick={() => setSelectedLogo('18')}
            style={{
              position: 'absolute',
              left: '58.70%',
              top: '90.07%',
              width: '12.47%',
              height: '2.89%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 20 - Position: x:227, y:522, w:49, h:16 - CLICKABLE */}
          <img
            src="/images/logos/image006 20.png"
            alt=""
            onClick={() => setSelectedLogo('20')}
            style={{
              position: 'absolute',
              left: '58.96%',
              top: '94.22%',
              width: '12.73%',
              height: '2.89%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* Vectors (lignes oranges) */}
          {/* Vector 1 - Position: x:21, y:221.5, w:37, h:31 */}
          <img
            src="/images/vector-line-1.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '5.45%',
              top: '39.98%',
              width: '9.61%',
              height: '5.60%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 2 - Position: x:337, y:221.5, w:37, h:31 */}
          <img
            src="/images/vector-line-2.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '87.53%',
              top: '39.98%',
              width: '9.61%',
              height: '5.60%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 3 - Position: x:338, y:350.5, w:37, h:31 */}
          <img
            src="/images/vector-line-3.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '87.79%',
              top: '63.27%',
              width: '9.61%',
              height: '5.60%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 4 - Position: x:17, y:353.5, w:37, h:31 */}
          <img
            src="/images/vector-line-4.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '4.42%',
              top: '63.81%',
              width: '9.61%',
              height: '5.60%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 5 - Position: x:126, y:142.5, w:37, h:19.5 */}
          <img
            src="/images/vector-line-5.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '32.73%',
              top: '25.72%',
              width: '9.61%',
              height: '3.52%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 6 - Position: x:229, y:142.5, w:37, h:19.5 */}
          <img
            src="/images/vector-line-6.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '59.48%',
              top: '25.72%',
              width: '9.61%',
              height: '3.52%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 7 - Position: x:130, y:448, w:37, h:19.5 */}
          <img
            src="/images/vector-line-7.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '33.77%',
              top: '80.87%',
              width: '9.61%',
              height: '3.52%',
              opacity: 0.5,
              zIndex: 2
            }}
          />

          {/* Vector 8 - Position: x:229, y:448, w:37, h:19.5 */}
          <img
            src="/images/vector-line-8.svg"
            alt=""
            style={{
              position: 'absolute',
              left: '59.48%',
              top: '80.87%',
              width: '9.61%',
              height: '3.52%',
              opacity: 0.5,
              zIndex: 2
            }}
          />
        </div>
      </section>
    );
  }

  // Variant 2 - Modal pour afficher les détails du logo sélectionné
  if (selectedLogo) {
    const logoInfo = logosData.find(logo => logo.id === selectedLogo);
    
    return (
    <section style={{
      position: 'relative',
      width: '100%',
      marginBottom: '20px',
      padding: '0 4.5%',
      userSelect: 'none'
    }}>
      {/* Titre */}
      <h2
        style={{
          color: '#243768',
          fontFamily: 'Gotham, sans-serif',
          fontSize: '19px',
          fontWeight: 700,
          textTransform: 'uppercase',
          textAlign: 'left',
          marginBottom: '-20px'
        }}
      >
        Une expertise mondiale
      </h2>

      {/* Container adaptatif basé sur Figma 385x554 */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '385px',
        aspectRatio: '385 / 554',
        margin: '0 auto'
      }}
        onClick={(e) => {
          // Fermer si on clique en dehors du modal
          const target = e.target as HTMLElement;
          if (!target.closest('[data-modal-content]')) {
            setSelectedLogo(null);
          }
        }}
      >
        {/* Globe container avec positions Figma */}
        {/* globe-circle 1 - Position Figma: x:49, y:162, w:295, h:286 */}
        <img
          src="/images/globe-circle-figma.png"
          alt=""
          style={{
            position: 'absolute',
            left: '12.73%',
            top: '29.24%',
            width: '76.62%',
            height: '51.62%',
            opacity: 0.3,
            zIndex: 1
          }}
        />

        {/* globe - VIDEO - Position Figma: x:105, y:210, w:188, h:188 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            left: '27%', // Déplacé de 1px vers la gauche
            top: '37.91%',
            width: '48.83%',
            height: '33.94%',
            borderRadius: '50%',
            objectFit: 'cover',
            zIndex: 2
          }}
        >
          <source src="/videos/globe4.mp4" type="video/mp4" />
        </video>

        {/* Logos avec mêmes positions que variante 1 mais en arrière-plan */}
        {/* image006 9 - Position: x:90, y:74, w:100, h:33 */}
        <img
          src="/images/logos/image006 9.png"
          alt=""
          style={{
            position: 'absolute',
            left: '23.38%',
            top: '13.36%',
            width: '25.97%',
            height: '5.96%',
            opacity: selectedLogo === '9' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 10 - Position: x:105, y:111, w:75, h:25 */}
        <img
          src="/images/logos/image006 10.png"
          alt=""
          style={{
            position: 'absolute',
            left: '27%', // Déplacé de 1px vers la gauche
            top: '20.04%',
            width: '19.48%',
            height: '4.51%',
            opacity: selectedLogo === '10' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 11 - Position: x:217, y:110, w:75, h:24 */}
        <img
          src="/images/logos/image006 11.png"
          alt=""
          style={{
            position: 'absolute',
            left: '56.36%',
            top: '19.86%',
            width: '19.48%',
            height: '4.33%',
            opacity: selectedLogo === '11' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 8 - Position: x:0, y:186, w:75, h:25 */}
        <img
          src="/images/logos/image006 8.png"
          alt=""
          style={{
            position: 'absolute',
            left: '0%',
            top: '33.57%',
            width: '19.48%',
            height: '4.51%',
            opacity: selectedLogo === '8' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 3 - Position: x:14, y:158, w:60, h:20 */}
        <img
          src="/images/logos/image006 3.png"
          alt=""
          style={{
            position: 'absolute',
            left: '3.64%',
            top: '28.52%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '3' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 7 - Position: x:15, y:131, w:60, h:19 */}
        <img
          src="/images/logos/image006 7.png"
          alt=""
          style={{
            position: 'absolute',
            left: '3.90%',
            top: '23.65%',
            width: '15.58%',
            height: '3.43%',
            opacity: selectedLogo === '7' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 12 - Position: x:310, y:186, w:75, h:25 */}
        <img
          src="/images/logos/image006 12.png"
          alt=""
          style={{
            position: 'absolute',
            left: '80.52%',
            top: '33.57%',
            width: '19.48%',
            height: '4.51%',
            opacity: selectedLogo === '12' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 14 - Position: x:322, y:385, w:60, h:20 */}
        <img
          src="/images/logos/image006 14.png"
          alt=""
          style={{
            position: 'absolute',
            left: '83.64%',
            top: '69.49%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '14' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 13 - Position: x:329, y:407, w:46, h:15 */}
        <img
          src="/images/logos/image006 13.png"
          alt=""
          style={{
            position: 'absolute',
            left: '85.45%',
            top: '73.47%',
            width: '11.95%',
            height: '2.71%',
            opacity: selectedLogo === '13' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 15 - Position: x:322, y:426, w:60, h:20 */}
        <img
          src="/images/logos/image006 15.png"
          alt=""
          style={{
            position: 'absolute',
            left: '83.64%',
            top: '76.90%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '15' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 24 - Position: x:14, y:388, w:60, h:20 */}
        <img
          src="/images/logos/image006 24.png"
          alt=""
          style={{
            position: 'absolute',
            left: '3.64%',
            top: '70.04%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '24' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 28 - Position: x:16, y:413, w:60, h:20 */}
        <img
          src="/images/logos/image006 28.png"
          alt=""
          style={{
            position: 'absolute',
            left: '4.16%',
            top: '74.55%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '28' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 27 - Position: x:11, y:433, w:75, h:25 */}
        <img
          src="/images/logos/image006 27.png"
          alt=""
          style={{
            position: 'absolute',
            left: '2.86%',
            top: '78.16%',
            width: '19.48%',
            height: '4.51%',
            opacity: selectedLogo === '27' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 22 - Position: x:115, y:477, w:60, h:19 */}
        <img
          src="/images/logos/image006 22.png"
          alt=""
          style={{
            position: 'absolute',
            left: '29.87%',
            top: '86.10%',
            width: '15.58%',
            height: '3.43%',
            opacity: selectedLogo === '22' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 23 - Position: x:115, y:504, w:60, h:20 */}
        <img
          src="/images/logos/image006 23.png"
          alt=""
          style={{
            position: 'absolute',
            left: '29.87%',
            top: '90.97%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '23' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 21 - Position: x:108, y:529, w:75, h:25 */}
        <img
          src="/images/logos/image006 21.png"
          alt=""
          style={{
            position: 'absolute',
            left: '28.05%',
            top: '95.49%',
            width: '19.48%',
            height: '4.51%',
            opacity: selectedLogo === '21' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 17 - Position: x:218, y:477, w:60, h:20 */}
        <img
          src="/images/logos/image006 17.png"
          alt=""
          style={{
            position: 'absolute',
            left: '56.62%',
            top: '86.10%',
            width: '15.58%',
            height: '3.61%',
            opacity: selectedLogo === '17' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 18 - Position: x:226, y:499, w:48, h:16 */}
        <img
          src="/images/logos/image006 18.png"
          alt=""
          style={{
            position: 'absolute',
            left: '58.70%',
            top: '90.07%',
            width: '12.47%',
            height: '2.89%',
            opacity: selectedLogo === '18' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        {/* image006 20 - Position: x:227, y:522, w:49, h:16 */}
        <img
          src="/images/logos/image006 20.png"
          alt=""
          style={{
            position: 'absolute',
            left: '58.96%',
            top: '94.22%',
            width: '12.73%',
            height: '2.89%',
            opacity: selectedLogo === '20' ? 1 : 0.3,
            zIndex: 1
          }}
        />

        
        {/* Group 19 - Modal - Position exacte: x:39, y:150, w:314, h:358 */}
        <div 
          data-modal-content
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            left: '10.13%', // 39/385
            top: '27.08%', // 150/554
            width: '81.56%', // 314/385
            height: '64.62%', // 358/554
            opacity: 0.99,
            zIndex: 10
          }}>
          {/* Rectangle 13 - Fond circulaire: x:0, y:0, w:314, h:307.62 */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '85.92%', // 307.62/358
            background: 'linear-gradient(180deg, #476DCE 0%, #243768 100%)',
            borderRadius: '50%',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)'
          }} />


          {/* Texte - Position: x:34.62, y:96.57, w:248.17, h:261.43 */}
          <div style={{
            position: 'absolute',
            left: '11.02%', // 34.62/314
            top: '26.99%', // 96.57/358
            width: '79.03%', // 248.17/314
            height: '73.01%', // 261.43/358
            color: '#FFFFFF',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: '11.48px', // 12px * 0.957
            userSelect: 'none',
            cursor: 'default'
          }}>
            {logoInfo?.description || ''}
          </div>

          {/* Logo dynamique basé sur la sélection - Toujours en pleine couleur */}
          <img
            src={logoInfo?.image || '/images/logos/image006 1.png'}
            alt=""
            style={{
              position: 'absolute',
              left: '30.57%', // 95.98/314
              top: '12.46%', // 44.59/358
              width: '36.91%', // 115.92/314
              height: '10.73%', // 38.4/358
              opacity: 1, // Toujours en pleine couleur
              zIndex: 11 // Au-dessus de tout
            }}
          />
        </div>

        {/* Vectors (lignes oranges) - Mêmes que variante 1 */}
        {/* Vector 1 - Position: x:21, y:221.5, w:37, h:31 */}
        <img
          src="/images/vector-line-1.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '5.45%',
            top: '39.98%',
            width: '9.61%',
            height: '5.60%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 2 - Position: x:337, y:221.5, w:37, h:31 */}
        <img
          src="/images/vector-line-2.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '87.53%',
            top: '39.98%',
            width: '9.61%',
            height: '5.60%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 3 - Position: x:338, y:350.5, w:37, h:31 */}
        <img
          src="/images/vector-line-3.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '87.79%',
            top: '63.27%',
            width: '9.61%',
            height: '5.60%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 4 - Position: x:17, y:353.5, w:37, h:31 */}
        <img
          src="/images/vector-line-4.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '4.42%',
            top: '63.81%',
            width: '9.61%',
            height: '5.60%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 5 - Position: x:126, y:142.5, w:37, h:19.5 */}
        <img
          src="/images/vector-line-5.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '32.73%',
            top: '25.72%',
            width: '9.61%',
            height: '3.52%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 6 - Position: x:229, y:142.5, w:37, h:19.5 */}
        <img
          src="/images/vector-line-6.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '59.48%',
            top: '25.72%',
            width: '9.61%',
            height: '3.52%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 7 - Position: x:130, y:448, w:37, h:19.5 */}
        <img
          src="/images/vector-line-7.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '33.77%',
            top: '80.87%',
            width: '9.61%',
            height: '3.52%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Vector 8 - Position: x:229, y:448, w:37, h:19.5 */}
        <img
          src="/images/vector-line-8.svg"
          alt=""
          style={{
            position: 'absolute',
            left: '59.48%',
            top: '80.87%',
            width: '9.61%',
            height: '3.52%',
            opacity: 0.5,
            zIndex: 2
          }}
        />

        {/* Bouton fermeture - Style rond orange avec croix blanche */}
        <button
          onClick={() => setSelectedLogo(null)}
          style={{
            position: 'absolute',
            right: '8%',
            top: 'calc(25% - 60px)',
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
            textDecoration: 'none',
            zIndex: 15
          }}
        >
          ×
        </button>
      </div>
    </section>
    );
  }
}
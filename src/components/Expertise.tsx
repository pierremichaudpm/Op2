 'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Expertise.module.css';

// Mapping des logos avec leurs fichiers correspondants
const logoMapping = {
  'Image006_10_311_221': 'image006 10.png',
  'Image006_11_311_222': 'image006 11.png',
  'Image006_12_311_223': 'image006 12.png',
  'Image006_13_311_224': 'image006 13.png',
  'Image006_16_311_238': 'image006 16.png',
  'Image006_17_311_227': 'image006 17.png',
  'Image006_18_311_228': 'image006 18.png',
  'Image006_19_311_229': 'image006 19.png',
  'Image006_21_311_231': 'image006 21.png',
  'Image006_22_311_232': 'image006 22.png',
  'Image006_23_311_237': 'image006 23.png',
  'Image006_24_311_233': 'image006 24.png',
  'Image006_26_311_235': 'image006 26.png',
  'Image006_27_311_236': 'image006 27.png',
  'Image006_28_311_234': 'image006 28.png',
  'Image006_29_311_246': 'image006 29.png',
  'Image006_30_311_247': 'image006 30.png',
  'Image006_2_311_239': 'image006 2.png',
  'Image006_3_311_240': 'image006 3.png',
  'Image006_4_311_241': 'image006 4.png',
  'Image006_5_311_242': 'image006 5.png',
  'Image006_6_311_243': 'image006 6.png',
  'Image006_7_311_244': 'image006 7.png',
  'Image006_8_311_245': 'image006 8.png'
};

// Thèmes et couleurs associées - angles précis selon position des logos
const themes = {
  infrastructure: { color: '#F36911', angle: 45 }, // Orange - portion droite-haut (zone pont/Pomerleau)
  naval: { color: '#2563EB', angle: 90 }, // Bleu - portion droite
  sante: { color: '#DC2626', angle: 135 }, // Rouge - portion droite-bas
  energie: { color: '#16A34A', angle: 180 }, // Vert - portion bas
  aeronautique: { color: '#7C3AED', angle: 225 }, // Violet - portion gauche-bas
  finance: { color: '#CA8A04', angle: 270 }, // Jaune - portion gauche
  tech: { color: '#0891B2', angle: 315 }, // Cyan - portion gauche-haut
  pharma: { color: '#DB2777', angle: 0 } // Rose - portion haut
};

// Informations techniques et spécifications
const companyInfo: { [key: string]: { name: string; description: string; sector: string; projects: string; theme?: keyof typeof themes } } = {
  'Image006_1_311_219': {
    name: 'Projet Expertise Mondiale',
    description: 'sectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat\n\nRead more',
    sector: 'Infrastructure',
    projects: 'Projet complexe',
    theme: 'infrastructure'
  },
  'Image006_9_311_220': {
    name: 'Solutions Navales',
    description: 'sectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat\n\nRead more',
    sector: 'Construction Navale',
    projects: 'Paquebots de croisière',
    theme: 'naval'
  },
  'Image006_10_311_221': {
    name: 'Tunnel Lafontaine - Montréal',
    description: 'La réfection du tunnel Louis-Hippolyte-La Fontaine représente un défi technique exceptionnel. La dégradation imprévue de la voûte a doublé le budget initial. L\'entreprise doit gérer ce chantier sous-marin complexe tout en maintenant la circulation de 120 000 véhicules quotidiens.',
    sector: 'Infrastructure Majeure',
    projects: 'Réfection tunnel sous-marin',
    theme: 'infrastructure'
  },
  'Image006_11_311_222': {
    name: 'Solutions Énergétiques',
    description: 'sectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat\n\nRead more',
    sector: 'Énergie',
    projects: 'Production électrique',
    theme: 'energie'
  },
  'Image006_12_311_223': {
    name: 'Component Architecture',
    description: 'Implement responsive design patterns with CSS modules. Adapt existing elements while maintaining design consistency and accessibility standards.',
    sector: 'Frontend Architecture',
    projects: 'font-style: normal; font-weight: 400; line-height: 23px; text-decoration-line: underline;',
    theme: 'tech'
  },
  'Image006_13_311_224': {
    name: 'Module CSS Patterns',
    description: 'text-decoration-style: solid; text-decoration-thickness: auto; display: inline-block. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    sector: 'CSS Architecture',
    projects: 'width: 447.345px; height: 463.177px; color: #e7f2ff; text-align: center;',
    theme: 'tech'
  },
  'Image006_14_311_225': {
    name: 'React Hook Implementation',
    description: 'Nunc sed vulputate est donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas morbi vel euismod leo.',
    sector: 'State Management',
    projects: 'useState, useEffect, useCallback, useMemo patterns for optimal performance',
    theme: 'tech'
  },
  'Image006_15_311_226': {
    name: 'Responsive Design System',
    description: 'Id rutrum dui mauris est ex lacinia nec pulvinar eu eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim.',
    sector: 'Mobile-First Design',
    projects: '@media queries, flexbox, grid layouts, container queries implementation',
    theme: 'tech'
  },
  'Image006_16_311_238': {
    name: 'TypeScript Definitions',
    description: 'Id lectus phasellus ultrices nulla sit amet diam consequat. Implement following design in React with type safety.',
    sector: 'Type System',
    projects: 'interface Props { className?: string; children: React.ReactNode; }',
    theme: 'tech'
  },
  'Image006_17_311_227': {
    name: 'Component Library',
    description: 'Use following files generated from Figma design as specification guide but adapt with existing elements and design tokens.',
    sector: 'Design Tokens',
    projects: 'Storybook documentation, prop validation, accessibility testing'
  },
  'Image006_18_311_228': {
    name: 'CSS-in-JS Solutions',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nunc sed vulputate est donec interdum sollicitudin neque quisque.',
    sector: 'Styling Solutions',
    projects: 'styled-components, emotion, CSS modules, Tailwind integration patterns'
  },
  'Image006_19_311_229': {
    name: 'Performance Optimization',
    description: 'Cursus non felis vitae egestas morbi vel euismod leo id rutrum dui. Mauris est ex lacinia nec pulvinar eu eleifend a tortor.',
    sector: 'Web Performance',
    projects: 'Code splitting, lazy loading, bundle optimization, Core Web Vitals'
  },
  'Image006_20_311_230': {
    name: 'Accessibility Standards',
    description: 'Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat lorem ipsum.',
    sector: 'WCAG Compliance',
    projects: 'ARIA labels, semantic HTML, keyboard navigation, screen reader support'
  },
  'Image006_21_311_231': {
    name: 'Testing Frameworks',
    description: 'Dolor sit amet consectetur adipiscing elit nunc sed vulputate est. Donec interdum sollicitudin neque quisque cursus non felis.',
    sector: 'Quality Assurance',
    projects: 'Jest, React Testing Library, Cypress, Playwright automation'
  },
  'Image006_22_311_232': {
    name: 'Build Tool Configuration',
    description: 'Vitae egestas morbi vel euismod leo id rutrum dui mauris est ex. Lacinia nec pulvinar eu eleifend a tortor donec ut odio.',
    sector: 'Development Tools',
    projects: 'Webpack, Vite, ESLint, Prettier, Husky pre-commit hooks'
  },
  'Image006_23_311_237': {
    name: 'API Integration Patterns',
    description: 'In nibh condimentum sodales dignissim id lectus phasellus. Ultrices nulla sit amet diam consequat implement following design.',
    sector: 'Data Management',
    projects: 'REST APIs, GraphQL, SWR, React Query, error handling patterns'
  },
  'Image006_24_311_233': {
    name: 'Deployment Strategies',
    description: 'In React use following files generated from Figma design as specification guide. Adapt with existing elements and maintain consistency.',
    sector: 'DevOps Integration',
    projects: 'CI/CD pipelines, Docker containers, Vercel, Netlify deployments'
  },
  'Image006_26_311_235': {
    name: 'State Management Patterns',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Nunc sed vulputate est donec interdum sollicitudin neque quisque cursus.',
    sector: 'Redux & Context',
    projects: 'Redux Toolkit, Zustand, Context API, state normalization patterns'
  },
  'Image006_27_311_236': {
    name: 'Server-Side Rendering',
    description: 'Non felis vitae egestas morbi vel euismod leo id rutrum dui. Mauris est ex lacinia nec pulvinar eu eleifend a tortor donec.',
    sector: 'Next.js Framework',
    projects: 'SSR, SSG, ISR, API routes, middleware, dynamic imports'
  },
  'Image006_28_311_234': {
    name: 'Design System Implementation',
    description: 'Ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat lorem ipsum dolor.',
    sector: 'Component Library',
    projects: 'Design tokens, theme provider, variant systems, documentation'
  },
  'Image006_2_311_239': {
    name: 'Animation Libraries',
    description: 'Sit amet consectetur adipiscing elit nunc sed vulputate est. Donec interdum sollicitudin neque quisque cursus non felis vitae.',
    sector: 'Motion Design',
    projects: 'Framer Motion, React Spring, CSS animations, GSAP integration'
  },
  'Image006_3_311_240': {
    name: 'Form Validation Systems',
    description: 'Egestas morbi vel euismod leo id rutrum dui mauris est ex. Lacinia nec pulvinar eu eleifend a tortor donec ut odio in nibh.',
    sector: 'User Input Handling',
    projects: 'React Hook Form, Formik, Yup validation, custom validators'
  },
  'Image006_4_311_241': {
    name: 'Error Boundary Implementation',
    description: 'Condimentum sodales dignissim id lectus phasellus ultrices nulla. Sit amet diam consequat implement following design in React.',
    sector: 'Error Handling',
    projects: 'Error boundaries, fallback UI, error reporting, recovery strategies'
  },
  'Image006_5_311_242': {
    name: 'Internationalization Setup',
    description: 'Use following files generated from Figma design as specification guide. Adapt with existing elements but maintain design consistency.',
    sector: 'i18n Implementation',
    projects: 'React Intl, next-i18next, locale routing, RTL support'
  },
  'Image006_29_311_246': {
    name: 'Partenaire 29',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nunc sed vulputate. Est donec interdum sollicitudin neque quisque cursus non.',
    sector: 'Secteur 29',
    projects: 'Projet 29'
  },
  'Image006_30_311_247': {
    name: 'Partenaire 30',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nunc sed vulputate. Est donec interdum sollicitudin neque quisque cursus non.',
    sector: 'Secteur 30',
    projects: 'Projet 30'
  },
  'Image006_6_311_243': {
    name: 'Security Best Practices',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nunc sed vulputate. Est donec interdum sollicitudin neque quisque cursus non.',
    sector: 'Web Security',
    projects: 'XSS prevention, CSRF protection, content security policy, sanitization'
  },
  'Image006_7_311_244': {
    name: 'Progressive Web App',
    description: 'Felis vitae egestas morbi vel euismod leo id rutrum dui. Mauris est ex lacinia nec pulvinar eu eleifend a tortor donec ut.',
    sector: 'PWA Features',
    projects: 'Service workers, offline functionality, app manifest, push notifications'
  },
  'Image006_8_311_245': {
    name: 'Micro-Frontend Architecture',
    description: 'Odio in nibh condimentum sodales dignissim id lectus phasellus. Ultrices nulla sit amet diam consequat read more implementation.',
    sector: 'Scalable Architecture',
    projects: 'Module federation, single-spa, micro-frontend communication patterns'
  }
};

function LogoContainer({ 
  className, 
  logoKey, 
  onClick,
  isSelected,
  hasAnySelection,
  isPulsing
}: { 
  className: string; 
  logoKey: string; 
  onClick: (key: string) => void;
  isSelected: boolean;
  hasAnySelection: boolean;
  isPulsing?: boolean;
}) {
  const logoFile = logoMapping[logoKey as keyof typeof logoMapping];
  const [isHovered, setIsHovered] = useState(false);
  
  if (!logoFile) {
    return null;
  }

  // Déterminer le filtre à appliquer
  let filter = '';
  if (isSelected) {
    // Logo sélectionné : couleurs normales avec effet
    filter = 'brightness(1.1) saturate(1.2)';
  } else if (hasAnySelection) {
    // Un autre logo est sélectionné : blur double pour disparaître davantage
    filter = 'saturate(0.2) brightness(1.2) opacity(0.3) blur(1px)';
  } else if (isHovered) {
    // Logo survolé : légère amélioration
    filter = 'brightness(1.05) saturate(1.1)';
  } else {
    // État par défaut : logos en couleur, pas de filtre
    filter = 'none';
  }
  
  return (
    <div 
      className={`${className} ${styles.logoContainer} ${isPulsing && !isSelected && !hasAnySelection ? styles.logoPulsing : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(logoKey);
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img 
          src={`/images/logos/${logoFile}`} 
          alt="Logo" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: filter,
            transition: 'all 0.4s ease',
            transform: isSelected ? 'scale(1.15)' : (isHovered ? 'scale(1.1)' : 'scale(1)'),
            zIndex: isSelected ? 25 : (isHovered ? 20 : 10)
          }}
        />
        
        
      </div>
      
    </div>
  );
}

export default function Expertise() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Détection de visibilité avec IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Déclenche quand 30% de la section est visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);
  
  // Ouverture automatique de démo la première fois quand visible
  useEffect(() => {
    const hasSeenDemo = localStorage.getItem('expertise-demo-seen');
    
    if (!hasSeenDemo && isVisible) {
      // Ouvrir automatiquement après 0.5 seconde
      const openTimer = setTimeout(() => {
        setSelectedCompany('Image006_10_311_221'); // Logo Pomerleau
      }, 500);
      
      // Fermer automatiquement après 3 secondes
      const closeTimer = setTimeout(() => {
        setSelectedCompany(null);
        localStorage.setItem('expertise-demo-seen', 'true');
      }, 3500);
      
      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isVisible]);
  
  const handleLogoClick = (logoKey: string) => {
    setSelectedCompany(logoKey);
  };

  const handleCloseInfo = () => {
    setSelectedCompany(null);
  };

  const selectedInfo = selectedCompany ? companyInfo[selectedCompany] : null;
  const hasAnySelection = selectedCompany !== null;

  return (
    <div ref={containerRef} className={styles.Expertise_311_396} onClick={handleCloseInfo}>
      {/* Globe avec vidéo */}
      <div className={styles.Globe_311_217}>
        <video 
          className={styles.video}
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/globe4.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Cercle/Anneau autour du globe */}
      <div className={styles.GlobeCircle_1_311_218}>
      </div>
      
      
      {/* Overlay d'information */}
      {selectedInfo && (
        <div className={styles.infoOverlay} onClick={handleCloseInfo}>
          <button 
            className={styles.closeButton}
            onClick={handleCloseInfo}
          >
            ×
          </button>
          <div className={styles.infoCircle} onClick={(e) => e.stopPropagation()}>
            <div className={styles.infoContent}>
              {/* Logo */}
              <div className={styles.logoHeader}>
                <img 
                  src={`/images/logos/${logoMapping[selectedCompany as keyof typeof logoMapping]}`}
                  alt="Logo"
                  className={styles.overlayLogo}
                />
              </div>
              
              {/* Titre du projet */}
              <h2 className={styles.companyName}>
                {selectedInfo.name || 'Projet'}
              </h2>
              
              {/* Description */}
              <div className={styles.projectDescription}>
                <p>{selectedInfo.description || 'Description du projet'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tous les logos avec leurs positions exactes */}
      <LogoContainer className={styles.Image006_10_311_221} logoKey="Image006_10_311_221" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_10_311_221'} hasAnySelection={hasAnySelection} isPulsing={true} />
      <LogoContainer className={styles.Image006_11_311_222} logoKey="Image006_11_311_222" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_11_311_222'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_12_311_223} logoKey="Image006_12_311_223" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_12_311_223'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_13_311_224} logoKey="Image006_13_311_224" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_13_311_224'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_17_311_227} logoKey="Image006_17_311_227" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_17_311_227'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_18_311_228} logoKey="Image006_18_311_228" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_18_311_228'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_19_311_229} logoKey="Image006_19_311_229" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_19_311_229'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_21_311_231} logoKey="Image006_21_311_231" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_21_311_231'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_22_311_232} logoKey="Image006_22_311_232" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_22_311_232'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_24_311_233} logoKey="Image006_24_311_233" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_24_311_233'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_28_311_234} logoKey="Image006_28_311_234" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_28_311_234'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_29_311_246} logoKey="Image006_29_311_246" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_29_311_246'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_30_311_247} logoKey="Image006_30_311_247" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_30_311_247'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_26_311_235} logoKey="Image006_26_311_235" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_26_311_235'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_27_311_236} logoKey="Image006_27_311_236" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_27_311_236'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_23_311_237} logoKey="Image006_23_311_237" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_23_311_237'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_16_311_238} logoKey="Image006_16_311_238" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_16_311_238'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_2_311_239} logoKey="Image006_2_311_239" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_2_311_239'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_3_311_240} logoKey="Image006_3_311_240" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_3_311_240'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_4_311_241} logoKey="Image006_4_311_241" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_4_311_241'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_5_311_242} logoKey="Image006_5_311_242" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_5_311_242'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_6_311_243} logoKey="Image006_6_311_243" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_6_311_243'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_7_311_244} logoKey="Image006_7_311_244" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_7_311_244'} hasAnySelection={hasAnySelection} />
      <LogoContainer className={styles.Image006_8_311_245} logoKey="Image006_8_311_245" onClick={handleLogoClick} isSelected={selectedCompany === 'Image006_8_311_245'} hasAnySelection={hasAnySelection} />
    </div>
  );
}
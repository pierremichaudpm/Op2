"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { fr } from '@/lib/dictionaries/fr';
import { en } from '@/lib/dictionaries/en';

interface LogoInfo {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Données des logos avec leurs informations
const logosData: LogoInfo[] = [
  { id: '10', name: 'Réfection d\'un axe routier majeur', description: 'Un chantier d\'envergure où l\'imprévu devient la norme. La dégradation de la voûte a doublé le budget, mais pas question d\'arrêter : 120 000 véhicules circulent chaque jour. Notre défi? Piloter cette réfection sous-marine complexe en gardant le cap sur les délais, tout en assurant la fluidité du trafic.', image: '/images/logos/image006 10.png' },
  { id: '11', name: 'Partenariat Project Management Institute', description: 'Connecter la recherche, le terrain et les meilleures pratiques : c\'est l\'ambition de ce partenariat. Op2 collabore avec le Project Management Institute pour outiller et inspirer les professionnels de projet au Québec. Ensemble, nous élevons les standards de l\'industrie.', image: '/images/logos/image006 11.png' },
  { id: '8', name: 'Déploiement outil gestion de portefeuille', description: 'Pilotage homogène du portefeuille et des ressources : un dispositif unique pour toutes les équipes. Déploiement de l\'outil, optimisation des charges et capacités, accompagnement des équipes et conduite du changement pour ancrer durablement la transformation.', image: '/images/logos/image006 8.png' },
  { id: '5', name: 'Réponse au plan 2035', description: 'Le Plan 2035 change la donne : l\'organisation doit évoluer pour atteindre ses objectifs ambitieux. Nous avons agilisé et standardisé les pratiques dans l\'objectif de renforcer les capacités de l\'organisation. Recommandations claires et accompagnement terrain pour ancrer durablement le changement.', image: '/images/logos/image006 5.png' },
  { id: '29', name: 'Implication universitaire', description: 'Former la relève, c\'est investir dans l\'avenir de notre industrie. Partage de notre expertise terrain à travers conférences, animation de sessions et participation comme juge dans des concours universitaires. Nous créons des ponts entre pratique professionnelle et excellence en formation.', image: '/images/logos/image006 29.png' },
  { id: '30', name: 'Implication universitaire', description: 'Former la relève, c\'est investir dans l\'avenir de notre industrie. Partage de notre expertise terrain à travers conférences, animation de sessions et participation comme juge dans des concours universitaires. Nous créons des ponts entre pratique professionnelle et excellence en formation.', image: '/images/logos/image006 30.png' },
  { id: '13', name: 'Logistique externalisée', description: 'Externaliser sa logistique sans perdre le contrôle : c\'est tout l\'enjeu. Direction d\'un projet de transition en assurant le transfert d\'activités en interface avec le client final, la montée en compétence des opérateurs et zéro interruption dans les livraisons.', image: '/images/logos/image006 13.png' },
  { id: '16', name: 'Capitalisation projets antérieurs', description: 'Accélérer la livraison en capitalisant sur l\'expérience. Transformation des enseignements des premières phases en leviers concrets d\'amélioration et de sécurisation, appuyés par les meilleures pratiques en gestion de projet.', image: '/images/logos/image006 16.png' },
  { id: '24', name: 'Projets ferroviaires clés en main', description: 'Des projets ferroviaires clé en main, de l\'offre à la livraison. Plusieurs chantiers simultanés, différents stades d\'avancement, une complexité qui s\'additionne. Formation des équipes à la planification de haut niveau et coordination d\'ensemble pour transformer la complexité en performance.', image: '/images/logos/image006 24.png' },
  { id: '28', name: 'Transformation des pratiques projet', description: 'Une transformation portée au plus haut niveau : renforcement des fondamentaux en gestion de projet, pilotage standardisé et KPI homogènes pour sécuriser les engagements et renforcer la compétitivité. Parce qu\'une organisation performante repose sur des bases solides.', image: '/images/logos/image006 28.png' },
  { id: '22', name: 'Formation planification complexe', description: 'Maîtriser la planification, c\'est maîtriser ses projets. Formation spécialisée en planification de projets complexes pour 40 professionnels. Approche terrain avec exercices pratiques, cas d\'étude réels, partage d\'expérience et quiz interactifs.', image: '/images/logos/image006 22.png' },
  { id: '23', name: 'Réorientation stratégique programme', description: 'Changement de cap : la stratégie de développement et de construction évolue, et tout le programme doit suivre. Formalisation et partage de cette nouvelle vision pour garantir la mise sous contrôle opérationnel. Nous avons embarqué les acteurs terrain pour ancrer ce virage stratégique.', image: '/images/logos/image006 23.png' },
  { id: '17', name: 'Campagne Covid-19', description: 'Une mission critique, à l\'échelle nationale, sans droit à l\'erreur. Vacciner un pays entier exige synchronisation parfaite, logistique rigoureuse et adaptation constante. Nous avons coordonné les ressources et les acteurs pour livrer cette campagne dans un contexte sanitaire sans précédent.', image: '/images/logos/image006 17.png' },
  { id: '18', name: 'Programme anticontrefaçon', description: 'Protéger votre marque, c\'est protéger vos revenus. Pilotage du déploiement d\'un système anticontrefaçon sur l\'ensemble du portfolio produits. Traçabilité, authentification, coordination multifonctionnelle à l\'échelle globale pour sécuriser votre position concurrentielle.', image: '/images/logos/image006 18.png' },
];

export function MobileExpertiseMondiale() {
  const { locale } = useI18n();
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Ouverture automatique de démo la première fois quand visible
  useEffect(() => {
    const hasSeenDemo = localStorage.getItem('expertise-mobile-demo-seen');
    
    if (!hasSeenDemo && isVisible) {
      // Ouvrir automatiquement après 0.5 seconde
      const openTimer = setTimeout(() => {
        setSelectedLogo('10'); // Logo Pomerleau
      }, 500);
      
      // Fermer automatiquement après 3 secondes
      const closeTimer = setTimeout(() => {
        setSelectedLogo(null);
        localStorage.setItem('expertise-mobile-demo-seen', 'true');
      }, 3500);
      
      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isVisible]);

  // Variant 1 (Default) - Adapté depuis Figma avec positionnement proportionnel
  if (!selectedLogo) {
    return (
      <section ref={sectionRef} id="expertise" style={{
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
              left: '27.27%', // Ajusté pour centrer avec la nouvelle taille
              top: '38.09%', // Ajusté pour centrer avec la nouvelle taille
              width: '48.31%', // Réduit de 1px (186/385 au lieu de 188/385)
              height: '33.57%', // Réduit de 1px (186/554 au lieu de 188/554)
              borderRadius: '50%',
              objectFit: 'cover',
              zIndex: 2
            }}
          >
            <source src="/videos/globe4.mp4" type="video/mp4" />
          </video>

          {/* Logos avec positions exactes de Figma */}
          
          {/* image006 10 1 - Position Figma: x:89, y:129, w:75, h:25 - CLICKABLE (déplacé de 15px vers la gauche) */}
          <motion.img
            src="/images/logos/image006 10.png"
            alt=""
            onClick={() => setSelectedLogo('10')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{
              position: 'absolute',
              left: '21.6%',
              top: '22%',
              width: '23%',
              height: '5.4%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 11 1 - Position Figma: x:223, y:127, w:75, h:24 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 11.png"
            alt=""
            onClick={() => setSelectedLogo('11')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              position: 'absolute',
              left: '56%', // Ajusté pour centrer avec la nouvelle taille
              top: '21.5%', // Ajusté pour centrer avec la nouvelle taille
              width: '23%', // Augmenté de ~18%
              height: '5.2%', // Augmenté de ~20%
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 8 1 - Position Figma: x:-1, y:206, w:75, h:25 - CLICKABLE (descendu de 10px, déplacé de 10px à gauche) */}
          <motion.img
            src="/images/logos/image006 8.png"
            alt=""
            onClick={() => setSelectedLogo('8')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            style={{
              position: 'absolute',
              left: '-4.6%',
              top: '37.8%',
              width: '23%',
              height: '5.4%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 5 1 - Position Figma: x:10, y:171, w:60, h:20 - CLICKABLE (descendu de 10px) */}
          <motion.img
            src="/images/logos/image006 5.png"
            alt=""
            onClick={() => setSelectedLogo('5')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              position: 'absolute',
              left: '3.6%',
              top: '30.4%',
              width: '18.5%',
              height: '4.3%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />


          {/* image006 29 1 - Position Figma: x:293, y:188, w:75, h:25 - CLICKABLE (réduit de 25%, descendu de 10px, déplacé de 10px à droite et 5px vers le bas) */}
          <motion.img
            src="/images/logos/image006 29.png"
            alt=""
            onClick={() => setSelectedLogo('29')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            style={{
              position: 'absolute',
              left: '81.1%',
              top: '30.7%',
              width: '15%',
              height: '3.6%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 30 1 - Position Figma: x:293, y:212, w:60, h:20 - CLICKABLE (réduit de 20%, descendu de 10px, déplacé de 35px à droite) */}
          <motion.img
            src="/images/logos/image006 30.png"
            alt=""
            onClick={() => setSelectedLogo('30')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
            style={{
              position: 'absolute',
              left: '87.6%',
              top: '35.8%',
              width: '14.4%',
              height: '3.36%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 13 1 - Position Figma: x:304, y:385, w:60, h:20 - CLICKABLE (ancien emplacement du 14, descendu de 10px, réduit de 25%, déplacé de 10px à droite) */}
          <motion.img
            src="/images/logos/image006 13.png"
            alt=""
            onClick={() => setSelectedLogo('13')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
            style={{
              position: 'absolute',
              left: '84.8%',
              top: '69.8%',
              width: '16.65%',
              height: '3.87%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 16 1 - Position Figma: x:308, y:416, w:60, h:20 - CLICKABLE (ancien emplacement du 15, descendu de 10px, grossi de 32%, déplacé de 10px à gauche) */}
          <motion.img
            src="/images/logos/image006 16.png"
            alt=""
            onClick={() => setSelectedLogo('16')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3
            }}
            style={{
              position: 'absolute',
              left: '75.4%',
              top: '75.3%',
              width: '24.42%',
              height: '5.676%',
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 24 1 - Position Figma: x:14, y:388, w:60, h:20 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 24.png"
            alt=""
            onClick={() => setSelectedLogo('24')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8
            }}
            style={{
              position: 'absolute',
              left: '-3.2%', // Déplacé de 20px vers la gauche (-6/385 au lieu de 14/385)
              top: '68.86%', // Descendu de 2px au total (390/554)
              width: '18.5%', // Augmenté de ~19%
              height: '4.3%', // Augmenté de ~19%
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 28 1 - Position Figma: x:14, y:411, w:60, h:20 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 28.png"
            alt=""
            onClick={() => setSelectedLogo('28')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.3
            }}
            style={{
              position: 'absolute',
              left: '2%', // Ajusté pour centrer avec la nouvelle taille
              top: '75.21%', // Descendu de 10px supplémentaires
              width: '18.5%', // Augmenté de ~19%
              height: '4.3%', // Augmenté de ~19%
              cursor: 'pointer',
              zIndex: 3
            }}
          />


          {/* image006 22 1 - Position Figma: x:115, y:467, w:60, h:19 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 22.png"
            alt=""
            onClick={() => setSelectedLogo('22')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
            style={{
              position: 'absolute',
              left: '28%', // Ajusté pour centrer avec la nouvelle taille
              top: '82.5%', // Ajusté pour centrer avec la nouvelle taille
              width: '18.5%', // Augmenté de ~19%
              height: '4.1%', // Augmenté de ~19%
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 23 1 - Position Figma: x:115, y:504, w:60, h:20 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 23.png"
            alt=""
            onClick={() => setSelectedLogo('23')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
            style={{
              position: 'absolute',
              left: '28%', // Ajusté pour centrer avec la nouvelle taille
              top: '89%', // Ajusté pour centrer avec la nouvelle taille
              width: '18.5%', // Augmenté de ~19%
              height: '4.3%', // Augmenté de ~19%
              cursor: 'pointer',
              zIndex: 3
            }}
          />


          {/* image006 17 1 - Position Figma: x:218, y:467, w:60, h:20 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 17.png"
            alt=""
            onClick={() => setSelectedLogo('17')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2
            }}
            style={{
              position: 'absolute',
              left: '53.8%', // Ajusté pour centrer avec la nouvelle taille plus grande
              top: '82.9%', // Remonté de 5px
              width: '22.39%', // Augmenté de 10% supplémentaire (20.35% * 1.1)
              height: '5.20%', // Augmenté de 10% supplémentaire (4.73% * 1.1)
              cursor: 'pointer',
              zIndex: 3
            }}
          />

          {/* image006 18 1 - Position Figma: x:226, y:497, w:48, h:16 - CLICKABLE */}
          <motion.img
            src="/images/logos/image006 18.png"
            alt=""
            onClick={() => setSelectedLogo('18')}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.7
            }}
            style={{
              position: 'absolute',
              left: '57%', // Ajusté pour centrer avec la nouvelle taille
              top: '89.8%', // Descendu de 10px
              width: '15%', // Augmenté de ~20%
              height: '3.5%', // Augmenté de ~21%
              cursor: 'pointer',
              zIndex: 3
            }}
          />


        </div>
      </section>
    );
  }

  // Variant 2 - Modal pour afficher les détails du logo sélectionné
  if (selectedLogo) {
    const logoInfo = logosData.find(logo => logo.id === selectedLogo);
    const logoTranslation = locale === 'en' ? en.logos[selectedLogo as keyof typeof en.logos] : fr.logos[selectedLogo as keyof typeof fr.logos];

    return (
    <section ref={sectionRef} style={{
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
        {locale === 'en' ? 'Global expertise' : 'Une expertise mondiale'}
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
            left: '27.27%', // Ajusté pour centrer avec la nouvelle taille
            top: '38.09%', // Ajusté pour centrer avec la nouvelle taille
            width: '48.31%', // Réduit de 1px (186/385 au lieu de 188/385)
            height: '33.57%', // Réduit de 1px (186/554 au lieu de 188/554)
            borderRadius: '50%',
            objectFit: 'cover',
            zIndex: 2
          }}
        >
          <source src="/videos/globe4.mp4" type="video/mp4" />
        </video>

        {/* Logos avec mêmes positions que variante 1 mais en arrière-plan */}
        {/* image006 10 1 - Position Figma: x:89, y:129, w:75, h:25 (déplacé de 15px vers la gauche) */}
        <div
          style={{
            position: 'absolute',
            left: '21.6%', // Ajusté pour centrer avec la nouvelle taille
            top: '22%', // Ajusté pour centrer avec la nouvelle taille
            width: '23%', // Augmenté de ~18%
            height: '5.4%', // Augmenté de ~20%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '10' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 10.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 11 1 - Position Figma: x:223, y:127, w:75, h:24 */}
        <div
          style={{
            position: 'absolute',
            left: '56%', // Ajusté pour centrer avec la nouvelle taille
            top: '21.5%', // Ajusté pour centrer avec la nouvelle taille
            width: '23%', // Augmenté de ~18%
            height: '5.2%', // Augmenté de ~20%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '11' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 11.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 8 1 - Position Figma: x:-1, y:206, w:75, h:25 (descendu de 10px, déplacé de 10px à gauche) */}
        <div
          style={{
            position: 'absolute',
            left: '-4.6%',
            top: '37.8%',
            width: '23%',
            height: '5.4%',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '8' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 8.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 5 1 - Position Figma: x:10, y:171, w:60, h:20 (descendu de 10px) */}
        <div
          style={{
            position: 'absolute',
            left: '3.6%',
            top: '30.4%',
            width: '18.5%',
            height: '4.3%',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '5' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 5.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>


        {/* image006 29 1 - Position Figma: x:293, y:188, w:75, h:25 (réduit de 25%, descendu de 10px, déplacé de 10px à droite et 5px vers le bas) */}
        <div
          style={{
            position: 'absolute',
            left: '81.1%',
            top: '30.7%',
            width: '15%',
            height: '3.6%',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '29' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 29.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 30 1 - Position Figma: x:293, y:212, w:60, h:20 (réduit de 20%, descendu de 10px, déplacé de 35px à droite) */}
        <div
          style={{
            position: 'absolute',
            left: '87.6%',
            top: '35.8%',
            width: '14.4%',
            height: '3.36%',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '30' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 30.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 13 1 - Position Figma: x:304, y:385, w:60, h:20 (ancien emplacement du 14, descendu de 10px, réduit de 25%, déplacé de 10px à droite) */}
        <div
          style={{
            position: 'absolute',
            left: '84.8%',
            top: '69.8%',
            width: '16.65%',
            height: '3.87%',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '13' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 13.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 16 1 - Position Figma: x:308, y:416, w:60, h:20 (ancien emplacement du 15, descendu de 10px, grossi de 32%, déplacé de 10px à gauche) */}
        <div
          style={{
            position: 'absolute',
            left: '75.4%',
            top: '75.3%',
            width: '24.42%',
            height: '5.676%',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '16' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 16.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 24 1 - Position Figma: x:14, y:388, w:60, h:20 */}
        <div
          style={{
            position: 'absolute',
            left: '-3.2%', // Déplacé de 20px vers la gauche (-6/385 au lieu de 14/385)
            top: '68.86%', // Descendu de 2px au total (390/554)
            width: '18.5%', // Augmenté de ~19%
            height: '4.3%', // Augmenté de ~19%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '24' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 24.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 28 1 - Position Figma: x:14, y:411, w:60, h:20 */}
        <div
          style={{
            position: 'absolute',
            left: '2%', // Ajusté pour centrer avec la nouvelle taille
            top: '75.21%', // Descendu de 10px supplémentaires
            width: '18.5%', // Augmenté de ~19%
            height: '4.3%', // Augmenté de ~19%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '28' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 28.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>


        {/* image006 22 1 - Position Figma: x:115, y:467, w:60, h:19 */}
        <div
          style={{
            position: 'absolute',
            left: '28%', // Ajusté pour centrer avec la nouvelle taille
            top: '82.5%', // Ajusté pour centrer avec la nouvelle taille
            width: '18.5%', // Augmenté de ~19%
            height: '4.1%', // Augmenté de ~19%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '22' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 22.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 23 1 - Position Figma: x:115, y:504, w:60, h:20 */}
        <div
          style={{
            position: 'absolute',
            left: '28%', // Ajusté pour centrer avec la nouvelle taille
            top: '89%', // Ajusté pour centrer avec la nouvelle taille
            width: '18.5%', // Augmenté de ~19%
            height: '4.3%', // Augmenté de ~19%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '23' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 23.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>


        {/* image006 17 1 - Position Figma: x:218, y:467, w:60, h:20 */}
        <div
          style={{
            position: 'absolute',
            left: '53.8%', // Ajusté pour centrer avec la nouvelle taille plus grande
            top: '82.9%', // Remonté de 5px
            width: '22.39%', // Augmenté de 10% supplémentaire (20.35% * 1.1)
            height: '5.20%', // Augmenté de 10% supplémentaire (4.73% * 1.1)
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '17' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 17.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* image006 18 1 - Position Figma: x:226, y:497, w:48, h:16 */}
        <div
          style={{
            position: 'absolute',
            left: '57%', // Ajusté pour centrer avec la nouvelle taille
            top: '89.8%', // Descendu de 10px
            width: '15%', // Augmenté de ~20%
            height: '3.5%', // Augmenté de ~21%
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '2px',
            opacity: selectedLogo === '18' ? 1 : 0.3,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/logos/image006 18.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>


        
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
            background: 'linear-gradient(180deg, #6B94E0 0%, #5A82D8 15%, #476DCE 30%, #3A5BA5 65%, #243768 100%)',
            borderRadius: '50%',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)'
          }} />

          {/* Logo dynamique basé sur la sélection - Toujours en pleine couleur */}
          <div
            style={{
              position: 'absolute',
              left: '30.57%', // 95.98/314
              top: '12.46%', // 44.59/358
              width: '36.91%', // 115.92/314
              height: '10.73%', // 38.4/358
              backgroundColor: 'white',
              borderRadius: '6px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1, // Toujours en pleine couleur
              zIndex: 11 // Au-dessus de tout
            }}
          >
            <img
              src={logoInfo?.image || '/images/logos/image006 1.png'}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Conteneur pour titre + description avec espacement automatique */}
          <div style={{
            position: 'absolute',
            left: '11.02%',
            top: '29.69%', // Descendu de 15px
            width: '79.03%',
            height: '69%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px', // Espacement fixe de 10px entre titre et description
            zIndex: 11
          }}>
            {/* Titre du projet */}
            <h2
              style={{
                color: '#F36911',
                fontFamily: 'Gotham, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                lineHeight: '1.15',
                margin: 0,
                padding: '0 10px',
                userSelect: 'none',
                cursor: 'default',
                width: '100%',
                flexShrink: 0 // Ne pas rétrécir le titre
              }}
            >
              {logoTranslation?.name || ''}
            </h2>

            {/* Description */}
            <div style={{
              color: '#FFFFFF',
              fontFamily: 'Gotham, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              textAlign: 'center',
              lineHeight: '13px',
              userSelect: 'none',
              cursor: 'default',
              overflowY: 'auto',
              width: '100%',
              flex: 1 // Prend l'espace restant
            }}>
              {logoTranslation?.description || ''}
            </div>
          </div>
        </div>


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
"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "../styles/Expertise.module.css";
import { useI18n } from "@/lib/i18n";
import { fr } from "@/lib/dictionaries/fr";
import { en } from "@/lib/dictionaries/en";
import { VideoBackground } from "@/components/ui/video-background";

// Check if we're on iPad Safari (WebKit + touch device)
const useIsIPadSafari = () => {
  const [isIPadSafari, setIsIPadSafari] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari =
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Chromium/.test(ua) &&
      !/Edg/.test(ua);
    const isIPad =
      /iPad/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIPadSafari(isSafari && isIPad);
  }, []);
  return isIPadSafari;
};

// Mapping des logos avec leurs fichiers correspondants
const logoMapping = {
  Image006_10_311_221: "image006 10.png",
  Image006_11_311_222: "image006 11.png",
  Image006_12_311_223: "image006 12.png",
  Image006_13_311_224: "image006 13.png",
  Image006_16_311_238: "image006 16.png",
  Image006_17_311_227: "image006 17.png",
  Image006_18_311_228: "image006 18.png",
  Image006_19_311_229: "image006 19.png",
  Image006_21_311_231: "image006 21.png",
  Image006_22_311_232: "image006 22.png",
  Image006_23_311_237: "image006 23.png",
  Image006_24_311_233: "image006 24.png",
  Image006_26_311_235: "image006 26.png",
  Image006_27_311_236: "image006 27.png",
  Image006_28_311_234: "image006 28.png",
  Image006_29_311_246: "image006 29.png",
  Image006_30_311_247: "image006 30.png",
  Image006_2_311_239: "image006 2.png",
  Image006_3_311_240: "image006 3.png",
  Image006_4_311_241: "image006 4.png",
  Image006_5_311_242: "image006 5.png",
  Image006_6_311_243: "image006 6.png",
  Image006_7_311_244: "image006 7.png",
  Image006_8_311_245: "image006 8.png",
};

// Mapping des clés de logo vers les IDs de traduction
const logoIdMapping: { [key: string]: string } = {
  Image006_10_311_221: "10",
  Image006_11_311_222: "11",
  Image006_8_311_245: "8",
  Image006_5_311_242: "5",
  Image006_29_311_246: "29",
  Image006_30_311_247: "30",
  Image006_13_311_224: "13",
  Image006_16_311_238: "16",
  Image006_24_311_233: "24",
  Image006_28_311_234: "28",
  Image006_22_311_232: "22",
  Image006_23_311_237: "23",
  Image006_17_311_227: "17",
  Image006_18_311_228: "18",
  Image006_12_311_223: "12",
  Image006_19_311_229: "19",
  Image006_21_311_231: "21",
  Image006_26_311_235: "26",
  Image006_27_311_236: "27",
  Image006_2_311_239: "2",
  Image006_3_311_240: "3",
  Image006_4_311_241: "4",
  Image006_6_311_243: "6",
  Image006_7_311_244: "7",
};

// Thèmes et couleurs associées - angles précis selon position des logos
const themes = {
  infrastructure: { color: "#F36911", angle: 45 }, // Orange - portion droite-haut (zone pont/Pomerleau)
  naval: { color: "#2563EB", angle: 90 }, // Bleu - portion droite
  sante: { color: "#DC2626", angle: 135 }, // Rouge - portion droite-bas
  energie: { color: "#16A34A", angle: 180 }, // Vert - portion bas
  aeronautique: { color: "#7C3AED", angle: 225 }, // Violet - portion gauche-bas
  finance: { color: "#CA8A04", angle: 270 }, // Jaune - portion gauche
  tech: { color: "#0891B2", angle: 315 }, // Cyan - portion gauche-haut
  pharma: { color: "#DB2777", angle: 0 }, // Rose - portion haut
};

// Informations techniques et spécifications
const companyInfo: {
  [key: string]: {
    name: string;
    description: string;
    sector: string;
    projects: string;
    theme?: keyof typeof themes;
  };
} = {
  Image006_1_311_219: {
    name: "Projet Expertise Mondiale",
    description:
      "sectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat\n\nRead more",
    sector: "Infrastructure",
    projects: "Projet complexe",
    theme: "infrastructure",
  },
  Image006_9_311_220: {
    name: "Solutions Navales",
    description:
      "sectetur adipiscing elit. Nunc sed vulputate est. Donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas. Morbi vel euismod leo, id rutrum dui. Mauris est ex, lacinia nec pulvinar eu, eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat\n\nRead more",
    sector: "Construction Navale",
    projects: "Paquebots de croisière",
    theme: "naval",
  },
  Image006_10_311_221: {
    name: "Réfection d'un axe routier majeur",
    description:
      "Un chantier d'envergure où l'imprévu devient la norme. La dégradation de la voûte a doublé le budget, mais pas question d'arrêter : 120 000 véhicules circulent chaque jour. Notre défi? Piloter cette réfection sous-marine complexe en gardant le cap sur les délais, tout en assurant la fluidité du trafic.",
    sector: "Infrastructure",
    projects: "Réfection sous-marine",
    theme: "infrastructure",
  },
  Image006_11_311_222: {
    name: "Partenariat Project Management Institute",
    description:
      "Connecter la recherche, le terrain et les meilleures pratiques : c'est l'ambition de ce partenariat. Op2 collabore avec le Project Management Institute pour outiller et inspirer les professionnels de projet au Québec. Ensemble, nous élevons les standards de l'industrie.",
    sector: "Formation et partenariat",
    projects: "Collaboration PMI",
    theme: "energie",
  },
  Image006_12_311_223: {
    name: "Formation dirigeants projets industriels",
    description:
      "Vos projets grandissent en complexité, vos équipes doivent suivre le rythme. Parcours pragmatique pour dirigeants : définir, planifier et piloter des projets industriels d'envergure avec lucidité. Approche terrain combinant méthodologie rigoureuse et comportements efficaces.",
    sector: "Formation",
    projects: "Formation dirigeants",
    theme: "tech",
  },
  Image006_13_311_224: {
    name: "Logistique externalisée",
    description:
      "Externaliser sa logistique sans perdre le contrôle : c'est tout l'enjeu. Direction d'un projet de transition en assurant le transfert d'activités en interface avec le client final, la montée en compétence des opérateurs et zéro interruption dans les livraisons.",
    sector: "Logistique",
    projects: "Transition logistique",
    theme: "tech",
  },
  Image006_14_311_225: {
    name: "React Hook Implementation",
    description:
      "Nunc sed vulputate est donec interdum sollicitudin neque. Quisque cursus non felis vitae egestas morbi vel euismod leo.",
    sector: "State Management",
    projects:
      "useState, useEffect, useCallback, useMemo patterns for optimal performance",
    theme: "tech",
  },
  Image006_15_311_226: {
    name: "Responsive Design System",
    description:
      "Id rutrum dui mauris est ex lacinia nec pulvinar eu eleifend a tortor. Donec ut odio in nibh condimentum sodales dignissim.",
    sector: "Mobile-First Design",
    projects:
      "@media queries, flexbox, grid layouts, container queries implementation",
    theme: "tech",
  },
  Image006_16_311_238: {
    name: "Capitalisation projets antérieurs",
    description:
      "Accélérer la livraison en capitalisant sur l'expérience. Transformation des enseignements des premières phases en leviers concrets d'amélioration et de sécurisation, appuyés par les meilleures pratiques en gestion de projet.",
    sector: "Capitalisation",
    projects: "Amélioration continue",
    theme: "tech",
  },
  Image006_17_311_227: {
    name: "Campagne Covid-19",
    description:
      "Une mission critique, à l'échelle nationale, sans droit à l'erreur. Vacciner un pays entier exige synchronisation parfaite, logistique rigoureuse et adaptation constante. Nous avons coordonné les ressources et les acteurs pour livrer cette campagne dans un contexte sanitaire sans précédent.",
    sector: "Santé publique",
    projects: "Vaccination nationale",
  },
  Image006_18_311_228: {
    name: "Programme anticontrefaçon",
    description:
      "Protéger votre marque, c'est protéger vos revenus. Pilotage du déploiement d'un système anticontrefaçon sur l'ensemble du portfolio produits. Traçabilité, authentification, coordination multifonctionnelle à l'échelle globale pour sécuriser votre position concurrentielle.",
    sector: "Sécurité produit",
    projects: "Protection anticontrefaçon",
  },
  Image006_19_311_229: {
    name: "Coaching gestion de portefeuille",
    description:
      "Nous outillons et accompagnons les PMO pour déployer, renforcer et améliorer leurs pratiques de gestion de portefeuille. Plus qu'un coaching : un transfert d'expertise qui a rendu les équipes autonomes et performantes pour une gouvernance projet solide.",
    sector: "Coaching PMO",
    projects: "Amélioration gouvernance",
  },
  Image006_20_311_230: {
    name: "Accessibility Standards",
    description:
      "Donec ut odio in nibh condimentum sodales dignissim id lectus. Phasellus ultrices nulla sit amet diam consequat lorem ipsum.",
    sector: "WCAG Compliance",
    projects:
      "ARIA labels, semantic HTML, keyboard navigation, screen reader support",
  },
  Image006_21_311_231: {
    name: "Harmonisation pratiques projet",
    description:
      "Capitaliser sur ce qui fonctionne : diffusion des bonnes pratiques à travers l'organisation et harmonisation de la culture projet. Des outils améliorés, des processus cohérents, des équipes qui parlent le même langage. Résultat : une performance collective renforcée.",
    sector: "Harmonisation",
    projects: "Culture projet unifiée",
  },
  Image006_22_311_232: {
    name: "Formation planification complexe",
    description:
      "Maîtriser la planification, c'est maîtriser ses projets. Formation spécialisée en planification de projets complexes pour 40 professionnels. Approche terrain avec exercices pratiques, cas d'étude réels, partage d'expérience et quiz interactifs.",
    sector: "Formation",
    projects: "Formation planification",
  },
  Image006_23_311_237: {
    name: "Réorientation stratégique programme",
    description:
      "Changement de cap : la stratégie de développement et de construction évolue, et tout le programme doit suivre. Formalisation et partage de cette nouvelle vision pour garantir la mise sous contrôle opérationnel. Nous avons embarqué les acteurs terrain pour ancrer ce virage stratégique.",
    sector: "Réorientation",
    projects: "Virage stratégique",
  },
  Image006_24_311_233: {
    name: "Projets ferroviaires clés en main",
    description:
      "Des projets ferroviaires clé en main, de l'offre à la livraison. Plusieurs chantiers simultanés, différents stades d'avancement, une complexité qui s'additionne. Formation des équipes à la planification de haut niveau et coordination d'ensemble pour transformer la complexité en performance.",
    sector: "Transport ferroviaire",
    projects: "Clé en main ferroviaire",
  },
  Image006_26_311_235: {
    name: "Planification et contrôle ingénierie",
    description:
      "Piloter les activités d'ingénierie avec précision : planification renforcée, optimisation charge-capacité et standardisation produits entre sites. Des données exploitées, des décisions éclairées, une ingénierie qui livre à temps.",
    sector: "Ingénierie",
    projects: "Contrôle ingénierie",
  },
  Image006_27_311_236: {
    name: "Formation management de projet",
    description:
      "Former pour transformer : programme complet de formation aux fondamentaux du management de projet. Plus de 330 chefs de projet formés avec une approche terrain mêlant exercices pratiques, cas réels, quiz et jeux pédagogiques. Résultat : des équipes outillées et alignées sur les meilleures pratiques.",
    sector: "Formation",
    projects: "Formation management",
  },
  Image006_28_311_234: {
    name: "Transformation des pratiques projet",
    description:
      "Une transformation portée au plus haut niveau : renforcement des fondamentaux en gestion de projet, pilotage standardisé et KPI homogènes pour sécuriser les engagements et renforcer la compétitivité. Parce qu'une organisation performante repose sur des bases solides.",
    sector: "Transformation",
    projects: "Standardisation projet",
  },
  Image006_2_311_239: {
    name: "Projets stratégiques parallèles",
    description:
      "Deux chantiers en simultané, un pilotage intégré. Nous avons assuré la livraison à temps du premier projet, tout en structurant le suivant à travers la standardisation de l'ingénierie système. Résultat : double livraison maîtrisée, efficacité renforcée.",
    sector: "Gestion de projets",
    projects: "Projets parallèles",
  },
  Image006_3_311_240: {
    name: "Création d'une joint venture",
    description:
      "Sécuriser et accélérer la collaboration entre équipes : c'est tout l'enjeu d'une joint venture. Nous avons coordonné l'intégration des équipes, renforcé la confiance et sécurisé l'avancement des projets. Parce qu'une JV réussie se construit sur la coordination et la clarté.",
    sector: "Joint venture",
    projects: "Coordination JV",
  },
  Image006_4_311_241: {
    name: "Programme nucléaire",
    description:
      "Un projet à 50G€ qui redéfinit l'avenir énergétique français. Nous avons fluidifié les interfaces entre toutes les parties prenantes en créant des règles de planification claires et des tableaux de bord digitaux accessibles en temps réel. Résultat : visibilité totale, collaboration renforcée, pilotage par les données.",
    sector: "Énergie nucléaire",
    projects: "Programme EPR",
  },
  Image006_5_311_242: {
    name: "Réponse au plan 2035",
    description:
      "Le Plan 2035 change la donne : l'organisation doit évoluer pour atteindre ses objectifs ambitieux. Nous avons agilisé et standardisé les pratiques dans l'objectif de renforcer les capacités de l'organisation. Recommandations claires et accompagnement terrain pour ancrer durablement le changement.",
    sector: "Transformation organisationnelle",
    projects: "Plan 2035 - Agilisation et standardisation",
  },
  Image006_29_311_246: {
    name: "Implication universitaire",
    description:
      "Former la relève, c'est investir dans l'avenir de notre industrie. Partage de notre expertise terrain à travers conférences, animation de sessions et participation comme juge dans des concours universitaires. Nous créons des ponts entre pratique professionnelle et excellence en formation.",
    sector: "Formation académique",
    projects: "Partenariat universitaire",
  },
  Image006_30_311_247: {
    name: "Implication universitaire",
    description:
      "Former la relève, c'est investir dans l'avenir de notre industrie. Partage de notre expertise terrain à travers conférences, animation de sessions et participation comme juge dans des concours universitaires. Nous créons des ponts entre pratique professionnelle et excellence en formation.",
    sector: "Formation académique",
    projects: "Partenariat universitaire",
  },
  Image006_6_311_243: {
    name: "Audit projet industriel",
    description:
      "L'expertise technique est solide, le potentiel d'affaires est immense. Nous avons audité un projet en lancement et proposé une feuille de route concrète : intégration de l'ingénierie système, optimisation Q,C,D et sécurité renforcée sur tout le cycle de vie.",
    sector: "Audit industriel",
    projects: "Audit projet",
  },
  Image006_7_311_244: {
    name: "Rationalisation échéancier complexe",
    description:
      "Faire cohabiter stratégie et coordination fine. Nous avons transformé la richesse du détail d'un échéancier complexe en pouvoir de décision : planning directeur opérationnel avec hypothèses structurées, identification du chemin critique et analyse de risques sur les activités clés.",
    sector: "Planification",
    projects: "Échéancier complexe",
  },
  Image006_8_311_245: {
    name: "Déploiement outil gestion de portefeuille",
    description:
      "Pilotage homogène du portefeuille et des ressources : un dispositif unique pour toutes les équipes. Déploiement de l'outil, optimisation des charges et capacités, accompagnement des équipes et conduite du changement pour ancrer durablement la transformation.",
    sector: "Gestion portefeuille",
    projects: "Outil PPM",
  },
};

function LogoContainer({
  className,
  logoKey,
  onClick,
  isSelected,
  hasAnySelection,
  isPulsing,
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
  let filter = "";
  if (isSelected) {
    // Logo sélectionné : couleurs normales avec effet
    filter = "brightness(1.1) saturate(1.2)";
  } else if (hasAnySelection) {
    // Un autre logo est sélectionné : blur réduit de 35% (0.65px au lieu de 1px)
    filter = "saturate(0.2) brightness(1.2) opacity(0.3) blur(0.65px)";
  } else if (isHovered) {
    // Logo survolé : légère amélioration
    filter = "brightness(1.05) saturate(1.1)";
  } else {
    // État par défaut : logos en couleur, pas de filtre
    filter = "none";
  }

  return (
    <div
      className={`${className} ${styles.logoContainer} ${isPulsing && !isSelected && !hasAnySelection ? styles.logoPulsing : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(logoKey);
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <img
          src={`/images/logos/${logoFile}`}
          alt="Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: filter,
            transition: "all 0.4s ease",
            transform: isSelected
              ? "translate3d(0,0,0) scale(1.15)"
              : isHovered
                ? "translate3d(0,0,0) scale(1.1)"
                : "translate3d(0,0,0) scale(1)",
            zIndex: isSelected ? 25 : isHovered ? 20 : 10,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </div>
  );
}

export default function Expertise() {
  const { locale } = useI18n();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isIPadSafari = useIsIPadSafari();
  // VideoBackground handles playback automatically

  // Détection de visibilité avec IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }, // Déclenche quand 30% de la section est visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Ouverture automatique de démo la première fois quand visible
  useEffect(() => {
    const hasSeenDemo = localStorage.getItem("expertise-demo-seen");

    if (!hasSeenDemo && isVisible) {
      // Ouvrir automatiquement après 0.5 seconde
      const openTimer = setTimeout(() => {
        setSelectedCompany("Image006_10_311_221"); // Logo Pomerleau
      }, 500);

      // Fermer automatiquement après 3 secondes
      const closeTimer = setTimeout(() => {
        setSelectedCompany(null);
        localStorage.setItem("expertise-demo-seen", "true");
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

  // Obtenir la traduction depuis les dictionnaires, avec fallback sur companyInfo
  const logoId = selectedCompany ? logoIdMapping[selectedCompany] : null;
  const translatedInfo = logoId
    ? locale === "en"
      ? en.logos[logoId as keyof typeof en.logos]
      : fr.logos[logoId as keyof typeof fr.logos]
    : null;
  const selectedInfo =
    translatedInfo || (selectedCompany ? companyInfo[selectedCompany] : null);
  const hasAnySelection = selectedCompany !== null;

  return (
    <div ref={containerRef} className={styles.Expertise_311_396}>
      {/* Globe avec vidéo */}
      <div className={styles.Globe_311_217}>
        <VideoBackground
          videoSrc="/videos/globe4"
          posterSrc=""
          opacity={1}
          objectPosition="center"
          className={styles.video}
        />
      </div>

      {/* Cercle/Anneau autour du globe */}
      <div className={styles.GlobeCircle_1_311_218}></div>

      {/* Overlay d'information */}
      {selectedInfo && (
        <div className={styles.infoOverlay}>
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              handleCloseInfo();
            }}
          >
            ×
          </button>
          <div
            className={styles.infoCircle}
            style={
              isIPadSafari
                ? {
                    width: "300px",
                    height: "300px",
                    padding: "15px",
                  }
                : undefined
            }
          >
            <div className={styles.infoContent}>
              {/* Logo */}
              <div
                className={styles.logoHeader}
                style={
                  isIPadSafari
                    ? {
                        width: "80px",
                        height: "30px",
                        marginBottom: "5px",
                        padding: "4px",
                      }
                    : undefined
                }
              >
                <img
                  src={`/images/logos/${logoMapping[selectedCompany as keyof typeof logoMapping]}`}
                  alt="Logo"
                  className={styles.overlayLogo}
                  style={
                    isIPadSafari
                      ? {
                          maxWidth: "70px",
                          maxHeight: "24px",
                        }
                      : undefined
                  }
                />
              </div>

              {/* Titre du projet */}
              <h2
                className={styles.companyName}
                style={
                  isIPadSafari
                    ? {
                        fontSize: "9px",
                        marginBottom: "5px",
                      }
                    : undefined
                }
              >
                {selectedInfo.name || "Projet"}
              </h2>

              {/* Description */}
              <div className={styles.projectDescription}>
                <p
                  style={
                    isIPadSafari
                      ? {
                          fontSize: "8px",
                          lineHeight: "1.3",
                          maxWidth: "250px",
                        }
                      : undefined
                  }
                >
                  {selectedInfo.description || "Description du projet"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tous les logos avec leurs positions exactes */}
      <LogoContainer
        className={styles.Image006_10_311_221}
        logoKey="Image006_10_311_221"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_10_311_221"}
        hasAnySelection={hasAnySelection}
        isPulsing={true}
      />
      <LogoContainer
        className={styles.Image006_11_311_222}
        logoKey="Image006_11_311_222"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_11_311_222"}
        hasAnySelection={hasAnySelection}
        isPulsing={true}
      />
      <LogoContainer
        className={styles.Image006_12_311_223}
        logoKey="Image006_12_311_223"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_12_311_223"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_13_311_224}
        logoKey="Image006_13_311_224"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_13_311_224"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_17_311_227}
        logoKey="Image006_17_311_227"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_17_311_227"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_18_311_228}
        logoKey="Image006_18_311_228"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_18_311_228"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_19_311_229}
        logoKey="Image006_19_311_229"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_19_311_229"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_21_311_231}
        logoKey="Image006_21_311_231"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_21_311_231"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_22_311_232}
        logoKey="Image006_22_311_232"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_22_311_232"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_24_311_233}
        logoKey="Image006_24_311_233"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_24_311_233"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_28_311_234}
        logoKey="Image006_28_311_234"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_28_311_234"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_29_311_246}
        logoKey="Image006_29_311_246"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_29_311_246"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_30_311_247}
        logoKey="Image006_30_311_247"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_30_311_247"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_26_311_235}
        logoKey="Image006_26_311_235"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_26_311_235"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_27_311_236}
        logoKey="Image006_27_311_236"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_27_311_236"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_23_311_237}
        logoKey="Image006_23_311_237"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_23_311_237"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_16_311_238}
        logoKey="Image006_16_311_238"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_16_311_238"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_2_311_239}
        logoKey="Image006_2_311_239"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_2_311_239"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_3_311_240}
        logoKey="Image006_3_311_240"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_3_311_240"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_4_311_241}
        logoKey="Image006_4_311_241"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_4_311_241"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_5_311_242}
        logoKey="Image006_5_311_242"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_5_311_242"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_6_311_243}
        logoKey="Image006_6_311_243"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_6_311_243"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_7_311_244}
        logoKey="Image006_7_311_244"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_7_311_244"}
        hasAnySelection={hasAnySelection}
      />
      <LogoContainer
        className={styles.Image006_8_311_245}
        logoKey="Image006_8_311_245"
        onClick={handleLogoClick}
        isSelected={selectedCompany === "Image006_8_311_245"}
        hasAnySelection={hasAnySelection}
      />
    </div>
  );
}

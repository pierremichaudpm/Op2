"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, ArrowRight, Wind, Zap, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Configuration des projets avec contenus spécifiques
const projectsData = [
  {
    id: 1,
    title: 'Parc Éolien offshore',
    image: '/images/nos_realisations/image-10.png',
    modalTitle: 'Parc Éolien offshore',
    description: 'Expertise en projets énergétiques offshore',
    modalContent: 'Notre équipe possède une solide expertise en pilotage de projets énergétiques complexes. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en management de projet, contrôle des coûts et délais, gestion des risques et coordination d\'opérations offshore à grande échelle. À titre de référence, nous accompagnons depuis 2018 un gestionnaire de réseau d\'électricité sur le déploiement de sept parcs éoliens offshore, incluant notamment l\'installation de 80 éoliennes en mer du Nord pour un parc de 400MW. Ce projet a impliqué la coordination de 12 navires spécialisés, la gestion des contraintes météorologiques et a été livré avec 2 mois d\'avance sur le planning initial, avec des budgets pouvant atteindre 1,5 milliard d\'euros.'
  },
  {
    id: 2,
    title: 'Ligne ferroviaire haute vitesse',
    image: '/images/nos_realisations/image-11.png',
    modalTitle: 'Ligne ferroviaire haute vitesse',
    description: 'Expertise en solutions de mobilité à grande vitesse',
    modalContent: 'Forts de notre expérience dans le pilotage de projets innovants du secteur des transports, nous pouvons vous offrir des solutions en planification stratégique, gestion documentaire, coordination d\'équipes multidisciplinaires et sécurisation de la chaîne d\'approvisionnement. À titre de référence, nous accompagnons depuis 2019 un leader mondial du transport (74 000 employés, 15,5 milliards d\'euros de chiffre d\'affaires) sur le développement et l\'industrialisation de sa prochaine génération de solutions de mobilité à grande vitesse, avec des objectifs ambitieux : augmentation de 20% de la capacité, réduction de 20% des coûts d\'acquisition et de la consommation d\'énergie, et diminution de 30% des coûts de maintenance.'
  },
  {
    id: 3,
    title: 'Centrale hydroélectrique',
    image: '/images/nos_realisations/image-12.png',
    modalTitle: 'Centrale hydroélectrique',
    description: 'Expertise en amélioration continue et benchmarking',
    modalContent: 'Nous mettons notre expertise en amélioration continue et benchmarking au service de grands acteurs du secteur énergétique. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en analyse de pratiques de gestion de projet, identification d\'axes d\'amélioration, élaboration de feuilles de route et conduite du changement. À titre de référence, nous accompagnons depuis octobre 2021 une entreprise publique canadienne (production, transport et distribution d\'électricité) dans la rénovation et l\'amélioration de ses centrales hydrauliques. Après une phase de benchmark de six mois analysant les bonnes pratiques à travers diverses industries et pays, nous déployons actuellement nos préconisations sur deux projets pilotes pour démontrer leur efficacité opérationnelle et répondre aux enjeux de décarbonisation et d\'augmentation de la capacité de production.'
  },
  {
    id: 4,
    title: 'Centre de lancement spatial',
    image: '/images/nos_realisations/image-13.png',
    modalTitle: 'Centre de lancement spatial',
    description: 'Expertise en gestion de programmes spatiaux',
    modalContent: 'Partenaires de longue date de l\'industrie spatiale française, nous accompagnons des programmes d\'envergure depuis la création de notre entreprise. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions complètes en support PMO, pilotage de plannings, gestion des risques et des coûts à tous les niveaux de programme. À titre de référence, nous accompagnons depuis 2017 un fleuron de l\'industrie française dans le développement d\'un nouveau lanceur spatial civil pour l\'Union Européenne, le premier depuis une vingtaine d\'années. Nous intervenons sur deux sites et supportons l\'ensemble des groupes du programme jusqu\'au Product Managers et à la Direction, en gérant la complexité liée à la coordination de nombreux métiers et à l\'exposition médiatique régulière du projet.'
  },
  {
    id: 5,
    title: 'Construction navale militaire',
    image: '/images/nos_realisations/image-14.png',
    modalTitle: 'Construction navale militaire',
    description: 'Expertise en optimisation de la performance ingénierie',
    modalContent: 'Nous disposons d\'une expertise reconnue en optimisation de la performance de l\'ingénierie et en gestion de projets complexes multi-sites. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en planification robuste, gestion des ressources et compétences clés, mise en place d\'indicateurs de performance et cycles de gouvernance agiles. À titre de référence, nous avons déployé sur deux ans un Plan Directeur des Études (PDE) pour un acteur majeur de la défense spécialisé dans les bâtiments de guerre marins, impliquant 2 000 acteurs répartis sur plusieurs sites. Les solutions mises en place, notamment les indicateurs d\'adhérence et d\'exécutabilité, ont permis de réduire significativement les retards et sont désormais intégrées dès le démarrage de tous les nouveaux projets du client.'
  },
  {
    id: 6,
    title: 'Extension ligne de métro',
    image: '/images/nos_realisations/image-15.png',
    modalTitle: 'Extension ligne de métro',
    description: 'Expertise en gestion de projets internationaux',
    modalContent: 'Avec une présence internationale, nous accompagnons nos clients dans la réalisation de projets d\'envergure mondiale. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en pilotage intégral de programmes complexes, gestion de partenariats public-privé (PPP), coordination multi-sites internationaux et maîtrise des délais contractuels. À titre de référence, nous avons piloté pendant quatre ans le projet New Generation Rollingstock (NGR) au Queensland en Australie : fabrication de 75 trains (450 voitures) pour un budget de 4,4 milliards d\'euros, avec un design réalisé en Australie, une fabrication en Inde et seize devises différentes. Le projet a été livré sans aucune pénalité de retard et a été reconnu "Best in Class" par notre client à l\'échelle mondiale.'
  },
  {
    id: 7,
    title: 'Usine pharmaceutique 4.0',
    image: '/images/nos_realisations/image-16.png',
    modalTitle: 'Usine pharmaceutique 4.0',
    description: 'Expertise en gestion de projets exceptionnels et de crise',
    modalContent: 'Notre capacité à intervenir rapidement sur des projets exceptionnels et inédits nous permet d\'accompagner nos clients face à des défis sans précédent. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en structuration rapide de programmes complexes, mise en place d\'organisation et de modes de pilotage adaptés, et gestion de contraintes logistiques critiques. À titre de référence, nous avons été mobilisés dès décembre 2020 pour contribuer à l\'organisation de la campagne nationale de vaccination COVID-19, incluant la coordination du transport de vaccins à -80° sur l\'ensemble du territoire en temps record. Le succès de cette mission a conduit notre client à renouveler sa confiance pour une durée de quatre ans comme partenaire privilégié pour les projets hors normes.'
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
                    marginBottom: '25px',
                    letterSpacing: '0.02em'
                  }}>
                    {project.modalTitle}
                  </p>

                  {/* Sous-titre */}
                  <p className="sous-titre-modal" style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#FFD4B3',
                    marginBottom: '30px',
                    lineHeight: '1.4'
                  }}>
                    {project.description}
                  </p>

                  <p className="notre-client-est-un" style={{
                    fontSize: '22px',
                    lineHeight: '1.65',
                    opacity: 0.95
                  }}>
                    {project.modalContent}
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
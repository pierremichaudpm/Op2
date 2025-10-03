'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

export function MobileRealisations() {
  const { locale } = useI18n();
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
      title: locale === 'en' ? 'Offshore Wind Farm' : 'Parc Éolien offshore',
      description: locale === 'en' ? 'Offshore wind energy project expertise' : 'Expertise en projets énergétiques offshore',
      fullDescription: locale === 'en'
        ? 'Our team has solid expertise in managing complex energy projects. Thanks to the projects we have successfully completed, we can offer you solutions in project management, cost and schedule control, risk management and coordination of large-scale offshore operations. As a reference, since 2018 we have been supporting an electricity network manager in the deployment of seven offshore wind farms, including the installation of 80 wind turbines in the North Sea for a 400MW wind farm. This project involved the coordination of 12 specialized vessels, the management of weather constraints and was delivered 2 months ahead of the initial schedule, with budgets reaching 1.5 billion euros.'
        : 'Notre équipe possède une solide expertise en pilotage de projets énergétiques complexes. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en management de projet, contrôle des coûts et délais, gestion des risques et coordination d\'opérations offshore à grande échelle. À titre de référence, nous accompagnons depuis 2018 un gestionnaire de réseau d\'électricité sur le déploiement de sept parcs éoliens offshore, incluant notamment l\'installation de 80 éoliennes en mer du Nord pour un parc de 400MW. Ce projet a impliqué la coordination de 12 navires spécialisés, la gestion des contraintes météorologiques et a été livré avec 2 mois d\'avance sur le planning initial, avec des budgets pouvant atteindre 1,5 milliard d\'euros.'
    },
    {
      id: 2,
      image: '/images/nos_realisations/image-11.png',
      title: locale === 'en' ? 'High-Speed Rail Line' : 'Ligne ferroviaire haute vitesse',
      description: locale === 'en' ? 'High-speed mobility solutions expertise' : 'Expertise en solutions de mobilité à grande vitesse',
      fullDescription: locale === 'en'
        ? 'With our experience in managing innovative transportation projects, we can offer you solutions in strategic planning, document management, coordination of multidisciplinary teams and supply chain security. As a reference, since 2019 we have been supporting a global transportation leader (74,000 employees, 15.5 billion euros in revenue) in the development and industrialization of its next generation of high-speed mobility solutions, with ambitious objectives: 20% increase in capacity, 20% reduction in acquisition and energy consumption costs, and 30% reduction in maintenance costs.'
        : 'Forts de notre expérience dans le pilotage de projets innovants du secteur des transports, nous pouvons vous offrir des solutions en planification stratégique, gestion documentaire, coordination d\'équipes multidisciplinaires et sécurisation de la chaîne d\'approvisionnement. À titre de référence, nous accompagnons depuis 2019 un leader mondial du transport (74 000 employés, 15,5 milliards d\'euros de chiffre d\'affaires) sur le développement et l\'industrialisation de sa prochaine génération de solutions de mobilité à grande vitesse, avec des objectifs ambitieux : augmentation de 20% de la capacité, réduction de 20% des coûts d\'acquisition et de la consommation d\'énergie, et diminution de 30% des coûts de maintenance.'
    },
    {
      id: 3,
      image: '/images/nos_realisations/image-12.png',
      title: locale === 'en' ? 'Hydroelectric Power Plant' : 'Centrale hydroélectrique',
      description: locale === 'en' ? 'Continuous improvement and benchmarking expertise' : 'Expertise en amélioration continue et benchmarking',
      fullDescription: locale === 'en'
        ? 'We put our expertise in continuous improvement and benchmarking at the service of major players in the energy sector. Thanks to the projects we have successfully completed, we can offer you solutions in project management practice analysis, identification of improvement areas, roadmap development and change management. As a reference, since October 2021 we have been supporting a Canadian public company (electricity production, transmission and distribution) in the renovation and improvement of its hydroelectric plants. After a six-month benchmarking phase analyzing best practices across various industries and countries, we are currently deploying our recommendations on two pilot projects to demonstrate their operational effectiveness and address decarbonization challenges and increased production capacity.'
        : 'Nous mettons notre expertise en amélioration continue et benchmarking au service de grands acteurs du secteur énergétique. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en analyse de pratiques de gestion de projet, identification d\'axes d\'amélioration, élaboration de feuilles de route et conduite du changement. À titre de référence, nous accompagnons depuis octobre 2021 une entreprise publique canadienne (production, transport et distribution d\'électricité) dans la rénovation et l\'amélioration de ses centrales hydrauliques. Après une phase de benchmark de six mois analysant les bonnes pratiques à travers diverses industries et pays, nous déployons actuellement nos préconisations sur deux projets pilotes pour démontrer leur efficacité opérationnelle et répondre aux enjeux de décarbonisation et d\'augmentation de la capacité de production.'
    },
    {
      id: 4,
      image: '/images/nos_realisations/image-13.png',
      title: locale === 'en' ? 'Space Launch Center' : 'Centre de lancement spatial',
      description: locale === 'en' ? 'Space industry program management expertise' : 'Expertise en gestion de programmes spatiaux',
      fullDescription: locale === 'en'
        ? 'Long-standing partners of the French space industry, we have been supporting major programs since our company was founded. Thanks to the projects we have successfully completed, we can offer you comprehensive solutions in PMO support, schedule management, risk and cost management at all program levels. As a reference, since 2017 we have been supporting a flagship of the French industry in the development of a new civil space launcher for the European Union, the first in twenty years. We operate on two sites and support all program groups up to Product Managers and Management, managing the complexity related to coordinating numerous trades and the regular media exposure of the project.'
        : 'Partenaires de longue date de l\'industrie spatiale française, nous accompagnons des programmes d\'envergure depuis la création de notre entreprise. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions complètes en support PMO, pilotage de plannings, gestion des risques et des coûts à tous les niveaux de programme. À titre de référence, nous accompagnons depuis 2017 un fleuron de l\'industrie française dans le développement d\'un nouveau lanceur spatial civil pour l\'Union Européenne, le premier depuis une vingtaine d\'années. Nous intervenons sur deux sites et supportons l\'ensemble des groupes du programme jusqu\'au Product Managers et à la Direction, en gérant la complexité liée à la coordination de nombreux métiers et à l\'exposition médiatique régulière du projet.'
    },
    {
      id: 5,
      image: '/images/nos_realisations/image-14.png',
      title: locale === 'en' ? 'Military Shipbuilding' : 'Construction navale militaire',
      description: locale === 'en' ? 'Engineering performance optimization expertise' : 'Expertise en optimisation de la performance ingénierie',
      fullDescription: locale === 'en'
        ? 'We have recognized expertise in optimizing engineering performance and managing complex multi-site projects. Thanks to the projects we have successfully completed, we can offer you solutions in robust planning, key resource and skill management, performance indicator implementation and agile governance cycles. As a reference, we deployed over two years a Master Study Plan (PDE) for a major defense player specializing in naval warships, involving 2,000 stakeholders spread across multiple sites. The solutions implemented, particularly adherence and executability indicators, have significantly reduced delays and are now integrated from the start of all new client projects.'
        : 'Nous disposons d\'une expertise reconnue en optimisation de la performance de l\'ingénierie et en gestion de projets complexes multi-sites. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en planification robuste, gestion des ressources et compétences clés, mise en place d\'indicateurs de performance et cycles de gouvernance agiles. À titre de référence, nous avons déployé sur deux ans un Plan Directeur des Études (PDE) pour un acteur majeur de la défense spécialisé dans les bâtiments de guerre marins, impliquant 2 000 acteurs répartis sur plusieurs sites. Les solutions mises en place, notamment les indicateurs d\'adhérence et d\'exécutabilité, ont permis de réduire significativement les retards et sont désormais intégrées dès le démarrage de tous les nouveaux projets du client.'
    },
    {
      id: 6,
      image: '/images/nos_realisations/image-15.png',
      title: locale === 'en' ? 'Metro Line Extension' : 'Extension ligne de métro',
      description: locale === 'en' ? 'International project management expertise' : 'Expertise en gestion de projets internationaux',
      fullDescription: locale === 'en'
        ? 'With an international presence, we support our clients in delivering world-class projects. Thanks to the projects we have successfully completed, we can offer you solutions in comprehensive management of complex programs, public-private partnership (PPP) management, international multi-site coordination and contractual deadline control. As a reference, we managed for four years the New Generation Rollingstock (NGR) project in Queensland, Australia: manufacturing 75 trains (450 cars) for a budget of 4.4 billion euros, with design in Australia, manufacturing in India and sixteen different currencies. The project was delivered without any delay penalties and was recognized as "Best in Class" by our client on a global scale.'
        : 'Avec une présence internationale, nous accompagnons nos clients dans la réalisation de projets d\'envergure mondiale. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en pilotage intégral de programmes complexes, gestion de partenariats public-privé (PPP), coordination multi-sites internationaux et maîtrise des délais contractuels. À titre de référence, nous avons piloté pendant quatre ans le projet New Generation Rollingstock (NGR) au Queensland en Australie : fabrication de 75 trains (450 voitures) pour un budget de 4,4 milliards d\'euros, avec un design réalisé en Australie, une fabrication en Inde et seize devises différentes. Le projet a été livré sans aucune pénalité de retard et a été reconnu "Best in Class" par notre client à l\'échelle mondiale.'
    },
    {
      id: 7,
      image: '/images/nos_realisations/image-16.png',
      title: locale === 'en' ? 'Pharmaceutical Plant 4.0' : 'Usine pharmaceutique 4.0',
      description: locale === 'en' ? 'Crisis and exceptional project management expertise' : 'Expertise en gestion de projets exceptionnels et de crise',
      fullDescription: locale === 'en'
        ? 'Our ability to intervene quickly on exceptional and unprecedented projects allows us to support our clients facing unprecedented challenges. Thanks to the projects we have successfully completed, we can offer you solutions in rapid structuring of complex programs, implementation of adapted organization and management methods, and critical logistics constraint management. As a reference, we were mobilized as early as December 2020 to contribute to the organization of the national COVID-19 vaccination campaign, including coordination of vaccine transport at -80° across the entire territory in record time. The success of this mission led our client to renew their trust for a period of four years as a preferred partner for exceptional projects.'
        : 'Notre capacité à intervenir rapidement sur des projets exceptionnels et inédits nous permet d\'accompagner nos clients face à des défis sans précédent. Grâce aux projets que nous avons menés à bien, nous pouvons vous offrir des solutions en structuration rapide de programmes complexes, mise en place d\'organisation et de modes de pilotage adaptés, et gestion de contraintes logistiques critiques. À titre de référence, nous avons été mobilisés dès décembre 2020 pour contribuer à l\'organisation de la campagne nationale de vaccination COVID-19, incluant la coordination du transport de vaccins à -80° sur l\'ensemble du territoire en temps record. Le succès de cette mission a conduit notre client à renouveler sa confiance pour une durée de quatre ans comme partenaire privilégié pour les projets hors normes.'
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
        {locale === 'en' ? 'Our Projects' : 'Nos réalisations'}
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
                zIndex: 45
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
                zIndex: 46
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
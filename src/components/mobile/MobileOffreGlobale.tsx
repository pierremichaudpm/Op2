'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

type ServiceKey = 'conseil' | 'placement' | 'formation';

export function MobileOffreGlobale() {
  const { locale } = useI18n();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceKey>('conseil');

  const handleServiceClick = (service: ServiceKey) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const services = {
    conseil: {
      title: locale === 'en' ? 'Strategic Consulting' : 'Conseil stratégique',
      shortDesc: locale === 'en' ? 'Transform your projects into performance drivers.' : 'Transformez vos projets en leviers de performance.',
      modalTitle: locale === 'en' ? 'Strategic Consulting' : 'Conseil stratégique',
      modalSubtitle: locale === 'en' ? 'Transform your projects into performance drivers.' : 'Transformez vos projets en leviers de performance.',
      modalContent: locale === 'en' 
        ? "We help organizations make the right decisions at the right time. By combining strategic vision and project management rigor, we enable you to anticipate risks, accelerate your initiatives, and maximize the impact of your investments."
        : "Nous aidons les organisations à prendre les bonnes décisions au bon moment. En combinant vision stratégique et rigueur en gestion de projet, nous vous permettons d'anticiper les risques, d'accélérer vos initiatives et de maximiser l'impact de vos investissements.",
      image: '/images/image-7.png'
    },
    placement: {
      title: locale === 'en' ? 'Operational Placement' : 'Placement opérationnel', 
      shortDesc: locale === 'en' ? 'Experts who deliver, where it counts.' : 'Des experts qui livrent, là où ça compte.',
      modalTitle: locale === 'en' ? 'Operational Placement' : 'Placement opérationnel',
      modalSubtitle: locale === 'en' ? 'Experts who deliver, where it counts.' : 'Des experts qui livrent, là où ça compte.',
      modalContent: locale === 'en'
        ? "When your projects require immediate and qualified reinforcement, we quickly integrate consultants capable of generating value from day one. More than technical expertise, we bring turnaround, execution, and leadership capabilities in the field."
        : "Quand vos projets exigent des renforts immédiats et qualifiés, nous intégrons rapidement des consultants capables de générer de la valeur dès le premier jour. Plus que de l'expertise technique, nous apportons une capacité de redressement, d'exécution et de leadership sur le terrain.",
      image: '/images/image-8.png'
    },
    formation: {
      title: locale === 'en' ? 'Specialized Training' : 'Formation spécialisée',
      shortDesc: locale === 'en' ? 'Power up your teams.' : 'Faites monter vos équipes en puissance.',
      modalTitle: locale === 'en' ? 'Specialized Training' : 'Formation spécialisée',
      modalSubtitle: locale === 'en' ? 'Power up your teams.' : 'Faites monter vos équipes en puissance.',
      modalContent: locale === 'en'
        ? "Our practical training, designed from real cases and our multi-sector experience, allows your teams to acquire the key skills to deliver high-performing and sustainable projects."
        : "Nos formations pratiques, conçues à partir de cas réels et de notre expérience multisectorielle, permettent à vos équipes d'acquérir les compétences clés pour livrer des projets performants et durables.",
      image: '/images/image-9.png'
    }
  };

  return (
    <section id="offre" style={{
      width: '100%',
      padding: '20px 20px',
      backgroundColor: '#FFFFFF'
    }}>
      {/* Titre */}
      <h2 style={{
        fontFamily: 'Gotham, sans-serif',
        fontSize: '19px',
        fontWeight: 700,
        color: '#243768',
        textTransform: 'uppercase',
        textAlign: 'left',
        marginBottom: '30px'
      }}>
        {locale === 'en' ? 'A comprehensive offer' : 'Une offre globale'}
      </h2>
      
      {/* Container qui contient soit les services, soit la modale */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        minHeight: '420px',
        position: 'relative'
      }}>
        {!showModal ? (
          /* État normal - Les 3 services */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
          }}>
            {/* Service 1 : Conseil stratégique */}
            <div 
              onClick={() => handleServiceClick('conseil')}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '140px',
                minWidth: '140px',
                height: '110px',
                borderRadius: '25px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={services.conseil.image}
                  alt={services.conseil.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{
                flex: 1
              }}>
                <h3 style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#DE5600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  {services.conseil.title}
                </h3>
                <p style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#243768',
                  lineHeight: '1.4'
                }}>
                  {services.conseil.shortDesc}
                </p>
              </div>
            </div>

            {/* Service 2 : Placement opérationnel */}
            <div 
              onClick={() => handleServiceClick('placement')}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '140px',
                minWidth: '140px',
                height: '110px',
                borderRadius: '25px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={services.placement.image}
                  alt={services.placement.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{
                flex: 1
              }}>
                <h3 style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#DE5600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  {services.placement.title}
                </h3>
                <p style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#243768',
                  lineHeight: '1.4'
                }}>
                  {services.placement.shortDesc}
                </p>
              </div>
            </div>

            {/* Service 3 : Formation spécialisée */}
            <div 
              onClick={() => handleServiceClick('formation')}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '140px',
                minWidth: '140px',
                height: '110px',
                borderRadius: '25px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={services.formation.image}
                  alt={services.formation.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{
                flex: 1
              }}>
                <h3 style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#DE5600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  {services.formation.title}
                </h3>
                <p style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#243768',
                  lineHeight: '1.4'
                }}>
                  {services.formation.shortDesc}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* État modale avec un super layout */
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
            <Image
              src={services[selectedService].image}
              alt={services[selectedService].modalTitle}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Overlay bleu avec le contenu bien structuré */}
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
              {/* Bouton X */}
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

              {/* Contenu structuré */}
              <div style={{
                marginTop: '45px'
              }}>
                {/* Titre principal */}
                <h3 style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#F36911',
                  marginBottom: '12px',
                  lineHeight: '1.2'
                }}>
                  {services[selectedService].modalTitle}
                </h3>
                
                {/* Sous-titre accrocheur */}
                <h4 style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#FFD4B3',
                  marginBottom: '25px',
                  lineHeight: '1.3'
                }}>
                  {services[selectedService].modalSubtitle}
                </h4>
                
                {/* Description principale */}
                <p style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  {services[selectedService].modalContent}
                </p>
              </div>

            </div>
          </div>
          </>
        )}
      </div>
    </section>
  );
}
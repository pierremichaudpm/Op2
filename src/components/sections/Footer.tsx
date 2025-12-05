"use client";
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer style={{
      position: 'relative',
      width: '100%',
      marginTop: '60px'
    }}>
      {/* Fond avec gradient exact du Figma */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(0deg, rgba(36, 55, 104, 1) 0%, rgba(23, 36, 69, 1) 100%)',
        zIndex: 0
      }} />
      
      {/* Contenu du footer */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        paddingTop: '84px',
        paddingBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          {/* Colonne gauche avec logo et slogan - positions exactes du Figma */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '84px'
          }}>
            {/* Logo OP2 - Position: x:84, y:84 */}
            <Image 
              src="/images/logo-footer.png" 
              alt="Op2" 
              width={107} 
              height={107}
              style={{ marginBottom: '88px' }}
            />
            
            {/* Slogan - Position: x:99, y:251 */}
              <p style={{
                fontFamily: 'Gotham, sans-serif',
              fontSize: '21px',
              fontWeight: 400,
              lineHeight: '26px',
                color: '#FFFFFF',
                opacity: 0.7,
                width: '300px',
                marginLeft: '15px'
              }}>
                Votre partenaire d&apos;excellence<br/>
                en projets complexes
              </p>
          </div>

          {/* Colonnes de droite - Position: commence à x:666 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '218px 401px 313px',
            gap: '100px',
            marginRight: '91px'
          }}>
            {/* Navigation principale */}
            <nav>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '20px' }}>
                  <a href="#" style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '23px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#F36911',
                    textDecoration: 'none'
                  }}>
                    Accueil
                  </a>
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <a href="#expertise" style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '23px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#F36911',
                    textDecoration: 'none'
                  }}>
                    Expertise
                  </a>
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <a href="#offres" style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '23px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#F36911',
                    textDecoration: 'none'
                  }}>
                    Offre
                  </a>
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <a href="#realisations" style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '23px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#F36911',
                    textDecoration: 'none'
                  }}>
                    Réalisations
                  </a>
                </li>
                <li>
                  <a href="#equipe" style={{
                    fontFamily: 'Gotham, sans-serif',
                    fontSize: '23px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#F36911',
                    textDecoration: 'none'
                  }}>
                    Équipe
                  </a>
                </li>
              </ul>
            </nav>

            {/* Services avec Suivez-nous en dessous */}
            <div>
              <h4 style={{
                fontFamily: 'Gotham, sans-serif',
                fontSize: '23px',
                fontWeight: 700,
                lineHeight: '36px',
                color: '#F36911',
                marginBottom: '20px'
              }}>
                Services
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: '40px'
              }}>
                <li style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '23px',
                  fontWeight: 500,
                  lineHeight: '36px',
                  color: '#FFFFFF',
                  marginBottom: '10px'
                }}>
                  Conseil en gestion de projet
                </li>
                <li style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '23px',
                  fontWeight: 500,
                  lineHeight: '36px',
                  color: '#FFFFFF',
                  marginBottom: '10px'
                }}>
                  Placement de personnel
                </li>
                <li style={{
                  fontFamily: 'Gotham, sans-serif',
                  fontSize: '23px',
                  fontWeight: 500,
                  lineHeight: '36px',
                  color: '#FFFFFF'
                }}>
                  Formation
                </li>
              </ul>
              
              {/* Suivez-nous sous Services */}
              <h4 style={{
                fontFamily: 'Gotham, sans-serif',
                fontSize: '23px',
                fontWeight: 500,
                lineHeight: '36px',
                color: '#FFFFFF',
                opacity: 0.5,
                marginBottom: '20px'
              }}>
                Suivez-nous
              </h4>
              <div style={{
                display: 'flex',
                gap: '20px'
              }}>
                <a href="https://www.linkedin.com/company/op%C2%B2-na" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Image 
                    src="/images/social-linkedin.png" 
                    alt="LinkedIn" 
                    width={29} 
                    height={29}
                  />
                </a>
              </div>
            </div>

            {/* Contact */}
            <address style={{
              fontStyle: 'normal'
            }}>
              <h4 style={{
                fontFamily: 'Gotham, sans-serif',
                fontSize: '23px',
                fontWeight: 700,
                lineHeight: '36px',
                color: '#F36911',
                marginBottom: '20px'
              }}>
                Contact
              </h4>
              <p style={{
                fontFamily: 'Gotham, sans-serif',
                fontSize: '23px',
                fontWeight: 500,
                lineHeight: '36px',
                color: '#FFFFFF',
                marginBottom: '10px'
              }}>
                <a 
                  href="mailto:na.contact@orlade.com" 
                  style={{ 
                    color: '#FFFFFF', 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#F36911'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
                >
                  na.contact@orlade.com
                </a>
              </p>
              <p style={{
                fontFamily: 'Gotham, sans-serif',
                fontSize: '23px',
                fontWeight: 500,
                lineHeight: '36px',
                color: '#FFFFFF'
              }}>
                Montréal, QC, Canada
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright - en bas sur toute la largeur */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        paddingTop: '20px',
        paddingBottom: '20px',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'Gotham, sans-serif',
          fontSize: '21px',
          fontWeight: 400,
          lineHeight: '36px',
          color: '#000000'
        }}>
          © 2025 Op2. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
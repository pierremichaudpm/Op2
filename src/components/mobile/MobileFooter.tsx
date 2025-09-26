"use client";

export function MobileFooter() {
  return (
    <footer style={{
      position: 'relative',
      width: '100%',
      maxWidth: '393px',
      height: '393px',
      margin: '60px auto 0',
      overflow: 'hidden'
    }}>
      {/* Div pour le gradient background - EXACT du Figma */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(0deg, rgba(36, 55, 104, 1) 0%, rgba(23, 36, 69, 1) 100%)',
        zIndex: 0
      }} />
      {/* Logo OP2 footer - Image exacte du Figma */}
      <img 
        src="/images/logo-footer.png" 
        alt="OP2" 
        style={{
          position: 'absolute',
          left: '50.58px',
          top: '31.66px',
          width: '46px',
          height: '45.72px',
          opacity: 0.7,
          zIndex: 1
        }}
      />

      {/* Slogan - Position: x:108, y:43.67 */}
      <p style={{
        position: 'absolute',
        left: '108px',
        top: '43.67px',
        width: '231px',
        height: '24.26px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '0.957em',
        color: '#FFFFFF',
        opacity: 0.7,
        margin: 0
      }}>
        Votre partenaire d&apos;excellence<br />
        en projets complexes
      </p>

      {/* Menu principal - EXACT Figma node 2082:361 - Orange */}
      <nav style={{
        position: 'absolute',
        left: '23px',
        top: '105.12px',
        width: '97px',
        height: '97.04px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '1.5em',
        textAlign: 'left',
        color: '#F36911',
        zIndex: 1
      }}>
        <div>Accueil</div>
        <div>Expertise</div>
        <div>Offre</div>
        <div>Réalisations</div>
        <div>Équipe</div>
      </nav>

      {/* Services - Titre orange, sous-éléments blancs */}
      <div style={{
        position: 'absolute',
        left: '148px',
        top: '105px',
        width: '214px',
        height: '96px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1.5em',
        textAlign: 'left',
        zIndex: 1
      }}>
        <div style={{ color: '#F36911' }}>Services</div>
        <div style={{ color: '#FFFFFF' }}>Conseil en gestion de projet</div>
        <div style={{ color: '#FFFFFF' }}>Placement de personnel</div>
        <div style={{ color: '#FFFFFF' }}>Formation</div>
      </div>

      {/* Contact - Titre orange, détails blancs */}
      <div style={{
        position: 'absolute',
        left: '151px',
        top: '220px',
        width: '167px',
        height: '96px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1.5em',
        zIndex: 1
      }}>
        <div style={{ color: '#F36911' }}>Contact</div>
        <div style={{ color: '#FFFFFF' }}>contact@op2.com</div>
        <div style={{ color: '#FFFFFF' }}>+1 514 123 4567</div>
        <div style={{ color: '#FFFFFF' }}>Montréal, QC, Canada</div>
      </div>

      {/* Suivez-nous - Position relative au footer: y:325px environ */}
      <p style={{
        position: 'absolute',
        left: '148px',
        top: '325px',
        width: '110px',
        height: '55px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '3.055em',
        color: 'rgba(255, 255, 255, 0.5)',
        margin: 0,
        zIndex: 1
      }}>
        Suivez-nous
      </p>

      {/* Icône LinkedIn - Image exacte du Figma */}
      <a href="#" style={{
        position: 'absolute',
        left: '272px',
        top: '342px',
        width: '21px',
        height: '22px',
        display: 'block'
      }}>
        <img 
          src="/images/social-linkedin.png" 
          alt="LinkedIn"
          style={{
            width: '21px',
            height: '22px'
          }}
        />
      </a>

      {/* Icône Facebook - Image exacte du Figma */}
      <a href="#" style={{
        position: 'absolute',
        left: '300px',
        top: '342px',
        width: '21px',
        height: '21px',
        display: 'block'
      }}>
        <img 
          src="/images/social-facebook.png" 
          alt="Facebook"
          style={{
            width: '21px',
            height: '21px'
          }}
        />
      </a>

      {/* Copyright - Couleur #243768 selon Figma */}
      <p style={{
        position: 'absolute',
        left: '67px',
        bottom: '12px',
        width: '235px',
        fontFamily: 'Gotham, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '3.928em',
        color: '#243768',
        margin: 0,
        textAlign: 'left'
      }}>
        © 2025 Op2. Tous droits réservés.
      </p>
    </footer>
  );
}
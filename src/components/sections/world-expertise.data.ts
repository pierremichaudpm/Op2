export type Sector = {
  id: string;
  label: string;
  // Utilise un emoji ou le chemin d'une icône; pour l'instant, on garde l'emoji
  icon?: string;
  summary?: string;
  href?: string;
  // Angle en degrés depuis le haut (12h) dans le sens horaire
  angleDeg?: number;
  // Position stricte en pourcentage du container (optionnelle si angle utilisé)
  xPercent?: number; // 0..100
  yPercent?: number; // 0..100
};

export type Partner = {
  name: string;
  // Remplacera plus tard par un chemin logo (svg/png)
  logo?: string;
};

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type WorldExpertiseData = {
  title: string;
  sectors: Sector[];
  partners: Partner[];
  metrics: Metric[];
  video: { src: string; diameter: number; poster?: string };
  ring: { outer: number; inner: number; color?: string };
};

export const worldExpertiseData: WorldExpertiseData = {
  title: 'Une expertise mondiale',
  sectors: [
    // Valeurs approximatives en pourcentage, à remplacer par celles du frame Figma
    { id: 'rail', label: 'Rail', icon: '🚆', xPercent: 50, yPercent: 6 },
    { id: 'aero', label: 'Aéronautique', icon: '✈️', xPercent: 72, yPercent: 18 },
    { id: 'energie', label: 'Énergie', icon: '⚡', xPercent: 91, yPercent: 44 },
    { id: 'sante', label: 'Santé', icon: '🏥', xPercent: 83, yPercent: 72 },
    { id: 'education', label: 'Éducation', icon: '🎓', xPercent: 62, yPercent: 90 },
    { id: 'maritime', label: 'Maritime', icon: '⚓', xPercent: 42, yPercent: 92 },
    { id: 'auto', label: 'Mobilité', icon: '🚗', xPercent: 31, yPercent: 72 },
    { id: 'space', label: 'Spatial', icon: '🛰️', xPercent: 27, yPercent: 20 }
  ],
  partners: [
    { name: 'Pomerleau' },
    { name: 'Airbus' },
    { name: 'Sanofi' },
    { name: 'Schneider Electric' },
    { name: 'Alstom' },
    { name: 'EDF' },
    { name: 'STELLANTIS' },
    { name: 'Hydro Québec' }
  ],
  metrics: [
    { value: 250, prefix: '+', label: 'Consultants' },
    { value: 300, prefix: '+', label: 'Projets / an' },
    { value: 100, prefix: '+', suffix: 'M$', label: 'Revenus' }
  ],
  video: { src: '/videos/globe4.mp4', diameter: 503 },
  ring: { outer: 560, inner: 470, color: '#FF8A4C' }
};



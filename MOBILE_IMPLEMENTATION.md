# Implémentation Mobile Op2

## Vue d'ensemble

Une version mobile séparée a été implémentée pour le site Op2, avec détection automatique des appareils mobiles et redirection appropriée.

## Caractéristiques principales

### 1. Détection des appareils
- **User-Agent Detection** : Détection primaire basée sur le user-agent du navigateur
- **Fallback sur largeur d'écran** : Si largeur < 768px, considéré comme mobile
- **Redirection automatique** : Via middleware Next.js

### 2. Structure des URLs
- **Desktop FR** : `/`
- **Desktop EN** : `/en`
- **Mobile FR** : `/mobile`
- **Mobile EN** : `/en/mobile`

### 3. Composants mobiles créés

#### Navigation (`MobileHeader.tsx`)
- Menu hamburger avec navigation plein écran
- Sélecteur de langue intégré
- Logo adapté pour mobile

#### Hero Section (`MobileHeroSection.tsx`)
- Image de fond optimisée (train)
- Texte et CTA adaptés pour mobile
- Animations Framer Motion

#### Expertise Mondiale (`MobileWorldExpertise.tsx`)
- Nombre réduit de logos partenaires (12 au lieu de 27)
- Grille 3x3 optimisée pour mobile
- Globe central animé

#### Services (`MobileServices.tsx`)
- Cartes empilées verticalement
- Images avec overlays colorés
- Icônes pour chaque service

#### Portfolio (`MobilePortfolio.tsx`)
- Carrousel de projets avec navigation tactile
- Indicateurs de pagination
- Compteur de projets

#### Équipe (`MobileTeamSection.tsx`)
- Grille 2x2 d'experts
- Photos avec informations condensées
- Actions de contact simplifiées

#### Contact (`MobileContactSection.tsx`)
- Formulaire optimisé pour mobile
- Icônes dans les champs
- Informations de contact compactes

#### Footer (`MobileFooter.tsx`)
- Navigation en grille 2x2
- Réseaux sociaux centrés
- Bouton "retour en haut"

## Architecture technique

### Middleware (`src/middleware.ts`)
```typescript
- Détecte le user-agent
- Redirige vers /mobile ou /en/mobile si mobile détecté
- Préserve la locale (FR/EN)
```

### Détection (`src/lib/device-detection.ts`)
```typescript
- isMobileUserAgent() : Test regex sur user-agent
- getDeviceType() : Détection côté serveur
- useDeviceDetection() : Hook côté client avec fallback
```

### Bilinguisme
- Utilise le même système i18n que desktop
- Dictionnaires partagés (`fr.ts`, `en.ts`)
- Context Provider pour les traductions

## Optimisations mobile

1. **Performance**
   - Images optimisées avec Next/Image
   - Lazy loading des composants
   - Animations légères avec Framer Motion

2. **UX Mobile**
   - Touch-friendly (boutons min 44x44px)
   - Espacement adapté pour les doigts
   - Navigation simplifiée

3. **Responsive**
   - Max-width: 358px pour le contenu principal
   - Padding et marges adaptées
   - Tailles de police optimisées (12-18px)

## Test de l'implémentation

### En local
1. Démarrer le serveur : `npm run dev`
2. Ouvrir http://localhost:3003 sur mobile ou avec DevTools mobile
3. Vérifier la redirection automatique vers `/mobile`

### Test avec curl
```bash
# Test mobile (iPhone)
curl -H "User-Agent: Mozilla/5.0 (iPhone...)" http://localhost:3003

# Test desktop
curl http://localhost:3003
```

### Chrome DevTools
1. Ouvrir DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Sélectionner un appareil mobile
4. Rafraîchir la page

## Déploiement

### Variables d'environnement
Aucune variable spécifique nécessaire pour la version mobile.

### Build
```bash
npm run build
```

### Netlify
Le fichier `netlify.toml` est déjà configuré. Les redirections mobiles fonctionneront automatiquement.

## Maintenance

### Ajouter une nouvelle section
1. Créer le composant dans `src/components/mobile/`
2. Importer dans `src/app/mobile/page.tsx` et `src/app/en/mobile/page.tsx`
3. Ajouter les traductions nécessaires dans les dictionnaires

### Modifier le seuil de détection
Éditer la constante dans `src/lib/device-detection.ts` :
```typescript
const isMobileWidth = window.innerWidth < 768; // Changer 768 si nécessaire
```

### Ajuster les logos partenaires mobile
Modifier `mobileLogoMapping` dans `src/components/mobile/MobileExpertise.tsx`

## Notes importantes

- La version mobile est une application séparée, pas un design responsive
- Les mêmes données et traductions sont partagées entre desktop et mobile
- Le middleware gère automatiquement les redirections
- Les animations sont réduites sur mobile pour la performance

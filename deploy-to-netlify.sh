#!/bin/bash

# Script de déploiement pour Netlify
echo "🚀 Préparation du déploiement pour Netlify..."

# 1. Build de production
echo "📦 Build de production..."
npm run build

# 2. Créer un dossier de déploiement
echo "📁 Création du dossier de déploiement..."
rm -rf netlify-deploy
mkdir -p netlify-deploy

# 3. Copier les fichiers nécessaires
echo "📋 Copie des fichiers..."
cp -r .next netlify-deploy/
cp -r public netlify-deploy/
cp package.json netlify-deploy/
cp package-lock.json netlify-deploy/
cp next.config.mjs netlify-deploy/
cp netlify.toml netlify-deploy/

# 4. Instructions pour l'utilisateur
echo ""
echo "✅ Déploiement préparé!"
echo ""
echo "📝 Instructions pour déployer sur Netlify:"
echo ""
echo "Option 1: Via l'interface Netlify"
echo "1. Allez sur app.netlify.com"
echo "2. Créez un nouveau site"
echo "3. Glissez-déposez le dossier 'netlify-deploy' sur la page"
echo ""
echo "Option 2: Via Netlify CLI (local)"
echo "1. cd netlify-deploy"
echo "2. npx netlify login"
echo "3. npx netlify deploy --prod"
echo ""
echo "Option 3: Via GitHub/GitLab"
echo "1. Créez un repository Git"
echo "2. Poussez le code"
echo "3. Connectez Netlify au repository"
echo ""
echo "🎯 Les images corrigées:"
echo "✓ /images/image-7.png (Conseil)"
echo "✓ /images/image-8.png (Placement)"
echo "✓ /images/image-9.png (Formation)"
echo "✓ /images/slider-1.png"
echo "✓ /images/logo-1.png"
echo "✓ /images/logo-shape2-1.png"

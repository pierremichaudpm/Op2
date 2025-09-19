#!/bin/bash

# Script automatique pour pousser vers GitHub
echo "🚀 Push automatique vers GitHub..."
echo ""
echo "📝 Instructions rapides:"
echo "1. Allez sur: https://github.com/settings/tokens/new"
echo "2. Nom: 'Op2 Deploy'"
echo "3. Cochez: 'repo' (tout)"
echo "4. Cliquez: 'Generate token'"
echo "5. Copiez le token"
echo ""
read -p "Collez votre token GitHub ici: " TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token vide, annulation..."
    exit 1
fi

echo "📤 Push en cours..."
git push https://$TOKEN@github.com/pierremichaudpm/Op2.git main

if [ $? -eq 0 ]; then
    echo "✅ Success! Code poussé vers GitHub!"
    echo "🔗 Voir: https://github.com/pierremichaudpm/Op2"
    echo ""
    echo "📝 Prochaine étape:"
    echo "1. Allez sur https://app.netlify.com"
    echo "2. 'Import an existing project'"
    echo "3. Choisissez GitHub → Op2"
    echo "4. Deploy!"
else
    echo "❌ Erreur lors du push"
fi

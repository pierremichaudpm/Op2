#!/bin/bash

# Script automatique pour déployer vers Railway via GitHub
echo "🚀 Déploiement Op2 vers Railway..."
echo ""

# Vérifier s'il y a des changements
if [[ -z $(git status -s) ]]; then
    echo "ℹ️  Aucun changement à déployer"
    exit 0
fi

echo "📝 Changements détectés:"
git status -s
echo ""

# Demander le message de commit
read -p "💬 Message de commit: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update: déploiement $(date '+%Y-%m-%d %H:%M')"
fi

echo ""
echo "📦 Commit en cours..."
git add .
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du commit"
    exit 1
fi

echo "📤 Push vers GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Code poussé vers GitHub!"
    echo "🔗 Repo: https://github.com/pierremichaudpm/Op2"
    echo ""
    echo "🚂 Railway va automatiquement:"
    echo "   1. Détecter le nouveau commit"
    echo "   2. Builder le projet Next.js"
    echo "   3. Déployer avec HTTPS sécurisé"
    echo ""
    echo "📊 Suivre le déploiement:"
    echo "   → https://railway.app/dashboard"
    echo ""
    echo "⏱️  Temps estimé: 2-3 minutes"
    echo ""
    echo "🔒 SSL/HTTPS maintenant configuré automatiquement!"
else
    echo "❌ Erreur lors du push vers GitHub"
    exit 1
fi

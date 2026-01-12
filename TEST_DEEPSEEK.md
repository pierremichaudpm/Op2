# 🧪 Test de l'API DeepSeek

Ce script permet de tester la connexion et le fonctionnement de l'API DeepSeek.

## 📋 Prérequis

1. **Clé API DeepSeek** : Obtenez votre clé API sur [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. **Node.js** : Version 18.18.0 ou supérieure (déjà requis par le projet)

## 🚀 Utilisation

### Méthode 1 : Variable d'environnement (Recommandé)

```bash
# Définir la clé API
export DEEPSEEK_API_KEY=votre_clé_api_ici

# Exécuter le test
npm run test-deepseek
```

### Méthode 2 : Fichier .env.local

1. Créez un fichier `.env.local` à la racine du projet :
```bash
DEEPSEEK_API_KEY=votre_clé_api_ici
```

2. Installez dotenv (optionnel, le script fonctionne sans) :
```bash
npm install --save-dev dotenv
```

3. Exécutez le test :
```bash
npm run test-deepseek
```

### Méthode 3 : Ligne de commande directe

```bash
DEEPSEEK_API_KEY=votre_clé_api_ici node test-deepseek-api.js
```

## 📊 Ce que le script teste

- ✅ Connexion à l'API DeepSeek
- ✅ Authentification avec la clé API
- ✅ Envoi d'une requête de chat
- ✅ Réception et affichage de la réponse
- ✅ Affichage des métadonnées (tokens utilisés, modèle, etc.)

## 🔍 Résultats attendus

En cas de succès, vous verrez :
- ✅ Confirmation que la clé API est trouvée
- ✅ Détails de la requête envoyée
- ✅ Statut de la réponse HTTP
- ✅ Réponse du modèle DeepSeek
- ✅ Statistiques d'utilisation (tokens)

## ❌ Résolution des problèmes

### Erreur : "DEEPSEEK_API_KEY n'est pas définie"
- Vérifiez que vous avez bien exporté la variable ou créé le fichier `.env.local`
- Assurez-vous que la variable est accessible : `echo $DEEPSEEK_API_KEY`

### Erreur 401 : "Unauthorized"
- Vérifiez que votre clé API est correcte
- Assurez-vous que la clé API est active sur votre compte DeepSeek

### Erreur 429 : "Rate limit exceeded"
- Vous avez atteint la limite de requêtes
- Attendez quelques minutes avant de réessayer

### Erreur de connexion
- Vérifiez votre connexion internet
- Vérifiez que l'URL de l'API est accessible

## 📝 Notes

- Le script utilise le modèle `deepseek-chat` par défaut
- Le test envoie un message simple en français pour vérifier le fonctionnement
- Les tokens utilisés sont comptabilisés selon votre plan DeepSeek



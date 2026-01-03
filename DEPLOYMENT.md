# 🚀 Guide de Déploiement Railway - Op2

## ⚠️ Problème SSL résolu

Ce guide résout l'erreur : **"Ce site ne peut pas fournir de connexion sécurisée"**

## 📋 Checklist Railway

### 1. Configuration du Domaine

Dans Railway Dashboard → Settings → Domains :

- ✅ **Utiliser un domaine Railway** (`*.up.railway.app`) OU
- ✅ **Configurer un domaine personnalisé**

Pour un domaine personnalisé :
```
Type: CNAME
Name: www (ou @)
Value: [votre-projet].up.railway.app
```

### 2. Variables d'Environnement

Dans Railway Dashboard → Variables :

```bash
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
```

### 3. Forcer HTTPS

Railway génère automatiquement un certificat SSL Let's Encrypt, mais vous devez :

1. **Activer "Force HTTPS"** dans Railway Settings → Networking
2. Le code Next.js inclut maintenant des redirections HTTPS automatiques

### 4. Vérifications SSL

Après déploiement, vérifiez :

1. ✅ Le certificat SSL est valide (cadenas vert dans le navigateur)
2. ✅ HTTP redirige vers HTTPS automatiquement
3. ✅ Tous les assets chargent en HTTPS

```bash
# Tester le certificat
curl -I https://votre-domaine.com

# Vérifier la redirection HTTPS
curl -I http://votre-domaine.com
```

### 5. Headers de Sécurité

Les headers suivants sont maintenant configurés :

- ✅ `Strict-Transport-Security` (HSTS)
- ✅ `X-Frame-Options`
- ✅ `X-Content-Type-Options`
- ✅ `X-XSS-Protection`
- ✅ `Referrer-Policy`

## 🔧 Commandes de Déploiement

```bash
# 1. Commit et push vers GitHub
git add .
git commit -m "fix: Configuration SSL et sécurité Railway"
git push origin main

# 2. Railway redéploie automatiquement depuis GitHub
```

## 🐛 Résolution de Problèmes SSL

### Erreur : "NET::ERR_CERT_AUTHORITY_INVALID"

**Cause** : Certificat non généré ou domaine mal configuré

**Solution** :
1. Vérifiez que le domaine pointe vers Railway (DNS propagé)
2. Dans Railway → Settings → Domains → Regenerate Certificate
3. Attendez 5-10 minutes pour la propagation

### Erreur : "Ce site ne peut pas fournir de connexion sécurisée"

**Cause** : Mixed content (HTTP/HTTPS) ou certificat expiré

**Solution** :
1. Vérifiez qu'aucune ressource externe n'utilise HTTP
2. Activez "Force HTTPS" dans Railway
3. Le code Next.js force maintenant toutes les requêtes en HTTPS

### Erreur : "ERR_SSL_PROTOCOL_ERROR"

**Cause** : Configuration SSL/TLS incorrecte

**Solution** :
1. Vérifiez que PORT est bien défini (3000 par défaut)
2. Assurez-vous que `npm start` utilise le bon port
3. Redéployez le projet

## 📊 Vérification Post-Déploiement

```bash
# Test SSL complet
openssl s_client -connect votre-domaine.com:443 -servername votre-domaine.com

# Vérifier les headers de sécurité
curl -I https://votre-domaine.com | grep -i "strict-transport"
```

## 🔗 Ressources

- [Railway Docs - Custom Domains](https://docs.railway.app/deploy/deployments#custom-domains)
- [Railway Docs - SSL Certificates](https://docs.railway.app/deploy/deployments#ssl-certificates)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)

## ✅ Configuration Finale

Fichiers modifiés :
- ✅ `next.config.mjs` - Headers HTTPS et redirections
- ✅ `package.json` - Port dynamique pour Railway
- ✅ `railway.json` - Configuration Railway
- ✅ `nixpacks.toml` - Build Railway optimisé
- ✅ `.railwayignore` - Fichiers à ignorer

**Le site devrait maintenant fonctionner en HTTPS sans erreur SSL !** 🎉

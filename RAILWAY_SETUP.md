# 🚂 Configuration Railway - Guide Étape par Étape

## 🎯 Objectif

Configurer Railway pour résoudre l'erreur SSL : **"Ce site ne peut pas fournir de connexion sécurisée"**

---

## 📋 Prérequis

- ✅ Compte Railway créé (https://railway.app/)
- ✅ Projet Op2 connecté à GitHub
- ✅ Code poussé sur GitHub

---

## 🔧 Étape 1 : Connexion GitHub

### 1.1 Créer/Ouvrir le Projet

1. Allez sur https://railway.app/dashboard
2. Cliquez sur **"New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Choisissez le repo : **`pierremichaudpm/Op2`**
5. Railway détecte automatiquement Next.js ✅

### 1.2 Configuration Automatique

Railway détecte :
- ✅ `package.json` → Next.js project
- ✅ `railway.json` → Configuration personnalisée
- ✅ `nixpacks.toml` → Builder optimisé

---

## ⚙️ Étape 2 : Variables d'Environnement

### 2.1 Accéder aux Variables

Dans votre projet Railway :

```
Dashboard → Votre Projet → Variables (onglet)
```

### 2.2 Ajouter les Variables

Cliquez sur **"+ New Variable"** et ajoutez :

```bash
# Variable 1
NODE_ENV
production

# Variable 2
PORT
3000

# Variable 3
NEXT_TELEMETRY_DISABLED
1
```

### 2.3 Format Railway

Ou utilisez le mode "Raw Editor" et collez :

```env
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
```

Cliquez sur **"Add"** ou **"Save"**

---

## 🌐 Étape 3 : Configuration du Domaine

### Option A : Domaine Railway (Recommandé)

Railway génère automatiquement un domaine :

```
Settings → Networking → Domains
```

Vous verrez :
```
https://op2-production-XXXX.up.railway.app
```

**Certificat SSL activé automatiquement** 🔒

### Option B : Domaine Personnalisé

#### 3.1 Ajouter le Domaine

```
Settings → Networking → Domains → Custom Domain
```

Entrez : `votredomaine.com`

#### 3.2 Configurer le DNS

Railway vous donnera l'adresse CNAME :

```
Nom: www (ou @)
Type: CNAME
Valeur: op2-production-XXXX.up.railway.app
```

Allez chez votre registrar (OVH, Cloudflare, etc.) et ajoutez :

**Exemple Cloudflare** :
```
Type: CNAME
Name: www
Target: op2-production-XXXX.up.railway.app
Proxy: Désactivé (cloud gris, pas orange)
TTL: Auto
```

**Exemple OVH** :
```
Sous-domaine: www
Type: CNAME
Cible: op2-production-XXXX.up.railway.app.
```

⚠️ **Important** : Désactivez le proxy Cloudflare si vous l'utilisez !

#### 3.3 Vérifier la Propagation

```bash
# Attendre 5-10 minutes puis tester :
nslookup www.votredomaine.com

# Doit pointer vers Railway
```

#### 3.4 Certificat SSL

Railway génère automatiquement un certificat Let's Encrypt.

Dans Railway → Settings → Domains, vous verrez :
```
✅ SSL Certificate: Active
```

**Temps de génération** : 5-10 minutes après propagation DNS

---

## 🔒 Étape 4 : Forcer HTTPS

### 4.1 Activer "Enforce HTTPS"

```
Settings → Networking → HTTPS Enforcement
```

Activez :
```
☑️ Enforce HTTPS
```

Cela redirige automatiquement HTTP → HTTPS

### 4.2 Vérification

Le code Next.js inclut aussi des redirections HTTPS :

```javascript
// next.config.mjs
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
      destination: 'https://:host/:path*',
      permanent: true,
    },
  ];
}
```

**Double protection** HTTPS ! 🛡️

---

## 🚀 Étape 5 : Déploiement

### 5.1 Premier Déploiement

Railway déploie automatiquement lors de la connexion GitHub.

Suivez le build :
```
Dashboard → Votre Projet → Deployments
```

Vous verrez :
```
🔨 Building...
  - npm install
  - npm run build
  - Creating production build

✅ Deployed
  - https://op2-production-XXXX.up.railway.app
```

### 5.2 Déploiements Futurs

Chaque `git push` déclenche un nouveau déploiement :

```bash
# Depuis votre machine
git add .
git commit -m "Mon changement"
git push origin main

# Railway détecte et redéploie automatiquement
```

### 5.3 Suivre le Déploiement

```
Dashboard → Build Logs
```

Temps moyen : **2-3 minutes**

---

## ✅ Étape 6 : Vérification SSL

### 6.1 Test Manuel

Ouvrez votre navigateur et allez sur :
```
https://votre-domaine.com
```

Vérifiez :
- ✅ Cadenas vert dans la barre d'adresse
- ✅ "Connexion sécurisée" dans les infos du certificat
- ✅ Certificat émis par "Let's Encrypt"

### 6.2 Test HTTP → HTTPS

```
http://votre-domaine.com
```

Doit **rediriger automatiquement** vers HTTPS

### 6.3 Tests en Ligne de Commande

```bash
# Test certificat SSL
curl -vI https://votre-domaine.com 2>&1 | grep "SSL certificate"

# Test redirection
curl -I http://votre-domaine.com

# Test headers de sécurité
curl -I https://votre-domaine.com | grep -i "strict-transport"
```

### 6.4 Tests en Ligne

1. **SSL Labs** : https://www.ssllabs.com/ssltest/
   - Entrez votre domaine
   - Score attendu : **A ou A+**

2. **Security Headers** : https://securityheaders.com/
   - Entrez votre domaine
   - Vérifiez HSTS, X-Frame-Options, etc.

3. **Why No Padlock** : https://www.whynopadlock.com/
   - Détecte le mixed content (HTTP/HTTPS)

---

## 🐛 Résolution de Problèmes

### Problème 1 : "Deployment Failed"

**Cause** : Erreur de build

**Solution** :
1. Vérifiez les logs dans Railway → Build Logs
2. Testez en local : `npm install && npm run build`
3. Vérifiez que `package.json` est correct

### Problème 2 : "Application Error" ou "502 Bad Gateway"

**Cause** : Port incorrect ou app ne démarre pas

**Solution** :
1. Vérifiez que `PORT=3000` dans Variables
2. Vérifiez les logs : Railway → Runtime Logs
3. `package.json` doit avoir : `"start": "next start -p ${PORT:-3000}"`

### Problème 3 : "This site can't provide a secure connection"

**Causes possibles** :

#### A. DNS pas propagé
```bash
# Vérifier :
nslookup www.votredomaine.com
dig www.votredomaine.com

# Attendre 5-10 minutes et réessayer
```

#### B. Certificat en génération
```
Railway → Settings → Domains
```
Vérifiez : `SSL Certificate: Pending` ou `Active`

Si "Pending" → Attendez 5-10 minutes

#### C. "Enforce HTTPS" pas activé
```
Settings → Networking → HTTPS Enforcement
☑️ Activer
```

#### D. Cloudflare Proxy activé
Si vous utilisez Cloudflare :
```
DNS → www → Proxy Status: DNS only (cloud gris)
```

**Redéployez** :
```bash
git commit --allow-empty -m "redeploy"
git push origin main
```

### Problème 4 : "NET::ERR_CERT_AUTHORITY_INVALID"

**Cause** : Certificat non valide ou auto-signé

**Solution** :
```
Railway → Settings → Domains → Regenerate Certificate
```

Attendez 5-10 minutes

---

## 📊 Checklist Finale

Avant de marquer comme résolu :

- [ ] Variables d'environnement configurées
- [ ] Domaine configuré (Railway ou personnalisé)
- [ ] DNS propagé (pour domaine personnalisé)
- [ ] "Enforce HTTPS" activé
- [ ] Build réussi dans Railway
- [ ] Application démarre correctement
- [ ] HTTPS fonctionne (cadenas vert)
- [ ] HTTP redirige vers HTTPS
- [ ] Certificat SSL valide (Let's Encrypt)
- [ ] Headers de sécurité présents
- [ ] Score SSL Labs : A/A+

---

## 🎯 Commandes Rapides

```bash
# Vérifier si le site est up
curl -I https://votre-domaine.com

# Voir les logs Railway en temps réel
railway logs --tail

# Redéployer manuellement
railway up

# Ouvrir le dashboard Railway
railway open
```

---

## 📞 Support

**Problèmes persistants** ?

1. **Logs Railway** : Dashboard → Build Logs / Runtime Logs
2. **Documentation Railway** : https://docs.railway.app/
3. **Support Railway** : https://railway.app/help
4. **Discord Railway** : https://discord.gg/railway

---

## 🎉 Résultat Final

✅ Site Op2 accessible en HTTPS
✅ Certificat SSL valide
✅ Sécurité maximale
✅ Performance optimale

**Votre site est maintenant 100% sécurisé !** 🔒

---

**Dernière mise à jour** : 3 janvier 2026

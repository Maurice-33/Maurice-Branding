# Maurice — Site vitrine (branding) — Starter GitHub Pages

Ce dépôt contient un **site vitrine statique** (HTML/CSS/JS) prêt à être publié **gratuitement** via **GitHub Pages**.

## 🚀 Publication en 5 minutes

1. **Créer un compte GitHub** (si ce n’est pas déjà fait).
2. **Créer un nouveau dépôt** (ex. `maurice-branding`).
3. Cliquez sur **Add file ▸ Upload files** et **uploadez** tous les fichiers de ce dossier (le contenu de l’archive).
4. Allez dans **Settings ▸ Pages** :
   - *Build and deployment* ▸ **Source** : *Deploy from a branch*  
   - **Branch** : `main` et **/ (root)` ▸ Save
5. Après déploiement, l’URL sera du type `https://<votre-utilisateur>.github.io/maurice-branding/`

> Astuce : Pour un site racine sans sous-dossier, créez un dépôt **`<votre-utilisateur>.github.io`** et placez-y ce site.

## ✏️ Modifier le contenu

- **Texte & sections** : ouvrez `index.html` et éditez les titres/paragraphes (héros, services, process, portfolio, à propos, contact).
- **Couleurs & style** : modifiez les variables dans `styles.css` (ex: `--primary`, `--accent`, polices).
- **Portfolio** : remplacez les images dans `assets/images/` par vos visuels (mêmes noms de fichiers ou modifiez les `src`).
- **Email de contact** : remplacez `contact@example.com` par votre adresse dans `index.html` *et* `script.js`.

## 📮 Formulaire 100% gratuit

Par défaut, le bouton **mailto** s’ouvre. Pour un envoi de formulaire “pro” sans backend :
1. Créez un formulaire sur **Formspree** (plan gratuit) et copiez l’URL fournie (ex: `https://formspree.io/f/xxxxxxx`).
2. Collez-la dans `script.js` à la place de `FORM_ENDPOINT`.
3. (Optionnel) Ajoutez un message de confirmation ou redirection.

> Alternatives gratuites : Netlify Forms (si vous déployez sur Netlify), Static Forms, Getform (plans gratuits limités).

## 🔍 SEO de base

- Mettez à jour la balise `<title>` et `<meta name="description">` dans `index.html`.
- Ajoutez votre URL dans les balises `og:url` et `og:image`.
- `sitemap.xml` et `robots.txt` sont inclus.
- Ajoutez un **domaine personnalisé** dans **Settings ▸ Pages** (champ **Custom domain**) + configuration DNS (CNAME).

## 🛠️ Édition en ligne ou locale

- **En ligne** : éditez directement les fichiers sur GitHub (bouton **✏️**), puis **Commit changes**.
- **En local** (avancé) :
  ```bash
  git clone https://github.com/<vous>/maurice-branding.git
  cd maurice-branding
  # modifiez les fichiers…
  git add .
  git commit -m "Mise à jour contenu"
  git push origin main
  ```

## 🧩 Structure
```
/
├── index.html
├── styles.css
├── script.js
├── 404.html
├── robots.txt
├── sitemap.xml
└── assets/
    └── images/
        ├── projet1.svg … projet6.svg
        └── (vos images ici)
```

## ✅ Licence
Vous pouvez utiliser et modifier librement ce starter pour vos projets pro/perso.

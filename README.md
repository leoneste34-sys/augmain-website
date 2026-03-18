# Guide de Déploiement - Augmain

Ce projet est une application web **statique** utilisant React via des modules ES (ESM) et Tailwind CSS via CDN. 
Cela signifie qu'elle ne nécessite pas d'étape de compilation complexe (`npm build`) pour fonctionner.

## 🚀 Comment récupérer votre code (Export)

Puisque vous êtes sur l'éditeur en ligne, vous devez sauvegarder les fichiers localement sur votre ordinateur pour les héberger ailleurs.

1. Créez un dossier nommé `augmain-app` sur votre bureau.
2. Copiez le contenu de chaque fichier de l'éditeur dans des fichiers du même nom dans votre dossier.

**Structure des fichiers à respecter :**

```text
augmain-app/
├── index.html          (Point d'entrée principal)
├── index.tsx           (Montage React)
├── App.tsx             (Composant racine)
├── types.ts            (Définitions TypeScript)
├── constants.tsx       (Textes et configurations)
├── metadata.json       (Configuration projet)
├── utils/
│   └── email.ts        (Gestion des envois email)
└── components/         (Tous vos composants visuels)
    ├── StickyHeader.tsx
    ├── ProfileHero.tsx
    ├── PromiseSection.tsx
    ├── EfficiencyDiagnostic.tsx
    ├── DemoSection.tsx
    ├── Pricing.tsx
    ├── ContactForm.tsx
    ├── Benefits.tsx
    ├── Footer.tsx
    ├── QualificationModal.tsx
    ├── ROICalculator.tsx
    ├── TechStack.tsx
    ├── FAQ.tsx
    ├── Toast.tsx
    └── FloatingCTA.tsx
```

## 🌍 Comment mettre en ligne (Obtenir un lien public propre)

La méthode la plus simple et gratuite pour héberger ce type de projet est **Netlify Drop**.

1. **Préparez vos fichiers** : Assurez-vous d'avoir tous les fichiers listés ci-dessus dans votre dossier `augmain-app`.
2. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop).
3. **Glissez-déposez** votre dossier `augmain-app` complet dans la zone indiquée.
4. Le site sera en ligne en quelques secondes.

Vous obtiendrez un lien du type `https://votre-site.netlify.app` que vous pourrez partager à vos clients. Ils ne verront **jamais** votre code, seulement l'application.

## 🛠 Note technique

- **Framework** : React 19 (via `esm.sh`)
- **Style** : Tailwind CSS (via CDN)
- **Icônes** : Lucide React
- **Email** : EmailJS (Configuré dans `utils/email.ts`)

Si vous souhaitez utiliser un nom de domaine personnalisé (ex: `www.augmain.fr`), vous pourrez le configurer dans les paramètres de Netlify après le déploiement.

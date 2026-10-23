# augmain.com — site vitrine de l'agence Augmain

Pages HTML statiques (pas de framework). Vite copie les pages et `public/` dans `dist/` ; Vercel sert le résultat (projet `augmain-website`, domaine www.augmain.com).

- Pages : `index.html`, `agence-ia-montpellier.html`, `standardiste-ia-restaurant.html` (Better Call Cook), `mentions-legales.html`. Adresses sans `.html` grâce à `cleanUrls` dans `vercel.json`.
- Style commun : `public/site.css`. Logo : `public/favicon.svg` (et le même dessin en ligne dans l'en-tête des pages).
- Référencement : `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, données structurées dans chaque page.
- Textes à la 3e personne (« l'agence »). Aucun chiffre qui puisse passer pour un résultat d'Augmain sans source.
- Prix affichés = grille validée le 23/10/2026, figée jusqu'au 31/12/2026.

Tester en local : `npm install` puis `npm run dev`.

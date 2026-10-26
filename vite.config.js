// Site vitrine d'Augmain : pages HTML statiques, Vite ne sert qu'à les copier dans dist/.
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const page = (nom) => resolve(import.meta.dirname, nom);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        accueil: page('index.html'),
        montpellier: page('agence-ia-montpellier.html'),
        restaurants: page('standardiste-ia-restaurant.html'),
        mentions: page('mentions-legales.html'),
        carte: page('augmain-carte.html'),
      },
    },
  },
});

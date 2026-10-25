// Articles du blog « Conseils » d'Augmain. `node blog/articles.mjs` régénère public/blog/*.html.
// Modifier le texte ici, puis relancer la commande.
import { writeFileSync, mkdirSync } from "node:fs";

const WA = t => "https://wa.me/33604980726?text=" + encodeURIComponent(t);

const ARTICLES = [
  {
    slug: "commerce-repris-fiche-google",
    tag: "Fiche Google",
    titre: "Commerce repris : récupérer la fiche Google de l'ancien propriétaire",
    desc: "Vous avez repris un bar, un restaurant ou une boutique ? Sur Google, c'est peut-être encore l'ancien nom, les anciens horaires et les vieux avis. Voici comment reprendre la main.",
    chapo: "Vous avez repris un commerce, mais sur Google c'est encore l'ancien patron : son nom, ses horaires, ses photos. Pour vos futurs clients, c'est comme si vous n'existiez pas. Voici comment reprendre la main.",
    cta: "Vous préférez qu'on s'en occupe ? C'est notre remise en route sur Google : 290 €, une seule fois.",
    ctaBtn: "Je veux ma fiche à mon nom",
    corps: `
<h2>1. Regardez ce que voient vos clients</h2>
<p>Tapez le nom de votre commerce et votre ville dans Google Maps, depuis votre téléphone. Notez ce qui est faux : le nom, les horaires, le numéro, les photos, la mention « Fermé définitivement », le site qui ne marche plus. C'est exactement ce que voit un client qui hésite à venir.</p>
<h2>2. Demandez l'accès à la fiche</h2>
<p>Sur la fiche, touchez « Vous êtes propriétaire de cet établissement ? » (ou « Revendiquer cet établissement »). Google vous demande de prouver que le commerce est à vous : par téléphone, par SMS, par e-mail, par vidéo ou par courrier, selon les cas.</p>
<p>Si l'ancien propriétaire gère encore la fiche, Google lui envoie votre demande. Il peut accepter, refuser ou ne pas répondre ; sans réponse, Google vous propose souvent de continuer la vérification vous-même. Comptez de quelques jours à quelques semaines.</p>
<h2>3. Même activité ou nouvelle affaire ?</h2>
<ul>
<li><b>Vous gardez la même activité</b> (un restaurant reste un restaurant) : mettez à jour la fiche existante. Vous gardez son historique et ses avis.</li>
<li><b>Vous changez complètement d'activité</b> : il vaut mieux signaler l'ancienne fiche comme fermée et en créer une nouvelle, pour ne pas hériter d'avis qui ne vous concernent pas.</li>
</ul>
<h2>4. Remplissez tout, vraiment tout</h2>
<p>Le nom exact de l'enseigne, la bonne catégorie, les horaires (y compris les jours fériés), le téléphone, le lien vers votre site ou votre carte, et surtout des <b>photos récentes</b> : la devanture, la salle, vos plats ou vos produits. Une fiche complète inspire confiance et donne envie de venir.</p>
<h2>5. Relancez les avis</h2>
<p>Les vieux avis parlent de l'ancien patron. Demandez à vos clients contents de laisser un mot, avec un QR code posé au comptoir qui mène directement à votre fiche. Répondez à chaque avis, même aux mauvais, poliment : les futurs clients lisent aussi vos réponses.</p>
<h2>6. Corrigez les autres annuaires</h2>
<p>Google n'est pas seul : Apple Plans (les iPhone), PagesJaunes, TripAdvisor et TheFork affichent souvent encore l'ancien commerce. Mettez-les à jour avec exactement le même nom, la même adresse et le même téléphone partout.</p>`
  },
  {
    slug: "erreurs-google-commerce",
    tag: "Avis et visibilité",
    titre: "5 erreurs sur Google qui font fuir les clients d'un commerce",
    desc: "Horaires faux, photos de 2018, avis sans réponse : les petites erreurs sur Google qui font choisir le voisin. Et comment les corriger en une heure.",
    chapo: "Avant de pousser votre porte, la plupart des clients regardent votre fiche Google. En quelques secondes, ils décident. Voici les cinq erreurs qu'on voit le plus souvent chez les commerces de Montpellier, et comment les corriger.",
    cta: "On vérifie votre fiche gratuitement et on vous dit ce qui cloche, en 5 minutes.",
    ctaBtn: "Vérifier mon commerce",
    corps: `
<h2>1. Des horaires faux</h2>
<p>C'est l'erreur qui coûte le plus cher : un client se déplace, trouve porte close et ne revient pas. Pensez aux horaires exceptionnels (jours fériés, vacances, fermeture pour travaux) : Google permet de les ajouter à l'avance.</p>
<h2>2. Pas de photos, ou de vieilles photos</h2>
<p>Une fiche sans photo ressemble à un commerce fermé. Ajoutez au moins la devanture (pour qu'on vous reconnaisse dans la rue), la salle et ce que vous vendez. Renouvelez-les quand la carte ou la déco change.</p>
<h2>3. Des avis sans réponse</h2>
<p>Un avis négatif sans réponse laisse le dernier mot au client mécontent. Une réponse calme et précise montre que vous êtes là, et rassure ceux qui lisent. Remerciez aussi les avis positifs : ça encourage les suivants.</p>
<h2>4. La mauvaise catégorie</h2>
<p>« Restaurant » ne suffit pas toujours : « Restaurant italien », « Bar à vin », « Boulangerie-pâtisserie »… La catégorie principale aide Google à vous montrer aux bonnes personnes, au bon moment. Ajoutez des catégories secondaires si elles sont vraies.</p>
<h2>5. Un lien qui ne mène nulle part</h2>
<p>Un site qui ne s'ouvre plus, une page Facebook abandonnée ou aucun lien : le client qui voulait voir votre carte part ailleurs. Mettez un lien vers une page à jour, lisible sur téléphone, avec votre carte, vos horaires et un bouton pour appeler ou réserver.</p>
<h2>En bonus : publiez de temps en temps</h2>
<p>Google permet de publier des nouvelles sur votre fiche (plat du jour, événement, nouveauté). Une publication par semaine montre que le commerce est vivant.</p>`
  },
  {
    slug: "prix-site-internet-restaurant-montpellier",
    tag: "Site internet",
    titre: "Combien coûte un site pour un restaurant à Montpellier ?",
    desc: "Abonnement à un outil en ligne, freelance, agence : ce que vous payez vraiment pour un site de restaurant, ce qu'il doit contenir, et nos prix affichés.",
    chapo: "Un site de restaurant n'a pas besoin d'être compliqué. Il doit surtout répondre vite à trois questions : qu'est-ce qu'on mange, c'est ouvert quand, et comment on réserve. Voici comment s'y retrouver dans les prix.",
    cta: "Chez Augmain, un site clé en main coûte 690 €, une seule fois. Il vous appartient.",
    ctaBtn: "Je veux un devis pour mon site",
    corps: `
<h2>Ce que doit contenir un bon site de restaurant</h2>
<ul>
<li>Votre carte, lisible sur téléphone (pas un PDF illisible).</li>
<li>Vos horaires et votre adresse, avec un bouton itinéraire.</li>
<li>Un bouton pour appeler et un moyen de réserver.</li>
<li>De vraies photos de la salle et des plats.</li>
<li>Un site rapide, que Google (et maintenant ChatGPT) peut lire.</li>
</ul>
<h2>Les trois façons d'avoir un site</h2>
<p><b>Le faire soi-même avec un outil en ligne.</b> Pas cher au départ, mais c'est un abonnement à vie, et il faut le temps de tout construire et de le tenir à jour. Beaucoup de patrons commencent… et ne finissent jamais.</p>
<p><b>Passer par un freelance.</b> Le prix varie énormément selon la personne. Vérifiez qui gère le site après la livraison et à qui appartient le nom de domaine.</p>
<p><b>Passer par une agence.</b> Plus cadré, souvent plus cher. Demandez un prix écrit, ce qui est inclus, et ce que coûtent les modifications ensuite.</p>
<h2>Les questions à poser avant de signer</h2>
<ol>
<li>Le site et le nom de domaine sont-ils à mon nom ?</li>
<li>Est-ce que je peux changer ma carte moi-même, depuis mon téléphone ?</li>
<li>Combien coûtent les modifications après la mise en ligne ?</li>
<li>Y a-t-il un abonnement obligatoire ?</li>
</ol>
<h2>Notre prix, affiché</h2>
<p>Chez Augmain, un site clé en main coûte <b>690 €, une seule fois</b> : carte, réservation ou devis, pensé pour le téléphone, lisible par Google. Vous changez votre carte vous-même. Si vous préférez ne pas y toucher, le suivi à <b>29 € par mois, sans engagement</b>, s'occupe de tout. Le site reste à vous dans tous les cas.</p>`
  }
];

const ENTETE = `<header class="haut" id="haut">
  <div class="cadre">
    <a class="marque" href="/" aria-label="Augmain, accueil"><svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="24" fill="#0f2340"/><g fill="#f4e9d8"><circle cx="50" cy="27" r="10"/><path d="M29 50c5-9 13-14 21-14s16 5 21 14c-5-3-10-3-14 1-3 3-5 5-7 5s-4-2-7-5c-4-4-9-4-14-1z"/></g><path d="M50 69c-5-6-9-9-14-9-5 0-9 4-9 9s4 9 9 9c5 0 9-3 14-9s9-9 14-9c5 0 9 4 9 9s-4 9-9 9c-5 0-9-3-14-9z" fill="none" stroke="#ffc83d" stroke-width="6" stroke-linejoin="round"/></svg><span>Augmain</span></a>
    <nav class="menu" id="menu" aria-label="Menu principal">
      <a class="lien-menu" href="/#services">Services et prix</a>
      <a class="lien-menu" href="/#realisations">Réalisations</a>
      <a class="lien-menu" href="/#calcul">Calculateur</a>
      <a class="lien-menu" href="/blog">Conseils</a>
      <a class="lien-menu" href="/#contact">Contact</a>
    </nav>
    <div class="haut-actions">
      <a class="btn jaune petit" href="/#contact" data-cta="blog-entete">Audit offert</a>
      <button type="button" class="burger" aria-expanded="false" aria-controls="menu" aria-label="Ouvrir le menu"><span></span><span></span></button>
    </div>
  </div>
</header>`;

const PIED = `<footer class="bas"><div class="cadre">
  <div class="bas-marque"><b>Augmain</b><span>Agence web et IA · Montpellier</span></div>
  <nav aria-label="Pied de page"><a href="/#services">Services et prix</a><a href="/blog">Conseils</a><a href="/agence-ia-montpellier">Agence IA à Montpellier</a><a href="/mentions-legales">Mentions légales</a></nav>
  <span class="copie">© 2026 Augmain</span>
</div></footer>
<div class="barre-mobile" aria-label="Contact rapide"><a class="btn vert" href="${WA("Bonjour Augmain, ")}" rel="noopener" data-cta="barre-wa">WhatsApp</a><a class="btn nuit-btn" href="tel:+33604980726" data-cta="barre-tel">Appeler</a></div>
<script src="/js/site.js" defer></script>
<script defer src="/_vercel/insights/script.js"></script>`;

const tete = (titre, desc, url) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titre} — Augmain</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://www.augmain.com${url}">
<meta name="theme-color" content="#0f2340">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article"><meta property="og:title" content="${titre}"><meta property="og:description" content="${desc}"><meta property="og:image" content="https://www.augmain.com/img/partage.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=swap">
<link rel="stylesheet" href="/v3.css">`;

mkdirSync("public/blog", { recursive: true });
for (const a of ARTICLES) {
  const url = "/blog/" + a.slug;
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.titre, description: a.desc, inLanguage: "fr-FR",
    author: { "@type": "Person", name: "Mehdi Zahaf" }, publisher: { "@id": "https://www.augmain.com/#agence" }, datePublished: "2026-10-26", mainEntityOfPage: "https://www.augmain.com" + url };
  writeFileSync(`public/blog/${a.slug}.html`, `${tete(a.titre, a.desc, url)}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
${ENTETE}
<main id="contenu">
<article class="article-page">
<p class="fil-ariane"><a href="/">Accueil</a> › <a href="/blog">Conseils</a> › ${a.tag}</p>
<h1>${a.titre}</h1>
<p class="chapo">${a.chapo}</p>
${a.corps.trim()}
<div class="encart-cta"><p>${a.cta}</p><a class="btn jaune" href="${WA("Bonjour Augmain, j'ai lu votre article « " + a.titre + " ». Mon commerce : ")}" rel="noopener" data-cta="blog-${a.slug}">${a.ctaBtn}</a></div>
<p><a class="lien-fleche" href="/blog">Tous nos conseils</a></p>
</article>
</main>
${PIED}
</body>
</html>
`);
}

writeFileSync("public/blog/index.html", `${tete("Conseils pour être trouvé sur Google", "Les conseils d'Augmain pour les commerces de Montpellier : fiche Google, avis, site internet.", "/blog")}
</head>
<body>
${ENTETE}
<main id="contenu">
<section class="article-page">
<h1>Nos conseils, gratuits.</h1>
<p class="chapo">Fiche Google, avis, site internet : ce qu'on a appris en aidant les commerces de Montpellier à être trouvés.</p>
<div class="liste-blog">
${ARTICLES.map(a => `<a class="article" href="/blog/${a.slug}"><span class="a-tag">${a.tag}</span><h3>${a.titre}</h3><p>${a.desc}</p><span class="lire">Lire l'article</span></a>`).join("\n")}
</div>
<div class="encart-cta"><p>Une question sur votre commerce ? On vous répond dans la journée.</p><a class="btn jaune" href="${WA("Bonjour Augmain, j'ai une question : ")}" rel="noopener" data-cta="blog-index">Poser ma question</a></div>
</section>
</main>
${PIED}
</body>
</html>
`);
console.log("blog : " + (ARTICLES.length + 1) + " pages écrites");

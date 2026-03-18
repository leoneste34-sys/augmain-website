import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StickyHeader } from '../components/StickyHeader';
import { Footer } from '../components/Footer';
import { FloatingCTA } from '../components/FloatingCTA';
import { COMPANY_INFO } from '../constants';
import { Bot, PhoneCall, TrendingUp, CheckCircle, MapPin } from 'lucide-react';

export const AgenceIAMontpellier: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <Helmet>
        <title>Agence IA Montpellier | Automatisation & Intelligence Artificielle PME</title>
        <meta name="description" content="Augmain, votre agence IA à Montpellier. Spécialiste de l'intelligence artificielle pour PME, automatisation IA Hérault et agent vocal IA restaurant Montpellier." />
      </Helmet>

      <StickyHeader onOpenQualification={() => window.location.href = COMPANY_INFO.calendarUrl} />

      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-4">
          
          <header className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" />
              <span>Expertise Locale - Occitanie</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Agence IA Montpellier : L'Intelligence Artificielle au Service des PME de l'Hérault
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Vous dirigez une entreprise dans la région montpelliéraine et vous vous demandez comment l'intelligence artificielle peut concrètement vous faire gagner du temps et de l'argent ? Découvrez comment notre agence IA à Montpellier accompagne la transformation digitale de votre activité.
            </p>
          </header>

          <div className="prose prose-lg prose-slate max-w-none">
            
            <section className="mb-12 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                Pourquoi faire appel à une agence IA à Montpellier ?
              </h2>
              <p className="mb-4">
                L'intelligence artificielle n'est plus réservée aux géants de la tech de la Silicon Valley. Aujourd'hui, l'<strong>intelligence artificielle pour PME à Montpellier</strong> est une réalité accessible, pragmatique et extrêmement rentable. En tant qu'agence locale, nous comprenons les défis spécifiques du tissu économique de l'Hérault : saisonnalité, recrutement difficile, besoin de fidélisation client et gestion des pics d'activité.
              </p>
              <p className="mb-4">
                Faire appel à une <strong>agence IA Montpellier</strong> comme Augmain, c'est choisir un partenaire de proximité capable d'auditer vos processus internes et d'y injecter des solutions d'<strong>automatisation IA Hérault</strong> sur-mesure. Notre objectif n'est pas de remplacer l'humain, mais de le libérer des tâches répétitives et chronophages pour qu'il puisse se concentrer sur son cœur de métier : la relation client et l'expertise technique.
              </p>
              <p className="mb-4">
                De plus, notre approche est profondément ancrée dans la réalité des entreprises locales. Nous savons que les PME n'ont ni le temps ni les ressources pour gérer des projets informatiques complexes. C'est pourquoi nous livrons des solutions "clés en main". De la configuration initiale à la formation de vos équipes, en passant par le support technique, nous sommes à vos côtés. L'adoption de l'IA doit être un levier de croissance, pas une source de stress supplémentaire.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2">Gain de temps immédiat</h3>
                  <p className="text-slate-600 text-sm">Automatisez jusqu'à 80% de vos tâches administratives et de la gestion de vos appels entrants. Libérez des heures précieuses chaque semaine.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2">Augmentation du CA</h3>
                  <p className="text-slate-600 text-sm">Ne perdez plus aucun prospect à cause d'un téléphone qui sonne dans le vide. L'IA répond 24/7 et qualifie chaque opportunité.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2">Amélioration de l'image de marque</h3>
                  <p className="text-slate-600 text-sm">Offrez à vos clients une expérience fluide, moderne et sans attente. Un accueil téléphonique irréprochable renforce votre crédibilité.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2">Réduction des coûts</h3>
                  <p className="text-slate-600 text-sm">Diminuez vos charges opérationnelles tout en augmentant votre capacité de traitement. L'IA est un investissement rapidement rentabilisé.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                L'Automatisation IA dans l'Hérault : Pour quels secteurs ?
              </h2>
              <p className="mb-6">
                L'<strong>automatisation IA Hérault</strong> s'adresse à tous les secteurs d'activité, mais elle est particulièrement redoutable pour les entreprises de services, les artisans, les professions libérales et le secteur de la restauration. Chaque secteur a ses propres défis, et nos solutions s'adaptent à vos processus métiers spécifiques.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8 flex items-center gap-2">
                <PhoneCall className="w-6 h-6 text-blue-500" />
                Le cas spécifique : Agent vocal IA restaurant Montpellier
              </h3>
              <p className="mb-4">
                La restauration est un secteur sous tension. Pendant le service, le téléphone sonne sans arrêt pour des réservations, des commandes à emporter ou de simples questions sur les horaires. C'est ici qu'intervient notre solution d'<strong>agent vocal IA restaurant Montpellier</strong>.
              </p>
              <p className="mb-4">
                Imaginez un standardiste virtuel, doté d'une voix naturelle, capable de décrocher en 2 secondes, de comprendre la demande du client, de vérifier vos disponibilités dans votre logiciel de réservation (comme TheFork ou Zenchef), et de valider la table. Tout cela pendant que votre équipe en salle reste 100% concentrée sur les clients présents. C'est la promesse de notre agence IA.
              </p>
              <p className="mb-4">
                L'impact sur le chiffre d'affaires est direct. Un client qui n'arrive pas à vous joindre appellera le restaurant d'à côté. Avec notre agent vocal, chaque appel est traité. De plus, l'IA peut gérer les commandes à emporter, proposer des ventes additionnelles (boissons, desserts) et informer les clients sur les allergènes ou les menus spéciaux. C'est un véritable atout pour la rentabilité de votre établissement.
              </p>
              <ul className="space-y-3 my-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span><strong>Zéro appel manqué :</strong> L'IA peut gérer 100 appels simultanés, même aux heures de pointe.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span><strong>Prise de commande :</strong> Intégration possible avec vos systèmes de caisse pour une gestion fluide.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span><strong>Multilingue :</strong> Accueil parfait des touristes étrangers en haute saison (anglais, espagnol, allemand, etc.).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span><strong>Fidélisation :</strong> Reconnaissance des clients habituels et personnalisation de l'accueil.</span>
                </li>
              </ul>
            </section>

            <section className="mb-12 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Bot className="w-8 h-8 text-blue-400" />
                Intelligence Artificielle PME Montpellier : Comment ça marche ?
              </h2>
              <p className="text-slate-300 mb-6">
                Intégrer l'<strong>intelligence artificielle PME Montpellier</strong> dans votre entreprise ne nécessite aucune compétence technique de votre part. Notre agence s'occupe de tout le processus, de l'audit initial au déploiement, en passant par la maintenance et les mises à jour.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Audit de vos processus</h3>
                    <p className="text-slate-400">Nous analysons vos flux d'appels, vos tâches répétitives et vos logiciels actuels (CRM, agenda, facturation). Cette étape est cruciale pour identifier les points de friction et les opportunités d'automatisation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Création de votre Agent IA</h3>
                    <p className="text-slate-400">Nous entraînons l'IA sur vos données (FAQ, tarifs, ton de marque) pour qu'elle réponde exactement comme votre meilleur employé. Nous personnalisons la voix, le vocabulaire et les scénarios de conversation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Déploiement et Intégration</h3>
                    <p className="text-slate-400">Nous connectons l'IA à votre ligne téléphonique et à vos outils existants (Google Agenda, Doctolib, Salesforce, etc.). La transition est transparente pour vous et vos clients.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Suivi et Optimisation</h3>
                    <p className="text-slate-400">Nous surveillons les performances de l'IA, analysons les conversations et ajustons les réponses pour améliorer continuellement la qualité du service. Vous avez accès à un tableau de bord détaillé.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Les vraies questions des dirigeants sur l'IA
              </h2>
              <p className="mb-6">
                Il est normal d'avoir des doutes face à une nouvelle technologie. Voici les réponses aux questions que nous posent le plus souvent les chefs d'entreprise de la région.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">L'IA va-t-elle remplacer mes employés ?</h3>
                  <p className="text-slate-600">Non. L'objectif de notre <strong>agence IA Montpellier</strong> est l'augmentation, pas le remplacement. L'IA gère le "bruit" (les appels de qualification, les questions simples, les prises de rendez-vous basiques) pour que vos employés gèrent la "valeur" (le conseil, la vente complexe, l'empathie, la relation humaine). Vos équipes seront soulagées et plus productives.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Est-ce que la voix de l'IA fait "robotique" ?</h3>
                  <p className="text-slate-600">Absolument pas. Les technologies que nous utilisons chez Augmain génèrent des voix ultra-réalistes, avec des respirations, des hésitations naturelles ("euh", "hmm") et une intonation parfaite. Vos clients ne se rendront souvent même pas compte qu'ils parlent à une IA. L'expérience est fluide et agréable.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Combien coûte l'automatisation IA dans l'Hérault ?</h3>
                  <p className="text-slate-600">Le coût dépend de la complexité de l'intégration et du volume d'appels. Cependant, le retour sur investissement (ROI) est généralement atteint dès le premier mois. Un agent vocal IA coûte une fraction du prix d'un standardiste humain, ne prend pas de congés, ne tombe jamais malade et est disponible 24h/24 et 7j/7. Demandez-nous un devis personnalisé.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Mes données sont-elles en sécurité ?</h3>
                  <p className="text-slate-600">Oui. La sécurité et la confidentialité des données sont nos priorités absolues. Nos solutions sont conformes au RGPD. Les données de vos clients sont chiffrées et ne sont jamais utilisées pour entraîner des modèles publics. Vous restez l'unique propriétaire de vos informations.</p>
                </div>
              </div>
            </section>

            <div className="mt-16 text-center bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Prêt à moderniser votre entreprise ?</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Contactez Augmain, votre agence IA à Montpellier, pour un diagnostic gratuit de votre potentiel d'automatisation. Découvrez comment l'intelligence artificielle peut transformer votre PME dès aujourd'hui.
              </p>
              <a 
                href={COMPANY_INFO.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <PhoneCall className="w-5 h-5" />
                Réserver mon diagnostic gratuit
              </a>
            </div>

          </div>
        </article>
      </main>

      <Footer />
      <FloatingCTA onClick={() => window.location.href = COMPANY_INFO.calendarUrl} />
    </div>
  );
};

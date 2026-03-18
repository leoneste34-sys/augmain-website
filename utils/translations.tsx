
import { Phone, MessageSquare, Clock, Globe, ShieldCheck, Zap, Building, Stethoscope, Briefcase, Plus, FileText, Smartphone, PenTool, Laptop, Workflow, Lock, LayoutDashboard, Server, Link, BarChart3, TrendingUp, Puzzle, PhoneMissed, BrainCircuit, Search, Mail, User, Calendar, Database, MessageCircle, Video, Euro, Coffee, Users, Star, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

export const content = {
  fr: {
    header: {
      cta: "Diagnostic Gratuit",
      call: "Appeler",
      market_invest: "CA Sécurisé",
      market_prod: "Temps Gagné",
      market_speed: "Réactivité",
      market_opp: "Opportunités"
    },
    hero: {
      badge: "Solution d'IA conversationnelle pour professionnels",
      title_start: "Augmain",
      title_end: "Ne perdez plus jamais un client parce que vous étiez occupé.",
      subtitle: "Votre standardiste intelligent décroche, qualifie le besoin et note le RDV dans votre agenda. 24h/24. Sans charges sociales.",
      desc_start: "Conçu pour la performance,",
      desc_end: "Augmain transforme votre standard téléphonique en levier de croissance, assurant une présence commerciale continue.",
      bold_desc: "Plus de revenus, zéro interruption.",
      cta_expert: "Audit de ma situation",
      cta_tech: "Écouter une démo",
      cta_roi: "⚠️ Attention : Calculez combien d'argent vous perdez chaque mois",
      trust_security: "Compatible RGPD & Secret Pro",
      trust_roi: "Rentable dès le 1er mois",
      contact_save: "Brochure PDF" 
    },
    promise: {
      title: "Pourquoi vos concurrents signent à votre place ?",
      subtitle: "Parce qu'ils répondent quand vous êtes sur chantier ou en réunion. Changeons ça.",
      features: [
        { 
            icon: PhoneMissed,
            iconClass: "text-red-400 group-hover:animate-pulse",
            text: "Le fléau du Répondeur",
            stat: "85%",
            statDesc: "des clients raccrochent s'ils tombent sur une messagerie.",
            proof: "C'est autant de chiffre d'affaires offert à la concurrence."
        },
        { 
            icon: Zap,
            iconClass: "text-yellow-400 group-hover:text-yellow-300 transition-colors",
            text: "La Règle des 5 Minutes",
            stat: "x9",
            statDesc: "de chances de signer si vous répondez immédiatement.",
            proof: "Augmain décroche en 2 secondes. Toujours."
        },
        { 
            icon: Euro,
            iconClass: "text-green-400 group-hover:scale-110 transition-transform",
            text: "Coût d'un Salarié",
            stat: "2500€",
            statDesc: "coût minimum mensuel chargé pour une standardiste.",
            proof: "Augmain coûte 10x moins cher, pour 3x plus d'heures."
        },
        { 
            icon: Coffee,
            iconClass: "text-orange-400 group-hover:rotate-12 transition-transform",
            text: "Droit à la Déconnexion",
            stat: "100%",
            statDesc: "de sérénité retrouvée soirs et week-ends.",
            proof: "Coupez votre téléphone. Votre business continue de tourner."
        },
        { 
            icon: Star,
            iconClass: "text-purple-400 group-hover:text-purple-300",
            text: "Image de Marque",
            stat: "Pro",
            statDesc: "Un accueil téléphonique impeccable, constant et souriant.",
            proof: "Donnez l'impression d'être une multinationale."
        },
      ]
    },
    demo: {
      label: "Technologie Propriétaire",
      title_start: "N'écoutez pas nos promesses.",
      title_end: "Écoutez le résultat.",
      subtitle: "Voici des exemples réels d'interactions gérées par notre IA. Bluffant de réalisme.",
      cta_voice: "Appeler le simulateur",
      cta_web: "Voir l'agent Web",
      cta_chat: "Tester par écrit",
      badges: ["Voix Neuronale", "Compréhension Contextuelle", "Scénarios Complexes"],
      cases: [
        {
            title: "Secrétariat Virtuel",
            client: "Démonstration Live",
            description: "Notre numéro de démonstration est actif. Appelez pour tester la prise de RDV et la gestion des objections en temps réel.",
            action: `Tester la ligne démo`,
            link: `tel:${COMPANY_INFO.phone}`,
            type: "voice",
            icon: Phone
        },
        {
            title: "Suivi de Livraison / SAV",
            client: "Logistique & Transport",
            description: "Fini les appels 'Où est mon colis ?' qui saturent le standard. L'IA informe le client en temps réel via API.",
            action: "Écouter l'exemple Web",
            link: "https://demo.massaliapp.com/agent-vocal-belgatrans/",
            type: "web-voice",
            icon: Laptop
        },
        {
            title: "Qualification par SMS / WhatsApp",
            client: "Immobilier & Services",
            description: "Suite à un appel manqué, l'IA engage la conversation par SMS pour qualifier le besoin (budget, délai) avant de vous le transmettre.",
            action: "Voir l'exemple conversationnel",
            link: "https://massaliapp.com/chatbots/client1/",
            type: "chatbot",
            icon: MessageSquare
        }
      ]
    },
    pricing: {
      title: "Moins cher qu'un stagiaire.",
      subtitle: "Bien plus efficace qu'un centre d'appel. Sans engagement, sans frais cachés.",
      volume_label: "Capacité",
      price_label: "Budget estimé :",
      cta_quote: "Demander un devis",
      cta_demo: "Configurer mon IA",
      cta_contact: "Parler à un expert",
      recommended: "Best-Seller",
      plans: [
        {
            id: "essentiel",
            name: "Standard IA",
            volume: "Accueil & Qualification",
            target: "Artisans & Indépendants",
            description: "Ne perdez plus aucune opportunité. L'IA décroche, qualifie et vous transmet l'essentiel.",
            price: "Sur Devis",
            features: ["Standardiste vocal 24/7", "Qualification des leads", "Envoi de SMS automatiques", "Tableau de bord basique (appels, pics d'activité)"],
            cta: "Obtenir mon tarif",
            recommended: false
        },
        {
            id: "pro",
            name: "Business",
            volume: "Agenda & Fidélisation",
            target: "Professions Libérales & TPE",
            description: "L'IA gère votre agenda, relance vos clients et crée des profils intelligents.",
            price: "Sur Devis",
            features: ["Tout du pack Standard IA", "Prise de RDV (Google/Doctolib)", "Rappels de RDV automatiques", "Profils clients intelligents & Cartes de fidélité digitales"],
            cta: "Je veux ce pack",
            recommended: true
        },
        {
            id: "premium",
            name: "Sur-Mesure",
            volume: "Process Métier",
            target: "PME & Réseaux",
            description: "Une solution intégrée à vos outils pour automatiser vos processus spécifiques.",
            price: "Sur Devis",
            features: ["Automatisations sur-mesure", "Intégration CRM / ERP", "Options spécifiques au secteur", "Support prioritaire & Onboarding dédié"],
            cta: "Contacter l'équipe",
            recommended: false
        }
      ]
    },
    diagnostic: {
      title: "Combien d'argent laissez-vous sur la table ?",
      step1: "Votre Profil",
      step1_title: "Quelle est votre situation ?",
      step2: "Activité",
      step2_title: "Dans quel secteur opérez-vous ?",
      step3: "Équipe",
      step3_title: "Combien de personnes répondent au téléphone ?",
      step4: "Douleurs",
      step4_title: "Qu'est-ce qui vous énerve le plus ?",
      step5: "Volume",
      step5_title: "Temps passé au téléphone (non facturable)",
      step6: "Votre Potentiel",
      cta_next: "Suivant",
      cta_calc: "Voir combien je perds",
      cta_back: "Retour",
      cta_restart: "Refaire le test",
      result_gain: "CA Additionnel Possible",
      result_time: "Heures de Prod. Gagnées",
      lead_title: "Recevoir mon plan d'action",
      lead_name: "Votre Nom",
      lead_company: "Nom de votre société",
      lead_email: "Votre email pro",
      lead_phone: "Mobile direct",
      lead_consent: "Je veux savoir comment récupérer ce chiffre d'affaires.",
      lead_submit: "Voir les solutions",
      sectors: [
          { id: 'marketing', label: 'Services / Agence', icon: PenTool, valuePerLead: 1500 },
          { id: 'finance', label: 'Droit / Chiffre', icon: Briefcase, valuePerLead: 2000 },
          { id: 'medical', label: 'Santé / Bien-être', icon: Stethoscope, valuePerLead: 80 },
          { id: 'immo', label: 'Bâtiment / Immo', icon: Building, valuePerLead: 5000 },
          { id: 'autre', label: 'Commerce / Autre', icon: Plus, valuePerLead: 300 },
      ],
      frictions: [
          { id: 'phone', label: 'Le téléphone sonne tout le temps', icon: Phone },
          { id: 'missed', label: 'Je rate des appels importants', icon: PhoneMissed },
          { id: 'qualif', label: 'Je perds du temps avec des curieux', icon: User },
          { id: 'admin', label: 'La paperasse post-appel', icon: FileText },
      ],
      profiles: [
        {id: 'entrepreneur', label: 'Je suis seul (Artisan, Freelance...)'},
        {id: 'pme', label: 'J\'ai une équipe (TPE/PME)'},
        {id: 'liberal', label: 'Profession Libérale'}
      ],
      team_sizes: ['Personne (C\'est moi)', '1 Secrétaire', 'Une équipe dédiée']
    },
    benefits: {
        title: "Un investissement, pas une dépense.",
        subtitle: "Recruter coûte cher et prend du temps. Augmain s'installe en 24h et coûte moins cher que votre facture d'électricité.",
        cta_audit: "Vérifier la compatibilité avec mon entreprise",
        list: [
            {
                title: "Augmentez votre CA",
                description: "Chaque appel manqué est un client qui part chez le concurrent. En décrochant 100% des appels, vous capturez mécaniquement plus de business.",
                color: "bg-blue-50 border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
                icon: TrendingUp
            },
            {
                title: "Qualifiez sans effort",
                description: "L'IA pose les questions clés avant même que vous ne parliez au client. Budget, délai, besoin... Vous recevez des fiches prêtes à signer.",
                color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
                icon: CheckCircle2
            },
            {
                title: "Image Professionnelle",
                description: "Même si vous êtes seul dans votre camion ou votre bureau, donnez l'image d'une entreprise structurée avec un standard digne d'un grand groupe.",
                color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
                icon: Building
            }
        ],
        impact_title: "Ils l'ont installé, voici ce qui a changé",
        impact_cards: [
            {
                title: "Plus de Ventes",
                icon: Euro,
                stat: "+25%",
                description: "D'augmentation de chiffre d'affaires constatée chez nos clients artisans et libéraux.",
                source: "https://www.salesforce.com/fr/resources/articles/statistiques-service-client/",
                sourceLabel: "Moyenne Clientèle",
                color: "from-blue-500 to-indigo-600"
            },
            {
                title: "Zéro Stress",
                icon: Coffee,
                stat: "100%",
                description: "No more fear of missing 'THE CALL' during weekends or holidays.",
                source: "#",
                sourceLabel: "Feedback",
                color: "from-emerald-500 to-teal-600"
            },
            {
                title: "Satisfaction",
                icon: Users,
                stat: "4.9/5",
                description: "Average rating given by callers who appreciate immediate responsiveness.",
                source: "#",
                sourceLabel: "Avis Appelants",
                color: "from-purple-500 to-pink-600"
            }
        ]
    },
    roi: {
        title: "Le coût caché de vos appels manqués",
        calls_per_day: "Appels reçus / jour",
        missed_rate: "% d'appels manqués",
        avg_basket: "Panier moyen client (€)",
        time_per_call: "Durée d'un appel (min)",
        gain_monthly: "Potentiel Mensuel",
        yearly_projection: "Perte Annuelle Projetée",
        revenue_recovered: "Revenus Sauvés",
        time_saved: "Temps Gagné",
        opps_saved: "Clients/mois",
        quote: "\"C'est simple : depuis Augmain, je ne rate plus aucun chantier.\"",
        cta_action: "Arrêter de perdre cet argent",
        presets: [
          { label: "Solo / Freelance", calls: 5, missed: 40, value: 150 },
          { label: "Cabinet Libéral", calls: 20, missed: 25, value: 80 },
          { label: "PME / Agence", calls: 50, missed: 15, value: 500 }
        ]
    },
    faq: {
        title: "Vos doutes légitimes",
        subtitle: "On vous dit tout, en toute transparence.",
        items: [
            {
                question: "Est-ce que ça va faire 'Robot' ?",
                answer: "C'est la crainte n°1. C'est pour cela qu'on utilise les dernières voix neuronales. C'est fluide, il y a des intonations, des hésitations naturelles. Faites le test en appelant le numéro de démo, vous serez surpris."
            },
            {
                question: "Est-ce difficile à installer ?",
                answer: "Non. C'est aussi simple que de faire un transfert d'appel (comme quand vous partez en vacances). On vous donne un numéro, vous redirigez vos appels dessus quand vous êtes occupé. C'est tout. On s'occupe de la configuration technique."
            },
            {
                question: "Et si l'IA se trompe ?",
                answer: "L'IA est paramétrée pour rester dans son périmètre. Si elle ne sait pas, elle prend le message et vous l'envoie pour que vous rappeliez. Elle ne promettra jamais quelque chose d'impossible."
            },
            {
                question: "Puis-je garder mon numéro actuel ?",
                answer: "Oui, bien sûr ! Vos clients continuent d'appeler votre numéro habituel. Augmain ne se déclenche que si vous ne répondez pas ou si vous êtes déjà en ligne."
            }
        ]
    },
    contact: {
        badge: "Parler à un humain",
        title: "Vous avez un projet ?",
        subtitle: "Laissez-nous vos coordonnées. On regarde ensemble si Augmain est adapté à votre activité.",
        name_label: "Prénom & Nom",
        name_placeholder: "Je suis...",
        email_label: "Email Pro",
        email_placeholder: "Pour vous envoyer l'étude",
        phone_label: "Numéro mobile",
        phone_placeholder: "Pour vous rappeler rapidement",
        cta: "Être rappelé gratuitement",
        success_title: "Bien reçu !",
        success_desc: "Votre demande est prioritaire. Vous pouvez aussi bloquer un créneau ferme ci-dessous.",
        cta_agenda: "Bloquer mon créneau"
    },
    modal: {
        secure_access: "Accès Réservé",
        config_premium: "Configuration Pro",
        audit_custom: "Audit Gratuit",
        unlock_title: "Débloquer l'accès",
        talk_expert: "Parler à un expert",
        unlock_desc: "Pour accéder à la démo ou à l'agenda, présentez-vous rapidement.",
        continue: "Valider",
        timeline_label: "Quand souhaitez-vous commencer ?",
        context_label: "Précision sur votre activité",
        cta_access: "Accéder à la démo",
        cta_agenda: "Choisir mon créneau",
        cta_callback: "Me faire rappeler",
        how_to_proceed: "Comment préférez-vous échanger ?",
        success_title: "C'est noté !",
        success_desc: "Merci. Un expert Augmain va vous contacter très rapidement pour faire le point sur votre situation.",
        close: "Fermer",
        rgpd_consent: "En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre ",
        timelines: [
            { value: "urgent", label: "C'est Urgent 🔥" },
            { value: "1_month", label: "Ce mois-ci" },
            { value: "info", label: "Je suis curieux" },
        ]
    },
    integrations: {
        title: "Compatible avec vos outils",
        subtitle: "Pas besoin de changer de logiciel. Augmain se connecte à votre écosystème.",
        list: [
            { name: "Agendas", icon: Calendar, desc: "Google / Outlook / Apple", color: "text-blue-500 bg-blue-50" },
            { name: "WhatsApp", icon: MessageCircle, desc: "Envoi de résumés", color: "text-green-500 bg-green-50" },
            { name: "CRMs", icon: Database, desc: "HubSpot / Salesforce", color: "text-orange-500 bg-orange-50" },
            { name: "Doctolib", icon: Stethoscope, desc: "Gestion Médicale", color: "text-cyan-500 bg-cyan-50" },
            { name: "Email", icon: Mail, desc: "Notifs instantanées", color: "text-slate-700 bg-slate-100" },
            { name: "Slack / Teams", icon: MessageSquare, desc: "Pour vos équipes", color: "text-indigo-500 bg-indigo-50" },
        ]
    },
    footer: {
        legal: "Mentions légales",
        cgv: "CGV",
        privacy: "Politique de Confidentialité",
        rights: "Tous droits réservés"
    }
  },
  en: {
    header: {
      cta: "Free Diagnostic",
      call: "Call",
      market_invest: "Revenue",
      market_prod: "Time Saved",
      market_speed: "Speed",
      market_opp: "Opportunities"
    },
    hero: {
      badge: "Conversational AI Solution for Business",
      title_start: "Augmain",
      title_end: "Never lose a client because you were busy.",
      subtitle: "Your intelligent receptionist answers, qualifies needs, and books appointments. 24/7. No payroll taxes.",
      desc_start: "Designed for performance,",
      desc_end: "Augmain turns your phone line into a growth lever, ensuring continuous commercial presence.",
      bold_desc: "More revenue, zero interruptions.",
      cta_expert: "Audit my situation",
      cta_tech: "Listen to a demo",
      cta_roi: "⚠️ Warning: Calculate how much money you lose every month",
      trust_security: "GDPR Compliant & Secure",
      trust_roi: "Profitable from Month 1",
      contact_save: "PDF Brochure"
    },
    promise: {
      title: "Why are competitors signing instead of you?",
      subtitle: "Because they answer when you are on a job site or in a meeting. Let's change that.",
      features: [
        { 
            icon: PhoneMissed,
            iconClass: "text-red-400 group-hover:animate-pulse",
            text: "The Voicemail Plague",
            stat: "85%",
            statDesc: "of clients hang up if they reach voicemail.",
            proof: "That's revenue gifted to your competition."
        },
        { 
            icon: Zap,
            iconClass: "text-yellow-400 group-hover:text-yellow-300 transition-colors",
            text: "The 5-Minute Rule",
            stat: "x9",
            statDesc: "chances to close if you answer immediately.",
            proof: "Augmain picks up in 2 seconds. Always."
        },
        { 
            icon: Euro,
            iconClass: "text-green-400 group-hover:scale-110 transition-transform",
            text: "Cost of an Employee",
            stat: "2500€",
            statDesc: "minimum monthly cost for a receptionist.",
            proof: "Augmain costs 10x less, for 3x more hours."
        },
        { 
            icon: Coffee,
            iconClass: "text-orange-400 group-hover:rotate-12 transition-transform",
            text: "Right to Disconnect",
            stat: "100%",
            statDesc: "peace of mind reclaimed on evenings & weekends.",
            proof: "Turn off your phone. Your business keeps running."
        },
        { 
            icon: Star,
            iconClass: "text-purple-400 group-hover:text-purple-300",
            text: "Brand Image",
            stat: "Pro",
            statDesc: "Impeccable, consistent, and smiling phone reception.",
            proof: "Look like a multinational corporation."
        },
      ]
    },
    demo: {
      label: "Proprietary Technology",
      title_start: "Don't listen to our pitch.",
      title_end: "Listen to the result.",
      subtitle: "Here are real interactions handled by our AI. Stunningly realistic.",
      cta_voice: "Call the simulator",
      cta_web: "See Web Agent",
      cta_chat: "Test via Chat",
      badges: ["Neural Voice", "Contextual Understanding", "Complex Scenarios"],
      cases: [
        {
            title: "Virtual Secretary",
            client: "Live Demo",
            description: "Our demo line is active. Call to test appointment booking and objection handling in real-time.",
            action: `Test Demo Line`,
            link: `tel:${COMPANY_INFO.phone}`,
            type: "voice",
            icon: Phone
        },
        {
            title: "Delivery Tracking / Support",
            client: "Logistics & Transport",
            description: "No more 'Where is my package?' calls blocking your line. AI informs the client in real-time connected to your tools.",
            action: "Listen to Web Example",
            link: "https://demo.massaliapp.com/agent-vocal-belgatrans/",
            type: "web-voice",
            icon: Laptop
        },
        {
            title: "SMS / WhatsApp Qualification",
            client: "Real Estate & Services",
            description: "Following a missed call, AI engages via SMS to qualify the need (budget, timeline) before passing it to you.",
            action: "See conversational example",
            link: "https://massaliapp.com/chatbots/client1/",
            type: "chatbot",
            icon: MessageSquare
        }
      ]
    },
    pricing: {
      title: "Cheaper than an intern.",
      subtitle: "Much more effective than a call center. No commitment, no hidden fees.",
      volume_label: "Capacity",
      price_label: "Estimated Budget:",
      cta_quote: "Get a quote",
      cta_demo: "Configure my AI",
      cta_contact: "Talk to an expert",
      recommended: "Best-Seller",
      plans: [
        {
            id: "essentiel",
            name: "AI Receptionist",
            volume: "Reception & Qualification",
            target: "Artisans & Freelancers",
            description: "Never miss an opportunity. AI answers, qualifies, and sends you the essentials.",
            price: "On Quote",
            features: ["24/7 Voice Receptionist", "Lead Qualification", "Automated SMS Sending", "Basic Dashboard (calls, activity peaks)"],
            cta: "Get my rate",
            recommended: false
        },
        {
            id: "pro",
            name: "Business",
            volume: "Calendar & Loyalty",
            target: "Professionals & SMBs",
            description: "AI manages your calendar, follows up with clients, and creates smart profiles.",
            price: "On Quote",
            features: ["Everything in AI Receptionist", "Booking (Google/Doctolib)", "Automated Appointment Reminders", "Smart Client Profiles & Digital Loyalty Cards"],
            cta: "I want this pack",
            recommended: true
        },
        {
            id: "premium",
            name: "Custom",
            volume: "Business Process",
            target: "SMEs & Networks",
            description: "Integrated solution with your tools to automate your specific processes.",
            price: "On Quote",
            features: ["Custom Automations", "CRM / ERP Integration", "Industry-Specific Options", "Priority Support & Dedicated Onboarding"],
            cta: "Contact Team",
            recommended: false
        }
      ]
    },
    diagnostic: {
      title: "How much money are you leaving on the table?",
      step1: "Your Profile",
      step1_title: "What is your situation?",
      step2: "Activity",
      step2_title: "Which sector do you operate in?",
      step3: "Team",
      step3_title: "How many people answer the phone?",
      step4: "Pains",
      step4_title: "What annoys you the most?",
      step5: "Volume",
      step5_title: "Time spent on phone (non-billable)",
      step6: "Your Potential",
      cta_next: "Next",
      cta_calc: "See how much I lose",
      cta_back: "Back",
      cta_restart: "Restart test",
      result_gain: "Potential Add. Revenue",
      result_time: "Prod. Hours Saved",
      lead_title: "Get my action plan",
      lead_name: "Your Name",
      lead_company: "Company Name",
      lead_email: "Pro Email",
      lead_phone: "Direct Mobile",
      lead_consent: "I want to know how to recover this revenue.",
      lead_submit: "See solutions",
      sectors: [
          { id: 'marketing', label: 'Services / Agency', icon: PenTool, valuePerLead: 1500 },
          { id: 'finance', label: 'Law / Finance', icon: Briefcase, valuePerLead: 2000 },
          { id: 'medical', label: 'Health / Wellness', icon: Stethoscope, valuePerLead: 80 },
          { id: 'immo', label: 'Construction / Real Estate', icon: Building, valuePerLead: 5000 },
          { id: 'autre', label: 'Retail / Other', icon: Plus, valuePerLead: 300 },
      ],
      frictions: [
          { id: 'phone', label: 'Phone rings constantly', icon: Phone },
          { id: 'missed', label: 'I miss important calls', icon: PhoneMissed },
          { id: 'qualif', label: 'I waste time with window shoppers', icon: User },
          { id: 'admin', label: 'Post-call paperwork', icon: FileText },
      ],
      profiles: [
        {id: 'entrepreneur', label: 'I am alone (Artisan, Freelancer...)'},
        {id: 'pme', label: 'I have a team (SMB)'},
        {id: 'liberal', label: 'Liberal Profession'}
      ],
      team_sizes: ['Nobody (Just me)', '1 Secretary', 'Dedicated Team']
    },
    benefits: {
        title: "An investment, not an expense.",
        subtitle: "Hiring is expensive and time-consuming. Augmain sets up in 24h and costs less than your electricity bill.",
        cta_audit: "Check compatibility with my business",
        list: [
            {
                title: "Increase Revenue",
                description: "Every missed call is a client going to a competitor. By answering 100% of calls, you mechanically capture more business.",
                color: "bg-blue-50 border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
                icon: TrendingUp
            },
            {
                title: "Qualify Effortlessly",
                description: "AI asks key questions before you even speak to the client. Budget, timeline, need... You receive files ready to sign.",
                color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
                icon: CheckCircle2
            },
            {
                title: "Professional Image",
                description: "Even if you are alone in your truck or office, give the image of a structured company with a reception worthy of a large group.",
                color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
                icon: Building
            }
        ],
        impact_title: "They installed it, here is what changed",
        impact_cards: [
            {
                title: "More Sales",
                icon: Euro,
                stat: "+25%",
                description: "Increase in turnover observed among our artisan and liberal clients.",
                source: "https://www.salesforce.com/fr/resources/articles/statistiques-service-client/",
                sourceLabel: "Client Average",
                color: "from-blue-500 to-indigo-600"
            },
            {
                title: "Zero Stress",
                icon: Coffee,
                stat: "100%",
                description: "No more fear of missing 'THE CALL' during weekends or holidays.",
                source: "#",
                sourceLabel: "Feedback",
                color: "from-emerald-500 to-teal-600"
            },
            {
                title: "Satisfaction",
                icon: Users,
                stat: "4.9/5",
                description: "Average rating given by callers who appreciate immediate responsiveness.",
                source: "#",
                sourceLabel: "Caller Reviews",
                color: "from-purple-500 to-pink-600"
            }
        ]
    },
    roi: {
        title: "The hidden cost of your missed calls",
        calls_per_day: "Calls received / day",
        missed_rate: "% missed calls",
        avg_basket: "Avg client value (€)",
        time_per_call: "Time per call (min)",
        gain_monthly: "Monthly Potential",
        yearly_projection: "Projected Yearly Loss",
        revenue_recovered: "Revenue Saved",
        time_saved: "Time Saved",
        opps_saved: "Clients/month",
        quote: "\"It's simple: since Augmain, I don't miss any jobs.\"",
        cta_action: "Stop losing this money",
        presets: [
          { label: "Freelance / Solo", calls: 5, missed: 40, value: 150 },
          { label: "Doctor / Liberal", calls: 20, missed: 25, value: 80 },
          { label: "SMB / Agency", calls: 50, missed: 15, value: 500 }
        ]
    },
    faq: {
        title: "Your legitimate doubts",
        subtitle: "We tell you everything, with full transparency.",
        items: [
            {
                question: "Will it sound like a 'Robot'?",
                answer: "That's the #1 fear. That's why we use the latest neural voices. It's fluid, there are intonations, natural hesitations. Test it by calling the demo number, you'll be surprised."
            },
            {
                question: "Is it hard to install?",
                answer: "No. It's as simple as setting up call forwarding (like when you go on vacation). We give you a number, you redirect your calls to it when busy. That's it. We handle the technical setup."
            },
            {
                question: "What if the AI makes a mistake?",
                answer: "The AI is set to stay within its scope. If it doesn't know, it takes the message and sends it to you to call back. It will never promise something impossible."
            },
            {
                question: "Can I keep my current number?",
                answer: "Yes, of course! Your clients continue to call your usual number. Augmain only triggers if you don't answer or are already on the line."
            }
        ]
    },
    contact: {
        badge: "Talk to a Human",
        title: "Have a project?",
        subtitle: "Leave us your details. We'll check together if Augmain is suitable for your activity.",
        name_label: "First & Last Name",
        name_placeholder: "I am...",
        email_label: "Pro Email",
        email_placeholder: "To send you the study",
        phone_label: "Mobile Number",
        phone_placeholder: "To call you back quickly",
        cta: "Get called back for free",
        success_title: "Received!",
        success_desc: "Your request is priority. You can also block a firm slot below.",
        cta_agenda: "Block my slot"
    },
    modal: {
        secure_access: "Reserved Access",
        config_premium: "Pro Config",
        audit_custom: "Audit Gratuit",
        unlock_title: "Débloquer l'accès",
        talk_expert: "Parler à un expert",
        unlock_desc: "Pour accéder à la démo ou à l'agenda, présentez-vous rapidement.",
        continue: "Valider",
        timeline_label: "Quand souhaitez-vous commencer ?",
        context_label: "Details on your activity",
        cta_access: "Access Demo",
        cta_agenda: "Choose my slot",
        cta_callback: "Call me back",
        how_to_proceed: "How do you prefer to exchange?",
        success_title: "Noted!",
        success_desc: "Thank you. An Augmain expert will contact you very quickly to review your situation.",
        close: "Close",
        rgpd_consent: "By submitting this form, you agree that your data will be processed in accordance with our ",
        timelines: [
            { value: "urgent", label: "It's Urgent 🔥" },
            { value: "1_month", label: "This month" },
            { value: "info", label: "I'm curious" },
        ]
    },
    integrations: {
        title: "Compatible with your tools",
        subtitle: "No need to change software. Augmain connects to your ecosystem.",
        list: [
            { name: "Calendars", icon: Calendar, desc: "Google / Outlook / Apple", color: "text-blue-500 bg-blue-50" },
            { name: "WhatsApp", icon: MessageCircle, desc: "Summary sending", color: "text-green-500 bg-green-50" },
            { name: "CRMs", icon: Database, desc: "HubSpot / Salesforce", color: "text-orange-500 bg-orange-50" },
            { name: "Doctolib", icon: Stethoscope, desc: "Medical Management", color: "text-cyan-500 bg-cyan-50" },
            { name: "Email", icon: Mail, desc: "Instant Notifs", color: "text-slate-700 bg-slate-100" },
            { name: "Slack / Teams", icon: MessageSquare, desc: "For your teams", color: "text-indigo-500 bg-indigo-50" },
        ]
    },
    footer: {
        legal: "Legal Mentions",
        cgv: "T&C",
        privacy: "Privacy Policy",
        rights: "All rights reserved"
    }
  }
};

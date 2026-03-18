
import { GA_MEASUREMENT_ID } from '../constants';

// Initialisation de GA4 (Google Analytics 4)
export const initGA = () => {
    // Vérification silencieuse : si pas d'ID ou valeur par défaut, on arrête simplement.
    // Pas de console.warn pour ne pas effrayer l'utilisateur ou polluer la console.
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        return;
    }

    if (typeof window === 'undefined') return;

    try {
        // Injection du script gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Configuration de l'environnement global (window.dataLayer)
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        function gtag(...args: any[]) {
            win.dataLayer.push(args);
        }
        win.gtag = gtag;

        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
        
        console.log(`Analytics connecté : ${GA_MEASUREMENT_ID}`);
    } catch (e) {
        console.error("Erreur init Analytics", e);
    }
};

// Fonction pour tracker un événement personnalisé
export const trackEvent = (
    eventName: string, 
    params: Record<string, any> = {}
) => {
    // On ne track que si GA est bien initialisé (objet gtag existant)
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    }
};

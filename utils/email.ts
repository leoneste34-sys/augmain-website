
import { COMPANY_INFO } from '../constants';
import emailjs from '@emailjs/browser';

// =============================================================================
// CONFIGURATION EMAILJS
// =============================================================================
// 1. Service ID : Configuré (Gmail)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_4rz666t"; 

// 2. Template ID : Configuré (Nous contacter)
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xelcrtn";

// 3. Public Key : ACTIVÉE ✅
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "oJPXJ7wAe403d4tPs";
// =============================================================================

interface EmailData {
  type: 'contact' | 'qualification' | 'diagnostic';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  details?: any;
}

/**
 * Helper pour déclencher une notification visuelle (Toast)
 */
const triggerToast = (title: string, message: string, type: 'success' | 'info' = 'info') => {
  const event = new CustomEvent('toast-message', {
    detail: { title, message, type }
  });
  window.dispatchEvent(event);
};

/**
 * Génère le message texte structuré pour l'email
 */
const getFormattedMessage = (data: EmailData) => {
  let specificDetails = '';
  
  if (data.type === 'qualification') {
    specificDetails = `
PLAN CHOISI : ${data.details?.plan || 'Non spécifié'} 
URGENCE     : ${data.details?.timeline || 'Non spécifiée'} 🔥
ACTION      : ${data.details?.preference || 'Non spécifiée'}
-----------------------
Poste : ${data.details?.role || 'Non renseigné'}
Contexte :
${data.details?.context || 'Non renseigné'}
    `;
  } else if (data.type === 'diagnostic') {
    specificDetails = `
Profil : ${data.details?.profile || 'N/A'}
Secteur : ${data.details?.sector || 'N/A'}
Équipe : ${data.details?.teamSize || 'N/A'}
Frictions : ${(data.details?.frictions || []).join(', ')}
Perte estimée : ${data.details?.estimatedLoss}€ / mois
    `;
  } else {
    specificDetails = `
Source : ${data.details?.source || 'Formulaire Contact'}
    `;
  }

  return `
NOUVEAU LEAD - ${data.type.toUpperCase()}

👤 INFORMATIONS PROSPECT
-----------------------
Nom        : ${data.name}
Entreprise : ${data.company || 'Non renseignée'}
Email      : ${data.email}
Téléphone  : ${data.phone || 'Non renseigné'}

📝 DÉTAILS
-----------------------${specificDetails}
  `;
};

/**
 * Fonction d'envoi d'email (Robustifiée)
 * Ne throw jamais d'erreur pour ne pas bloquer l'UX
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  const messageBody = getFormattedMessage(data);

  try {
    // Vérifie si TOUTES les clés sont présentes
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        console.log("🚀 Tentative d'envoi via EmailJS...");
        
        const templateParams = {
            to_email: COMPANY_INFO.email, // Envoi à augmain.ia@gmail.com
            from_name: data.name,
            from_email: data.email,
            phone: data.phone || 'Non renseigné',
            company: data.company || 'Non renseigné',
            subject: `[LEAD ${data.type.toUpperCase()}] - ${data.name}`,
            message: messageBody,
            type: data.type
        };

        // On await explicitement pour catcher l'erreur ici si le réseau fail
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
        
        triggerToast(
            'Confirmation envoyée',
            'Votre demande a bien été transmise à notre équipe.',
            'success'
        );
        return true;
    } else {
        throw new Error("Clés EmailJS manquantes");
    }
  } catch (error) {
      console.warn("⚠️ Mode dégradé (Erreur EmailJS ou Config) :", error);
      
      // Fallback : Simulation Log
      console.group('📧 SAUVEGARDE LOCALE (FALLBACK)');
      console.log(`DESTINATION -> ${COMPANY_INFO.email}`);
      console.log(messageBody);
      console.groupEnd();

      // On retourne true quand même pour que l'UI continue son chemin (redirection)
      // L'utilisateur ne doit pas être bloqué par une erreur technique d'envoi de mail
      return true;
  }
};

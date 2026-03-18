
import { COMPANY_INFO, FOUNDER_IMAGE_URL } from '../constants';

// Fonction utilitaire pour convertir une URL d'image en Base64
const getBase64Image = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // On enlève le préfixe "data:image/jpeg;base64," pour la vCard
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Impossible de récupérer l'image pour la vCard", e);
    return null;
  }
};

export const generateAndDownloadVCard = async () => {
  // 1. Préparation du contenu de la Note (Description)
  // On utilise \\n pour les sauts de ligne DANS le texte (spécifique vCard)
  const noteContent = [
    `🚀 ${COMPANY_INFO.slogan}`,
    ``,
    `Expertise :`,
    `- Standardiste Vocal IA 24/7`,
    `- Automatisation Prise de RDV`,
    `- Chatbots & Agents Web`,
    ``,
    `👇 Réserver un audit :`,
    `${COMPANY_INFO.calendarUrl}`
  ].join('\\n');

  // 2. Tentative de récupération de la photo
  let photoBlock = '';
  const photoBase64 = await getBase64Image(FOUNDER_IMAGE_URL);
  if (photoBase64) {
    // On retire les espaces/sauts de ligne du base64 pour ne pas casser le fichier
    photoBlock = `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64.replace(/\s/g, '')}\r\n`;
  }

  // 3. Construction vCard 3.0
  // Utilisation de \r\n pour les sauts de ligne de structure (RFC standard)
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    // Nom structuré : Nom;Prénom;SecondPrénom;Titre;Suffixe
    `N;CHARSET=UTF-8:ZAHAF;Mehdi;;;`,
    `FN;CHARSET=UTF-8:${COMPANY_INFO.founder}`,
    `ORG;CHARSET=UTF-8:${COMPANY_INFO.name}`,
    `TITLE;CHARSET=UTF-8:${COMPANY_INFO.role}`,
    `TEL;TYPE=CELL,VOICE,PREF:${COMPANY_INFO.phone}`,
    // On force le type WORK pour bien séparer du perso
    `EMAIL;TYPE=WORK,INTERNET:${COMPANY_INFO.email}`,
    `URL;TYPE=WORK:${COMPANY_INFO.website}`,
    // Adresse structurée : ;;Rue;Ville;Region;CodePostal;Pays
    `ADR;TYPE=WORK;CHARSET=UTF-8:;;Paris;;;75000;France`,
    `NOTE;CHARSET=UTF-8:${noteContent}`,
    photoBlock, // Ajout de la photo si dispo
    `REV:${new Date().toISOString()}`, // Date de révision pour forcer la mise à jour
    'END:VCARD'
  ].join('\r\n');

  // 4. Création du Blob avec le BOM (\uFEFF) pour forcer l'UTF-8 sur Mac/Windows
  // C'est ça qui corrige le texte bizarre "Bcce eev..."
  const blob = new Blob(['\uFEFF' + vCardData], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  // Nom de fichier explicite pour inciter au clic
  link.setAttribute('download', 'Contact_Pro_Mehdi_ZAHAF.vcf');
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

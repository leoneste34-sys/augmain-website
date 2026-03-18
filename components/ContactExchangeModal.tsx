
import React, { useState } from 'react';
import { X, Phone, User, Download, CheckCircle2, Loader2, Contact, Sparkles } from 'lucide-react';
import { sendEmail } from '../utils/email';
import { generateAndDownloadVCard } from '../utils/vcard';
import { trackEvent } from '../utils/analytics';

interface ContactExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactExchangeModal: React.FC<ContactExchangeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoadingText('Génération de la fiche...');

    try {
        // 1. Tracking
        trackEvent('contact_exchange_submit', { name: formData.name });

        // 2. Envoi Email (Non bloquant)
        sendEmail({
            type: 'contact',
            name: formData.name || 'Inconnu',
            email: 'non-renseigné@vcard.com',
            phone: formData.phone,
            details: { source: '⚡️ ÉCHANGE DE CONTACT (vCard Download)' }
        }).catch(err => console.error("Erreur notif:", err));

        // 3. Téléchargement de la vCard (Async car on récupère la photo maintenant !)
        setLoadingText('Ajout de la photo...');
        await generateAndDownloadVCard();

        // 4. Feedback UI
        setStep(2);

    } catch (error) {
        console.error(error);
    } finally {
        setIsSubmitting(false);
        setLoadingText('');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300 border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10">
                <X className="w-5 h-5"/>
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-900/50 border-4 border-slate-800 relative z-10">
                <Contact className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg relative z-10">Ajouter aux contacts</h3>
            <p className="text-blue-200 text-xs mt-1 relative z-10">Échangeons nos coordonnées pro</p>
        </div>

        <div className="p-6">
            {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-slate-600 text-center mb-4 leading-relaxed">
                        Entrez votre numéro pour recevoir ma fiche contact complète (avec photo & infos) directement dans votre téléphone.
                    </p>

                    <div className="space-y-3">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400"/>
                            <input 
                                type="text" 
                                required
                                placeholder="Votre Prénom"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-medium"
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400"/>
                            <input 
                                type="tel" 
                                required
                                placeholder="Votre Mobile"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-slate-500/30 flex items-center justify-center gap-2 mt-2"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : <Download className="w-5 h-5"/>}
                        {isSubmitting ? loadingText : 'Télécharger la fiche'}
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-500"/> Compatible iPhone & Android
                    </p>
                    <p className="text-[9px] text-center text-slate-400 mt-3">
                        En soumettant ce formulaire, vous acceptez notre <a href="https://www.augmain.fr/c6d288e3" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Politique de confidentialité</a>.
                    </p>
                </form>
            ) : (
                <div className="text-center py-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <CheckCircle2 className="w-6 h-6"/>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Fiche téléchargée !</h4>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        Le fichier <strong>.vcf</strong> a été généré.<br/>
                        Ouvrez-le maintenant pour m'enregistrer.
                    </p>
                    <button onClick={onClose} className="w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        Fermer
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

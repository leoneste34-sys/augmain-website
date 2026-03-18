import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';
import { initGA } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      initGA();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
    initGA();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Respect de votre vie privée</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience sur notre site. 
              En acceptant, vous nous aidez à optimiser nos services. Vous pouvez refuser si vous le souhaitez.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" /> Refuser
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50"
          >
            <Check className="w-4 h-4" /> Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

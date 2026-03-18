
import React from 'react';
import { COMPANY_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 text-slate-900">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="25" r="14" fill="currentColor" />
                    <path d="M50 55 C35 55 20 65 20 78 C20 90 35 90 50 78 C65 90 80 90 80 78 C80 65 65 55 50 55 Z" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                    <path d="M30 60 Q50 40 70 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none"/>
                </svg>
             </div>
             <span className="font-bold text-slate-900 text-lg tracking-tight">AUGMAIN<span className="text-blue-600">.</span></span>
           </div>
           <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto md:mx-0">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
          <a href="/agence-ia-montpellier" className="hover:text-blue-600 transition-colors">
            Agence IA Montpellier
          </a>
          <a href="https://www.augmain.fr/94fb1d8e" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            {t.footer.legal}
          </a>
          <a href="https://www.augmain.fr/63cc91d7" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            {t.footer.cgv}
          </a>
          <a href="https://www.augmain.fr/c6d288e3" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            {t.footer.privacy}
          </a>
        </div>

        <div className="text-center md:text-right text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}</p>
          <p>Montpellier, France</p>
          <p>{t.footer.rights}</p>
        </div>

      </div>
    </footer>
  );
};


import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-8 h-8 text-blue-500" /> {t.faq.title}
        </h2>
        <p className="text-slate-500">{t.faq.subtitle}</p>
      </div>

      <div className="space-y-4">
        {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
                <div 
                    key={idx} 
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-blue-500 bg-blue-50/30 shadow-md' : 'border-slate-200 bg-white hover:border-blue-300'}`}
                >
                    <button 
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <span className={`font-bold text-lg ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                            {item.question}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                    </button>
                    
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                            <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </section>
  );
};

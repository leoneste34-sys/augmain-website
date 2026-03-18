
import React from 'react';
import { Check, Star, ArrowRight, Zap, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PricingProps {
  onSelectPlan: (plan: 'starter' | 'performance') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{t.pricing.title}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          {t.pricing.subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {t.pricing.plans.map((plan, idx) => {
            const isRecommended = plan.recommended;
            const planTypeForModal = plan.id === 'essentiel' ? 'starter' : 'performance';

            return (
                <div 
                    key={idx} 
                    className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col h-full ${
                    isRecommended 
                        ? 'border-blue-500/30 bg-[#0B1120] text-white shadow-2xl scale-105 z-10 ring-1 ring-blue-400/20 lg:-mt-4 lg:mb-4' 
                        : 'border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:shadow-xl'
                    }`}
                >
                    {isRecommended && (
                    <>
                        <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] pointer-events-none"></div>
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2 border border-blue-400/30 animate-pulse">
                            <Star className="w-3 h-3 fill-yellow-300 text-yellow-300"/> {t.pricing.recommended}
                        </div>
                    </>
                    )}
                    
                    <div className="mb-6 text-center">
                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block ${
                            isRecommended ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-100 text-slate-500'
                        }`}>
                            {plan.target}
                        </span>
                        <h3 className={`text-3xl font-bold mb-3 ${isRecommended ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
                        <p className={`text-sm font-medium leading-relaxed ${isRecommended ? 'text-blue-200' : 'text-slate-500'}`}>
                            {plan.description}
                        </p>
                    </div>

                    <div className={`my-6 p-4 rounded-2xl flex items-center justify-center gap-3 border ${
                        isRecommended ? 'bg-blue-900/30 border-blue-500/30' : 'bg-slate-50 border-slate-100'
                    }`}>
                        <div className={`p-2 rounded-full ${isRecommended ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            <Clock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className={`text-xs uppercase font-bold ${isRecommended ? 'text-blue-300' : 'text-slate-400'}`}>{t.pricing.volume_label}</p>
                            <p className={`text-xl font-extrabold ${isRecommended ? 'text-white' : 'text-slate-900'}`}>{plan.volume}</p>
                        </div>
                    </div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm font-medium group">
                            <div className={`p-1 rounded-full flex-shrink-0 mt-0.5 transition-colors ${isRecommended ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-400 group-hover:text-white' : 'bg-green-100 text-green-600'}`}>
                                <Check className="w-3 h-3" />
                            </div>
                            <span className={isRecommended ? 'text-slate-300 group-hover:text-white transition-colors' : 'text-slate-600'}>{feature}</span>
                        </li>
                    ))}
                    </ul>

                    <div className="mt-auto">
                        <div className={`text-center mb-4 text-sm font-semibold ${isRecommended ? 'text-slate-400' : 'text-slate-400'}`}>
                             {t.pricing.price_label} <span className={`italic ${isRecommended ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                        </div>
                        <button 
                        onClick={() => onSelectPlan(planTypeForModal)}
                        className={`w-full py-4 rounded-xl font-bold transition-all text-center shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 group ${
                        isRecommended 
                            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/30' 
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}>
                            {plan.cta} 
                            {isRecommended ? <Zap className="w-4 h-4 fill-white group-hover:animate-bounce"/> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>}
                        </button>
                    </div>
                </div>
            );
        })}
      </div>
    </section>
  );
};


import React from 'react';
import { COMPANY_INFO } from '../constants';
import { ArrowUpRight, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BenefitsProps {
    onGateAccess: (url: string) => void;
}

export const Benefits: React.FC<BenefitsProps> = ({ onGateAccess }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t.benefits.title}
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            {t.benefits.subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {t.benefits.list.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div key={idx} className={`relative p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-2 cursor-default group overflow-hidden ${benefit.color}`}>
              <Icon className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-900/5 group-hover:scale-110 transition-transform duration-500 rotate-12" />
              <div className="relative z-10">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                    <Icon className="w-7 h-7 text-slate-700 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-16">
          <div className="text-center mb-10">
              <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-3 border border-slate-200">
                  Impact
              </span>
              <h3 className="text-2xl font-bold text-slate-900">{t.benefits.impact_title}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              {t.benefits.impact_cards.map((card, idx) => (
                  <div key={idx} className="group perspective-1000 h-[300px] cursor-pointer">
                      <div className="relative w-full h-full duration-700 preserve-3d transition-all group-hover:rotate-y-180">
                          
                          {/* RECTO */}
                          <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-shadow">
                              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                  <card.icon className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900">{card.title}</h4>
                              <p className="text-sm text-slate-400 mt-4 flex items-center gap-1 opacity-60">
                                  <ArrowRight className="w-3 h-3" />
                              </p>
                          </div>

                          {/* VERSO */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden border border-slate-700">
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`}></div>
                                
                                <div className="relative z-10">
                                    <span className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${card.color} mb-4 block`}>
                                        {card.stat}
                                    </span>
                                    <p className="text-slate-300 font-medium leading-relaxed mb-6">
                                        {card.description}
                                    </p>
                                    
                                    <a 
                                        href={card.source} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors border-b border-slate-700 pb-0.5 hover:border-white"
                                    >
                                        Source: {card.sourceLabel} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <div className="flex justify-center">
        <button 
            onClick={() => onGateAccess(COMPANY_INFO.calendarUrl)}
            className="group relative px-8 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-shimmer"></div>
            <div className="relative z-10 flex items-center gap-3">
                <span>{t.benefits.cta_audit}</span>
                <span className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </span>
            </div>
        </button>
      </div>

    </section>
  );
};

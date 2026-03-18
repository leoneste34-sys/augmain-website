
import React, { useState } from 'react';
import { MousePointerClick, RefreshCw, Hand } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Interface ajustée pour matcher la structure de translations.ts
interface Feature {
    icon: any;
    iconClass: string;
    text: string;
    stat: string;
    statDesc: string;
    proof: string;
}

interface FlipCardProps {
  feature: Feature;
  index: number;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ feature, index, className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = feature.icon;

  return (
    <div 
      className={`group perspective-1000 h-64 cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full duration-700 preserve-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FACE AVANT */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-slate-800/80 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center shadow-xl hover:border-blue-500/50 hover:shadow-blue-500/20 transition-all">
          
          <div className="absolute top-4 right-4 bg-white/5 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10 flex items-center gap-1.5 animate-pulse group-hover:bg-blue-500/20 group-hover:border-blue-400/30 transition-colors">
             <Hand className="w-3 h-3 text-blue-300" />
             <span className="text-[9px] font-bold text-blue-100 uppercase tracking-widest">Voir</span>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl shadow-inner border border-white/5 mb-6 group-hover:scale-110 transition-transform duration-500">
             <Icon className={`w-6 h-6 ${feature.iconClass}`} />
          </div>
          <h3 className="font-bold text-xl text-slate-200 group-hover:text-white transition-colors leading-snug">
              {feature.text}
          </h3>
          
          <div className="absolute bottom-4 opacity-50 text-[10px] text-slate-400 flex items-center gap-1">
             <RefreshCw className="w-3 h-3" />
          </div>
        </div>

        {/* FACE ARRIÈRE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900 to-slate-900 p-6 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 w-full">
                <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white mb-3 block">
                    {feature.stat}
                </span>
                <p className="text-xs text-blue-200 font-medium mb-4 leading-relaxed uppercase tracking-wide border-b border-blue-500/30 pb-3 mx-2">
                    {feature.statDesc}
                </p>
                <p className="text-sm text-white font-semibold leading-relaxed">
                    "{feature.proof}"
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export const PromiseSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#0B1120] py-24 px-4 text-white rounded-[3rem] mx-2 md:mx-auto max-w-6xl shadow-2xl overflow-hidden relative border border-white/5">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse duration-[4000ms]"></div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
            {t.promise.title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 text-sm md:text-base animate-pulse">
            <MousePointerClick className="w-4 h-4 inline mr-1 text-blue-400"/>
            {t.promise.subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
        {t.promise.features.map((feature, index) => (
          <FlipCard 
            key={index} 
            feature={feature}
            index={index}
            className={`${index === t.promise.features.length - 1 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

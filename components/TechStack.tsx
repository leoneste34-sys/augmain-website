
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, ArrowRight } from 'lucide-react';

const TechFlipCard = ({ tool }: { tool: any }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = tool.icon;

    return (
        <div 
            className="group perspective-1000 cursor-pointer h-48"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full duration-500 preserve-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${tool.color} transition-transform group-hover:scale-110`}>
                            <Icon className="w-6 h-6"/>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{tool.name}</h3>
                        <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                            <ArrowRight className="w-3 h-3 text-blue-400" /> {tool.desc}
                        </p>
                    </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
                    <Icon className="w-8 h-8 text-blue-400 mb-3" />
                    <h3 className="font-bold text-white text-md mb-2">Intégration Native</h3>
                    <p className="text-xs text-slate-300">Synchronisation bidirectionnelle en temps réel avec {tool.name}.</p>
                </div>
            </div>
        </div>
    );
};

export const TechStack: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
                Plug & Play
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                {t.integrations.title}
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                {t.integrations.subtitle}
            </p>
        </div>
      
        {/* Bento Grid Integrations */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {t.integrations.list.map((tool, idx) => (
              <TechFlipCard key={idx} tool={tool} />
          ))}
        </div>

        {/* Bottom Message - Version Premium */}
        <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 font-medium bg-slate-50 inline-block px-4 py-2 rounded-full border border-slate-100">
                + Compatible avec 5000+ autres applications via <span className="text-slate-600 font-bold">API & Connecteurs Universels</span>
            </p>
        </div>

      </div>
    </section>
  );
};

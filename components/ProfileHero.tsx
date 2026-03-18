
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, ShieldCheck, BrainCircuit, Download, Clock, Zap, Euro, Coffee, Star, ArrowDown } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileHeroProps {
    onGateAccess: (url: string | null) => void;
    onOpenContactExchange?: () => void;
}

const HeroFlipCard = ({ 
    frontContent, 
    backContent, 
    className = "",
    delay = "0ms"
}: { 
    frontContent: React.ReactNode; 
    backContent: React.ReactNode; 
    className?: string;
    delay?: string;
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className={`group perspective-1000 cursor-pointer ${className}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ animationDelay: delay }}
        >
            <div className={`relative w-full h-full duration-500 preserve-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-4 hover:border-blue-300 transition-colors">
                    {frontContent}
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-3xl shadow-xl border border-slate-800 flex flex-col items-center justify-center p-4 text-white">
                    {backContent}
                </div>
            </div>
        </div>
    );
};

export const ProfileHero: React.FC<ProfileHeroProps> = ({ onGateAccess, onOpenContactExchange }) => {
  const [text, setText] = useState('');
  const { t } = useLanguage();
  const [prospectName, setProspectName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const client = params.get('client');
    if (client) {
        setProspectName(client);
    }
  }, []);
  
  useEffect(() => {
    const fullText = prospectName ? `Bonjour ${prospectName}` : t.hero.title_start;
    
    let i = 0;
    setText(''); 
    
    const typing = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(typing);
    }, 100); 
    
    return () => clearInterval(typing);
  }, [t.hero.title_start, prospectName]);

  const scrollToSection = (id: string) => {
      const section = document.getElementById(id);
      if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <section className="pt-8 pb-10 md:pt-16 px-4 max-w-7xl mx-auto relative overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          <div className="w-full lg:flex-1 text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100 shadow-sm mx-auto lg:mx-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  {t.hero.badge}
              </div>
              
              <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
                {text}<span className="text-blue-600">.</span>
                <span className="block text-2xl md:text-4xl font-semibold text-slate-400 mt-2">
                    {prospectName ? "Prêt à optimiser ?" : t.hero.title_end}
                </span>
              </h1>
              
              <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed font-light">
                {t.hero.desc_start} {' '}
                {t.hero.desc_end}
                <br className="hidden md:block"/>
                <span className="font-medium text-slate-800">{t.hero.bold_desc}</span>
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                    <button
                    onClick={() => scrollToSection('roi')}
                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 hover:scale-[1.02]"
                    >
                    <Calculator className="w-4 h-4" />
                    {t.hero.cta_expert}
                    </button>
                    
                    <button 
                        onClick={() => scrollToSection('demo')}
                        className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 border border-slate-200 rounded-xl font-bold hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                        <BrainCircuit className="w-4 h-4" />
                        {t.hero.cta_tech}
                    </button>
                </div>

                <button 
                   onClick={() => scrollToSection('roi')}
                   className="text-sm font-semibold text-slate-500 hover:text-red-500 underline decoration-slate-300 hover:decoration-red-400 underline-offset-4 transition-all flex items-center justify-center lg:justify-start gap-1 group"
                >
                    {t.hero.cta_roi} <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
              
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500"/> {t.hero.trust_security}
                  </div>
                  <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-blue-500"/> {t.hero.trust_roi}
                  </div>
              </div>
          </div>

          <div className="w-full lg:flex-1 flex justify-center lg:justify-end relative mt-8 lg:mt-0">
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] flex items-center justify-center mx-auto lg:mx-0">
                {/* Background Circles Animation */}
                <div className="absolute inset-0 border border-slate-200 rounded-full opacity-20 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-6 border border-blue-200 rounded-full opacity-30 animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main Central Card (Revenue) */}
                <HeroFlipCard 
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 z-20"
                    frontContent={
                        <>
                           <div className="relative flex items-end gap-1.5 h-16 w-20 mb-2">
                                <div className="w-5 bg-blue-100 h-[30%] rounded-t-sm"></div>
                                <div className="w-5 bg-blue-300 h-[60%] rounded-t-sm"></div>
                                <div className="w-5 bg-blue-600 h-[100%] rounded-t-sm animate-pulse"></div>
                                <TrendingUp className="absolute -top-3 -right-3 w-8 h-8 text-green-500 bg-white rounded-full p-1.5 shadow-md border border-green-100" />
                           </div>
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenus</span>
                        </>
                    }
                    backContent={
                        <>
                            <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                            <span className="text-3xl font-extrabold">+25%</span>
                            <span className="text-xs text-slate-300 mt-1">de CA Annuel</span>
                        </>
                    }
                />

                {/* Floating Card 1 (Availability) */}
                <HeroFlipCard 
                    className="absolute top-0 right-0 sm:-top-2 sm:-right-2 w-20 h-20 sm:w-24 sm:h-24 z-30 animate-[bounce_3s_infinite]"
                    frontContent={
                        <div className="relative">
                            <Clock className="w-8 h-8 text-indigo-500" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
                        </div>
                    }
                    backContent={
                        <>
                            <span className="text-xl font-bold">24h/24</span>
                            <span className="text-[10px] text-slate-300 text-center">Ouvert</span>
                        </>
                    }
                />

                {/* Floating Card 2 (Peace of Mind) */}
                <HeroFlipCard 
                    className="absolute bottom-4 left-4 sm:bottom-0 sm:left-0 w-20 h-20 sm:w-24 sm:h-24 z-30 animate-[bounce_4s_infinite]"
                    delay="1s"
                    frontContent={
                         <div className="relative">
                            <Coffee className="w-8 h-8 text-orange-500" />
                            <Star className="absolute -bottom-1 -right-1 w-4 h-4 text-yellow-500 fill-yellow-500" />
                         </div>
                    }
                    backContent={
                        <>
                            <span className="text-lg font-bold">Zéro</span>
                            <span className="text-[10px] text-slate-300 text-center">Stress</span>
                        </>
                    }
                />
              </div>
          </div>
      </div>
    </section>
  );
};

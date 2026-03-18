
import React from 'react';
import { Phone, MessageSquare, Laptop, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DemoSectionProps {
    onGateAccess: (url: string) => void;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ onGateAccess }) => {
  const { t } = useLanguage();

  return (
    <section id="demo" className="px-4 max-w-6xl mx-auto scroll-mt-24">
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">{t.demo.label}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {t.demo.title_start} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t.demo.title_end}</span>
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-slate-200 mx-8 mb-4"></div>
          <p className="text-slate-500 text-sm max-w-xs text-right md:text-left">
              {t.demo.subtitle}
          </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {t.demo.cases.map((demo, idx) => {
            const Icon = demo.icon;
            const isVoice = demo.type === 'voice';
            
            return (
                <div 
                    key={idx} 
                    className="group relative bg-white rounded-3xl border border-slate-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 flex flex-col overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${isVoice ? 'from-blue-500 to-cyan-500' : 'from-indigo-500 to-purple-500'}`}></div>

                    <div className="flex items-start justify-between mb-6 relative z-10">
                        <div className={`p-3.5 rounded-2xl shadow-sm ${isVoice ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        {isVoice && (
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        )}
                    </div>

                    <div className="mb-8 relative z-10">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{demo.title}</h3>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">{demo.client}</p>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                            {demo.description}
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <button 
                            onClick={() => onGateAccess(demo.link)}
                            className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group-hover:scale-[1.02] shadow-md
                            ${isVoice 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-200' 
                                : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100'}`}
                        >
                            {isVoice ? <Phone className="w-4 h-4"/> : <ExternalLink className="w-4 h-4"/>}
                            {demo.action}
                        </button>
                    </div>
                </div>
            );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 text-xs font-medium grayscale opacity-60">
         {t.demo.badges.map((b, i) => (
             <React.Fragment key={i}>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> {b}</span>
                {i < t.demo.badges.length - 1 && <span className="hidden md:inline">|</span>}
             </React.Fragment>
         ))}
      </div>

    </section>
  );
};

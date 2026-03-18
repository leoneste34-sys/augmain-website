
import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, TrendingUp, Zap, ArrowRight, User, Briefcase, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { COMPANY_INFO } from '../constants';

const AnimatedCounter = ({ end, duration = 1500, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime: number;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            // Easing function: easeOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(end * ease));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);
    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const CustomSlider = ({ 
    value, 
    min, 
    max, 
    onChange, 
    label, 
    unit 
}: { 
    value: number, 
    min: number, 
    max: number, 
    onChange: (val: number) => void, 
    label: string, 
    unit: string 
}) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
        <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{label}</span>
                <span className="text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 min-w-[80px] text-center">
                    {value} <span className="text-xs text-blue-400">{unit}</span>
                </span>
            </div>
            <div className="relative h-4 bg-slate-100 rounded-full cursor-pointer group">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-100"
                    style={{ width: `${percentage}%` }}
                ></div>
                <div 
                    className="absolute top-1/2 -translate-y-1/2 h-6 w-6 bg-white border-2 border-blue-500 rounded-full shadow-lg transition-all duration-100 group-hover:scale-110"
                    style={{ left: `calc(${percentage}% - 12px)` }}
                ></div>
                <input 
                    type="range" 
                    min={min} 
                    max={max} 
                    value={value} 
                    onChange={(e) => onChange(Number(e.target.value))} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

export const ROICalculator: React.FC = () => {
  const { t } = useLanguage();
  const [callsPerDay, setCallsPerDay] = useState(10);
  const [missedPercentage, setMissedPercentage] = useState(30);
  const [customerValue, setCustomerValue] = useState(150);
  
  // Nouveaux indicateurs dérivés
  const results = useMemo(() => {
    const workingDays = 22; // Jours ouvrés moyens
    const missedCallsPerDay = callsPerDay * (missedPercentage / 100);
    const recoveredRevenue = Math.round(missedCallsPerDay * customerValue * workingDays * 0.5); // 50% de taux de conversion conservateur
    const yearlyLoss = recoveredRevenue * 12;
    const hoursSaved = Math.round((callsPerDay * 4 * workingDays) / 60); // 4 min par appel en moyenne

    return { recoveredRevenue, yearlyLoss, hoursSaved, missedCallsPerDay };
  }, [callsPerDay, missedPercentage, customerValue]);

  // Presets pour interaction rapide
  const applyPreset = (index: number) => {
      const preset = t.roi.presets[index];
      setCallsPerDay(preset.calls);
      setMissedPercentage(preset.missed);
      setCustomerValue(preset.value);
  };

  const getPresetIcon = (index: number) => {
      if (index === 0) return User;
      if (index === 1) return Briefcase;
      return Building;
  };

  return (
    <section id="roi" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-24">
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
             <Calculator className="w-4 h-4"/> Simulateur
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{t.roi.title}</h2>
        <p className="text-slate-500 text-lg max-w-2xl">{t.roi.quote}</p>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row relative">
         
         {/* LEFT SIDE: CONTROLS */}
         <div className="lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
            
            {/* Quick Presets */}
            <div className="mb-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Profil Rapide</p>
                <div className="grid grid-cols-3 gap-3">
                    {t.roi.presets.map((preset, idx) => {
                        const Icon = getPresetIcon(idx);
                        return (
                            <button 
                                key={idx} 
                                onClick={() => applyPreset(idx)}
                                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-500 hover:shadow-md transition-all group"
                            >
                                <Icon className="w-5 h-5 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                                <span className="text-[10px] font-bold text-center leading-tight group-hover:text-blue-700">{preset.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <CustomSlider 
                label={t.roi.calls_per_day} 
                value={callsPerDay} 
                min={1} 
                max={100} 
                unit="appels"
                onChange={setCallsPerDay} 
            />
            <CustomSlider 
                label={t.roi.missed_rate} 
                value={missedPercentage} 
                min={0} 
                max={100} 
                unit="%"
                onChange={setMissedPercentage} 
            />
            <CustomSlider 
                label={t.roi.avg_basket} 
                value={customerValue} 
                min={5} 
                max={2000} 
                unit="€"
                onChange={setCustomerValue} 
            />
         </div>

         {/* RIGHT SIDE: RESULTS (The Hook) */}
         <div className="lg:w-1/2 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background FX */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 text-center lg:text-left">
                <div className="mb-10">
                    <p className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2">{t.roi.gain_monthly}</p>
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                            <AnimatedCounter end={results.recoveredRevenue} suffix="€" />
                        </span>
                        <div className="bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            + Cash
                        </div>
                    </div>
                </div>

                {/* THE SCARY PART (Yearly Loss) */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/20 rounded-xl text-red-400 hidden sm:block">
                            <TrendingUp className="w-6 h-6 rotate-180" />
                        </div>
                        <div className="flex-1">
                            <p className="text-slate-400 text-sm font-medium mb-1">{t.roi.yearly_projection}</p>
                            <p className="text-3xl font-bold text-red-400">
                                -<AnimatedCounter end={results.yearlyLoss} suffix="€" /> / an
                            </p>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-red-500 w-[80%] animate-pulse"></div>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2">Projection basée sur vos données actuelles.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                        <p className="text-blue-200 text-xs uppercase font-bold mb-1">{t.roi.time_saved}</p>
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={results.hoursSaved} suffix="h" /></p>
                     </div>
                     <div className="bg-indigo-600/10 rounded-xl p-4 border border-indigo-500/20">
                        <p className="text-indigo-200 text-xs uppercase font-bold mb-1">{t.roi.opps_saved}</p>
                        <p className="text-2xl font-bold text-white">~<AnimatedCounter end={Math.ceil(results.missedCallsPerDay * 22)} /></p>
                     </div>
                </div>

                <button 
                    onClick={() => window.open(COMPANY_INFO.calendarUrl, '_blank')}
                    className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-white/10"
                >
                    <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500 group-hover:animate-bounce" />
                    {t.roi.cta_action} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
         </div>
      </div>
    </section>
  );
};

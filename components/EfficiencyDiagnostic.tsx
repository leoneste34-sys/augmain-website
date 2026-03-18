
import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../constants';
import { ArrowRight, TrendingUp, Calculator, RotateCcw, User, Phone, Mail, CheckCircle2, Building2 } from 'lucide-react';
import { sendEmail } from '../utils/email';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime: number;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / duration;
            if (progress < 1) {
                setCount(Math.floor(end * (1 - Math.pow(1 - progress, 3)))); 
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);
    return <span>{count.toLocaleString()}{suffix}</span>;
};

export const EfficiencyDiagnostic: React.FC = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  
  const [profile, setProfile] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState('');
  const [selectedFrictions, setSelectedFrictions] = useState<string[]>([]);
  const [hoursLostPerWeek, setHoursLostPerWeek] = useState(5);
  
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [rgpdConsent, setRgpdConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFriction = (id: string) => {
    setSelectedFrictions(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const calculateResults = () => {
    const sectorData = t.diagnostic.sectors.find(s => s.id === selectedSector) || t.diagnostic.sectors[t.diagnostic.sectors.length - 1];
    const hourlyRate = profile === 'freelance' ? 60 : 100; 
    const weeksPerMonth = 4.33;
    const monthlyHoursLost = hoursLostPerWeek * weeksPerMonth;
    const financialEquivalentOfTime = monthlyHoursLost * hourlyRate;
    const recoveredLeadsPerMonth = 2 * weeksPerMonth;
    const opportunityValue = recoveredLeadsPerMonth * (sectorData.valuePerLead * 0.5);
    const totalGain = Math.round(financialEquivalentOfTime + opportunityValue);

    return { totalGain, hoursSaved: Math.round(monthlyHoursLost) };
  };

  const results = calculateResults();

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!rgpdConsent) return;
    setIsSubmitting(true);

    trackEvent('calculate_roi_lead', { sector: selectedSector, team_size: teamSize, potential_gain: results.totalGain, hours_saved: results.hoursSaved });
    
    sendEmail({
        type: 'diagnostic',
        name: leadName,
        email: leadEmail,
        phone: leadPhone,
        company: leadCompany,
        details: { profile, sector: selectedSector, teamSize, frictions: selectedFrictions, estimatedLoss: results.totalGain, hoursSaved: results.hoursSaved }
    }).catch(console.error);
    
    const win = window.open(COMPANY_INFO.calendarUrl, '_blank');
    if (!win) window.location.href = COMPANY_INFO.calendarUrl;
    setIsSubmitting(false);
  };

  const nextStep = (target: number) => setStep(target);

  return (
    <section id="diagnostic" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-32">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-blue-900/10">
        <div className="bg-slate-900 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-bold flex items-center justify-center gap-3 relative z-10">
            <Calculator className="w-6 h-6 text-blue-400"/> {t.diagnostic.title}
          </h2>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${(step / 6) * 100}%` }}></div>
          </div>
        </div>

        <div className="p-6 md:p-12 bg-slate-50/50 min-h-[400px]">
          {/* STEP 1: PROFIL */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
              <div className="text-center mb-8">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">1. {t.diagnostic.step1}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{t.diagnostic.step1_title}</h3>
              </div>
              <div className="grid gap-3">
                {t.diagnostic.profiles.map((p) => (
                    <button key={p.id} onClick={() => { setProfile(p.id); nextStep(2); }} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all text-left flex justify-between items-center group">
                        <span className="font-medium text-slate-900 group-hover:text-blue-600">{p.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"/>
                    </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SECTEUR */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
              <div className="text-center mb-8">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">2. {t.diagnostic.step2}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{t.diagnostic.step2_title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {t.diagnostic.sectors.map((s) => {
                    const Icon = s.icon;
                    return (
                        <button key={s.id} onClick={() => { setSelectedSector(s.id); nextStep(3); }} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/50 transition-all flex flex-col items-center gap-3 text-center group">
                            <div className="text-slate-400 group-hover:text-blue-600"><Icon className="w-6 h-6"/></div>
                            <span className="font-medium text-slate-900 text-sm">{s.label}</span>
                        </button>
                    );
                })}
              </div>
              <button onClick={() => setStep(1)} className="w-full text-slate-400 text-sm mt-4 hover:text-slate-600 transition-colors">{t.diagnostic.cta_back}</button>
            </div>
          )}

           {/* STEP 3: TAILLE */}
           {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
              <div className="text-center mb-8">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">3. {t.diagnostic.step3}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{t.diagnostic.step3_title}</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {t.diagnostic.team_sizes.map((s) => (
                    <button key={s} onClick={() => { setTeamSize(s); nextStep(4); }} className="px-6 py-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-slate-900 hover:text-white transition-all font-medium text-slate-900">
                        {s}
                    </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full text-slate-400 text-sm mt-4 hover:text-slate-600 transition-colors">{t.diagnostic.cta_back}</button>
            </div>
          )}

          {/* STEP 4: FRICTIONS */}
          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
              <div className="text-center mb-6">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase">4. {t.diagnostic.step4}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{t.diagnostic.step4_title}</h3>
              </div>
              <div className="grid gap-3">
                {t.diagnostic.frictions.map((f) => {
                    const Icon = f.icon;
                    return (
                        <div key={f.id} onClick={() => toggleFriction(f.id)} className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-200 ${selectedFrictions.includes(f.id) ? 'border-yellow-500 bg-yellow-50 shadow-md translate-x-1' : 'border-slate-200 bg-white hover:border-yellow-300'}`}>
                            <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${selectedFrictions.includes(f.id) ? 'text-yellow-600' : 'text-slate-400'}`}/>
                                <span className={`font-medium ${selectedFrictions.includes(f.id) ? 'text-slate-900' : 'text-slate-600'}`}>{f.label}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedFrictions.includes(f.id) ? 'bg-yellow-500 border-yellow-500' : 'border-slate-300'}`}>
                                {selectedFrictions.includes(f.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white"/>}
                            </div>
                        </div>
                    );
                })}
              </div>
              <button onClick={() => nextStep(5)} disabled={selectedFrictions.length === 0} className="w-full mt-4 bg-slate-900 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                {t.diagnostic.cta_next}
              </button>
            </div>
          )}

          {/* STEP 5: TEMPS */}
          {step === 5 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
               <div className="text-center mb-6">
                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">5. {t.diagnostic.step5}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{t.diagnostic.step5_title}</h3>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-600 font-medium">Volume</span>
                    <span className="text-4xl font-extrabold text-blue-600">{hoursLostPerWeek}h</span>
                </div>
                <input type="range" min="1" max="20" step="1" value={hoursLostPerWeek} onChange={(e) => setHoursLostPerWeek(Number(e.target.value))} className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <button onClick={() => nextStep(6)} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5"/> {t.diagnostic.cta_calc}
              </button>
            </div>
          )}

          {/* STEP 6: RESULTATS */}
          {step === 6 && (
            <div className="animate-in zoom-in duration-700">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 p-6 rounded-2xl border border-green-100 text-center shadow-sm relative overflow-hidden">
                        <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t.diagnostic.result_gain}</p>
                        <p className="text-3xl md:text-4xl font-extrabold text-green-600 tracking-tight">+<CountUp end={results.totalGain} suffix="€"/></p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100/50 p-6 rounded-2xl border border-blue-100 text-center shadow-sm relative overflow-hidden">
                        <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">{t.diagnostic.result_time}</p>
                        <p className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight"><CountUp end={results.hoursSaved} suffix="h"/></p>
                    </div>
                </div>

                {/* COMPARISON BAR (FOMO) */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center mb-8 animate-pulse">
                    <p className="text-xs text-red-600 font-bold">
                        ⚠️ Vous perdez <span className="underline">20% de plus</span> que la moyenne de votre secteur.
                    </p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-6 relative overflow-hidden group">
                    <h4 className="font-bold text-lg mb-6 text-center">{t.diagnostic.lead_title}</h4>
                    <form onSubmit={handleLeadSubmit} className="space-y-4 relative z-10">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500"/>
                                <input required type="text" value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-500 focus:bg-white text-white placeholder:text-slate-400 outline-none transition-all" placeholder={t.diagnostic.lead_name} />
                            </div>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-500"/>
                                <input required type="text" value={leadCompany} onChange={e => setLeadCompany(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-500 focus:bg-white text-white placeholder:text-slate-400 outline-none transition-all" placeholder={t.diagnostic.lead_company} />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                             <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500"/>
                                <input required type="email" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-500 focus:bg-white text-white placeholder:text-slate-400 outline-none transition-all" placeholder={t.diagnostic.lead_email} />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500"/>
                                <input required type="tel" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-500 focus:bg-white text-white placeholder:text-slate-400 outline-none transition-all" placeholder={t.diagnostic.lead_phone} />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <input type="checkbox" id="rgpd-diag" required checked={rgpdConsent} onChange={e => setRgpdConsent(e.target.checked)} className="mt-1 w-4 h-4 rounded border-slate-600 text-blue-500 bg-white/10" />
                            <label htmlFor="rgpd-diag" className="text-xs text-slate-400 leading-tight cursor-pointer hover:text-slate-300">{t.diagnostic.lead_consent}</label>
                        </div>

                        <button type="submit" disabled={!rgpdConsent || isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                            {isSubmitting ? '...' : t.diagnostic.lead_submit} <ArrowRight className="w-5 h-5"/>
                        </button>
                        <p className="text-[10px] text-center text-slate-400 mt-4">
                            {t.modal.rgpd_consent} <a href="https://www.augmain.fr/c6d288e3" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">{t.footer.privacy}</a>.
                        </p>
                    </form>
                </div>
                
                <button onClick={() => setStep(1)} className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                    <RotateCcw className="w-4 h-4"/> {t.diagnostic.cta_restart}
                </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

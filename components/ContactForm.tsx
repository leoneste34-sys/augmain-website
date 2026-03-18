
import React, { useState } from 'react';
import { COMPANY_INFO } from '../constants';
import { Loader2, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Calendar } from 'lucide-react';
import { sendEmail } from '../utils/email';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      trackEvent('submit_contact_form', { source: 'footer_contact_section' });
      await sendEmail({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        details: { source: 'Formulaire bas de page' }
      }).catch(err => console.error("Erreur envoi email (non bloquant):", err));
    } catch (error) {
      console.error("Erreur formulaire:", error);
    } finally {
      setStatus('success');
      setTimeout(() => {
        window.location.href = COMPANY_INFO.calendarUrl;
      }, 1500);
    }
  };

  const renderInput = (id: string, label: string, type: string, value: string, onChange: (val: string) => void, helperText?: string) => {
    const isActive = focusedField === id || value.length > 0;
    const isValid = value.length > 2; 
    
    return (
      <div className="relative group">
        <input
          type={type}
          id={id}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          className={`peer w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-300 font-medium z-10 relative bg-slate-50
            ${isActive ? 'border-blue-500/50 bg-white shadow-[0_4px_20px_-2px_rgba(59,130,246,0.1)]' : 'border-slate-100 hover:bg-slate-100 hover:border-slate-200'}
            text-slate-900 placeholder-transparent`}
          placeholder={label}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-300 pointer-events-none origin-[0] z-20
            ${isActive ? '-top-3 text-xs bg-white px-2 text-blue-600 font-bold rounded-full scale-100 shadow-sm border border-blue-100' : 'top-4 text-slate-500 scale-100'}
          `}
        >
          {label}
        </label>
        {isValid && <CheckCircle2 className="absolute right-4 top-4 w-5 h-5 text-green-500 animate-in fade-in zoom-in duration-300 z-20" />}
        {helperText && focusedField === id && (
            <span className="absolute -bottom-6 left-2 text-[10px] text-blue-400 font-medium animate-in slide-in-from-top-1 fade-in duration-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3"/> {helperText}
            </span>
        )}
        <div className={`absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-500 ease-out -translate-x-1/2 rounded-full z-20 ${focusedField === id ? 'w-[90%] opacity-100 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'w-0 opacity-0'}`}></div>
      </div>
    );
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-20 px-4 max-w-xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-green-100 p-8 md:p-12 text-center animate-in zoom-in duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{t.contact.success_title}</h3>
            <p className="text-slate-500 mb-8 text-lg">{t.contact.success_desc}</p>
            <div className="space-y-4 relative z-10">
                <a href={COMPANY_INFO.calendarUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
                    <span>{t.contact.cta_agenda}</span>
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium bg-green-50 py-2 px-4 rounded-lg inline-block mx-auto mt-4">
                    <Loader2 className="w-4 h-4 animate-spin" /> <span>...</span>
                </div>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden scroll-mt-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-blue-100/40 via-purple-50/40 to-white rounded-full blur-3xl -z-10 animate-pulse pointer-events-none"></div>

      <div className="max-w-xl mx-auto">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white/60 p-8 md:p-12 relative overflow-hidden group/card hover:shadow-blue-900/20 transition-shadow duration-500">
            <div className="absolute -top-10 -right-10 bg-gradient-to-br from-blue-500 to-indigo-600 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover/card:opacity-20 transition-opacity duration-500"></div>
            <div className="absolute top-8 right-8 animate-pulse text-blue-400">
                <Sparkles className="w-6 h-6" />
            </div>

            <div className="text-center mb-10 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    {t.contact.badge}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{t.contact.title}</h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed">{t.contact.subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {renderInput('name', t.contact.name_label, 'text', formData.name, (v) => setFormData({...formData, name: v}), t.contact.name_placeholder)}
                {renderInput('email', t.contact.email_label, 'email', formData.email, (v) => setFormData({...formData, email: v}), t.contact.email_placeholder)}
                {renderInput('phone', t.contact.phone_label, 'tel', formData.phone, (v) => setFormData({...formData, phone: v}), t.contact.phone_placeholder)}

                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full group relative overflow-hidden bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-500/30 disabled:opacity-70 disabled:hover:bg-slate-900 disabled:cursor-not-allowed mt-2"
                >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                         {status === 'loading' ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> ...</>
                        ) : (
                            <>{t.contact.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/></>
                        )}
                    </div>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20"></div>
                </button>
            </form>
            
            <p className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 100% Humain & Confidentialité garantie
            </p>
            <p className="text-[10px] text-center text-slate-400 mt-4">
                {t.modal.rgpd_consent} <a href="https://www.augmain.fr/c6d288e3" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">{t.footer.privacy}</a>.
            </p>
        </div>
      </div>
    </section>
  );
};

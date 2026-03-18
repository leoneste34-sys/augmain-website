
import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, MessageSquare, Loader2, ArrowRight, Phone, Mail, Plus, Calendar, PhoneCall, Lock, Unlock, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { sendEmail } from '../utils/email';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: 'starter' | 'performance' | null;
  redirectUrl?: string | null;
}

export const QualificationModal: React.FC<QualificationModalProps> = ({ isOpen, onClose, initialPlan, redirectUrl }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', role: '', phone: '', email: '', context: '', timeline: '', preference: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isGatedContent = !!redirectUrl;

  useEffect(() => {
    if (isOpen) {
        setStep(1);
        setIsPremium(initialPlan === 'performance');
    }
  }, [isOpen, initialPlan]);

  if (!isOpen) return null;

  const handleFinalSubmit = (preference: 'agenda' | 'callback' | 'access') => {
    setIsSubmitting(true);
    setFormData(prev => ({ ...prev, preference }));

    trackEvent('generate_lead', { plan_type: isPremium ? 'Premium' : 'Starter', timeline: formData.timeline, preference: preference, is_gated_access: isGatedContent });

    sendEmail({
        type: 'qualification',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        details: { role: formData.role, context: formData.context, plan: isPremium ? 'Premium' : 'Starter', timeline: formData.timeline, preference: isGatedContent ? "ACCÈS DÉMO" : preference, targetUrl: redirectUrl }
    }).catch(console.error);
    
    if (preference === 'callback' && !redirectUrl) {
        setTimeout(() => { setIsSubmitting(false); setStep(3); }, 800);
        return;
    }

    if (redirectUrl) {
        if (redirectUrl.startsWith('tel:') || redirectUrl.startsWith('mailto:')) window.location.href = redirectUrl;
        else { const win = window.open(redirectUrl, '_blank'); if (!win) window.location.href = redirectUrl; }
    } else if (preference === 'agenda') {
        window.open(COMPANY_INFO.calendarUrl, '_blank');
    }

    setIsSubmitting(false);
    onClose();
  };

  const renderField = (id: string, label: string, Icon: React.ElementType, type: string = 'text', value: string, onChange: (val: string) => void, options: { isTextArea?: boolean, placeholder?: string } = {}) => {
    const isFocused = focusedField === id;
    const InputComponent = options.isTextArea ? 'textarea' : 'input';
    return (
      <div className="group relative">
        <div className="flex justify-between items-end mb-1.5"><label className={`block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isFocused ? 'text-blue-600' : 'text-slate-500'}`}>{label}</label></div>
        <div className="relative">
            <Icon className={`absolute left-4 top-4 w-5 h-5 transition-all duration-300 z-10 ${isFocused ? 'text-blue-600 scale-110' : 'text-slate-400'}`} />
            <InputComponent id={id} required autoFocus={id === 'name' && step === 1} {...(!options.isTextArea ? { type } : {})} rows={options.isTextArea ? 3 : undefined} className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 bg-slate-50 font-medium ${isFocused ? 'border-blue-500/50 bg-white shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400'}`} placeholder={isFocused ? '' : options.placeholder || "..."} value={value} onChange={(e: any) => onChange(e.target.value)} onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)} />
            <div className={`absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-600 -translate-x-1/2 rounded-full transition-all duration-500 ease-out pointer-events-none ${isFocused ? 'w-[90%] opacity-100' : 'w-0 opacity-0'}`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 border ${isPremium ? 'border-blue-500/30' : 'border-white/20'}`}>
        <div className={`px-8 py-6 flex justify-between items-center ${isGatedContent ? 'bg-slate-900 text-white' : (isPremium ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900')}`}>
            <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${isGatedContent ? 'text-green-400' : (isPremium ? 'text-blue-400' : 'text-blue-600')}`}>
                    {isGatedContent ? <><Lock className="w-3 h-3"/> {t.modal.secure_access}</> : (isPremium ? t.modal.config_premium : t.modal.audit_custom)}
                </p>
                <h2 className="text-xl font-bold">{step === 3 ? t.modal.success_title : (isGatedContent ? t.modal.unlock_title : t.modal.talk_expert)}</h2>
            </div>
            <button onClick={onClose} className={`p-2 rounded-full transition ${isPremium || isGatedContent ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white hover:bg-slate-200 text-slate-500'}`}><X className="w-5 h-5"/></button>
        </div>

        <div className="p-8">
            {step === 1 && (
                <div className="space-y-5">
                    {isGatedContent && <p className="text-sm text-slate-500 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-2"><Unlock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"/> {t.modal.unlock_desc}</p>}
                    {renderField('name', t.diagnostic.lead_name, User, 'text', formData.name, (v) => setFormData({...formData, name: v}), { placeholder: "Ex: Jean Dupont" })}
                    {renderField('company', t.diagnostic.lead_company, Briefcase, 'text', formData.company, (v) => setFormData({...formData, company: v}), { placeholder: "Ex: Cabinet Médical Dupont" })}
                    <button onClick={() => setStep(2)} disabled={!formData.name || !formData.company} className={`w-full text-white font-bold py-4 rounded-xl transition-all mt-6 shadow-lg flex items-center justify-center gap-2 ${isPremium || isGatedContent ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-900 hover:bg-slate-800'}`}>
                        {t.modal.continue} <ArrowRight className="w-4 h-4"/>
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-5 animate-in slide-in-from-right-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderField('email', t.diagnostic.lead_email, Mail, 'email', formData.email, (v) => setFormData({...formData, email: v}))}
                        {renderField('phone', t.diagnostic.lead_phone, Phone, 'tel', formData.phone, (v) => setFormData({...formData, phone: v}))}
                     </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">{t.modal.timeline_label}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {t.modal.timelines.map((opt) => (
                                <button key={opt.value} type="button" onClick={() => setFormData(prev => ({ ...prev, timeline: opt.value }))} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-center ${formData.timeline === opt.value ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {!isGatedContent && (
                        <div className="space-y-2">
                            {renderField('context', t.modal.context_label, MessageSquare, 'text', formData.context, (v) => setFormData({...formData, context: v}), { isTextArea: true })}
                        </div>
                    )}
                    
                    <div className="pt-4 border-t border-slate-100">
                        {isGatedContent ? (
                             <button onClick={() => handleFinalSubmit('access')} disabled={isSubmitting || !formData.email || !formData.phone || !formData.timeline} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group">
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform"/>}
                                {isSubmitting ? '...' : t.modal.cta_access}
                            </button>
                        ) : (
                            <>
                                <p className="text-center text-sm font-semibold text-slate-900 mb-4">{t.modal.how_to_proceed}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => handleFinalSubmit('agenda')} disabled={isSubmitting || !formData.email || !formData.phone || !formData.timeline} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform"><Calendar className="w-5 h-5"/></div>
                                        <span className="text-xs font-bold text-slate-700">{t.modal.cta_agenda}</span>
                                    </button>
                                    <button onClick={() => handleFinalSubmit('callback')} disabled={isSubmitting || !formData.email || !formData.phone || !formData.timeline} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
                                        <div className="p-2 bg-green-100 text-green-600 rounded-full group-hover:scale-110 transition-transform"><PhoneCall className="w-5 h-5"/></div>
                                        <span className="text-xs font-bold text-slate-700">{t.modal.cta_callback}</span>
                                    </button>
                                </div>
                            </>
                        )}
                        <p className="text-[10px] text-slate-400 text-center mt-4">
                            {t.modal.rgpd_consent} <a href="https://www.augmain.fr/c6d288e3" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">{t.footer.privacy}</a>.
                        </p>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center py-8 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 border border-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"><PhoneCall className="w-8 h-8"/></div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.modal.success_title}</h3>
                    <p className="text-slate-500 mb-6 text-sm leading-relaxed max-w-xs mx-auto">{t.modal.success_desc}</p>
                    <button onClick={onClose} className="text-sm font-bold text-slate-900 hover:underline">{t.modal.close}</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

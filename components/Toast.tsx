import React, { useState, useEffect } from 'react';
import { Mail, X, CheckCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'info';
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<Omit<ToastMessage, 'id'>>) => {
      const newToast = {
        ...event.detail,
        id: Date.now(),
      };
      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    };

    window.addEventListener('toast-message' as any, handleToast as any);
    return () => window.removeEventListener('toast-message' as any, handleToast as any);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-24 right-4 z-[110] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="bg-white border border-slate-100 shadow-xl rounded-2xl p-4 flex gap-4 items-start animate-in slide-in-from-right fade-in pointer-events-auto backdrop-blur-md bg-white/90"
        >
          <div className={`p-2 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <Mail className="w-5 h-5"/>}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 text-sm">{toast.title}</h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4"/>
          </button>
        </div>
      ))}
    </div>
  );
};
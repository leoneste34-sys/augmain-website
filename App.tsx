
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StickyHeader } from './components/StickyHeader';
import { ProfileHero } from './components/ProfileHero';
import { EfficiencyDiagnostic } from './components/EfficiencyDiagnostic';
import { Benefits } from './components/Benefits';
import { DemoSection } from './components/DemoSection';
import { Pricing } from './components/Pricing';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { QualificationModal } from './components/QualificationModal';
import { ContactExchangeModal } from './components/ContactExchangeModal';
import { ToastContainer } from './components/Toast';
import { FAQ } from './components/FAQ';
import { FloatingCTA } from './components/FloatingCTA';
import { TechStack } from './components/TechStack';
import { ROICalculator } from './components/ROICalculator';
import { COMPANY_INFO } from './constants';
import { CookieBanner } from './components/CookieBanner';
import { initGA, trackEvent } from './utils/analytics';
import { LanguageProvider } from './contexts/LanguageContext';
import { AgenceIAMontpellier } from './pages/AgenceIAMontpellier';

function AppContent() {
  const [isQualificationOpen, setIsQualificationOpen] = useState(false);
  const [isContactExchangeOpen, setIsContactExchangeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'performance' | null>(null);
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState<string | null>(null);

  const handleGateAccess = (destinationUrl: string | null = null, plan: 'starter' | 'performance' | null = null) => {
    trackEvent('open_funnel', {
      source: destinationUrl ? 'gated_content' : (plan ? 'pricing_plan' : 'general_cta'),
      destination: destinationUrl || 'calendar',
      plan_interest: plan
    });

    setPendingRedirectUrl(destinationUrl);
    setSelectedPlan(plan);
    setIsQualificationOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={
          <>
            <StickyHeader onOpenQualification={() => handleGateAccess(COMPANY_INFO.calendarUrl, 'starter')} />
            
            <main className="space-y-12 md:space-y-20 pb-24">
              <ProfileHero 
                  onGateAccess={handleGateAccess} 
                  onOpenContactExchange={() => setIsContactExchangeOpen(true)}
              />
              <DemoSection onGateAccess={handleGateAccess} />
              
              {/* Intégration du Calculateur ROI ici pour l'impact */}
              <ROICalculator />

              {/* Intégration stratégique : Rassurer sur la compatibilité AVANT de parler prix */}
              <TechStack />
              
              <Pricing onSelectPlan={(plan) => handleGateAccess(null, plan)} />

              <div className="bg-white py-12 border-y border-slate-100">
                  <EfficiencyDiagnostic />
                  <Benefits onGateAccess={handleGateAccess} />
              </div>

              <div className="max-w-4xl mx-auto px-4">
                  <FAQ />
                  <ContactForm />
              </div>
            </main>

            <Footer />
            <FloatingCTA />
          </>
        } />
        
        <Route path="/agence-ia-montpellier" element={<AgenceIAMontpellier />} />
      </Routes>
      
      <QualificationModal 
        isOpen={isQualificationOpen} 
        onClose={() => setIsQualificationOpen(false)}
        initialPlan={selectedPlan}
        redirectUrl={pendingRedirectUrl}
      />

      <ContactExchangeModal 
        isOpen={isContactExchangeOpen}
        onClose={() => setIsContactExchangeOpen(false)}
      />
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

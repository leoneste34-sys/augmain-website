
import React, { useRef, useEffect, useState } from 'react';
import { PhoneCall, TrendingUp, DollarSign, Clock, Zap, X, CheckCircle2, Menu, Cpu, Euro, Target, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { COMPANY_INFO } from '../constants';

interface StickyHeaderProps {
  onOpenQualification: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ onOpenQualification }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  const [isActive, setIsActive] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // --- CONFIGURATION MOTEUR GRAPHIQUE ---
  const nodesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseRadius: number;
    color: string;
    pulse: number;
  }>>([]);
  
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scanLineRef = useRef(0); // Position de la ligne de scan
  const requestRef = useRef<number>(0);

  // --- GESTION SCROLL (Smart Hide & Style) ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-fermeture si on scroll
      if (isActive && currentScrollY > 20) setIsActive(false);

      // Smart Hide : On cache si on descend, sauf si on est tout en haut
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          setIsVisible(false);
      } else {
          setIsVisible(true);
      }

      const scrolled = currentScrollY > 20;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, isActive]);

  // --- CANVAS ANIMATION LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Initialisation
    const initNodes = (width: number, height: number) => {
        const nodeCount = Math.floor((width * height) / 10000); // Densité équilibrée
        const newNodes = [];
        const colors = ['#60a5fa', '#3b82f6', '#93c5fd']; // Palette Blue Tech

        for(let i = 0; i < nodeCount; i++) {
            const r = Math.random() * 1.5 + 0.5;
            newNodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: r,
                baseRadius: r,
                color: colors[Math.floor(Math.random() * colors.length)],
                pulse: Math.random() * Math.PI
            });
        }
        nodesRef.current = newNodes;
    };

    const handleResize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            const rect = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            if (nodesRef.current.length === 0) initNodes(rect.width, rect.height);
        }
    };

    const animate = () => {
        if (!isActive) return;
        
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        // 1. Fond Tech (Bleu très sombre, pas noir pur)
        ctx.fillStyle = '#0f172a'; 
        ctx.fillRect(0, 0, width, height);

        // 2. Scan Line Logic
        scanLineRef.current += 2; // Vitesse du scan
        if (scanLineRef.current > width + 200) scanLineRef.current = -200;

        // Dessin de la ligne de scan (Gradient)
        const gradient = ctx.createLinearGradient(scanLineRef.current, 0, scanLineRef.current - 100, 0);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)'); // Très subtil
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 3. Update Nodes
        nodesRef.current.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            node.pulse += 0.05;

            // Rebond
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            // Interaction Scan Line : Si la ligne passe sur le nœud, il brille
            const distToScan = Math.abs(node.x - scanLineRef.current);
            let scanFactor = 0;
            if (distToScan < 100) {
                scanFactor = 1 - (distToScan / 100);
            }

            // Interaction Souris
            if (mouseRef.current.active) {
                const dx = mouseRef.current.x - node.x;
                const dy = mouseRef.current.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    node.x += dx * force * 0.03;
                    node.y += dy * force * 0.03;
                }
            }

            // Calcul Rayon final (Base + Pulse + Scan)
            // L'effet scan fait grossir le point momentanément
            const currentRadius = node.baseRadius + (Math.sin(node.pulse) * 0.3) + (scanFactor * 2.5);

            ctx.beginPath();
            ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
            
            // Si touché par le scan, devient blanc/brillant
            if (scanFactor > 0.1) {
                ctx.fillStyle = `rgba(255, 255, 255, ${scanFactor})`;
                ctx.shadowBlur = 10 * scanFactor;
                ctx.shadowColor = "white";
            } else {
                ctx.fillStyle = node.color;
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0; // Reset

            // Connexions
            for (let j = i + 1; j < nodesRef.current.length; j++) {
                const otherNode = nodesRef.current[j];
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                // On ne dessine les lignes que si proches OU si activés par le scan
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    const opacity = 1 - (dist / 80);
                    // Ligne plus brillante si scan actif
                    ctx.strokeStyle = `rgba(147, 197, 253, ${opacity * (scanFactor > 0 ? 0.6 : 0.15)})`;
                    ctx.lineWidth = scanFactor > 0 ? 1 : 0.5;
                    ctx.stroke();
                }
            }
        });

        requestRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
        handleResize();
        requestRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive]);

  // --- HANDLERS ---
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsActive(!isActive);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  };

  const MARKET_DATA = [
      { label: t.header.market_invest, value: "+25%", icon: Euro, color: "text-green-400" },
      { label: t.header.market_prod, value: "10h/sem", icon: Clock, color: "text-blue-400" },
      { label: t.header.market_speed, value: "< 3s", icon: Zap, color: "text-yellow-400" },
  ];

  // Classes dynamiques
  const headerClasses = isActive 
    ? 'bg-slate-900 shadow-2xl h-[400px] md:h-[300px] translate-y-0 border-b border-blue-500/30' 
    : (
        isScrolled 
            ? `bg-white/80 backdrop-blur-xl shadow-lg h-16 border-b border-white/20 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}` 
            : 'bg-white/60 backdrop-blur-md h-20 translate-y-0 border-b border-transparent'
    );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${headerClasses}`}>
      <div className="max-w-6xl mx-auto px-4 h-full flex flex-col relative overflow-hidden">
        
        {/* BARRE DE NAVIGATION (Toujours visible au top) */}
        <div className="flex items-center justify-between h-16 md:h-20 w-full relative z-40 shrink-0">
            
            {/* LOGO - Interaction Hover */}
            <div 
                onClick={handleLogoClick}
                className="group flex items-center gap-3 cursor-pointer select-none"
                role="button"
                aria-label="Toggle AI View"
            >
              <div className={`relative transition-all duration-500 ${isScrolled && !isActive ? 'w-8 h-8' : 'w-10 h-10'}`}>
                 {/* L'icône change de couleur selon le mode */}
                 <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
                    {/* Cercle extérieur tournant */}
                    <path d="M50 10 A40 40 0 0 1 90 50" stroke={isActive ? '#60a5fa' : '#0f172a'} strokeWidth="4" strokeLinecap="round" className="origin-center transition-all duration-700 group-hover:rotate-180" />
                    <path d="M50 90 A40 40 0 0 1 10 50" stroke={isActive ? '#60a5fa' : '#0f172a'} strokeWidth="4" strokeLinecap="round" className="origin-center transition-all duration-700 group-hover:-rotate-180" />
                    
                    {/* Cœur */}
                    <circle cx="50" cy="50" r="15" className={`transition-all duration-300 ${isActive ? 'fill-blue-500 animate-pulse' : 'fill-slate-900 group-hover:fill-blue-600'}`} />
                 </svg>
                 
                 {/* Badge d'état "Actif" */}
                 {!isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-white"></span>
                    </span>
                 )}
              </div>
              
              <div className="flex flex-col">
                  <span className={`font-bold tracking-tighter leading-none transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-900'} ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                    AUGMAIN
                  </span>
                  {isActive && <span className="text-[9px] text-blue-400 font-mono tracking-widest uppercase animate-pulse">System Active</span>}
              </div>
            </div>

            {/* CTA & LANG - Droite */}
            <div className="flex items-center gap-3">
              {/* Langue */}
              <button 
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all border ${isActive ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-white'}`}
              >
                {language === 'fr' ? 'FR' : 'EN'}
              </button>

              {/* Bouton Appel - Shimmer Effect */}
              <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className={`relative overflow-hidden text-sm font-bold px-4 md:px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group hover:-translate-y-0.5 active:translate-y-0 ${isActive ? 'bg-blue-600 text-white border border-blue-400' : 'bg-slate-900 text-white'}`}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                <PhoneCall className={`w-4 h-4 relative z-20 ${!isActive && 'group-hover:animate-wiggle'}`} />
                <span className="hidden sm:inline relative z-20">{t.header.cta}</span>
                <span className="sm:hidden relative z-20">{t.header.call}</span>
              </a>

              {/* Toggle Visualisation (Mobile/Desktop) */}
              {!isActive && (
                 <button onClick={() => setIsActive(true)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors md:hidden">
                    <Cpu className="w-6 h-6" />
                 </button>
              )}
            </div>
        </div>
        
        {/* ZONE VISUALISATION (Expandable) */}
        <div className={`absolute inset-x-0 bottom-0 top-0 z-0 transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
             <div 
                className="w-full h-full relative cursor-crosshair pt-20"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => mouseRef.current.active = false}
             >
                 <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
                 
                 {/* Overlay Data */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center w-full px-4 pointer-events-none">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-200 font-mono text-xs uppercase tracking-[0.3em]">Scan des opportunités...</span>
                    </div>
                    
                    <h3 className="text-white text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
                        Vous dormez. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Votre business encaisse.</span>
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-8 border-t border-white/10 pt-6">
                        {MARKET_DATA.map((d, i) => (
                            <div key={i} className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                                <d.icon className={`w-5 h-5 ${d.color} mb-1`} />
                                <span className="text-white font-bold text-lg">{d.value}</span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{d.label}</span>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Close Button */}
                 <button 
                    onClick={() => setIsActive(false)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 transition-all hover:scale-105 flex items-center gap-2 z-50 cursor-pointer"
                 >
                    <X className="w-3 h-3" /> Fermer l'interface
                 </button>
             </div>
        </div>
      </div>
    </header>
  );
};

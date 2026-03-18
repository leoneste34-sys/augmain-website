
import React, { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';

import { COMPANY_INFO } from '../constants';

interface FloatingCTAProps {
    onClick?: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Affiche le bouton seulement après avoir scrollé un écran
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-4 md:hidden z-40 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className="bg-blue-600 text-white rounded-full p-4 shadow-xl shadow-blue-600/40 flex items-center gap-2 hover:bg-blue-500 transition-transform hover:scale-105 active:scale-95 ring-2 ring-white"
            >
                <PhoneCall className="w-6 h-6 animate-pulse" />
                <span className="font-bold text-sm pr-1">Appeler</span>
            </a>
        </div>
    );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { createTimePortalEffect } from '../utils/timeEffects';
import { INSITE_MISSION_LABEL, TOOL_LINKS } from '@/lib/toolLinks';

const TryNowButton: React.FC = () => {
  const handleTryNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.stellarisChatGpt.url, TOOL_LINKS.stellarisChatGpt.voice);
  };

  return (
    <section className="section-container bg-gradient-to-r from-space-black via-space-purple/10 to-space-black">
      <div className="text-center">
        <div className="inline-block mb-6">
          <span className="inline-block py-2 px-4 text-sm font-medium bg-space-blue/20 text-space-blue rounded-full">
            🚀 READY FOR LAUNCH
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Ready to Explore the Cosmos?
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Experience the future of space exploration with our advanced AI companion. 
          <span className="block mt-2 text-space-cyan italic">Your journey to the stars begins now...</span>
        </p>
        
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/mission-control"
              className="relative group button-primary text-lg sm:text-xl px-10 py-4 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>{INSITE_MISSION_LABEL}</span>
                <span className="text-2xl animate-pulse">🌌</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-space-blue via-space-purple to-space-cyan rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></div>
            </Link>
            <button
              onClick={handleTryNowClick}
              className="relative group px-10 py-4 rounded-full text-white border border-space-cyan/40 hover:bg-space-cyan/10 text-lg sm:text-xl transform hover:scale-105 transition-all duration-300"
            >
              {TOOL_LINKS.stellarisChatGpt.label}
            </button>
          </div>
        </div>
        
        <div className="mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <p className="text-sm text-gray-400">
            ✨ Free to use • No signup required • Instant access
          </p>
        </div>
      </div>
    </section>
  );
};

export default TryNowButton;

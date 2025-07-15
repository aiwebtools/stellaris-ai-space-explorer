
import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';
import { createTimePortalEffect } from '../utils/timeEffects';

const Hero: React.FC = () => {
  const handleStellarisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer');
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-space-blue/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-space-purple/20 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block mb-3">
            <span className="inline-block py-1 px-3 text-xs font-medium bg-space-blue/20 text-space-blue rounded-full">
              FREE AI TOOLS - AI WEB TOOLS
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
              Stellaris: <span className="text-space-blue">🚀</span>AI Space Explorer
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-space-cyan">
              Free AI Tools for Space Exploration
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Your intelligent companion for space exploration, exoplanet settlement, and interstellar discovery. 
            <strong className="text-white"> Best free AI tools</strong> for astrogation, terraforming, and mission planning.
            <span className="block mt-2 italic text-space-cyan">To the stars and beyond...</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <button 
              onClick={handleStellarisClick}
              className="button-primary text-lg px-8 py-3"
              aria-label="Launch Stellaris AI Space Explorer - Free AI Tool"
            >
              Launch Stellaris Simulation
            </button>
            <a href="#features" className="px-8 py-3 rounded-full text-white border border-white/20 hover:bg-white/10 transition-colors text-lg">
              Explore AI Features
            </a>
          </div>
          
          <div className="w-full max-w-5xl opacity-0 animate-blur-in" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <YouTubeEmbed videoId="SV4VVRcLX5c" autoplay={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

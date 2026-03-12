import React from 'react';
import Logo from './Logo';
import { createTimePortalEffect } from '../utils/timeEffects';

const Footer: React.FC = () => {
  const handleStellarisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer');
  };


  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://openai.com/policies/privacy-policy/');
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://aiwebtools.lovable.app/disclaimers');
  };

  const handleStellarOriginsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://chatgpt.com/g/g-6876d3b63b108191948709afa101d5af-stellar-origins-gpt', 'MASTER! I AM ACCESSING STELLAR ORIGINS GPT NOW!');
  };

  const handleMoreToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://aiwebtools.lovable.app/?via=aiwebtools');
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('tel:+14758008096');
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('mailto:Contact@ai-webtools.com');
  };

  return (
    <footer className="bg-space-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-400 mt-4">
              Advanced AI assistance for space exploration, exoplanet settlement, and interstellar discovery.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={handleStellarisClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  Begin Simulation to Space
                </button>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-space-blue transition-colors">
                  Features
                </a>
              </li>
              <li>
                <button 
                  onClick={handleStellarOriginsClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  Stellar Origins GPT
                </button>
              </li>
              <li>
                <a href="#disclaimer" className="text-gray-400 hover:text-space-blue transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={handlePrivacyPolicyClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={handleTermsClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={handleMoreToolsClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  More AI Tools
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={handlePhoneClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  (475) 800-8096
                </button>
              </li>
              <li>
                <button 
                  onClick={handleEmailClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  Contact@ai-webtools.com
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* More AI Tools Button */}
        <div className="mt-12 flex justify-end">
          <button 
            onClick={handleMoreToolsClick}
            className="rounded-full bg-gradient-to-r from-space-blue to-space-purple px-6 py-3 text-white font-medium transform hover:scale-105 transition-all"
          >
            More AI Tools
          </button>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <button
            onClick={handleMoreToolsClick}
            className="text-gray-400 hover:text-space-blue transition-colors"
          >
            © 2025 AI WEB TOOLS LLC All rights reserved.
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { createTimePortalEffect } from '../utils/timeEffects';
import { INSITE_MISSION_LABEL, TOOL_LINKS } from '@/lib/toolLinks';

const Footer: React.FC = () => {
  const handleStellarisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.stellarisChatGpt.url, TOOL_LINKS.stellarisChatGpt.voice);
  };


  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.openAiPrivacy.url);
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.aiWebToolsDisclaimers.url);
  };

  const handleStellarOriginsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.stellarOriginsChatGpt.url, TOOL_LINKS.stellarOriginsChatGpt.voice);
  };

  const handleMoreToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.aiWebTools.url, TOOL_LINKS.aiWebTools.voice);
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
                <Link to="/mission-control" className="text-gray-400 hover:text-space-blue transition-colors">
                  {INSITE_MISSION_LABEL}
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleStellarisClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  {TOOL_LINKS.stellarisChatGpt.label}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleStellarOriginsClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  {TOOL_LINKS.stellarOriginsChatGpt.label}
                </button>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-space-blue transition-colors">
                  Features
                </a>
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
                  {TOOL_LINKS.openAiPrivacy.label}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleTermsClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  {TOOL_LINKS.aiWebToolsDisclaimers.label}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleMoreToolsClick}
                  className="text-gray-400 hover:text-space-blue transition-colors text-left"
                >
                  {TOOL_LINKS.aiWebTools.label}
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
            {TOOL_LINKS.aiWebTools.label}
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

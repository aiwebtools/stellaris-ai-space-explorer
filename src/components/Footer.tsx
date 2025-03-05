
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
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
                <a 
                  href="https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer" 
                  className="text-gray-400 hover:text-space-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Begin Simulation to Space
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-space-blue transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-space-blue transition-colors">
                  FAQ
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
                <a 
                  href="https://openai.com/policies/privacy-policy/" 
                  className="text-gray-400 hover:text-space-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.ai/terms-of-services" 
                  className="text-gray-400 hover:text-space-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://www.aiwebtools.ai" 
                  className="text-gray-400 hover:text-space-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More AI Tools
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="tel:+14758008096" 
                  className="text-gray-400 hover:text-space-blue transition-colors"
                >
                  (475) 800-8096
                </a>
              </li>
              <li>
                <a 
                  href="mailto:Contact@ai-webtools.com" 
                  className="text-gray-400 hover:text-space-blue transition-colors"
                >
                  Contact@ai-webtools.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* More AI Tools Button */}
        <div className="mt-12 flex justify-end">
          <a 
            href="https://www.aiwebtools.ai" 
            className="rounded-full bg-gradient-to-r from-space-blue to-space-purple px-6 py-3 text-white font-medium transform hover:scale-105 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            More AI Tools
          </a>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <a
            href="https://www.aiwebtools.ai"
            className="text-gray-400 hover:text-space-blue transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2025 AI WEB TOOLS LLC All rights reserved.
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-space-black/80 backdrop-blur-lg shadow-lg' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer" 
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin Simulation to Space
          </a>
          <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          <a href="#disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a>
          <a 
            href="https://www.aiwebtools.ai" 
            className="text-gray-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            More AI Tools
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel mt-3 mx-6 p-4 animate-fade-in-up">
          <nav className="flex flex-col space-y-4">
            <a 
              href="https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer" 
              className="button-primary text-center"
              onClick={() => setIsMobileMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Begin Simulation to Space
            </a>
            <a 
              href="#faq" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#disclaimer" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Disclaimer
            </a>
            <a 
              href="https://www.aiwebtools.ai" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              More AI Tools
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

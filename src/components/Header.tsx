import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { createTimePortalEffect } from '../utils/timeEffects';

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

  const handleStellarisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer');
  };

  const handleStarsTruthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://chatgpt.com/g/g-6873e0ecbc288191866fb00858cc5165-find-your-way-home-to-the-stars', 'MASTER! I AM ACCESSING THE STARS TRUTH NOW!');
  };

  const handleMoreToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://www.aiwebtools.ai', 'MASTER! I AM ACCESSING AIWEBTOOLS.AI NOW!');
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-space-black/80 backdrop-blur-lg shadow-lg' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={handleStellarisClick}
            className="button-primary"
          >
            Begin Simulation to Space
          </button>
          <button 
            onClick={handleStarsTruthClick}
            className="button-secondary"
          >
            Find Your Way Home to the Stars Truth
          </button>
          <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          <a href="#disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a>
          <button 
            onClick={handleMoreToolsClick}
            className="text-gray-300 hover:text-white transition-colors"
          >
            More AI Tools
          </button>
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
            <button 
              onClick={(e) => {
                handleStellarisClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="button-primary text-center"
            >
              Begin Simulation to Space
            </button>
            <button 
              onClick={(e) => {
                handleStarsTruthClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="button-secondary text-center"
            >
              Find Your Way Home to the Stars Truth
            </button>
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
            <button 
              onClick={(e) => {
                handleMoreToolsClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-300 hover:text-white transition-colors py-2 text-left"
            >
              More AI Tools
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

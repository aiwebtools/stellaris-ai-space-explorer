import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { createTimePortalEffect } from '../utils/timeEffects';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleStellarisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    createTimePortalEffect('https://chatgpt.com/g/g-Z9NfCiq7e-stellaris-ai-space-explorer');
  };

  const handleStellarOriginsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    createTimePortalEffect('https://chatgpt.com/g/g-6876d3b63b108191948709afa101d5af-stellar-origins-gpt', 'MASTER! I AM ACCESSING STELLAR ORIGINS GPT NOW!');
  };

  const handleMoreToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    createTimePortalEffect('https://aiwebtools.lovable.app/?via=aiwebtools', 'MASTER! I AM ACCESSING AIWEBTOOLS.AI NOW!');
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 sm:py-3 bg-space-black/80 backdrop-blur-lg shadow-lg' : 'py-3 sm:py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <button 
            onClick={handleStellarisClick}
            className="button-primary text-sm lg:text-base whitespace-nowrap"
          >
            Begin Simulation to Space
          </button>
          <button 
            onClick={handleStellarOriginsClick}
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base whitespace-nowrap"
          >
            Stellar Origins GPT
          </button>
          <a href="#disclaimer" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Disclaimer</a>
          <button 
            onClick={handleMoreToolsClick}
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base whitespace-nowrap"
          >
            More AI Tools
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none p-2 -mr-2 active:scale-95 transition-transform"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-space-black/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-end p-4">
          <button 
            onClick={closeMobileMenu}
            className="text-white p-2 active:scale-95 transition-transform"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-2 px-6 pt-4">
          <button 
            onClick={handleStellarisClick}
            className="button-primary text-center py-3 text-base"
          >
            Begin Simulation to Space
          </button>
          <button 
            onClick={handleStellarOriginsClick}
            className="text-gray-300 hover:text-white active:text-white transition-colors py-3 text-left text-base border-b border-white/10"
          >
            Stellar Origins GPT
          </button>
          <a 
            href="#disclaimer" 
            className="text-gray-300 hover:text-white active:text-white transition-colors py-3 border-b border-white/10 text-base"
            onClick={closeMobileMenu}
          >
            Disclaimer
          </a>
          <button 
            onClick={handleMoreToolsClick}
            className="text-gray-300 hover:text-white active:text-white transition-colors py-3 text-left text-base border-b border-white/10"
          >
            More AI Tools
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

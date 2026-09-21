
import React from 'react';
import { Home } from 'lucide-react';
import { createTimePortalEffect } from '../utils/timeEffects';

type FloatingToolsButtonProps = {
  compact?: boolean;
};

const FloatingToolsButton: React.FC<FloatingToolsButtonProps> = ({ compact = false }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://aiwebtools.lovable.app/?via=aiwebtools', 'MASTER! I AM ACCESSING AIWEBTOOLS.AI NOW!');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed z-50 group ${compact ? 'bottom-3 left-3 sm:bottom-5 sm:left-5' : 'bottom-6 left-6'}`}
      aria-label="Access AI Web Tools Mainframe"
    >
      <div className="relative">
        {/* Main circular button */}
        <div className={`${compact ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-16 h-16'} bg-gradient-to-r from-space-blue to-space-purple rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-110`}>
          <Home className={`${compact ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 ${compact ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-16 h-16'} bg-gradient-to-r from-space-blue to-space-purple rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300`}></div>
        
        {/* Text label that appears on hover */}
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
          ACCESS AI WEB TOOLS MAINFRAME
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/80 rotate-45"></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingToolsButton;

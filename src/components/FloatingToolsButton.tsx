
import React from 'react';
import { Home } from 'lucide-react';
import { createTimePortalEffect } from '../utils/timeEffects';

const FloatingToolsButton: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect('https://www.aiwebtools.ai', 'MASTER! I AM ACCESSING AIWEBTOOLS.AI NOW!');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Access AI Web Tools Mainframe"
    >
      <div className="relative">
        {/* Main circular button */}
        <div className="w-16 h-16 bg-gradient-to-r from-space-blue to-space-purple rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-110">
          <Home className="w-6 h-6 text-white" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-space-blue to-space-purple rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
        
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

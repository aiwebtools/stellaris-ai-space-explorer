
import React from 'react';
import { Rocket } from 'lucide-react';
import { TOOL_LINKS } from '@/lib/toolLinks';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const handleAiWebToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TOOL_LINKS.aiWebTools.url, TOOL_LINKS.aiWebTools.voice);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-space-blue to-space-purple rounded-full blur opacity-70 animate-pulse-glow"></div>
        <div className="relative bg-space-black p-2 rounded-full">
          <Rocket className="h-6 w-6 text-space-blue" />
        </div>
      </div>
      <div className="ml-2">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Stellaris
          <span className="text-space-blue"> 🚀</span>
        </h1>
        <p className="text-[10px] text-gray-400 font-medium">
          Presented by <button onClick={handleAiWebToolsClick} className="text-space-purple hover:text-space-pink transition-colors">AiWebTools.Ai</button>
        </p>
      </div>
    </div>
  );
};

export default Logo;

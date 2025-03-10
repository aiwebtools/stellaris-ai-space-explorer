
import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const PopupDisclaimer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem('disclaimer-agreed');
    
    // Only show the disclaimer if they haven't agreed before
    if (!hasAgreed) {
      // Short delay before showing for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('disclaimer-agreed', 'true');
    setIsVisible(false);
    toast({
      title: "Welcome to Stellaris",
      description: "Thank you for accepting our terms. Explore the cosmos!",
      duration: 5000,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in-up">
      <div 
        className="relative max-w-md w-full mx-4 glass-panel border-space-purple/30 shadow-lg shadow-space-purple/20"
        style={{
          background: 'linear-gradient(135deg, rgba(13,17,40,0.85) 0%, rgba(18,18,36,0.95) 100%)',
        }}
      >
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="p-6 md:p-8">
          <h2 className="font-bold text-2xl md:text-3xl mb-4 font-mono text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
            Before You Explore
          </h2>
          
          <div className="space-y-4 text-gray-300 text-sm md:text-base font-light">
            <p>
              Welcome to <span className="text-space-cyan font-medium">Stellaris: AI Space Exploration Simulator</span>. 
              By proceeding, you acknowledge that:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>This is a simulation tool for educational and entertainment purposes only.</li>
              <li>Information provided should not be used for actual space missions without expert verification.</li>
              <li>We do not guarantee the accuracy of any generated content.</li>
              <li>Your interactions may be used to improve our AI systems.</li>
            </ul>
            
            <p className="italic text-xs text-gray-400 mt-2">
              For the complete terms, please see our full legal disclaimer section.
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAgree}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={cn(
                "group relative overflow-hidden px-6 py-3 rounded-full font-medium transition-all duration-300",
                "bg-gradient-to-r from-space-blue via-space-purple to-space-pink",
                "hover:shadow-[0_0_20px_rgba(144,97,249,0.5)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-space-purple"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-space-purple to-space-pink opacity-0 transition-opacity duration-300",
                isHovering && "opacity-100"
              )} />
              <div className="flex items-center relative z-10">
                <span className="mr-2 text-white font-mono tracking-wide">I AGREE</span>
                <CheckCircle className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isHovering ? "scale-110" : "scale-100"
                )} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDisclaimer;

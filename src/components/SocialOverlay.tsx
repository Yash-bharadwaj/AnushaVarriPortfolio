
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const SocialOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a delay before showing the social overlay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "fixed left-6 bottom-0 z-40 flex flex-col items-center space-y-4 transition-all duration-500 transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
    )}>
      <div className="flex flex-col items-center space-y-4 p-3 bg-gray-900/30 backdrop-blur-sm rounded-t-lg border border-white/10">
        <a 
          href="https://www.instagram.com/mc_anushavarri/" 
          className="text-white/60 hover:text-anushagold transition-colors p-2"
          aria-label="Instagram"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Instagram className="w-5 h-5" />
        </a>
        
        <a 
          href="https://www.youtube.com/@MCANUSHAVARRI" 
          className="text-white/60 hover:text-anushagold transition-colors p-2"
          aria-label="YouTube"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Youtube className="w-5 h-5" />
        </a>
        
        <a 
          href="https://www.linkedin.com/in/emceeanushavarri/" 
          className="text-white/60 hover:text-anushagold transition-colors p-2"
          aria-label="LinkedIn"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
      <div className="h-20 w-px bg-gradient-to-b from-white/20 to-transparent"></div>
    </div>
  );
};

export default SocialOverlay;

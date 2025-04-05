
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import clientsData from '@/data/clients.json';
import { useTheme } from '@/contexts/ThemeContext';

const ClientLogoCarousel = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    
    // Clone the first few items and append them to the end for seamless looping
    const scrollContent = scrollContainer.querySelector('.scroll-content') as HTMLElement;
    const scrollWidth = scrollContent.scrollWidth;
    
    // Automatic scrolling animation
    const scroll = () => {
      if (!scrollContainer) return;
      
      if (scrollContainer.scrollLeft >= scrollWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };
    
    const scrollInterval = setInterval(scroll, 30);
    
    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="flex items-center overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="scroll-content flex space-x-12 px-6 py-2 animate-scroll">
          {/* First set of logos */}
          {clientsData.map((client) => (
            <div 
              key={client.id} 
              className={cn(
                "flex-shrink-0 flex items-center justify-center h-16 px-4",
                theme === 'dark' ? "bg-gray-800/30" : "bg-white/10",
                "backdrop-blur-sm rounded-md border",
                theme === 'dark' ? "border-gray-700/50" : "border-white/20"
              )}
            >
              {client.logoPath ? (
                <img 
                  src={client.logoPath} 
                  alt={client.name} 
                  className="max-h-10 max-w-[120px] object-contain opacity-80" 
                />
              ) : (
                <span className={cn(
                  "font-semibold whitespace-nowrap",
                  theme === 'dark' ? "text-white/80" : "text-white/90"
                )}>
                  {client.name}
                </span>
              )}
            </div>
          ))}
          
          {/* Duplicate the first few logos for seamless looping */}
          {clientsData.slice(0, 5).map((client) => (
            <div 
              key={`dup-${client.id}`} 
              className={cn(
                "flex-shrink-0 flex items-center justify-center h-16 px-4",
                theme === 'dark' ? "bg-gray-800/30" : "bg-white/10",
                "backdrop-blur-sm rounded-md border",
                theme === 'dark' ? "border-gray-700/50" : "border-white/20"
              )}
            >
              {client.logoPath ? (
                <img 
                  src={client.logoPath} 
                  alt={client.name} 
                  className="max-h-10 max-w-[120px] object-contain opacity-80" 
                />
              ) : (
                <span className={cn(
                  "font-semibold whitespace-nowrap",
                  theme === 'dark' ? "text-white/80" : "text-white/90"
                )}>
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS for infinite scroll animation using regular style tag */}
      <style>
        {`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default ClientLogoCarousel;

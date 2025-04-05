
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // State for typing animation
  const fullText = "Transforming Events into Unforgettable Memories. With over 100+ live events hosted, from glamorous weddings to high-profile corporate shows, I bring unmatched energy, charisma, and professionalism to every stage.";
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    // Mark as loaded after a timeout for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Typing animation effect
  useEffect(() => {
    if (!isLoaded) return;
    
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [isLoaded, fullText]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-anushablue"
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className={cn(
          "space-y-6 opacity-0 transition-all duration-700",
          isLoaded && "opacity-100"
        )}>
          <div className="text-center">
            <h2 className={cn(
              "text-2xl md:text-3xl font-light text-white/90 mb-4 font-montserrat",
              isLoaded && "animate-fade-in"
            )}>
              Hi, I am
            </h2>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold tracking-tight text-white mb-6">
              <span className="block overflow-hidden my-2">
                <span className={cn(
                  "block",
                  isLoaded && "animate-text-reveal [animation-delay:0.2s]"
                )}>
                  <span className="text-anushagold">Anusha Varri</span>
                </span>
              </span>
            </h1>
            
            <div className="h-20 mt-4">
              <h3 className="text-xl md:text-3xl font-bold text-white/90 font-montserrat tracking-wide">
                Master of Ceremonies | Singer | Anchor | Live Host | Performer
              </h3>
            </div>

            <div className={cn(
              "max-w-2xl mx-auto text-white/90 text-lg md:text-xl mt-8 font-montserrat",
              isLoaded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-700 delay-300"
            )}>
              <p className="relative">
                {typedText}
                {!typingComplete && (
                  <span className="ml-1 inline-block w-2 h-5 bg-white/90 animate-pulse"></span>
                )}
              </p>
            </div>
            
            <div className={cn(
              "mt-8 opacity-0 transform translate-y-4 transition-all duration-700",
              isLoaded && "opacity-100 translate-y-0",
              typingComplete ? "delay-300" : "delay-500"
            )}>
              <a
                href="#contact"
                className="font-medium rounded-md px-8 py-3 bg-anushagold hover:bg-yellow-500 transition-all duration-300 shadow-lg inline-flex items-center space-x-2 text-lg text-white font-montserrat"
              >
                Book Now
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={cn(
        "absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-1000 delay-1000",
        isLoaded && "opacity-70"
      )}>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

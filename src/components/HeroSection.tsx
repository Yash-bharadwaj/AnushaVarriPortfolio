import React, { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import SparkleAnimation from './SparkleAnimation';
import { useTheme } from '@/contexts/ThemeContext';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const roles = ["Master of Ceremonies", "Singer", "Anchor", "Live Host", "Performer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState(roles[0]);
  const { theme } = useTheme();
  
  // State for typing animation
  const fullText = "Hosted 100+ live events, corporate shows, and weddings. With a dynamic presence and versatile talent, I create unforgettable experiences for audiences across all occasions.";
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    // Mark as loaded after a timeout for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Role rotation
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % roles.length;
        setDisplayedRole(roles[nextIndex]);
        return nextIndex;
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(roleInterval);
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
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        theme === 'light' && "bg-gradient-to-br from-pink-300/90 to-purple-400/90"
      )}
    >
      {/* Sparkling animation overlay */}
      <SparkleAnimation theme={theme} />
      
      {/* Gradient background */}
      <div className={cn(
        "absolute inset-0 z-0",
        theme === 'dark' 
          ? "bg-gradient-to-b from-anushablue via-anushablue/95 to-anushablue/90" 
          : "bg-gradient-to-b from-pink-300/90 via-purple-400/80 to-purple-500/70"
      )}></div>
      
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 z-0"></div>
      
      {/* Left side microphone icon - keeping just two mic icons for a cleaner look */}
      <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 z-10 opacity-40">
        <Mic 
          size={60} 
          className={cn(
            "animate-float",
            theme === 'dark' ? "text-anushagold" : "text-pink-400"
          )} 
          strokeWidth={1.5}
        />
      </div>
      
      {/* Right side microphone icon */}
      <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 z-10 opacity-40">
        <Mic 
          size={60} 
          className={cn(
            "animate-float",
            theme === 'dark' ? "text-anushagold" : "text-pink-400"
          )} 
          strokeWidth={1.5}
          style={{ animationDelay: '1s' }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <div className={cn(
          "space-y-6 opacity-0 transition-all duration-700",
          isLoaded && "opacity-100"
        )}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold tracking-tight">
            <span className="block overflow-hidden my-2">
              <span className={cn(
                "block",
                isLoaded && "animate-text-reveal [animation-delay:0.2s]"
              )}>
                I'm <span className={cn(
                  "text-transparent bg-clip-text",
                  theme === 'dark' 
                    ? "bg-gradient-to-r from-anushagold to-yellow-400" 
                    : "bg-gradient-to-r from-pink-500 to-purple-500"
                )}>Anusha Varri</span>
              </span>
            </span>
          </h1>
          
          <div className="h-20 flex items-center justify-center">
            <h2 className="text-xl md:text-3xl font-light text-white/90 overflow-hidden">
              <span className="block text-center">
                <span className={cn(
                  "inline-block min-w-[200px] md:min-w-[300px] text-transparent bg-clip-text animate-fade-in",
                  theme === 'dark' 
                    ? "bg-gradient-to-r from-anushagold/90 to-yellow-500/80" 
                    : "bg-gradient-to-r from-pink-400/90 to-purple-500/80"
                )}>
                  {displayedRole}
                </span>
              </span>
            </h2>
          </div>

          <div className={cn(
            "max-w-2xl mx-auto text-white/90 text-lg md:text-xl",
            isLoaded ? "opacity-100" : "opacity-0",
            "transition-opacity duration-700 delay-300"
          )}>
            {/* Typing animation text with blinking cursor */}
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
              className={cn(
                "font-medium rounded-md px-8 py-3 transition-all duration-300 shadow-lg inline-flex items-center space-x-2 text-lg text-white",
                theme === 'dark'
                  ? "bg-gradient-to-r from-anushagold to-yellow-500 hover:from-yellow-500 hover:to-anushagold shadow-anushagold/20"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 shadow-pink-500/20"
              )}
            >
              <Mic size={18} className="mr-2" />
              Book Me for Your Event
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={cn(
        "absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-1000 delay-1000",
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

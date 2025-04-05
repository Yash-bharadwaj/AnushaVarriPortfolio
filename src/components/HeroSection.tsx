import React, { useEffect, useState } from 'react';
import { Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SparkleAnimation from './SparkleAnimation';
import { useTheme } from '@/contexts/ThemeContext';
import ClientLogoCarousel from './ClientLogoCarousel';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const roles = ["Master of Ceremonies", "Singer", "Anchor", "Live Host", "Performer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState(roles[0]);
  const { theme } = useTheme();
  
  // Background image carousel
  const backgroundImages = [
    "/lovable-uploads/72947be2-156b-4258-bb58-099d8c7cb22f.png",
    "/images/ram-miriyala-event.jpg",
    "/images/cinematica-2-expo.jpg",
    "/images/jam-junxion-musical-night.png"
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // State for typing animation
  const fullText = "Transforming Events into Unforgettable Memories. With over 100+ live events hosted, from glamorous weddings to high-profile corporate shows, I bring unmatched energy, charisma, and professionalism to every stage.";
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
    
    // Background image rotation
    const bgInterval = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(roleInterval);
      clearInterval(bgInterval);
    };
  }, [backgroundImages.length]);
  
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
    <div className="relative">
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background carousel */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1500",
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        
        {/* Sparkling animation overlay */}
        <div className="absolute inset-0 z-10 opacity-40">
          <SparkleAnimation theme={theme} />
        </div>
        
        {/* Single microphone icon - keeping just one mic for cleaner look */}
        <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 z-20 opacity-40">
          <Mic 
            size={60} 
            className={cn(
              "animate-float",
              theme === 'dark' ? "text-anushagold" : "text-pink-400"
            )} 
            strokeWidth={1.5}
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 z-20 text-center relative">
          <div className={cn(
            "space-y-6 opacity-0 transition-all duration-700",
            isLoaded && "opacity-100"
          )}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold tracking-tight text-white">
              <span className="block overflow-hidden my-2">
                <span className={cn(
                  "block",
                  isLoaded && "animate-text-reveal [animation-delay:0.2s]"
                )}>
                  I'm <span className="text-anushagold">Anusha Varri</span>
                </span>
              </span>
            </h1>
            
            <div className="h-20 flex items-center justify-center">
              <h2 className="text-xl md:text-3xl font-light text-white/90 overflow-hidden">
                <span className="block text-center">
                  <span className="inline-block min-w-[200px] md:min-w-[300px] text-anushagold animate-fade-in">
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
                className="font-medium rounded-md px-8 py-3 bg-anushagold hover:bg-yellow-500 transition-all duration-300 shadow-lg inline-flex items-center space-x-2 text-lg text-white"
              >
                Book Now
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className={cn(
          "absolute bottom-28 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-1000 delay-1000",
          isLoaded && "opacity-70"
        )}>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Client Logo Carousel below the hero section */}
      <div className="bg-black/90 py-6">
        <ClientLogoCarousel />
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const highlights = [
    "Fluent in Hindi, English, Telugu (and basic Tamil & Kannada)",
    "Left a 10-year government bank job (Canara Bank) to follow her passion",
    "Hosted 100+ live events, corporate shows, and weddings",
    "Professional MC with versatile entertainment skills"
];


  return (
    <section
      id="about"
      ref={sectionRef}
      className={cn(
        "py-20 relative overflow-hidden",
        theme === 'dark' ? "bg-anushablue" : "bg-gradient-to-b from-pink-200 to-purple-200"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/20 to-transparent"></div>
      
      {/* Decorative microphone elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <Mic 
          size={48} 
          className={theme === 'dark' ? "text-anushagold" : "text-pink-500"} 
          style={{ transform: 'rotate(-15deg)' }}
        />
      </div>
      <div className="absolute bottom-20 left-10 opacity-15">
        <Mic 
          size={36} 
          className={theme === 'dark' ? "text-anushagold" : "text-purple-500"} 
          style={{ transform: 'rotate(10deg)' }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Image */}
          <div className={cn(
            "w-full lg:w-1/2 opacity-0 transition-all duration-1000 transform translate-y-10",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <div className="relative">
              {/* Image placeholder - will be replaced by actual image */}
              <div className={cn(
                "aspect-[4/5] rounded-lg overflow-hidden relative",
                theme === 'dark'
                  ? "bg-gradient-to-br from-anushablue to-gray-900"
                  : "bg-gradient-to-br from-pink-300 to-purple-400"
              )}>
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xl">
                  <img src="/images/Anusha Portrait (800x1000px).png" alt="" />
                </div>
                {/* Mic icon overlay on the image */}
                <div className="absolute bottom-5 right-5 opacity-30">
                  <Mic 
                    size={40} 
                    className={theme === 'dark' ? "text-anushagold" : "text-white"} 
                  />
                </div>
              </div>
              
              <div className={cn(
                "absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-30 blur-2xl",
                theme === 'dark' ? "bg-anushagold" : "bg-pink-500"
              )}></div>
              <div className={cn(
                "absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-20 blur-xl",
                theme === 'dark' ? "bg-anushagold" : "bg-purple-500"
              )}></div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="w-full lg:w-1/2">
            <h2 className={cn(
              "section-heading opacity-0 transition-all duration-700 delay-100",
              isVisible && "opacity-100",
              theme === 'light' && "text-gray-800 after:bg-pink-400"
            )}>
              Meet <span className={theme === 'dark' ? "text-anushagold" : "text-pink-500"}>Anusha</span>
            </h2>
            
            <p className={cn(
              "text-lg opacity-0 transition-all duration-700 delay-200 mb-6",
              isVisible && "opacity-100",
              theme === 'dark' ? "text-white/80" : "text-gray-700"
            )}>
              A multi-talented performer who brings charisma, energy and professionalism to every stage. 
              From hosting corporate events to singing at cultural gatherings, I create 
              memorable experiences that captivate audiences.
            </p>
            
            <div className="space-y-4 mt-8">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-start gap-3 opacity-0 transition-all duration-700",
                    isVisible && "opacity-100",
                    isVisible && `[animation-delay:${0.3 + index * 0.1}s]`
                  )}
                  style={{ 
                    transitionDelay: isVisible ? `${0.3 + index * 0.1}s` : '0s'
                  }}
                >
                  <CheckCircle className={theme === 'dark' ? "text-anushagold mt-1 flex-shrink-0" : "text-pink-500 mt-1 flex-shrink-0"} />
                  <p className={theme === 'dark' ? "text-white/80" : "text-gray-700"}>{highlight}</p>
                </div>
              ))}
            </div>
            
            <div 
              className={cn(
                "mt-10 opacity-0 transition-all duration-700",
                isVisible && "opacity-100"
              )}
              style={{ 
                transitionDelay: isVisible ? '0.6s' : '0s' 
              }}
            >
              <a 
                href="#work" 
                className={cn(
                  "flex items-center",
                  theme === 'dark' 
                    ? "btn-primary" 
                    : "bg-pink-500 text-white font-medium rounded-md px-6 py-3 hover:bg-pink-400 transition-colors duration-300 shadow-md"
                )}
              >
                <Mic size={18} className="mr-2" />
                See My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

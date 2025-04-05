
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Target, Heart, Award } from 'lucide-react';

const VisionMissionSection = () => {
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

  return (
    <section 
      id="vision-mission" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-anushablue/90 to-anushablue/100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "section-heading text-center mx-auto",
            "opacity-0 transform translate-y-6 transition-all duration-1000",
            isVisible && "opacity-100 transform-none"
          )}>
            My <span className="text-anushagold">Vision</span> & <span className="text-anushagold">Mission</span>
          </h2>
          <p className={cn(
            "max-w-3xl mx-auto text-white/70",
            "opacity-0 transform translate-y-6 transition-all duration-1000 delay-300",
            isVisible && "opacity-100 transform-none"
          )}>
            From banker to anchor - transforming events with passion and purpose
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className={cn(
            "bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 flex flex-col items-center text-center",
            "opacity-0 transform translate-y-6 transition-all duration-700",
            isVisible && "opacity-100 transform-none"
          )}
          style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
            <div className="w-16 h-16 rounded-full bg-anushagold/20 flex items-center justify-center mb-6">
              <Target className="text-anushagold w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Vision</h3>
            <p className="text-white/70">
              To transform ordinary events into extraordinary experiences, leaving lasting impressions and creating moments that people will cherish forever.
            </p>
          </div>
          
          <div className={cn(
            "bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 flex flex-col items-center text-center",
            "opacity-0 transform translate-y-6 transition-all duration-700",
            isVisible && "opacity-100 transform-none"
          )}
          style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}>
            <div className="w-16 h-16 rounded-full bg-anushagold/20 flex items-center justify-center mb-6">
              <Heart className="text-anushagold w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Mission</h3>
            <p className="text-white/70">
              To bring energy, professionalism, and a personal touch to every event, ensuring seamless execution and creating an atmosphere where meaningful connections flourish.
            </p>
          </div>
          
          <div className={cn(
            "bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 flex flex-col items-center text-center",
            "opacity-0 transform translate-y-6 transition-all duration-700",
            isVisible && "opacity-100 transform-none"
          )}
          style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}>
            <div className="w-16 h-16 rounded-full bg-anushagold/20 flex items-center justify-center mb-6">
              <Award className="text-anushagold w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Values</h3>
            <p className="text-white/70">
              Passion, Excellence, Authenticity, and Adaptability. I left a 10-year banking career to pursue my passion for creating memorable experiences through hosting and performing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;

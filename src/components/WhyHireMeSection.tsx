
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { CheckCircle, ArrowRight, Star, ThumbsUp, Users, Clock } from 'lucide-react';

const WhyHireMeSection = () => {
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

  const benefits = [
    {
      icon: <Star className="w-8 h-8 text-anushagold" />,
      title: "Professional Excellence",
      description: "With over 100+ events experience and a background in corporate banking, I bring both creative energy and professional discipline to every event."
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-anushagold" />,
      title: "Versatile Skills",
      description: "Fluent in multiple languages (Hindi, English, Telugu) with abilities to host, anchor, and perform - creating a complete entertainment package."
    },
    {
      icon: <Users className="w-8 h-8 text-anushagold" />,
      title: "Audience Connection",
      description: "Exceptional ability to read and engage with audiences, ensuring your guests feel involved and entertained throughout."
    },
    {
      icon: <Clock className="w-8 h-8 text-anushagold" />,
      title: "Commitment & Reliability",
      description: "Meticulous preparation and punctuality, with a track record of delivering seamless experiences even under pressure."
    },
  ];

  return (
    <section 
      id="why-hire-me" 
      ref={sectionRef}
      className="py-20 bg-anushablue"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={cn(
            "section-heading text-center mx-auto",
            "opacity-0 transform translate-y-6 transition-all duration-1000",
            isVisible && "opacity-100 transform-none"
          )}>
            Why <span className="text-anushagold">Hire Me</span>
          </h2>
          
          <p className={cn(
            "text-center text-lg text-white/80 max-w-3xl mx-auto mb-12",
            "opacity-0 transform translate-y-6 transition-all duration-1000 delay-300",
            isVisible && "opacity-100 transform-none"
          )}>
            From banker to anchor, I've dedicated my career to creating memorable events
            that leave lasting impressions on audiences and clients alike.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={cn(
                  "flex p-6 rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm",
                  "opacity-0 transform translate-y-6 transition-all duration-700",
                  isVisible && "opacity-100 transform-none"
                )}
                style={{ transitionDelay: isVisible ? `${200 * index}ms` : '0ms' }}
              >
                <div className="flex-shrink-0 mr-6">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={cn(
            "text-center mt-14",
            "opacity-0 transform translate-y-6 transition-all duration-1000 delay-700",
            isVisible && "opacity-100 transform-none"
          )}>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 rounded-md bg-anushagold text-white font-semibold hover:bg-yellow-500 transition-colors group"
            >
              Book a Consultation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireMeSection;

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import clientsData from '@/data/clients.json';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  company?: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clientsApiRef = useRef<any>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Event Director",
      company: "Bayer",
      quote: "Anusha brought incredible energy to our corporate event. Her professionalism and ability to engage the audience made our family day truly memorable."
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Producer",
      company: "Cinematica Expo",
      quote: "Working with Anusha was a delight. Her interviewing skills and stage presence elevated our cinema expo to a whole new level."
    },
    {
      id: 3,
      name: "Vikram Reddy",
      role: "Event Manager",
      company: "Jam Junxion",
      quote: "The audience absolutely loved Anusha's hosting at our musical night. Her charisma and energy created the perfect atmosphere for our event."
    }
  ];
  
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
  
  useEffect(() => {
    // Auto-advance testimonials
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);
  
  // Auto scroll for clients carousel
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    
    if (isVisible && clientsApiRef.current) {
      scrollInterval = setInterval(() => {
        if (clientsApiRef.current && clientsApiRef.current.canScrollNext()) {
          clientsApiRef.current.scrollNext();
        } else if (clientsApiRef.current) {
          // Reset to beginning when reaching the end
          clientsApiRef.current.scrollTo(0);
        }
      }, 3000);
    }
    
    return () => {
      clearInterval(scrollInterval);
    };
  }, [isVisible]);
  
  const setClientsApi = (api: any) => {
    clientsApiRef.current = api;
  };
  
  const prevTestimonial = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  const nextTestimonial = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-anushablue relative"
    >
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "section-heading text-center mx-auto opacity-0 transition-all duration-700",
          isVisible && "opacity-100"
        )}>
          What People <span className="text-anushagold">Say</span>
        </h2>
        
        <div className={cn(
          "mt-16 relative opacity-0 transition-all duration-700 delay-200",
          isVisible && "opacity-100"
        )}>
          {/* Large quote icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-anushagold/20">
            <Quote size={80} />
          </div>
          
          {/* Testimonial cards carousel */}
          <div className="relative overflow-hidden p-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 p-4"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative">
                    <blockquote className="text-white/90 text-lg md:text-xl text-center italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="text-center">
                      <h4 className="text-anushagold font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-white/70">
                        {testimonial.role}
                        {testimonial.company && `, ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-2 md:left-8 -translate-y-1/2 bg-anushablue/80 hover:bg-anushagold text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-2 md:right-8 -translate-y-1/2 bg-anushablue/80 hover:bg-anushagold text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-anushagold w-6" : "bg-white/30"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Clients section - now with carousel */}
        <div className={cn(
          "mt-20 opacity-0 transition-all duration-700 delay-300",
          isVisible && "opacity-100"
        )}>
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            Trusted by <span className="text-anushagold">Great Companies</span>
          </h3>
          
          <Carousel
            className="w-full"
            setApi={setClientsApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {clientsData.map((client) => (
                <CarouselItem 
                  key={client.id} 
                  className="md:basis-1/4 lg:basis-1/5 p-2"
                >
                  <div className="py-4 px-6 bg-gray-800/40 backdrop-blur-sm rounded border border-white/10 transition-all duration-300 hover:border-anushagold/30 h-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      {client.logoPath && client.logoPath !== "/placeholder.svg" ? (
                        <img 
                          src={client.logoPath} 
                          alt={`${client.name} logo`} 
                          className="h-10 w-auto mb-2 opacity-70"
                        />
                      ) : (
                        <span className="text-white/70 font-semibold text-center">{client.name}</span>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Youtube, Instagram, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import worksData from '@/data/works.json';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  links?: {
    youtube?: string;
    instagram?: string;
    other?: string;
  };
}

const FeaturedWorkSection = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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

  // Use the imported data and limit to 6 items for the featured section
  const featuredWork: WorkItem[] = worksData.slice(0, 6).map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.images && item.images.length > 0 ? item.images[0] : undefined,
    links: item.links
  }));

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-anushablue via-anushablue/95 to-anushablue relative"
    >
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "section-heading text-center mx-auto opacity-0 transition-all duration-700",
          isVisible && "opacity-100"
        )}>
          Featured <span className="text-anushagold">Work & Events</span>
        </h2>
        
        <p className={cn(
          "text-center text-white/70 max-w-3xl mx-auto mb-12 opacity-0 transition-all duration-700 delay-200",
          isVisible && "opacity-100"
        )}>
          From corporate events to cultural celebrations, I bring life and energy to every stage. 
          Here's a glimpse of some notable events I've been part of.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredWork.map((work, index) => (
            <Link
              to={`/work/${work.id}`}
              key={work.id}
              className="block h-full"
              onMouseEnter={() => setActiveItem(work.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <Card 
                className={cn(
                  "border border-white/10 bg-gray-900/50 backdrop-blur-sm overflow-hidden card-hover h-full opacity-0 transform translate-y-8 transition-all duration-700",
                  isVisible && "opacity-100 translate-y-0",
                )}
                style={{ 
                  transitionDelay: isVisible ? `${0.1 * index}s` : '0s' 
                }}
              >
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  {work.image ? (
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      No Image Available
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className={cn(
                    "absolute inset-0 bg-anushagold/80 opacity-0 transition-opacity duration-300 flex items-center justify-center",
                    activeItem === work.id && "opacity-100"
                  )}>
                    <div className="flex gap-4">
                      {work.links?.youtube && (
                        <a 
                          href={work.links.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-anushablue transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Youtube size={32} />
                        </a>
                      )}
                      {work.links?.instagram && (
                        <a 
                          href={work.links.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-anushablue transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram size={32} />
                        </a>
                      )}
                      {work.links?.other && (
                        <a 
                          href={work.links.other} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-anushablue transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={32} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                  <p className="text-white/70 text-sm">{work.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link to="/all-events">
            <Button 
              variant="outline" 
              className="border-anushagold text-anushagold hover:bg-anushagold hover:text-white group"
            >
              View All Events
              <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;

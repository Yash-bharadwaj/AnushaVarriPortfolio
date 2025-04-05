
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import galleryData from '@/data/gallery.json';

const GallerySection = () => {
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

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-anushablue/90 to-anushablue/100"
    >
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "section-heading text-center mx-auto opacity-0 transition-all duration-700",
          isVisible && "opacity-100"
        )}>
          Photo & Video <span className="text-anushagold">Gallery</span>
        </h2>
        
        <p className={cn(
          "text-center text-white/70 max-w-3xl mx-auto mb-12 opacity-0 transition-all duration-700 delay-200",
          isVisible && "opacity-100"
        )}>
          A visual journey through my performances, events, and behind-the-scenes moments.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {galleryData.slice(0, 8).map((item, index) => (
            <div 
              key={item.id}
              className={cn(
                "rounded-lg overflow-hidden bg-gray-800/40 backdrop-blur-sm relative group",
                item.size === 'tall' ? 'row-span-2' : '',
                "opacity-0 transform translate-y-8 transition-all duration-700",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{ 
                transitionDelay: isVisible ? `${0.05 * index}s` : '0s',
                height: item.size === 'tall' ? '400px' : '200px'
              }}
            >
              {/* Dynamic image content */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30 flex items-center justify-center overflow-hidden">
                {item.type === 'image' ? (
                  <img 
                    src={item.imagePath} 
                    alt={`Gallery image ${item.id} ${item.size === 'tall' ? '(400x600px) - tall image' : '(400x300px)'}`} 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <img 
                    src={item.imagePath}
                    alt={`Video thumbnail ${item.id} ${item.size === 'tall' ? '(400x600px) - tall thumbnail' : '(400x300px)'}`} 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              
              {/* Overlay for videos */}
              {item.type === 'video' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-105 z-10">
                      <div className="w-12 h-12 rounded-full bg-anushagold/90 flex items-center justify-center group-hover:bg-anushagold transition-colors">
                        <Play size={20} className="text-white ml-1" />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-1 bg-black border-gray-800">
                    <div className="aspect-video w-full bg-black flex items-center justify-center">
                      <p className="text-white/50">Video Player Placeholder (1280x720px)</p>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              
              {/* Hover effect for images */}
              {item.type === 'image' && (
                <div className="absolute inset-0 bg-anushagold/0 hover:bg-anushagold/20 transition-all duration-300 cursor-pointer z-10"></div>
              )}
              
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <p className="text-white text-sm">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "flex justify-center mt-10 opacity-0 transition-all duration-700 delay-500",
          isVisible && "opacity-100"
        )}>
          <Link to="/gallery" className="btn-primary">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

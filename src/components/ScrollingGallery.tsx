
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import galleryData from '@/data/gallery.json';

const ScrollingGallery = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<any>(null);

  // Auto scroll functionality
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    
    // Start auto scrolling after a delay
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (apiRef.current && apiRef.current.canScrollNext()) {
          apiRef.current.scrollNext();
        } else if (apiRef.current) {
          // Reset to beginning when reaching the end
          apiRef.current.scrollTo(0);
        }
      }, 5000); // Scroll every 5 seconds
    };
    
    // Start auto scrolling
    const timer = setTimeout(() => {
      startAutoScroll();
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(scrollInterval);
    };
  }, []);
  
  const setApi = (api: any) => {
    apiRef.current = api;
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-anushablue/90 to-anushablue z-10">
      <div className="absolute inset-0 bg-[url('/images/ASICON 2023 - Visakhapatnam (The All India Surgeons meet).png')] bg-center bg-cover opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-anushagold to-yellow-400 text-transparent bg-clip-text">
            Glimpses of My Journey
          </span>
        </h2>
        
        <p className="text-center text-white/70 max-w-3xl mx-auto mb-10">
          Explore moments from my performances, events and experiences across various stages and venues.
        </p>
        
        <div className="relative px-10 md:px-16">
          <Carousel 
            className="w-full" 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {galleryData.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden h-64 relative group">
                    {/* Dynamic image/video placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-anushagold/20 to-anushablue/30 flex items-center justify-center">
                      {item.type === 'image' ? (
                        <img 
                          src={item.imagePath} 
                          alt={`Gallery carousel image ${item.id} (600x400px)`} 
                          className="w-full h-full object-cover opacity-70"
                          loading="lazy"
                        />
                      ) : (
                        <img 
                          src={item.imagePath}
                          alt={`Video carousel thumbnail ${item.id} (600x400px)`} 
                          className="w-full h-full object-cover opacity-70"
                        />
                      )}
                    </div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm">{item.caption}</p>
                    </div>
                    
                    {/* Play button for videos */}
                    {item.type === 'video' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="absolute inset-0 flex items-center justify-center group">
                            <div className="w-12 h-12 rounded-full bg-anushagold/80 flex items-center justify-center group-hover:bg-anushagold transform transition-all duration-300 group-hover:scale-110">
                              <Play size={20} className="text-white ml-1" />
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-1 bg-black border-gray-800">
                          <div className="aspect-video w-full bg-black flex items-center justify-center">
                            <p className="text-white/50">Video Player Placeholder (1280x720px)</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 bg-anushagold/80 hover:bg-anushagold text-white border-none" />
              <CarouselNext className="right-0 bg-anushagold/80 hover:bg-anushagold text-white border-none" />
            </div>
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/gallery" className="text-anushagold hover:text-yellow-400 transition-colors border-b border-anushagold/30 hover:border-yellow-400 pb-1 inline-flex items-center">
            View Full Gallery
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ScrollingGallery;

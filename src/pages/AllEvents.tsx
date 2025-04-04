import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialOverlay from '@/components/SocialOverlay';
import { ExternalLink, Youtube, Instagram, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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

const AllEvents = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [works, setWorks] = useState<WorkItem[]>([]);

  useEffect(() => {
    // Map works data to WorkItem interface
    const mappedWorks = worksData.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.images && item.images.length > 0 ? item.images[0] : undefined,
      links: item.links
    }));
    
    setWorks(mappedWorks);
  }, []);

  return (
    <div className="min-h-screen bg-anushablue text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex justify-between items-center mb-8">
          <Link to="/#work" className="inline-flex items-center text-anushagold hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Home</span>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">All Events</h1>
        
        <p className="text-white/70 max-w-3xl mb-10">
          Browse through the complete collection of events I've had the privilege to host and be a part of. Each event represents a unique experience and showcases my versatility as a host and emcee.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <Link
              to={`/work/${work.id}`}
              key={work.id}
              className="block h-full"
              onMouseEnter={() => setActiveItem(work.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <Card className="border border-white/10 bg-gray-900/50 backdrop-blur-sm overflow-hidden card-hover h-full">
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
      </main>
      <Footer />
      <SocialOverlay />
    </div>
  );
};

export default AllEvents;

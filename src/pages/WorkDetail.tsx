import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialOverlay from '@/components/SocialOverlay';
import { ChevronLeft, Calendar, MapPin, Instagram, Youtube } from 'lucide-react';
import worksData from '@/data/works.json';
import { Button } from '@/components/ui/button';

interface Work {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date?: string;
  location?: string;
  images?: string[];
  videos?: string[];
  testimonials?: {
    name: string;
    role: string;
    comment: string;
  }[];
  links?: {
    youtube?: string;
    instagram?: string;
    other?: string;
  };
}

const WorkDetail = () => {
  const { workId } = useParams<{ workId: string }>();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the work item with the matching ID
    const foundWork = worksData.find(item => item.id === workId);
    
    if (foundWork) {
      setWork(foundWork);
    }
    setLoading(false);
  }, [workId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-anushablue flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-anushagold"></div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-anushablue text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="mb-8 text-white/70">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/#work">
              <Button variant="outline" className="flex items-center gap-2">
                <ChevronLeft size={16} />
                Back to All Events
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anushablue text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <Link to="/#work" className="inline-flex items-center text-anushagold hover:text-white transition-colors mb-8">
          <ChevronLeft size={20} />
          <span className="ml-1">Back to all events</span>
        </Link>
        
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-6">{work.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Main content */}
            <div className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg mb-8">
              {work.images && work.images.length > 0 && (
                <div className="mb-8">
                  <img
                    src={work.images[0]}
                    alt={work.title}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              )}
              
              <p className="text-lg text-white/90 mb-6">{work.fullDescription}</p>
              
              {/* Event details */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-white/80">
                {work.date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-anushagold" />
                    <span>{work.date}</span>
                  </div>
                )}
                
                {work.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-anushagold" />
                    <span>{work.location}</span>
                  </div>
                )}
              </div>
              
              {/* Social links */}
              {work.links && (
                <div className="flex gap-3 mb-8">
                  {work.links.youtube && (
                    <a 
                      href={work.links.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-4 rounded-md"
                    >
                      <Youtube size={18} />
                      <span>Watch on YouTube</span>
                    </a>
                  )}
                  
                  {work.links.instagram && (
                    <a 
                      href={work.links.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-4 rounded-md"
                    >
                      <Instagram size={18} />
                      <span>View on Instagram</span>
                    </a>
                  )}
                </div>
              )}
              
              {/* Images */}
              {work.images && work.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Event Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {work.images.map((image, index) => (
                      <div key={index} className="bg-gray-800 h-48 flex items-center justify-center rounded-lg overflow-hidden">
                        <div className="text-gray-500">Image placeholder: {image}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Videos */}
              {work.videos && work.videos.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Event Videos</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {work.videos.map((videoUrl, index) => (
                      <div key={index} className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-gray-500">Video placeholder: {videoUrl}</div>
                        </div>
                        {/* Uncomment when ready to use actual videos */}
                        {/* <iframe
                          src={videoUrl}
                          title={`Event video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Testimonials */}
            {work.testimonials && work.testimonials.length > 0 && (
              <div className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
                <div className="space-y-6">
                  {work.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-anushagold pl-4 py-1">
                      <p className="italic text-white/80 mb-2">"{testimonial.comment}"</p>
                      <div className="text-sm">
                        <p className="font-semibold text-anushagold">{testimonial.name}</p>
                        <p className="text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA */}
            <div className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Interested in similar events?</h2>
              <p className="mb-6 text-white/80">
                Would you like to have Anusha host your next event? Get in touch to discuss how she can make your occasion special.
              </p>
              <Link to="/#contact" className="btn-primary block text-center">
                Book Me For Your Event
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SocialOverlay />
    </div>
  );
};

export default WorkDetail;

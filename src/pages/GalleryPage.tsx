import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialOverlay from '@/components/SocialOverlay';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, ChevronLeft, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import galleryData from '@/data/gallery.json';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after component mounts for animation
    setIsVisible(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-anushablue text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex justify-between items-center mb-8">
          <Link to="/#gallery" className="inline-flex items-center text-anushagold hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Home</span>
          </Link>
        </div>
        
        <h1 className={cn(
          "text-4xl font-bold mb-6 opacity-0 transition-opacity duration-700",
          isVisible && "opacity-100"
        )}>
          Gallery
        </h1>
        
        <p className={cn(
          "text-white/70 max-w-3xl mb-10 opacity-0 transition-opacity duration-700 delay-200",
          isVisible && "opacity-100"
        )}>
          A visual journey through performances, events, and behind-the-scenes moments. Browse through captured memories from various prestigious events across India.
        </p>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden rounded-lg bg-gray-900/50 backdrop-blur-sm",
                index % 5 === 0 && "sm:col-span-2 sm:row-span-2",
                item.id === 3 ? "h-[400px]" : "h-64 sm:h-auto aspect-square",
                "group"
              )}
            >
              {item.type === 'image' ? (
                <>
                  <img 
                    src={item.id === 3 ? '/images/H\'ble Chief Minister of Andhra Pradesh - Shri Y S JAGAN MOHAN REDDY Garu H\'ble Chief Minister of Telangana - Shri ANUMULA REVANTH REDDY garu.png' : item.imagePath} 
                    alt={`Gallery image ${item.id}${index % 5 === 0 ? ' (800x800px - featured large)' : ' (400x400px)'}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm">{item.caption}</p>
                  </div>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full h-full relative">
                      <img 
                        src={item.thumbnailPath || "/placeholder.svg"} 
                        alt={`Video thumbnail ${item.id}${index % 5 === 0 ? ' (800x800px - featured large)' : ' (400x400px)'}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-anushagold/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={30} className="text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm">{item.caption}</p>
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
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
      <SocialOverlay />
    </div>
  );
};

export default GalleryPage;

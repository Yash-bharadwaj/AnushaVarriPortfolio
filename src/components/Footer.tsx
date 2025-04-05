
import React from 'react';
import { ChevronUp, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">
              <span className="text-anushagold">ANUSHA</span>
            </h3>
            <p className="text-white/70 mt-2 max-w-xs">
              Master of Ceremonies | Singer | Anchor | Live Host | Performer
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="bg-anushagold/20 hover:bg-anushagold text-anushagold hover:text-white p-3 rounded-full transition-colors duration-300 mb-4"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} />
            </button>
            
            <div className="flex space-x-6 mb-4">
              <a 
                href="https://www.instagram.com/mc_anushavarri/" 
                className="text-white/70 hover:text-anushagold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/@MCANUSHAVARRI" 
                className="text-white/70 hover:text-anushagold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/emceeanushavarri/" 
                className="text-white/70 hover:text-anushagold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            
            <p className="text-white/50 text-sm">
              &copy; {currentYear} Anusha | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

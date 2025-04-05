
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? 'bg-anushablue/95 shadow-md backdrop-blur' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* SVG Logo */}
          <a href="#" className="font-montserrat font-bold text-2xl flex items-center text-white">
            <svg 
              width="120" 
              height="30" 
              viewBox="0 0 120 30" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-anushagold"
            >
              {/* Microphone Icon */}
              <g transform="translate(0, 3)">
                <path 
                  d="M10 2a3 3 0 0 1 3 3v10a3 3 0 1 1-6 0V5a3 3 0 0 1 3-3zm0-2a5 5 0 0 0-5 5v10a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z" 
                  fill="currentColor"
                />
                <path 
                  d="M5 10v5a5 5 0 0 0 10 0v-5h2v5a7 7 0 0 1-6 6.92V24h4v2H5v-2h4v-2.08A7 7 0 0 1 3 15v-5h2z" 
                  fill="currentColor"
                />
              </g>
              
              {/* ANUSHA Text */}
              <text x="25" y="20" fontFamily="Montserrat" fontWeight="700" fontSize="16" fill="currentColor">
                ANUSHA
              </text>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white/90 hover:text-anushagold transition-colors duration-300 fancy-underline"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="btn-primary flex items-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2a3 3 0 0 1 3 3v10a3 3 0 1 1-6 0V5a3 3 0 0 1 3-3zm0-2a5 5 0 0 0-5 5v10a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z" fill="currentColor"/>
                <path d="M5 10v5a5 5 0 0 0 10 0v-5h2v5a7 7 0 0 1-6 6.92V24h4v2H5v-2h4v-2.08A7 7 0 0 1 3 15v-5h2z" fill="currentColor"/>
              </svg>
              Book Me
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-anushablue/95 backdrop-blur shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={toggleMenu}
                className="py-2 border-b text-white/90 hover:text-anushagold border-white/10 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={toggleMenu}
              className="btn-primary text-center mt-4 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2a3 3 0 0 1 3 3v10a3 3 0 1 1-6 0V5a3 3 0 0 1 3-3zm0-2a5 5 0 0 0-5 5v10a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z" fill="currentColor"/>
                <path d="M5 10v5a5 5 0 0 0 10 0v-5h2v5a7 7 0 0 1-6 6.92V24h4v2H5v-2h4v-2.08A7 7 0 0 1 3 15v-5h2z" fill="currentColor"/>
              </svg>
              Book Me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

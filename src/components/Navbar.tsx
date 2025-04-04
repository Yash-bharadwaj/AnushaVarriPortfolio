
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Mic } from 'lucide-react';
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
          {/* Logo with microphone icon */}
          <a href="#" className="font-montserrat font-bold text-2xl flex items-center text-white">
            <Mic size={24} className="mr-2 text-anushagold" />
            <span className="text-anushagold">ANUSHA</span> 
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
              <Mic size={16} className="mr-2" />
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
              <Mic size={16} className="mr-2" />
              Book Me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

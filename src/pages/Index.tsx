
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ScrollingGallery from '@/components/ScrollingGallery';
import AboutSection from '@/components/AboutSection';
import VisionMissionSection from '@/components/VisionMissionSection';
import WhyHireMeSection from '@/components/WhyHireMeSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactForm from '@/components/ContactForm';
import ContactFormPopup from '@/components/ContactFormPopup';
import Footer from '@/components/Footer';
import SocialOverlay from '@/components/SocialOverlay';
import SparkleAnimation from '@/components/SparkleAnimation';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Mic } from 'lucide-react';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen relative bg-anushablue text-white">
      {/* Global sparkle effect with reduced opacity */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-40">
        <SparkleAnimation theme={theme} />
      </div>
      
      {/* Decorative microphone icons scattered throughout the page */}
      <div className="fixed top-1/4 left-[5%] pointer-events-none z-5 opacity-20">
        <Mic size={34} className="text-anushagold" />
      </div>
      <div className="fixed top-2/3 right-[8%] pointer-events-none z-5 opacity-15">
        <Mic size={28} className="text-anushagold" />
      </div>
      <div className="fixed bottom-1/5 left-[12%] pointer-events-none z-5 opacity-20">
        <Mic size={40} className="text-anushagold/30" />
      </div>
      <div className="fixed top-1/3 right-[15%] pointer-events-none z-5 opacity-15">
        <Mic size={36} className="text-white/20" />
      </div>
      
      <Navbar />
      <main>
        <HeroSection />
        <ScrollingGallery />
        <AboutSection />
        <VisionMissionSection />
        <WhyHireMeSection />
        <FeaturedWorkSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
      <SocialOverlay />
      <ContactFormPopup />
    </div>
  );
};

export default Index;

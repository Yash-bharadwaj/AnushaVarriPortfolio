
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
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
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen relative bg-anushablue text-white">
      <Navbar />
      <main>
        <HeroSection />
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

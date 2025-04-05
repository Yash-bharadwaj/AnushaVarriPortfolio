
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
import ClientLogoCarousel from '@/components/ClientLogoCarousel';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen relative bg-anushablue text-white">
      <Navbar />
      <main>
        <HeroSection />
        <div className="bg-black/90 py-6">
          <ClientLogoCarousel />
        </div>
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

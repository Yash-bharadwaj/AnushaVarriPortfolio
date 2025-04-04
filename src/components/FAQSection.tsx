
import React from 'react';
import { HelpCircle, Mic } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const FAQSection = () => {
  const { theme } = useTheme();
  
  const faqs = [
    {
      question: "What services do you offer as an emcee?",
      answer: "I offer a comprehensive range of hosting services including corporate events, weddings, award ceremonies, product launches, cultural shows, and private parties. I specialize in creating engaging and memorable experiences tailored to each unique occasion."
    },
    {
      question: "In which languages can you host events?",
      answer: "I'm fluent in Hindi, English, and Telugu with basic proficiency in Tamil and Kannada. This versatility allows me to connect with diverse audiences and seamlessly switch between languages based on your event requirements."
    },
    {
      question: "How can I book you for my event?",
      answer: "You can book me by filling out the contact form on this website, sending me a direct message on social media, or calling the phone number provided in the contact section. I recommend booking at least 4-6 weeks in advance to ensure availability, especially for peak event seasons."
    },
    {
      question: "Do you travel for events outside of Hyderabad/Vizag?",
      answer: "Yes, I'm available for events across India and internationally as well. Travel and accommodation arrangements can be discussed as part of our booking conversation."
    },
    {
      question: "What makes your hosting style unique?",
      answer: "My hosting style combines energy, elegance, and audience engagement with a personalized approach for each event. Having transitioned from a 10-year career at Canara Bank to follow my passion, I bring both professionalism and creative flair to every performance."
    }
  ];

  return (
    <section id="faq" className={cn(
      "relative py-16 md:py-24 overflow-hidden",
      theme === 'dark' 
        ? "bg-gradient-to-b from-anushablue/90 to-anushablue" 
        : "bg-gradient-to-b from-pink-200/90 to-purple-300"
    )}>
      {/* Background elements */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-20 opacity-80",
        theme === 'dark'
          ? "bg-gradient-to-b from-anushablue to-transparent" 
          : "bg-gradient-to-b from-pink-200 to-transparent"
      )}></div>
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-20 opacity-80",
        theme === 'dark'
          ? "bg-gradient-to-t from-anushablue to-transparent" 
          : "bg-gradient-to-t from-purple-300 to-transparent"
      )}></div>
      
      {/* Decorative microphones */}
      <div className="absolute top-10 left-[10%] opacity-20">
        <Mic 
          size={40} 
          className={theme === 'dark' ? "text-anushagold" : "text-pink-500"} 
        />
      </div>
      <div className="absolute bottom-10 right-[10%] opacity-15">
        <Mic 
          size={34} 
          className={theme === 'dark' ? "text-anushagold" : "text-purple-500"} 
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <HelpCircle 
              size={32} 
              className={theme === 'dark' ? "text-anushagold mr-2" : "text-pink-500 mr-2"} 
            />
            <h2 className={cn(
              "section-heading",
              theme === 'light' && "text-gray-800 after:bg-pink-400"
            )}>
              Frequently Asked Questions
            </h2>
          </div>
          <p className={cn(
            "max-w-2xl mx-auto",
            theme === 'dark' ? "text-white/70" : "text-gray-700"
          )}>
            Find answers to common questions about my services, booking process, and event hosting style.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className={cn(
              "rounded-lg backdrop-blur-sm shadow-xl",
              theme === 'dark' 
                ? "bg-secondary/30 border border-white/10" 
                : "bg-white/30 border border-pink-200"
            )}
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={cn(
                  "last:border-b-0",
                  theme === 'dark' 
                    ? "border-b border-white/10" 
                    : "border-b border-pink-200"
                )}
              >
                <AccordionTrigger 
                  className={cn(
                    "py-4 px-5 text-left font-montserrat",
                    theme === 'dark' 
                      ? "text-white hover:text-anushagold" 
                      : "text-gray-800 hover:text-pink-500"
                  )}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className={cn(
                    "px-5 pb-4",
                    theme === 'dark' ? "text-white/80" : "text-gray-700"
                  )}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className={cn(
              "text-sm",
              theme === 'dark' ? "text-white/60" : "text-gray-600"
            )}>
              Have more questions? Feel free to <a 
                href="#contact" 
                className={theme === 'dark' ? "text-anushagold hover:underline" : "text-pink-500 hover:underline"}
              >
                contact me
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

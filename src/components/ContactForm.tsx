import React, { useState, useRef, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Send, Phone, Mail, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("MX0lyxIK9DsurlErk");

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formRef.current) return;

      const templateParams = {
        name: name,
        email: email,
        title: eventDetails,
        message: message,
        event_date: date ? format(date, "PPP") : "Not specified"
      };

      await emailjs.send(
        "service_0669rfq",
        "template_agmgezm",
        templateParams,
        "MX0lyxIK9DsurlErk"
      );

      toast.success("Thank you for your message! I'll get back to you soon.", {
        position: "bottom-right",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setEventDetails('');
      setMessage('');
      setDate(undefined);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Sorry, there was an error sending your message. Please try again later.", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-anushablue to-gray-900 relative"
    >
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/10 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "section-heading text-center mx-auto opacity-0 transition-all duration-700",
          isVisible && "opacity-100"
        )}>
          Book <span className="text-anushagold">Me for Your Event</span>
        </h2>
        
        <p className={cn(
          "text-center text-white/70 max-w-3xl mx-auto mb-12 opacity-0 transition-all duration-700 delay-200",
          isVisible && "opacity-100"
        )}>
          Ready to create a memorable experience for your audience? Let's connect and discuss your event needs.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact form */}
          <div className={cn(
            "bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 opacity-0 transition-all duration-700 delay-300",
            isVisible && "opacity-100"
          )}>
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">Your Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith" 
                  required
                  className="bg-gray-800/70 border-gray-700 focus:border-anushagold text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  required
                  className="bg-gray-800/70 border-gray-700 focus:border-anushagold text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="date" className="text-white">Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      id="date"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800/70 border-gray-700 hover:bg-gray-800 focus:border-anushagold text-white",
                        !date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select an event date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="event-details" className="text-white">Event Details</Label>
                <Input 
                  id="event-details" 
                  value={eventDetails}
                  onChange={(e) => setEventDetails(e.target.value)}
                  placeholder="Corporate Event, Wedding, etc." 
                  className="bg-gray-800/70 border-gray-700 focus:border-anushagold text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white">Your Message</Label>
                <Textarea 
                  id="message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me more about your event..." 
                  className="bg-gray-800/70 border-gray-700 focus:border-anushagold text-white h-32"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-anushagold hover:bg-yellow-500 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      ⭐
                    </span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
              
              <div className="text-center text-white/60 text-sm">
                Or reach out directly via WhatsApp
              </div>
              
              <Button 
                type="button"
                variant="outline"
                className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
                onClick={() => window.open('https://wa.me/+917996123999', '_blank')}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
                Chat on WhatsApp
              </Button>
            </form>
          </div>
          
          {/* Contact information */}
          <div className={cn(
            "opacity-0 transition-all duration-700 delay-400",
            isVisible && "opacity-100"
          )}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-8 relative">
                Contact <span className="text-anushagold">Information</span>
                <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-anushagold"></span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-anushagold/20 p-3 rounded-full">
                    <Phone className="text-anushagold w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium">Phone</h4>
                    <a href="tel:+919XXXXXXXXX" className="text-white/70 hover:text-anushagold transition-colors">
                      +91 7996123999
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-anushagold/20 p-3 rounded-full">
                    <Mail className="text-anushagold w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium">Email</h4>
                    <a href="mailto:mcanushavarri@gmail.com" className="text-white/70 hover:text-anushagold transition-colors">
                      mcanushavarri@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-anushagold/20 p-3 rounded-full">
                    <MapPin className="text-anushagold w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium">Location</h4>
                    <p className="text-white/70">
                      Based in Hyderabad & Vizag<br />
                      Available for events across India
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 mt-8 border-t border-white/10">
                  <h4 className="text-white text-lg font-medium mb-4">Connect on Social Media</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-anushagold/20 p-3 rounded-full hover:bg-anushagold/30 transition-colors" aria-label="Instagram">
                      <svg className="w-6 h-6 text-anushagold" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-anushagold/20 p-3 rounded-full hover:bg-anushagold/30 transition-colors" aria-label="YouTube">
                      <svg className="w-6 h-6 text-anushagold" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-anushagold/20 p-3 rounded-full hover:bg-anushagold/30 transition-colors" aria-label="LinkedIn">
                      <svg className="w-6 h-6 text-anushagold" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

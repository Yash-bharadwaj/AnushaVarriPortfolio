
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactFormPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  useEffect(() => {
    // Show popup after the user has scrolled 60% of the page
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / pageHeight) * 100;
      
      if (scrollPercentage > 60) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDismissed]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Form submitted",
      description: "Thank you for your interest! I'll get back to you soon.",
    });
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-5 right-5 z-50 w-full max-w-md bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl p-6 text-white",
      "opacity-0 translate-y-10 transition-all duration-500",
      isVisible && "opacity-100 translate-y-0"
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <span className="text-anushagold mr-2">✨</span> 
          Ready to make your event unforgettable?
        </h3>
        <button 
          onClick={handleDismiss} 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <p className="text-sm text-gray-300 mb-6">
        Let's discuss how I can bring energy and professionalism to your next event!
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your email" 
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone" 
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Event Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell me about your event" 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 resize-none"
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-anushagold hover:bg-yellow-500 text-white"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactFormPopup;

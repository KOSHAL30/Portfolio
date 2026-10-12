"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      business: formData.get("business"),
      email: formData.get("email"),
      goal: formData.get("goal"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://formspree.io/f/mppqzanl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-[#FAFAFA] text-[#09090B] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 lg:pt-24 pb-12 overflow-hidden">
      
      {/* Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-24 mb-16 md:mb-20">
        
        {/* Left: Massive CTA */}
        <div className="w-full md:w-1/2">
          
          <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 mb-4 md:mb-6">
            [ Have a project in mind? ]
          </span>

          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.9] mb-6"
          >
            LET&apos;S BUILD<br />SOMETHING.
          </motion.h2>
          
          <p className="text-gray-600 font-light leading-relaxed max-w-md md:text-lg mt-6">
            Tell me what you&apos;re building, what you need, and where you want to go. I&apos;ll get back to you with structured next steps.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">Direct:</span>
            <a href="mailto:hello@koshaljoshi.com" className="text-xs font-mono text-[#09090B] underline hover-zoom-subtle">
              hello@koshaljoshi.com
            </a>
          </div>
        </div>

        {/* Right: Minimal Block Form with Hover Zoom Lift */}
        <div className="w-full md:w-1/2 max-w-xl">
          {formState === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-12 bg-gray-100 p-8 text-center rounded-xl"
            >
              <h3 className="font-sans font-medium text-2xl uppercase tracking-wide mb-4">Inquiry Received</h3>
              <p className="text-gray-600 font-light text-sm">
                I&apos;ll review your details and get back to you shortly with next steps.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white px-6 py-5 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] border border-[#09090B]/5 flex flex-col hover-zoom-card focus-within:border-[#09090B]/30">
                  <label htmlFor="name" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300 outline-none"
                  />
                </div>
                
                <div className="bg-white px-6 py-5 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] border border-[#09090B]/5 flex flex-col hover-zoom-card focus-within:border-[#09090B]/30">
                  <label htmlFor="business" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                    Business / Project
                  </label>
                  <input 
                    type="text" 
                    id="business"
                    name="business"
                    required
                    placeholder="Company or venture"
                    className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300 outline-none"
                  />
                </div>
              </div>

              <div className="bg-white px-6 py-5 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] border border-[#09090B]/5 flex flex-col hover-zoom-card focus-within:border-[#09090B]/30">
                <label htmlFor="email" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300 outline-none"
                />
              </div>

              <div className="bg-white px-6 py-5 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] border border-[#09090B]/5 flex flex-col hover-zoom-card focus-within:border-[#09090B]/30">
                <label htmlFor="goal" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                  What are you looking to build?
                </label>
                <input 
                  type="text" 
                  id="goal"
                  name="goal"
                  required
                  placeholder="AI integration, Web platform, MVP..."
                  className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300 outline-none"
                />
              </div>

              <div className="bg-white px-6 py-5 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] border border-[#09090B]/5 flex flex-col hover-zoom-card focus-within:border-[#09090B]/30">
                <label htmlFor="message" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your timeline and objectives..."
                  className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm resize-none placeholder-gray-300 outline-none"
                />
              </div>

              {formState === "error" && (
                <div className="text-red-500 text-sm mt-3 px-2">
                  Something went wrong. Please reach out directly at hello@koshaljoshi.com.
                </div>
              )}

              <Magnetic strength={0.12} className="w-full block">
                <button 
                  type="submit" 
                  disabled={formState === "submitting"}
                  className="group relative w-full px-8 py-4.5 sm:py-5 mt-3 bg-[#09090B] text-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#09090B] font-sans font-medium text-sm md:text-base uppercase tracking-widest hover:bg-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer overflow-hidden hover-zoom-subtle"
                >
                  <span className="relative z-10">
                    {formState === "submitting" ? "Sending..." : "Start A Project"}
                  </span>
                  {formState !== "submitting" && (
                    <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5 shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  )}
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom Bar with Minimal Zoom Pills */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 border-t border-[#09090B]/10 pt-8 max-w-[1600px] mx-auto">
        <span>&copy; {new Date().getFullYear()} Koshal Joshi &bull; All Rights Reserved</span>
        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="https://www.linkedin.com/in/koushal-joshi-222692377" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090B] transition-colors hover-zoom-subtle">LinkedIn</a>
          <a href="https://www.instagram.com/koshal__joshi__06?stkn=MWFzazEwZnl6NDhtNA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090B] transition-colors hover-zoom-subtle">Instagram</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090B] transition-colors hover-zoom-subtle">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}

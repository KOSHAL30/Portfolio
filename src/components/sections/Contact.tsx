"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mppqzanl", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <footer id="contact" className="pt-32 pb-12 px-6 md:px-12 lg:px-12 bg-atmospheric text-[#09090B] border-t border-[#09090B]/20 relative overflow-hidden" style={{ '--light-x': '90%', '--light-y': '50%' } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
        
        {/* Left: Massive CTA */}
        <div className="w-full md:w-1/2">
          <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">
            [ Have a project in mind? ]
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.9] mb-12"
          >
            LET&apos;S BUILD<br />SOMETHING.
          </motion.h2>
          <p className="text-gray-600 font-light leading-relaxed max-w-md md:text-lg">
            Tell me what you&apos;re building, what you need, and where you want to go. I&apos;ll get back to you with the next steps.
          </p>
        </div>

        {/* Right: Minimal Form */}
        <div className="w-full md:w-1/2 max-w-xl">
          {formState === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-12 border border-[#09090B]/20 p-8 text-center"
            >
              <h3 className="font-sans font-medium text-2xl uppercase tracking-wide mb-4">Inquiry Received</h3>
              <p className="text-gray-600 font-light text-sm">
                I&apos;ll review your details and get back to you shortly with next steps.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder=" "
                    className="block w-full bg-transparent border-0 border-b border-white/30 py-4 text-[#09090B] focus:ring-0 focus:border-white transition-colors peer placeholder-transparent rounded-none"
                  />
                  <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 text-xs md:text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#09090B] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#09090B] cursor-text">
                    Name
                  </label>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    id="business"
                    name="business"
                    required
                    placeholder=" "
                    className="block w-full bg-transparent border-0 border-b border-white/30 py-4 text-[#09090B] focus:ring-0 focus:border-white transition-colors peer placeholder-transparent rounded-none"
                  />
                  <label htmlFor="business" className="absolute left-0 top-4 text-gray-500 text-xs md:text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#09090B] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#09090B] cursor-text">
                    Business / Project
                  </label>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  placeholder=" "
                  className="block w-full bg-transparent border-0 border-b border-white/30 py-4 text-[#09090B] focus:ring-0 focus:border-white transition-colors peer placeholder-transparent rounded-none"
                />
                <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 text-xs md:text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#09090B] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#09090B] cursor-text">
                  Email
                </label>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  id="goal"
                  name="goal"
                  required
                  placeholder=" "
                  className="block w-full bg-transparent border-0 border-b border-white/30 py-4 text-[#09090B] focus:ring-0 focus:border-white transition-colors peer placeholder-transparent rounded-none"
                />
                <label htmlFor="goal" className="absolute left-0 top-4 text-gray-500 text-xs md:text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#09090B] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#09090B] cursor-text">
                  What are you looking to build?
                </label>
              </div>

              <div className="relative">
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder=" "
                  className="block w-full bg-transparent border-0 border-b border-white/30 py-4 text-[#09090B] focus:ring-0 focus:border-white transition-colors peer placeholder-transparent resize-none rounded-none"
                />
                <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 text-xs md:text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#09090B] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#09090B] cursor-text">
                  Message
                </label>
              </div>

              {formState === "error" && (
                <div className="text-red-400 text-sm mt-4">
                  Something went wrong. Please email me directly at hello@koshaljoshi.com.
                </div>
              )}

              <button 
                type="submit" 
                disabled={formState === "submitting"}
                className="group w-full py-6 border border-white text-[#09090B] font-sans font-medium text-sm md:text-base uppercase tracking-widest hover:bg-[#09090B] hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {formState === "submitting" ? "Sending..." : "Start A Project"}
                {formState !== "submitting" && (
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-600 border-t border-[#09090B]/20 pt-8">
        <span>&copy; {new Date().getFullYear()} Koshal Joshi</span>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="https://www.linkedin.com/in/koushal-joshi-222692377" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090B] transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/koshal__joshi__06?stkn=MWFzazEwZnl6NDhtNA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090B] transition-colors">Instagram</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090B] transition-colors">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}

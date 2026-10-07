"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
    } catch (err) {
      setFormState("error");
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-[#FAFAFA] text-[#09090B] px-6 md:px-12 lg:px-16 pt-32 pb-12 overflow-hidden">
      
      {/* Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 lg:gap-32 mb-24 md:mb-32">
        
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
            LET'S BUILD<br />SOMETHING.
          </motion.h2>
          <p className="text-gray-600 font-light leading-relaxed max-w-md md:text-lg">
            Tell me what you're building, what you need, and where you want to go. I'll get back to you with the next steps.
          </p>
        </div>

        {/* Right: Minimal Block Form */}
        <div className="w-full md:w-1/2 max-w-xl">
          {formState === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-12 bg-gray-100 p-8 text-center rounded-xl"
            >
              <h3 className="font-sans font-medium text-2xl uppercase tracking-wide mb-4">Inquiry Received</h3>
              <p className="text-gray-600 font-light text-sm">
                I'll review your details and get back to you shortly with next steps.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white px-6 py-5 rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col">
                  <label htmlFor="name" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300"
                  />
                </div>
                
                <div className="bg-white px-6 py-5 rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col">
                  <label htmlFor="business" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                    Business / Project
                  </label>
                  <input 
                    type="text" 
                    id="business"
                    name="business"
                    required
                    className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="bg-white px-6 py-5 rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col">
                <label htmlFor="email" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300"
                />
              </div>

              <div className="bg-white px-6 py-5 rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col">
                <label htmlFor="goal" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                  What are you looking to build?
                </label>
                <input 
                  type="text" 
                  id="goal"
                  name="goal"
                  required
                  className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm placeholder-gray-300"
                />
              </div>

              <div className="bg-white px-6 py-5 rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col">
                <label htmlFor="message" className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-0 p-0 text-[#09090B] focus:ring-0 text-sm resize-none placeholder-gray-300"
                />
              </div>

              {formState === "error" && (
                <div className="text-red-500 text-sm mt-4 px-2">
                  Something went wrong. Please email me directly at hello@koshaljoshi.com.
                </div>
              )}

              <button 
                type="submit" 
                disabled={formState === "submitting"}
                className="group w-full py-6 mt-4 bg-white rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100/50 text-[#09090B] font-sans font-medium text-sm md:text-base uppercase tracking-widest hover:bg-[#09090B] hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {formState === "submitting" ? "Sending..." : "Start A Project"}
                {formState !== "submitting" && (
                  <span className="group-hover:translate-x-2 transition-transform">?</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-600 border-t border-[#09090B]/10 pt-8">
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

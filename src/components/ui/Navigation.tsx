"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { num: "01", label: "Capabilities", script: "Services", href: "#services" },
    { num: "02", label: "Selected Works", script: "Projects", href: "#projects" },
    { num: "03", label: "Methodology", script: "Process", href: "#process" },
    { num: "04", label: "Let's Build", script: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#FAFAFA]/90 backdrop-blur-md py-4 border-b border-[#09090B]/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)]' : 'bg-transparent py-8'}`}
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-between items-center w-full max-w-[1600px] mx-auto">
          
          {/* Left: Logo & Live Availability Pulse */}
          <div className="flex items-center gap-6">
            <a href="#" className="font-editorial text-2xl tracking-widest uppercase text-[#09090B] hover:opacity-70 transition-opacity">
              KJ
            </a>
            <div className="hidden sm:block w-[1px] h-4 bg-[#09090B]/15"></div>
            
            {/* Live Availability Status Pill */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#09090B]/[0.03] border border-[#09090B]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-mono font-medium">
                Available for Q4 &apos;26
              </span>
            </div>
          </div>
          
          {/* Middle & Right: Inline Nav Links + Menu Toggle */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.22em] text-gray-500 font-medium">
              <a href="#services" className="hover:text-[#09090B] hover:scale-105 transition-all">Services</a>
              <a href="#projects" className="hover:text-[#09090B] hover:scale-105 transition-all">Projects</a>
              <a href="#process" className="hover:text-[#09090B] hover:scale-105 transition-all">Process</a>
              <a href="#contact" className="hover:text-[#09090B] hover:scale-105 transition-all">Contact</a>
            </div>

            <a 
              href="#contact" 
              className="hidden md:inline-flex items-center gap-2 text-[10px] text-[#09090B] border border-[#09090B]/20 rounded-full px-5 py-2 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 tracking-[0.2em] uppercase font-medium hover:scale-[1.03]"
            >
              Let&apos;s Talk
            </a>

            {/* Harsha-style 2-line Animated Minimal Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative flex flex-col justify-center items-end gap-1.5 w-10 h-10 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className={`h-[1.5px] bg-[#09090B] transition-all duration-300 ${isOpen ? 'w-6 translate-y-[4px] rotate-45' : 'w-6 group-hover:w-4'}`} />
              <span className={`h-[1.5px] bg-[#09090B] transition-all duration-300 ${isOpen ? 'w-6 -translate-y-[4px] -rotate-45' : 'w-4 group-hover:w-6'}`} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* FULLSCREEN EDITORIAL CURTAIN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#09090B] text-[#FAFAFA] flex flex-col justify-between p-8 md:p-16 lg:p-24 overflow-y-auto"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

            {/* Top Bar inside Overlay */}
            <div className="relative z-10 flex justify-between items-center w-full max-w-[1600px] mx-auto border-b border-white/10 pb-8">
              <span className="font-editorial text-2xl tracking-widest uppercase text-white">KJ</span>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Navigation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Content: Giant Links + Info Column */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-12">
              
              {/* Left Column: Oversized Links */}
              <div className="lg:col-span-8 flex flex-col justify-center gap-6 md:gap-8">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 md:gap-8 text-white hover:text-gray-300 transition-colors"
                    >
                      <span className="font-mono text-xs md:text-sm text-gray-500 tracking-widest">
                        {item.num}
                      </span>
                      <span className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase group-hover:translate-x-3 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span className="font-cursive text-3xl sm:text-4xl md:text-5xl text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-emerald-400 transition-all lowercase">
                        {item.script}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block lg:col-span-1 border-r border-white/10 h-full"></div>

              {/* Right Column: Contact & Direct Information */}
              <div className="lg:col-span-3 flex flex-col justify-center gap-8 font-light text-gray-300">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block mb-2">Direct Inquiry</span>
                  <a href="mailto:hello@koshaljoshi.com" className="text-base md:text-lg text-white hover:underline block font-sans">
                    hello@koshaljoshi.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block mb-2">Location</span>
                  <p className="text-sm text-gray-300 font-sans">
                    India &bull; Available Worldwide (Remote)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block mb-3">Social Profiles</span>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.linkedin.com/in/koushal-joshi-222692377"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/koshal__joshi__06?stkn=MWFzazEwZnl6NDhtNA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Bar inside Overlay */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-mono">
              <span>&copy; {new Date().getFullYear()} Koshal Joshi &bull; Digital Engineer</span>
              <span className="mt-2 sm:mt-0">[ High-Performance Digital Experiences ]</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

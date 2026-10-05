"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-lg py-4' : 'bg-transparent py-8'}`}
    >
      <div className="px-6 md:px-12 lg:px-16 flex justify-between items-center w-full max-w-[1600px] mx-auto">
        
        {/* Left Side: Logo & Name */}
        <div className="flex items-center gap-6">
          <a href="#" className="font-editorial text-2xl tracking-widest uppercase text-white hover:opacity-70 transition-opacity">
            KJ
          </a>
          <div className="hidden md:block w-[1px] h-4 bg-white/20"></div>
          <span className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-gray-400 font-medium">
            Koshal Joshi
          </span>
        </div>
        
        {/* Right Side: Links */}
        <div className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          
          <a href="#contact" className="ml-4 text-white border border-white/20 rounded-full px-6 py-2.5 hover:bg-white hover:text-black transition-all duration-300 tracking-[0.2em]">
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <a href="#contact" className="text-[10px] uppercase tracking-[0.2em] text-white border border-white/30 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

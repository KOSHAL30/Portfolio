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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <a href="#" className="font-display font-bold text-xl tracking-tighter uppercase text-white hover:opacity-70 transition-opacity">
          KJ
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-400 font-mono">
          <a href="#services" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#projects" className="hover:text-white transition-colors">Selected Works</a>
          <a href="#process" className="hover:text-white transition-colors">Methodology</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Mobile menu - simplified to just contact CTA */}
        <div className="md:hidden">
          <a href="#contact" className="text-xs uppercase tracking-widest text-white border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

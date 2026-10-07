"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top on load to ensure hero animations play correctly
    window.scrollTo(0, 0);
    
    // Simulate loading time for the cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#09090B] text-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise background overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
          
          <div className="overflow-hidden">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-8xl md:text-[12rem] tracking-tight leading-none mix-blend-difference"
            >
              KJ
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-[1px] bg-white/30 mt-8"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

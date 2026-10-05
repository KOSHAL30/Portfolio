"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden bg-[#0a0a0a] text-white pt-20">
      
      {/* Background Image / Sculpture with Radial Fade Mask */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90">
         {/* We use mask-image to smoothly blend the square image edges into the background color */}
         <div 
           className="relative w-[140vw] h-[140vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] max-w-[900px] max-h-[900px]"
           style={{
             WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
             maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)"
           }}
         >
           <Image 
             src="/images/sculpture.jpg" 
             alt="Digital Sculptural Portrait" 
             fill
             priority
             quality={100}
             className="object-contain"
             sizes="(max-width: 768px) 100vw, 60vw"
           />
         </div>
      </div>

      {/* Floating Orbits / Geometric Accents (to mimic the reference thin lines) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[120vw] h-[40vw] md:w-[60vw] md:h-[20vw] rounded-full border border-white/20 transform -rotate-12 absolute"></div>
        <div className="w-[100vw] h-[100vw] md:w-[40vw] md:h-[40vw] rounded-full border border-white/10 absolute"></div>
      </div>

      {/* Content Layer - Editorial Layout */}
      <div className="relative z-10 w-full max-w-[1600px] h-full min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-12 mt-12 md:mt-0">
        
        {/* LEFT COLUMN: Name & Main Title */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full pt-12 md:pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-400 font-mono">
              [ Independent Digital Engineer ]
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-editorial text-7xl md:text-8xl lg:text-[11rem] leading-[0.85] tracking-tight mb-12 drop-shadow-2xl mix-blend-difference"
          >
            KOSHAL<br />JOSHI
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-gray-400 font-medium max-w-sm leading-relaxed">
              AI SOLUTIONS / WEB DEVELOPMENT / DIGITAL PRODUCTS
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Intro & CTA */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col justify-center md:items-start h-full pb-20 md:pb-0">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-4">
               <span className="text-xs font-mono text-gray-500">01</span>
               <div className="w-12 h-[1px] bg-white/20"></div>
            </div>

            <h2 className="text-sm md:text-base tracking-[0.2em] font-medium uppercase leading-loose text-gray-200">
              I BUILD<br />DIGITAL PRODUCTS<br />THAT SOLVE<br />REAL PROBLEMS.
            </h2>
            
            <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mt-2">
              From AI-powered tools to full-stack web applications, I help turn ideas into real, working products.
            </p>

            <div className="mt-8">
              <a href="#projects" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] hover:text-white text-gray-400 transition-colors">
                View my work
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                   →
                </span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </motion.div>

    </section>
  );
}

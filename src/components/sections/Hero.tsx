"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Staggered text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: { hidden: { opacity: number; y: number; scale: number }; visible: { opacity: number; y: number; scale: number; transition: { duration: number; ease: [number, number, number, number] } } } = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden bg-atmospheric text-[#09090B] pt-28 md:pt-20 pb-16 md:pb-0" style={{ '--light-x': '50%', '--light-y': '30%' } as React.CSSProperties}>
      
      {/* CONTENT LAYER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1600px] h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 mt-8 md:mt-0"
      >
        
        {/* LEFT COLUMN: Name, Category & Socials */}
        <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center h-full pt-4 md:pt-0">
          
          <motion.div variants={itemVariants} className="mb-4 md:mb-6">
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-500 font-mono block">
              [ Independent Digital Engineer ]
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <h1 className="font-editorial text-[clamp(4.2rem,15vw,6.5rem)] leading-[0.88] md:text-8xl lg:text-[11rem] md:leading-[0.84] tracking-tight uppercase">
              KOSHAL<br />JOSHI
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 md:mb-8">
            <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium max-w-xs md:max-w-sm leading-loose md:leading-relaxed">
              AI SOLUTIONS<br className="md:hidden" />
              <span className="hidden md:inline"> / </span>
              WEB DEVELOPMENT<br className="md:hidden" />
              <span className="hidden md:inline"> / </span>
              DIGITAL PRODUCTS
            </p>
          </motion.div>

          {/* Capsule Social Bar (Referencing Harsha) */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#09090B]/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover-zoom-card">
              <a 
                href="https://www.linkedin.com/in/koushal-joshi-222692377" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="text-xs uppercase font-mono tracking-widest text-gray-600 hover:text-black transition-colors hover-zoom-subtle"
              >
                In
              </a>
              <span className="w-[1px] h-3 bg-[#09090B]/15"></span>
              <a 
                href="https://www.instagram.com/koshal__joshi__06?stkn=MWFzazEwZnl6NDhtNA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="text-xs uppercase font-mono tracking-widest text-gray-600 hover:text-black transition-colors hover-zoom-subtle"
              >
                Ig
              </a>
              <span className="w-[1px] h-3 bg-[#09090B]/15"></span>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="text-xs uppercase font-mono tracking-widest text-gray-600 hover:text-black transition-colors hover-zoom-subtle"
              >
                Wa
              </a>
              <span className="w-[1px] h-3 bg-[#09090B]/15"></span>
              <a 
                href="mailto:koshalj08@gmail.com" 
                aria-label="Email"
                className="text-xs uppercase font-mono tracking-widest text-gray-600 hover:text-black transition-colors hover-zoom-subtle"
              >
                Mail
              </a>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Intro, Statement & CTA with Hover Zoom */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col justify-center md:items-start h-full pb-12 md:pb-0">
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-1 md:mb-2">
               <span className="text-xs font-mono text-gray-400">01</span>
               <div className="w-12 h-[1px] bg-[#09090B]/15"></div>
            </div>

            <h2 className="text-sm md:text-base tracking-[0.2em] font-sans font-medium uppercase leading-loose text-gray-800">
              I BUILD<br />DIGITAL PRODUCTS<br />THAT SOLVE<br />REAL PROBLEMS.
            </h2>
            
            <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mt-1 max-w-[340px] md:max-w-full">
              From intelligent AI applications to production-grade web systems, I turn ambitious concepts into reliable software.
            </p>

            <div className="mt-6">
              <a 
                href="#projects" 
                className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#09090B] font-medium transition-all hover:scale-[1.03]"
              >
                View my work
                <span className="w-9 h-9 rounded-full border border-[#09090B]/20 flex items-center justify-center group-hover:bg-[#09090B] group-hover:text-white transition-all duration-300">
                  &rarr;
                </span>
              </a>
            </div>
          </motion.div>

        </div>

      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-medium">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </motion.div>

    </section>
  );
}

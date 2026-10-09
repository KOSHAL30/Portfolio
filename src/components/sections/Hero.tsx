"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax calculations based on mouse
  const rotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const translateX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);

  // Orbit animations
  const orbit1Rotate = useTransform(scrollYProgress, [0, 1], [-12, -45]);
  const orbit2Rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse coordinates between -1 and 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Staggered text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[110vh] md:min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden bg-atmospheric text-[#09090B] pt-24 md:pt-20 pb-20 md:pb-0" style={{ '--light-x': '50%', '--light-y': '30%', perspective: '1000px' } as React.CSSProperties}>
      
      {/* BACKGROUND SCULPTURE - DESKTOP ONLY (Absolute) */}
      <div className="hidden md:flex absolute inset-0 z-0 items-center justify-center opacity-90 pointer-events-none perspective-[1200px]">
         <motion.div 
           style={{
             rotateX,
             rotateY,
             x: translateX,
             y: translateY,
             WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
             maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)"
           }}
           className="relative w-[80vw] h-[80vw] lg:w-[60vw] lg:h-[60vw] max-w-[900px] max-h-[900px] preserve-3d"
         >
           <Image 
             src="/images/sculpture.jpg" 
             alt="Digital Sculptural Portrait" 
             fill
             priority
             quality={100}
             className="object-contain invert mix-blend-multiply"
             sizes="60vw"
           />
         </motion.div>
      </div>

      {/* FLOATING ORBITS - DESKTOP ONLY */}
      <div className="hidden md:flex absolute inset-0 z-0 items-center justify-center pointer-events-none opacity-30">
        <motion.div 
           style={{ rotate: orbit1Rotate }}
           className="w-[60vw] h-[20vw] rounded-full border border-[#09090B]/30 absolute"
        ></motion.div>
        <motion.div 
           style={{ rotate: orbit2Rotate }}
           className="w-[40vw] h-[40vw] rounded-full border border-[#09090B]/20 absolute"
        ></motion.div>
      </div>

      {/* CONTENT LAYER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1600px] h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 mt-12 md:mt-0"
      >
        
        {/* LEFT COLUMN: Name, Mobile Portrait, & Category */}
        <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center h-full pt-8 md:pt-0">
          
          <motion.div variants={itemVariants} className="mb-8 md:mb-8">
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-600 font-mono block">
              [ Independent Digital Engineer ]
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-editorial text-[clamp(4rem,15vw,6rem)] leading-[0.9] md:text-8xl lg:text-[11rem] md:leading-[0.85] tracking-tight mb-8 md:mb-12 drop-shadow-2xl mix-blend-normal"
          >
            KOSHAL<br />JOSHI
          </motion.h1>

          {/* BACKGROUND SCULPTURE - MOBILE ONLY (In-flow) */}
          <div className="md:hidden relative w-[85vw] h-[85vw] mx-auto mb-10 z-0 flex items-center justify-center opacity-90 pointer-events-none">
             <motion.div 
               style={{
                 rotateX,
                 rotateY,
                 x: translateX,
                 y: translateY,
                 WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
                 maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)"
               }}
               className="relative w-full h-full preserve-3d"
             >
               <Image 
                 src="/images/sculpture.jpg" 
                 alt="Digital Sculptural Portrait" 
                 fill
                 priority
                 quality={100}
                 className="object-contain invert mix-blend-multiply"
                 sizes="85vw"
               />
             </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-12 md:mb-0">
            <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-gray-600 font-medium max-w-xs md:max-w-sm leading-loose md:leading-relaxed">
              AI SOLUTIONS<br className="md:hidden" />
              <span className="hidden md:inline"> / </span>
              WEB DEVELOPMENT<br className="md:hidden" />
              <span className="hidden md:inline"> / </span>
              DIGITAL PRODUCTS
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Intro, Description & CTA */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col justify-center md:items-start h-full pb-20 md:pb-0">
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-2 md:mb-4">
               <span className="text-xs font-mono text-gray-500">01</span>
               <div className="w-12 h-[1px] bg-[#09090B]/20"></div>
            </div>

            <h2 className="text-sm md:text-base tracking-[0.2em] font-sans font-medium uppercase leading-loose text-gray-800">
              I BUILD<br />DIGITAL PRODUCTS<br />THAT SOLVE<br />REAL PROBLEMS.
            </h2>
            
            <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mt-2 max-w-[340px] md:max-w-full">
              From AI-powered tools to full-stack web applications, I help turn ideas into real, working products.
            </p>

            <div className="mt-8 mb-24 md:mb-0">
              <a href="#projects" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] hover:text-[#09090B] text-gray-600 transition-colors">
                View my work
                <span className="w-8 h-8 rounded-full border border-[#09090B]/20 flex items-center justify-center group-hover:bg-[#09090B] group-hover:text-white transition-all">
                   ?
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
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </motion.div>

    </section>
  );
}

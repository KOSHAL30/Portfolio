"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";

function ProjectCard({ project, index, totalProjects, scrollYProgress, activeIndex }: any) {
  // Define the scroll range for this specific project
  const start = index / totalProjects;
  const end = (index + 1) / totalProjects;
  
  const sectionLength = 1 / totalProjects;
  const transitionLength = sectionLength * 0.25; 
  
  const fadeInStart = Math.max(0, start - transitionLength);
  const fadeOutStart = end - transitionLength;
  const fadeOutEnd = Math.min(1, end);

  // Opacity logic
  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, start, fadeOutStart, fadeOutEnd],
    [index === 0 ? 1 : 0, 1, 1, index === totalProjects - 1 ? 1 : 0]
  );

  // Vertical translation logic
  const y = useTransform(
    scrollYProgress,
    [fadeInStart, start, fadeOutStart, fadeOutEnd],
    [index === 0 ? 0 : 80, 0, 0, index === totalProjects - 1 ? 0 : -80]
  );
  
  // Subtle scale logic for the image wrapper
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 1.05]
  );

  const isActive = index === activeIndex;

  // Mouse Parallax for Project Image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-5, 5]);

  return (
    <motion.div 
      style={{ 
        opacity, 
        y,
        zIndex: isActive ? 10 : 1,
        pointerEvents: isActive ? "auto" : "none"
      }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-12 md:pt-0"
    >
      {/* Desktop Metadata */}
      <div className="hidden lg:flex absolute left-0 xl:left-4 top-1/2 -translate-y-1/2 flex-col gap-12 z-20 pointer-events-none text-left">
         <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Project</div>
            <div className="text-sm font-medium font-mono">0{index + 1} / 0{totalProjects}</div>
         </motion.div>
         <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Year</div>
            <div className="text-sm font-medium font-mono">2026</div>
         </motion.div>
      </div>

      <div className="hidden lg:flex absolute right-0 xl:right-4 top-1/2 -translate-y-1/2 flex-col gap-12 z-20 pointer-events-none text-right">
         <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Category</div>
            <div className="text-sm font-medium font-mono uppercase">{project.category}</div>
         </motion.div>
      </div>

      {/* Mobile Meta */}
      <div className="w-full lg:hidden flex justify-between items-center mb-6 px-2">
         <div className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-600">
            0{index + 1} / 0{totalProjects}
         </div>
         <div className="text-right text-[10px] uppercase tracking-widest text-gray-600 font-mono">
            {project.category}
         </div>
      </div>

      {/* Massive Image Container with Parallax */}
      <a 
        href={project.link !== "#" ? project.link : undefined} 
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * 2 - 1;
          const y = (e.clientY - rect.top) / rect.height * 2 - 1;
          mouseX.set(x);
          mouseY.set(y);
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className={`relative w-full lg:w-[80%] aspect-video md:aspect-[16/9] overflow-hidden bg-[#eaeaeb] rounded-xl border border-[#09090B]/5 block group perspective-[1000px] ${isActive ? "cursor-pointer" : ""}`}
      >
        
        {/* Floating Pill on Hover */}
        <div className="absolute top-6 md:top-8 inset-x-0 mx-auto w-max z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
           <div className="flex items-center gap-4 bg-[#FAFAFA]/90 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-[#09090B]/20 text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#09090B]">
             <span>{project.title}</span>
             <div className="w-[1px] h-3 bg-[#09090B]/30"></div>
             <span>See work</span>
           </div>
        </div>

        <motion.div 
          style={{ scale, rotateX, rotateY }} 
          className="w-full h-full absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12 preserve-3d"
        >
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-4 md:p-8 lg:p-12"
            sizes="(max-width: 1024px) 100vw, 80vw"
            quality={100}
            priority={index === 0}
            unoptimized={true}
          />
        </motion.div>
      </a>

      {/* Details Below */}
      <div className="w-full lg:w-[80%] mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
         <div className="flex-1 overflow-hidden">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-sans font-medium tracking-wide mb-2 md:mb-3 uppercase"
            >
              {project.title}
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-gray-600 max-w-md leading-relaxed"
            >
              {project.description}
            </motion.p>
         </div>
         
         <div className="hidden lg:block text-right">
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Tech Stack</div>
            <div className="font-mono text-xs text-gray-500 max-w-[200px] leading-relaxed">{project.tech}</div>
         </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalProjects = siteData.projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        totalProjects - 1,
        Math.floor(latest * totalProjects)
      );
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    });
  }, [scrollYProgress, totalProjects, activeIndex]);

  return (
    <section id="projects" className="relative w-full bg-[#FAFAFA] text-[#09090B]">
      {/* Header section - standard scroll */}
      <div className="pt-32 px-6 md:px-12 lg:px-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center pb-8 lg:pb-16 border-b border-[#09090B]/10"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-6 block">
            WORKS
          </span>
          <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase">
            Selected works
          </h2>
        </motion.div>
      </div>

      {/* Tall container to allow scroll-driven animation */}
      <div ref={containerRef} className="relative w-full" style={{ height: `${totalProjects * 130}vh` }}>
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 lg:px-12">
          
          <div className="w-full h-full max-h-[900px] flex flex-col items-center justify-center relative">
             {siteData.projects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index} 
                  totalProjects={totalProjects} 
                  scrollYProgress={scrollYProgress} 
                  activeIndex={activeIndex} 
                />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}


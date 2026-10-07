"use client";

import { useRef, useState } from "react";
import { siteData } from "@/data/siteData";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalProjects = siteData.projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which project is currently active for pointer-events and z-index logic
    const index = Math.min(
      Math.floor(latest * totalProjects),
      totalProjects - 1
    );
    setActiveIndex(index);
  });

  return (
    <section id="projects" className="bg-atmospheric text-[#09090B] relative" style={{ '--light-x': '70%', '--light-y': '20%' } as React.CSSProperties}>
      
      {/* Header section - standard scroll */}
      <div className="pt-32 px-6 md:px-12 lg:px-12">
        <div className="flex flex-col items-center justify-center pb-8 lg:pb-16 border-b border-[#09090B]/10">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-6">
            WORKS
          </span>
          <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase">
            Selected works
          </h2>
        </div>
      </div>

      {/* Tall container to allow scroll-driven animation */}
      <div ref={containerRef} className="relative w-full" style={{ height: `${totalProjects * 130}vh` }}>
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 lg:px-12">
          
          <div className="w-full h-full max-h-[900px] flex flex-col items-center justify-center relative">
             {siteData.projects.map((project, index) => {
                
                // Define the scroll range for this specific project
                const start = index / totalProjects;
                const end = (index + 1) / totalProjects;
                
                const sectionLength = 1 / totalProjects;
                const transitionLength = sectionLength * 0.25; // 25% of a section length for crossfade
                
                const fadeInStart = Math.max(0, start - transitionLength);
                const fadeOutStart = end - transitionLength;
                const fadeOutEnd = Math.min(1, end);

                // Opacity logic
                const opacity = useTransform(
                  scrollYProgress,
                  [
                    fadeInStart,
                    start,
                    fadeOutStart,
                    fadeOutEnd
                  ],
                  [
                    index === 0 ? 1 : 0, 
                    1, 
                    1, 
                    index === totalProjects - 1 ? 1 : 0
                  ]
                );

                // Vertical translation logic
                const y = useTransform(
                  scrollYProgress,
                  [
                    fadeInStart,
                    start,
                    fadeOutStart,
                    fadeOutEnd
                  ],
                  [
                    index === 0 ? 0 : 40,
                    0,
                    0,
                    index === totalProjects - 1 ? 0 : -40
                  ]
                );
                
                // Subtle scale logic
                const scale = useTransform(
                  scrollYProgress,
                  [start, end],
                  [1, 1.05]
                );

                const isActive = index === activeIndex;

                return (
                  <motion.div 
                    key={index}
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
                       <div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Project</div>
                          <div className="text-sm font-medium font-mono">0{index + 1} / 0{totalProjects}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Year</div>
                          <div className="text-sm font-medium font-mono">2026</div>
                       </div>
                    </div>

                    <div className="hidden lg:flex absolute right-0 xl:right-4 top-1/2 -translate-y-1/2 flex-col gap-12 z-20 pointer-events-none text-right">
                       <div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Category</div>
                          <div className="text-sm font-medium font-mono uppercase">{project.category}</div>
                       </div>
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

                    {/* Massive Image Container */}
                    <a href={project.link !== "#" ? project.link : undefined} className={`relative w-full lg:w-[80%] aspect-video md:aspect-[16/9] overflow-hidden bg-[#0a0a0a] rounded-xl border border-white/5 block group ${isActive ? "cursor-pointer" : ""}`}>
                      
                      {/* Floating Pill on Hover */}
                      <div className="absolute top-6 md:top-8 inset-x-0 mx-auto w-max z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                         <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-[#09090B]/20 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                           <span>{project.title}</span>
                           <div className="w-[1px] h-3 bg-white/30"></div>
                           <span>See work</span>
                         </div>
                      </div>

                      <motion.div style={{ scale }} className="w-full h-full absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12">
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
                       <div className="flex-1">
                          <h3 className="text-2xl md:text-4xl font-sans font-medium tracking-wide mb-2 md:mb-3 uppercase">{project.title}</h3>
                          <p className="text-sm text-gray-600 max-w-md leading-relaxed">{project.description}</p>
                       </div>
                       
                       <div className="hidden lg:block text-right">
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Tech Stack</div>
                          <div className="font-mono text-xs text-gray-300 max-w-[200px] leading-relaxed">{project.tech}</div>
                       </div>
                    </div>

                  </motion.div>
                );
             })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";

export default function Projects() {
  const totalProjects = siteData.projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto sliding interval (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalProjects]);

  const getSlot = (index: number, active: number) => {
    if (index === active) return 'center';
    if (index === (active + 1) % totalProjects) return 'right';
    return 'left';
  };

  const variants = {
    left: { x: "-85%", scale: 0.88, zIndex: 1, opacity: 0.35 },
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1 },
    right: { x: "85%", scale: 0.88, zIndex: 1, opacity: 0.35 },
  };

  const projectCategories = [
    "01 / CONVERSATIONAL INTELLIGENCE",
    "02 / GOV-TECH & EDUCATION",
    "03 / MULTIPLAYER COLLABORATION",
  ];

  return (
    <section id="projects" className="relative w-full bg-[#FAFAFA] text-[#09090B] py-32 overflow-hidden">
      
      {/* Header with Signature Cursive Contrast */}
      <div className="px-6 md:px-12 lg:px-16 overflow-hidden mb-16 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-[#09090B]/10 gap-6 md:gap-0"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-4 block">
              [ Portfolio Showcase ]
            </span>
            <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-none">
              Selected <span className="font-cursive lowercase text-4xl sm:text-6xl md:text-7xl text-gray-500 font-normal">works</span>
            </h2>
          </div>

          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400">
            0{activeIndex + 1} &mdash; 0{totalProjects} / Interactive Carousel
          </span>
        </motion.div>
      </div>

      {/* Sliding Sheets Carousel */}
      <div className="relative w-full h-[62vh] md:h-[72vh] lg:h-[80vh] flex items-center justify-center perspective-[1200px]">
        {siteData.projects.map((project, index) => {
          const slot = getSlot(index, activeIndex);
          const isActive = slot === 'center';

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={slot}
              variants={variants}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[88%] md:w-[72%] lg:w-[62%] h-full flex flex-col transform-gpu will-change-transform"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              
              {/* Harsha-style Metadata Header */}
              <div className={`flex justify-between items-center mb-3 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-gray-500 font-medium">
                  {projectCategories[index] || `0${index + 1} / DIGITAL PRODUCT`}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-gray-400">
                  Case Study
                </span>
              </div>

              {/* Massive Image Container with Minimal Zoom Effect */}
              <a
                href={project.link !== "#" ? project.link : undefined}
                target={project.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="relative w-full flex-1 overflow-hidden bg-[#ECECED] rounded-2xl border border-[#09090B]/10 block group shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.012] hover:shadow-2xl cursor-pointer"
              >
                {/* Floating Pill on Hover */}
                {isActive && (
                  <div className="absolute top-6 md:top-8 inset-x-0 mx-auto w-max z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-1">
                     <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#09090B]/15 text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#09090B] shadow-lg">
                       <span>{project.title}</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                       <span>Explore Live &rarr;</span>
                     </div>
                  </div>
                )}

                {/* Inner Image with Smooth Minimal Zoom on Hover */}
                <div className="w-full h-full absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-contain opacity-95 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] p-3 md:p-6 lg:p-10"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    quality={100}
                    priority={index === 0}
                    unoptimized={true}
                  />
                </div>
              </a>

              {/* Details Below with Refined Typography */}
              <div className={`w-full mt-5 flex flex-col md:flex-row justify-between items-start gap-4 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                 <div className="flex-1 overflow-hidden">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-sans font-medium tracking-wide uppercase flex items-baseline gap-3">
                      <span className="font-bold text-[#09090B]">{project.title}</span>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 max-w-lg leading-relaxed mt-1 font-light">
                      {project.description}
                    </p>
                 </div>
                 
                 <div className="hidden sm:flex flex-col items-start md:items-end text-left md:text-right">
                    <div className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mb-1">Architecture</div>
                    <div className="flex flex-wrap gap-1.5 justify-start md:justify-end max-w-xs">
                      {project.tech.split(' / ').map((t, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#09090B]/[0.04] border border-[#09090B]/5 text-gray-600 hover-zoom-subtle"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                 </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Carousel Controls with Minimal Zoom on Buttons */}
      <div className="mt-12 flex justify-center items-center gap-3">
        {siteData.projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer hover:scale-110 ${activeIndex === index ? "w-10 bg-[#09090B]" : "w-3 bg-[#09090B]/20 hover:bg-[#09090B]/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

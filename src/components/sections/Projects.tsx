"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";

export default function Projects() {
  const totalProjects = siteData.projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto sliding interval (7 seconds)
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
    left: { x: "-85%", scale: 0.85, zIndex: 1, opacity: 0.4 },
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1 },
    right: { x: "85%", scale: 0.85, zIndex: 1, opacity: 0.4 },
  };

  return (
    <section id="projects" className="relative w-full bg-[#FAFAFA] text-[#09090B] py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-12 overflow-hidden mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center pb-8 border-b border-[#09090B]/10"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-6 block">
            WORKS
          </span>
          <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase">
            Selected works
          </h2>
        </motion.div>
      </div>

      {/* Sliding Sheets Carousel */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center perspective-[1200px]">
        {siteData.projects.map((project, index) => {
          const slot = getSlot(index, activeIndex);
          const isActive = slot === 'center';

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={slot}
              variants={variants}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[85%] md:w-[70%] lg:w-[60%] h-full flex flex-col"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              
              {/* Massive Image Container */}
              <a
                data-cursor="VIEW WORK"
                href={project.link !== "#" ? project.link : undefined}

              >
                {/* Floating Pill on Hover */}
                {isActive && (
                  <div className="absolute top-6 md:top-8 inset-x-0 mx-auto w-max z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <div className="flex items-center gap-4 bg-[#FAFAFA]/90 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-[#09090B]/20 text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#09090B]">
                       <span>{project.title}</span>
                       <div className="w-[1px] h-3 bg-[#09090B]/30"></div>
                       <span>See work</span>
                     </div>
                  </div>
                )}

                <div className="w-full h-full absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12">
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
                </div>
              </a>

              {/* Details Below */}
              <div className={`w-full mt-6 flex flex-col md:flex-row justify-between items-start gap-4 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                 <div className="flex-1 overflow-hidden">
                    <h3 className="text-xl md:text-3xl font-sans font-medium tracking-wide mb-2 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 max-w-md leading-relaxed">
                      {project.description}
                    </p>
                 </div>
                 
                 <div className="hidden lg:block text-right">
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Tech Stack</div>
                    <div className="font-mono text-xs text-gray-500 max-w-[200px] leading-relaxed">{project.tech}</div>
                 </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Carousel Controls */}
      <div className="mt-12 flex justify-center items-center gap-4">
        {siteData.projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1 transition-all duration-300 ${activeIndex === index ? "w-8 bg-[#09090B]" : "w-4 bg-[#09090B]/20 hover:bg-[#09090B]/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}


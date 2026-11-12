"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import RevealText from "@/components/ui/RevealText";

const AUTOPLAY_MS = 5000;

export default function Projects() {
  const totalProjects = siteData.projects.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  // Autoplay only while visible, not hovered, and not under reduced motion.
  // Stops for good once the visitor navigates manually.
  const autoplaying = isAutoScroll && inView && !isHovered && !reduceMotion;

  useEffect(() => {
    if (!autoplaying) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [totalProjects, autoplaying, activeIndex]);

  const handlePrev = () => {
    setIsAutoScroll(false);
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const handleNext = () => {
    setIsAutoScroll(false);
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const handleSelect = (index: number) => {
    setIsAutoScroll(false);
    setActiveIndex(index);
  };

  const getSlot = (index: number, active: number) => {
    if (index === active) return 'center';
    if (index === (active + 1) % totalProjects) return 'right';
    return 'left';
  };

  // Side sheets fall out of focus: blur reads as depth, not just distance.
  const variants = {
    left: { x: "-85%", scale: 0.88, zIndex: 1, opacity: 0.4, filter: "blur(3px)" },
    // filter: none once settled, so the active card's backdrop-filter can see behind it
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } },
    right: { x: "85%", scale: 0.88, zIndex: 1, opacity: 0.4, filter: "blur(3px)" },
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); handlePrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); }
  };

  const projectCategories = [
    "01 / CONVERSATIONAL INTELLIGENCE",
    "02 / GOV-TECH & EDUCATION",
    "03 / MULTIPLAYER COLLABORATION",
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-[#FAFAFA] text-[#09090B] py-16 md:py-20 lg:py-24 overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 overflow-hidden mb-10 md:mb-14 max-w-[1600px] mx-auto">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 md:pb-8 border-b border-[#09090B]/10 gap-6 md:gap-0"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-4 block">
              [ Portfolio Showcase ]
            </span>
            <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-none">
              <RevealText lines={["Selected works"]} />
            </h2>
          </div>

          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400 tabular-nums" aria-live="polite">
            0{activeIndex + 1} &mdash; 0{totalProjects} / Interactive Carousel
          </span>
        </div>
      </div>

      {/* Sliding Sheets Carousel */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected works. Use the left and right arrow keys to browse."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-[54vh] md:h-[62vh] lg:h-[68vh] min-h-[440px] md:min-h-[500px] max-h-[700px] flex items-center justify-center perspective-[1200px]"
      >
        {/* Backdrop for the glass: soft ink orbs over a fading dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(9,9,11,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_65%)]" />
          {/* Orbs stay inside the card area: below the cards they would darken the page into a visible band */}
          <div className="absolute left-[18%] top-[8%] w-[34vw] max-w-[480px] h-[56%] rounded-full bg-[radial-gradient(closest-side,rgba(9,9,11,0.22),transparent)] blur-2xl" />
          <div className="absolute right-[16%] top-[20%] w-[28vw] max-w-[400px] h-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(9,9,11,0.16),transparent)] blur-2xl" />
        </div>
        
        {/* Edge fades: side sheets dissolve into the page instead of being cut by the viewport.
            Overlays, not a mask, so the active card's backdrop-filter keeps working. */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[14vw] bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[14vw] bg-gradient-to-l from-[#FAFAFA] to-transparent" />

        {/* Left Arrow Button (Glassmorphism) */}
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="absolute left-2 sm:left-4 md:left-8 lg:left-12 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-[#09090B] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#09090B] transition-transform duration-300 group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Right Arrow Button (Glassmorphism) */}
        <button
          onClick={handleNext}
          aria-label="Next project"
          className="absolute right-2 sm:right-4 md:right-8 lg:right-12 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-[#09090B] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#09090B] transition-transform duration-300 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {siteData.projects.map((project, index) => {
          const slot = getSlot(index, activeIndex);
          const isActive = slot === 'center';

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={slot}
              variants={variants}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[88%] md:w-[72%] lg:w-[62%] h-full flex flex-col transform-gpu will-change-transform"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              aria-hidden={!isActive}
              inert={!isActive}
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
                className={`relative w-full flex-1 overflow-hidden rounded-2xl block group bg-white/20 backdrop-blur-2xl backdrop-saturate-150 border border-[#09090B]/[0.06] shadow-[0_24px_60px_-34px_rgba(9,9,11,0.3)] transition-shadow duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${project.link !== "#" ? "hover:shadow-[0_30px_60px_-30px_rgba(9,9,11,0.35)] cursor-pointer" : "cursor-default"}`}
              >
                {/* Floating Pill on Hover */}
                {isActive && project.link !== "#" && (
                  <div className="absolute bottom-4 md:bottom-5 inset-x-0 mx-auto w-max z-20 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
                     <div className="flex items-center gap-3 bg-[#09090B]/85 backdrop-blur-md px-5 py-2.5 rounded-full text-[10px] md:text-xs font-medium uppercase tracking-wider text-white shadow-[0_10px_30px_-12px_rgba(9,9,11,0.5)]">
                       <span>{project.title}</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                       <span className="inline-flex items-center gap-1.5">
                         Explore Live
                         <svg aria-hidden className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                       </span>
                     </div>
                  </div>
                )}

                {/* Inner Image with Smooth Minimal Zoom on Hover */}
                <div className="w-full h-full absolute inset-0 flex items-center justify-center p-3 md:p-5 lg:p-6 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1024}
                    height={592}
                    className="w-auto h-auto max-w-full max-h-full rounded-lg md:rounded-xl ring-1 ring-[#09090B]/[0.06] shadow-[0_18px_40px_-24px_rgba(9,9,11,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
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
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-sans font-medium tracking-wide uppercase flex items-baseline gap-3">
                        <span className="font-bold text-[#09090B]">{project.title}</span>
                      </h3>
                      {project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/live inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#09090B] text-white text-[10px] md:text-xs font-mono uppercase tracking-wider hover:bg-[#09090B]/85 transition-colors shadow-sm"
                        >
                          <span>Explore Live</span>
                          <svg aria-hidden className="w-3 h-3 text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </a>
                      )}
                    </div>
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
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#09090B]/[0.05] text-gray-600 hover-zoom-subtle"
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
      <div className="mt-8 md:mt-10 mx-auto w-max flex justify-center items-center gap-3 px-4 py-2.5 rounded-full bg-white/50 backdrop-blur-md shadow-[0_8px_24px_-14px_rgba(9,9,11,0.25)]">
        {siteData.projects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`relative h-1.5 rounded-full overflow-hidden transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${activeIndex === index ? "w-10 bg-[#09090B]/25" : "w-3 bg-[#09090B]/20 hover:bg-[#09090B]/50"}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
          >
            {/* Active dot doubles as the autoplay timer; solid once autoplay stops */}
            {activeIndex === index && (
              <motion.span
                key={`${activeIndex}-${autoplaying}`}
                className="absolute inset-0 origin-left bg-[#09090B]"
                initial={{ scaleX: autoplaying ? 0 : 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: autoplaying ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

    </section>
  );
}

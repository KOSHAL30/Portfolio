"use client";

import { useRef } from "react";
import { siteData } from "@/data/siteData";

import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-12 bg-black text-white overflow-hidden">
      
      <div className="mb-24 flex flex-col items-center justify-center border-b border-white/10 pb-16">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-6">
          WORKS
        </span>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter">
          Selected works
        </h2>
      </div>

      <div className="space-y-40">
        {siteData.projects.map((project, index) => (
          <ProjectCard key={index} project={project as unknown as Record<string, string>} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);

  // In Cosmos Studio, images are massive and centered, with meta data on left/right edges
  return (
    <div ref={ref} className="group relative flex flex-col items-center w-full">
      
      {/* Meta Data Sidebar - Absolute positioned on Desktop */}
      <div className="hidden lg:block absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 text-left z-10 pointer-events-none">
         <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">ID</div>
         <div className="text-sm font-medium">{project.id}</div>
      </div>

      <div className="hidden lg:block absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 text-right z-10 pointer-events-none">
         <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Niche</div>
         <div className="text-sm font-medium">{project.category}</div>
      </div>

      {/* Massive Image Container */}
      <a href={project.link !== "#" ? project.link : undefined} className="relative w-full lg:w-[80%] aspect-video md:aspect-[16/9] overflow-hidden bg-[#0a0a0a] rounded-2xl border border-white/5 block">
        
        {/* Floating Pill on Hover */}
        <div className="absolute top-8 inset-x-0 mx-auto w-max z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
           <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium uppercase tracking-wider">
             <span>{project.title}</span>
             <div className="w-[1px] h-3 bg-white/30"></div>
             <span>See work</span>
           </div>
        </div>

        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className="object-cover md:object-contain opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out p-0 md:p-12"
          sizes="100vw"
          quality={100}
        />
      </a>

      {/* Mobile Meta Data & Details */}
      <div className="w-full lg:w-[80%] mt-8 flex flex-col md:flex-row justify-between items-start gap-8">
         <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">{project.title}</h3>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">{project.description}</p>
         </div>
         
         <div className="flex flex-row md:flex-col gap-8 md:gap-4 md:text-right w-full md:w-auto justify-between md:justify-start">
            <div className="lg:hidden">
               <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Niche</div>
               <div className="text-sm font-medium">{project.category}</div>
            </div>
            <div>
               <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Tech Stack</div>
               <div className="font-mono text-xs text-gray-300 max-w-[200px]">{project.tech}</div>
            </div>
         </div>
      </div>

    </div>
  );
}

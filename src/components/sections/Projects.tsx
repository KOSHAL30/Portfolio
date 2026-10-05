"use client";

import { useRef } from "react";
import { siteData } from "@/data/siteData";

import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-12 bg-black text-white">
      
      <div className="mb-24 flex justify-between items-end border-b border-white/20 pb-8">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
          Selected<br/>Works
        </h2>
        <span className="text-xs uppercase tracking-widest text-gray-400">
          [ 2024 — Present ]
        </span>
      </div>

      <div className="space-y-40">
        {siteData.projects.map((project, index) => (
          <ProjectCard key={index} project={project as unknown as Record<string, string>} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Record<string, string>, index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // JARVIS gets a full-width hero presentation
  const isFeatured = index === 0;

  return (
    <div ref={ref} className={`group relative flex ${isFeatured ? 'flex-col gap-12' : 'flex-col md:flex-row gap-12 items-center'}`}>
      
      {/* Editorial Text Block */}
      <div className={`${isFeatured ? 'w-full grid grid-cols-1 md:grid-cols-2 gap-8' : 'w-full md:w-1/3 flex flex-col'} ${!isFeatured && index % 2 !== 0 ? 'md:order-2' : ''}`}>
        <div className="overflow-hidden">
          <span className="block text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">
            [ {project.id} — {project.category} ]
          </span>
          <h3 className={`font-display font-bold tracking-tight uppercase leading-none mb-6 ${isFeatured ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
            {project.title}
          </h3>
        </div>
        <div className={`${isFeatured ? 'flex flex-col justify-end' : ''}`}>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
            {project.description}
          </p>
          
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
              [ Tech Stack ]
            </span>
            <p className="text-xs uppercase tracking-[0.1em] text-gray-300 mt-2 font-mono">
              {project.tech}
            </p>
          </div>

          {project.link && project.link !== "#" && (
            <a href={project.link} className="inline-block border-b border-white pb-1 text-xs uppercase tracking-[0.2em] font-bold hover:text-gray-400 hover:border-gray-400 transition-colors">
              Explore Project
            </a>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div className={`${isFeatured ? 'w-full aspect-[16/9]' : 'w-full md:w-2/3 aspect-video md:aspect-[4/3]'} relative overflow-hidden bg-[#0a0a0a] rounded-sm ${!isFeatured && index % 2 !== 0 ? 'md:order-1' : ''} border border-white/5`}>
        <div className="absolute inset-0 w-full h-full p-4 md:p-8 flex items-center justify-center">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-4 md:p-8"
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={100}
            unoptimized={true}
            priority={isFeatured}
          />
        </div>
      </div>

    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const SceneContainer = dynamic(() => import("@/components/canvas/SceneContainer"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent z-0" />
});
const HeroCharacter = dynamic(() => import("@/components/canvas/HeroCharacter"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-end px-6 md:px-12 lg:px-12 pb-24 overflow-hidden bg-black text-white">
      
      {/* 3D Background Layer - Full screen */}
      <div className="absolute inset-0 z-0 opacity-100">
        <SceneContainer className="w-full h-full">
          <HeroCharacter />
        </SceneContainer>
      </div>

      {/* Content Layer - Editorial Stark Layout */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-12">
        
        {/* Massive Typography Left */}
        <div className="w-full md:w-3/4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like ease out
            className="overflow-hidden"
          >
            <h1 className="font-display text-[15vw] md:text-[12vw] font-bold tracking-tighter leading-[0.85] uppercase text-white mix-blend-difference">
              KOSHAL<br />JOSHI
            </h1>
          </motion.div>
        </div>

        {/* Technical Subtitle Right */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full md:w-1/4 flex flex-col gap-8 md:text-right"
        >
          <p className="text-sm md:text-base font-light text-gray-400 tracking-wide uppercase leading-relaxed border-l md:border-l-0 md:border-r border-white/20 pl-4 md:pl-0 md:pr-4">
            Independent Digital Engineer & Web Developer. Building highly performant, conversion-focused digital experiences for forward-thinking brands.
          </p>
          
          <div className="flex md:justify-end">
            <span className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Available for Work
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

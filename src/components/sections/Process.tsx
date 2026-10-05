"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="process" ref={containerRef} className="py-32 px-6 md:px-12 lg:px-12 bg-atmospheric text-white relative" style={{ '--light-x': '10%', '--light-y': '80%' } as React.CSSProperties}>
      
      <motion.div style={{ opacity }} className="mb-24 flex justify-between items-end border-b border-white/20 pb-8">
        <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase">
          Methodology
        </h2>
        <span className="text-xs uppercase tracking-widest text-gray-400">
          [ The Approach ]
        </span>
      </motion.div>

      <div className="flex flex-col border-t border-white/20">
        {siteData.process.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group flex flex-col md:flex-row border-b border-white/20 py-12 md:py-16 hover:bg-white/5 transition-colors px-4 md:px-0"
          >
            {/* Number */}
            <div className="w-full md:w-1/6 mb-6 md:mb-0">
              <span className="font-sans text-3xl md:text-5xl font-medium text-gray-500 group-hover:text-white transition-colors">
                {item.step}
              </span>
            </div>

            {/* Title */}
            <div className="w-full md:w-2/6 mb-6 md:mb-0 pr-8">
              <h3 className="font-sans text-3xl md:text-4xl font-medium uppercase tracking-wide">
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <div className="w-full md:w-3/6 flex flex-col justify-center">
              <p className="text-gray-400 md:text-lg font-light leading-relaxed max-w-lg group-hover:text-gray-300 transition-colors">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500">
          Clear communication. Defined scope. No unnecessary complexity.
        </p>
      </div>
    </section>
  );
}

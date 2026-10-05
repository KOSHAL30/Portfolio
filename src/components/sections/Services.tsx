"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 lg:px-12 bg-atmospheric text-white" style={{ '--light-x': '30%', '--light-y': '50%' } as React.CSSProperties}>
      
      <div className="mb-24 flex justify-between items-end border-b border-white/20 pb-8">
        <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase">
          Capabilities
        </h2>
        <span className="text-xs uppercase tracking-widest text-gray-400">
          [ Engineering & Design ]
        </span>
      </div>

      <div className="flex flex-col border-t border-white/20">
        {siteData.services.map((service, index) => (
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
              <span className="font-sans text-2xl font-medium text-gray-500 group-hover:text-white transition-colors">
                0{index + 1}
              </span>
            </div>

            {/* Title & Price */}
            <div className="w-full md:w-2/6 mb-6 md:mb-0 pr-8">
              <h3 className="font-sans text-3xl md:text-4xl font-medium uppercase tracking-wide mb-4">
                {service.title}
              </h3>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors">
                {service.price}
              </span>
            </div>

            {/* Description & Features */}
            <div className="w-full md:w-3/6 flex flex-col justify-between">
              <p className="text-gray-300 md:text-lg font-light leading-relaxed mb-10 max-w-lg">
                {service.description}
              </p>
              
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-mono">
                  [ Include ]
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-xs uppercase tracking-widest text-gray-400">
                  {service.features.map((feature, fIndex) => (
                    <span key={fIndex} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-white rounded-full opacity-30" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <p className="text-gray-400 text-sm md:text-base font-light max-w-md">
          Every project is scoped around the business, content and functionality required.
        </p>
        <a 
          href="#contact" 
          className="group inline-flex items-center gap-4 text-xl md:text-3xl font-editorial font-bold uppercase tracking-wide hover:text-gray-300 transition-colors"
        >
          Start A Project
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </a>
      </div>
    </section>
  );
}

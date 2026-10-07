"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-12 lg:px-16 bg-[#FAFAFA] text-[#09090B] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start gap-6 border-b border-[#09090B]/10 pb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-mono block">
            [ Methodology ]
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase max-w-2xl leading-none md:text-right"
          >
            How we get there.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {siteData.process.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="relative flex flex-col group"
            >
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#09090B]/10">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeInOut" }}
                  className="h-full bg-[#09090B] origin-left"
                ></motion.div>
              </div>

              <div className="pt-6 flex flex-col h-full">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 mb-6">
                  PHASE {step.step}
                </span>
                <h3 className="text-2xl font-sans font-medium uppercase tracking-wide mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

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

        <div className="flex flex-col border-t border-[#09090B]/10">
          {siteData.process.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-16 md:py-24 border-b border-[#09090B]/10 gap-8 hover:bg-[#09090B]/[0.02] transition-colors duration-500 px-4 -mx-4 rounded-xl"
            >
              {/* Left Side: Number & Title */}
              <div className="flex flex-col md:w-1/2">
                <span className="text-xs md:text-sm font-mono tracking-widest text-gray-400 mb-8">
                  [ PHASE {step.step} ]
                </span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-editorial uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {step.title}
                </h3>
              </div>

              {/* Right Side: Description */}
              <div className="md:w-5/12 pt-4 md:pt-0">
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
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

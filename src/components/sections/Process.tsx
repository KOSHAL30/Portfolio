"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-12 lg:px-16 bg-[#FAFAFA] text-[#09090B] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#09090B]/10 pb-8">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-mono block mb-4">
              [ Methodology ]
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase max-w-2xl leading-none"
            >
              How we get <span className="font-cursive lowercase text-4xl sm:text-6xl md:text-7xl text-gray-500 font-normal">there.</span>
            </motion.h2>
          </div>

          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-mono">
            Structured Execution &bull; Zero Fluff
          </span>
        </div>

        <div className="flex flex-col border-t border-[#09090B]/10">
          {siteData.process.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-16 md:py-20 border-b border-[#09090B]/10 gap-8 hover:bg-[#09090B]/[0.015] hover:scale-[1.01] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-6 -mx-6 rounded-2xl cursor-default"
            >
              {/* Left Side: Number & Title */}
              <div className="flex flex-col md:w-1/2">
                <span className="text-xs md:text-sm font-mono tracking-widest text-gray-400 mb-6">
                  [ PHASE {step.step} ]
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-editorial uppercase tracking-tight group-hover:translate-x-3 transition-transform duration-500">
                  {step.title}
                </h3>
              </div>

              {/* Right Side: Description */}
              <div className="md:w-5/12 pt-2 md:pt-0">
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed font-light">
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

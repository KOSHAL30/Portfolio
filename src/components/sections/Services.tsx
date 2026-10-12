"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Services() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-32 px-6 md:px-12 lg:px-16 bg-[#FAFAFA] text-[#09090B] overflow-hidden max-w-[1600px] mx-auto">
      
      {/* Header with Cursive Accent */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 border-b border-[#09090B]/10 pb-8">
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-mono mb-4 block">
            [ Core Capabilities ]
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-editorial text-[clamp(3rem,10vw,4.5rem)] md:text-6xl lg:text-7xl tracking-tight uppercase leading-none"
          >
            Capabilities <span className="font-cursive lowercase text-4xl sm:text-6xl md:text-7xl text-gray-400 font-normal">&amp; engineering</span>
          </motion.h2>
        </div>

        <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-mono">
          Architecture &bull; Implementation &bull; Scale
        </span>
      </div>

      {/* Services List with Minimal Zoom Effect */}
      <div className="flex flex-col border-t border-[#09090B]/10">
        {siteData.services.map((service, index) => (
          <motion.div 
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="group border-b border-[#09090B]/10 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 hover:bg-[#09090B]/[0.015] hover:scale-[1.01] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-6 -mx-6 rounded-2xl cursor-default"
          >
            
            {/* Left: Number, Title & Pricing Badge */}
            <div className="w-full md:w-1/3 flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-gray-400">
                0{index + 1}
              </span>
              <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-sans font-medium uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                {service.title}
              </motion.h3>
              <motion.span variants={itemVariants} className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                {service.price}
              </motion.span>
            </div>

            {/* Middle: Description */}
            <div className="w-full md:w-1/3">
              <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
                {service.description}
              </motion.p>
            </div>

            {/* Right: Deliverables as Sleek Pills (Referencing Harsha) */}
            <div className="w-full md:w-1/3">
              <ul className="flex flex-wrap md:flex-col gap-2.5">
                {service.features.map((feature, fIndex) => (
                  <motion.li 
                    variants={itemVariants}
                    key={fIndex} 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#09090B]/5 shadow-sm text-xs text-gray-600 font-mono tracking-wide hover-zoom-subtle"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#09090B]"></span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

          </motion.div>
        ))}
      </div>
      
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Services() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-32 px-6 md:px-12 lg:px-12 bg-[#FAFAFA] text-[#09090B] overflow-hidden">
      
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 border-b border-[#09090B]/10 pb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-editorial text-[clamp(3rem,10vw,4.5rem)] md:text-6xl lg:text-7xl tracking-tight uppercase leading-none"
        >
          Capabilities
        </motion.h2>
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-mono">
          [ Engineering & Design ]
        </span>
      </div>

      <div className="flex flex-col border-t border-[#09090B]/10">
        {siteData.services.map((service, index) => (
          <motion.div 
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="group border-b border-[#09090B]/10 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 hover:bg-[#09090B]/[0.02] transition-colors duration-500 px-4 -mx-4 rounded-xl"
          >
            
            {/* Left: Title & Price */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-sans font-medium uppercase tracking-wide">
                {service.title}
              </motion.h3>
              <motion.span variants={itemVariants} className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                {service.price}
              </motion.span>
            </div>

            {/* Middle: Description */}
            <div className="w-full md:w-1/3">
              <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-sm md:text-base">
                {service.description}
              </motion.p>
            </div>

            {/* Right: Features */}
            <div className="w-full md:w-1/3">
              <ul className="flex flex-col gap-3">
                {service.features.map((feature, fIndex) => (
                  <motion.li 
                    variants={itemVariants}
                    key={fIndex} 
                    className="flex items-start gap-3 text-xs md:text-sm text-gray-500 font-mono uppercase tracking-wider"
                  >
                    <span className="text-[#09090B] mt-0.5">+</span>
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

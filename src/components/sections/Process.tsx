"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { siteData } from "@/data/siteData";
import RevealText, { EASE_OUT_EXPO } from "@/components/ui/RevealText";

export default function Process() {
  // A spine that fills as you read down the phases: progress through the process.
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="process" className="py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-16 bg-[#FAFAFA] text-[#09090B] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#09090B]/10 pb-6 md:pb-8">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-mono block mb-4">
              [ Methodology ]
            </span>
            <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase max-w-2xl leading-none">
              <RevealText lines={["How we get there."]} />
            </h2>
          </div>

          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-mono">
            Structured Execution &bull; Zero Fluff
          </span>
        </div>

        <div ref={listRef} className="relative flex flex-col border-t border-[#09090B]/10">
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="hidden md:block absolute -left-6 lg:-left-10 top-0 bottom-0 w-px origin-top bg-[#09090B]"
          />
          {siteData.process.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-14 border-b border-[#09090B]/10 gap-8 hover:bg-[#09090B]/[0.02] transition-colors duration-500 px-6 -mx-6"
            >
              <span aria-hidden className="row-rule" />
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

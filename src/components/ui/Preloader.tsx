"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PRELOADER_HOLD_MS, PRELOADER_EXIT_S } from "@/lib/intro";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load so the hero entrance plays from the start
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), PRELOADER_HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: PRELOADER_EXIT_S, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#09090B] text-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden"
          aria-hidden
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%", transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-8xl md:text-[12rem] tracking-tight leading-none"
            >
              KJ
            </motion.div>
          </div>

          <div className="mt-8 h-px w-[200px] bg-white/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: PRELOADER_HOLD_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
              className="h-full w-full origin-left bg-white/60"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

// Masked line-rise: each line slides up from behind its own baseline, like
// type being set. The one shared reveal material for every display heading.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function RevealText({
  lines,
  className = "",
  delay = 0,
  onMount = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  /** Play on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
}) {
  const trigger = onMount
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <motion.span
      {...trigger}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
      className={`block ${className}`}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "105%", rotate: 2 },
              visible: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: EASE_OUT_EXPO } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

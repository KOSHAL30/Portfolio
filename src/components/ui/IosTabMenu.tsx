"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { AnimationItem } from "lottie-web";

type TabKey = "P" | "W" | "S" | "A" | "Pr";

const TAB_CONFIG: { key: TabKey; label: string; targetId: string }[] = [
  { key: "P", label: "Home", targetId: "home" },
  { key: "W", label: "Projects", targetId: "projects" },
  { key: "S", label: "Capabilities", targetId: "services" },
  { key: "A", label: "Methodology", targetId: "process" },
  { key: "Pr", label: "Contact", targetId: "contact" },
];

const TRANSITION_SEGMENTS: Record<string, [number, number]> = {
  PnW: [10, 43],
  WnS: [60, 93],
  SnA: [120, 153],
  AnPr: [180, 212],
  PrnS: [240, 273],
  SnP: [300, 333],
  PnA: [360, 393],
  AnW: [420, 453],
  WnPr: [480, 513],
  PrnP: [540, 573],
  PnPr: [599, 633],
  PrnW: [659, 693],
  WnP: [719, 753],
  PnS: [779, 813],
  SnW: [839, 873],
  WnA: [899, 933],
  AnP: [959, 993],
  AnS: [1079, 1113],
  SnPr: [1139, 1173],
  PrnA: [1199, 1233],
};

const IDLE_FRAMES: Record<TabKey, number> = {
  P: 0,
  W: 43,
  S: 93,
  A: 153,
  Pr: 212,
};

export default function IosTabMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const currentTabRef = useRef<TabKey>("P");
  const [activeTab, setActiveTab] = useState<TabKey>("P");
  const isTransitioningRef = useRef(false);

  // Initialize Lottie
  useEffect(() => {
    let anim: AnimationItem | null = null;
    let isMounted = true;

    async function loadLottie() {
      const lottie = (await import("lottie-web")).default;
      if (!containerRef.current || !isMounted) return;

      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/lottie/ios-tab-menu.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });

      anim.addEventListener("DOMLoaded", () => {
        if (!isMounted) return;
        anim?.goToAndStop(IDLE_FRAMES[currentTabRef.current], true);

        // Adjust SVG viewBox to focus on the tab bar dock
        const svg = containerRef.current?.querySelector("svg");
        if (svg) {
          svg.setAttribute("viewBox", "40 215 720 170");
          svg.style.width = "100%";
          svg.style.height = "100%";
          svg.style.display = "block";
        }
      });

      animRef.current = anim;
    }

    loadLottie();

    return () => {
      isMounted = false;
      anim?.destroy();
      animRef.current = null;
    };
  }, []);

  const switchTab = useCallback((toTab: TabKey, scroll = true) => {
    const fromTab = currentTabRef.current;
    if (fromTab === toTab) return;

    const transitionKey = `${fromTab}n${toTab}`;
    const segment = TRANSITION_SEGMENTS[transitionKey];

    if (animRef.current && segment) {
      isTransitioningRef.current = true;
      animRef.current.playSegments(segment, true);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 550);
    } else if (animRef.current) {
      animRef.current.goToAndStop(IDLE_FRAMES[toTab], true);
    }

    currentTabRef.current = toTab;
    setActiveTab(toTab);

    if (scroll) {
      const config = TAB_CONFIG.find((t) => t.key === toTab);
      if (config) {
        if (config.targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const targetEl = document.getElementById(config.targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  }, []);

  // Sync active tab on scroll
  useEffect(() => {
    const sections: { id: string; key: TabKey }[] = [
      { id: "contact", key: "Pr" },
      { id: "process", key: "A" },
      { id: "projects", key: "W" },
      { id: "services", key: "S" },
    ];

    const handleScroll = () => {
      if (isTransitioningRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.5) {
        if (currentTabRef.current !== "P") {
          switchTab("P", false);
        }
        return;
      }

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
            if (currentTabRef.current !== sec.key) {
              switchTab(sec.key, false);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [switchTab]);

  return (
    <aside
      aria-label="iOS Tab Menu Navigation"
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-auto"
    >
      {/* Floating Pill Container with iOS Glassmorphic Shadow */}
      <div className="relative w-[310px] sm:w-[420px] md:w-[480px] h-[58px] sm:h-[72px] md:h-[80px] rounded-full overflow-hidden shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)] border border-white/40 bg-white/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
        
        {/* Lottie SVG Render Container */}
        <div ref={containerRef} className="w-full h-full pointer-events-none" />

        {/* 5 Invisible Touch / Click Hit Areas */}
        <nav aria-label="Interactive tab bar items" className="absolute inset-0 grid grid-cols-5 z-20">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key, true)}
              className="w-full h-full flex flex-col items-center justify-end pb-1.5 sm:pb-2 cursor-pointer focus:outline-none group"
              aria-label={`Navigate to ${tab.label}`}
              title={tab.label}
            >
              <span className="sr-only">{tab.label}</span>
              {/* Micro dot indicator on hover */}
              <span
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-[#09090B] scale-125"
                    : "bg-transparent group-hover:bg-[#09090B]/30"
                }`}
              />
            </button>
          ))}
        </nav>

      </div>
    </aside>
  );
}

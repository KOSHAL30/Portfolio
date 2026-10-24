"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type TabId = "home" | "services" | "projects" | "process" | "contact";

interface TabItem {
  id: TabId;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  {
    id: "home",
    label: "Home",
    href: "#home",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "services",
    label: "Capabilities",
    href: "#services",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    id: "process",
    label: "Process",
    href: "#process",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isClickScrolling.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.4) {
        setActiveTab("home");
        return;
      }

      const sections: { id: string; key: TabId }[] = [
        { id: "contact", key: "contact" },
        { id: "process", key: "process" },
        { id: "projects", key: "projects" },
        { id: "services", key: "services" },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
            setActiveTab(sec.key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTabClick = (tabId: TabId, href: string) => {
    setActiveTab(tabId);
    isClickScrolling.current = true;
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);

    if (tabId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { num: "01", label: "Capabilities", href: "#services" },
    { num: "02", label: "Selected Works", href: "#projects" },
    { num: "03", label: "Methodology", href: "#process" },
    { num: "04", label: "Let's Build", href: "#contact" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#FAFAFA]/90 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#09090B]/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)]' : 'bg-transparent py-6 sm:py-7'}`}
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-between items-center w-full max-w-[1600px] mx-auto gap-4">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-5 shrink-0">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleTabClick("home", "#home"); }}
              className="font-editorial text-2xl tracking-widest uppercase text-[#09090B] hover:opacity-70 transition-opacity"
            >
              KJ
            </a>
            <div className="hidden sm:block w-[1px] h-4 bg-[#09090B]/15"></div>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-gray-400 font-medium font-mono">
              Koshal Joshi
            </span>
          </div>
          
          {/* Center: Interactive iOS 26 Inspired Tab Menu */}
          <nav aria-label="Primary Navigation" className="flex items-center justify-center">
            {/* Desktop & Tablet Dock (Pill with micro-icons + labels) */}
            <div className="hidden sm:flex items-center p-1 rounded-full bg-white/80 backdrop-blur-xl border border-[#09090B]/10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id, tab.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer z-10 focus:outline-none ${
                      isActive ? "text-[#FAFAFA]" : "text-gray-500 hover:text-[#09090B]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="ios26-nav-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                          mass: 0.8,
                        }}
                        className="absolute inset-0 rounded-full bg-[#09090B] shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className={`transition-transform duration-300 ${isActive ? "scale-105" : "opacity-75"}`}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Dock (Compact Micro-Icons Only) */}
            <div className="flex sm:hidden items-center p-1 rounded-full bg-white/85 backdrop-blur-xl border border-[#09090B]/10 shadow-sm">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id, tab.href)}
                    className={`relative p-2 rounded-full transition-colors duration-200 flex items-center justify-center cursor-pointer z-10 focus:outline-none ${
                      isActive ? "text-[#FAFAFA]" : "text-gray-500 hover:text-[#09090B]"
                    }`}
                    aria-label={`Go to ${tab.label}`}
                    title={tab.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="ios26-mobile-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                          mass: 0.8,
                        }}
                        className="absolute inset-0 rounded-full bg-[#09090B] shadow-sm"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className={isActive ? "scale-110" : "opacity-80"}>
                      {tab.icon}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right: CTA & Fullscreen Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleTabClick("contact", "#contact"); }}
              className="hidden lg:inline-flex items-center gap-2 text-[10px] text-[#09090B] border border-[#09090B]/20 rounded-full px-4 py-1.5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 tracking-[0.2em] uppercase font-medium font-mono hover:scale-[1.03]"
            >
              Let&apos;s Talk
            </a>

            {/* Harsha-style 2-line Animated Minimal Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative flex flex-col justify-center items-end gap-1.5 w-9 h-9 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className={`h-[1.5px] bg-[#09090B] transition-all duration-300 ${isOpen ? 'w-5 translate-y-[3.5px] rotate-45' : 'w-5 group-hover:w-3.5'}`} />
              <span className={`h-[1.5px] bg-[#09090B] transition-all duration-300 ${isOpen ? 'w-5 -translate-y-[3.5px] -rotate-45' : 'w-3.5 group-hover:w-5'}`} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* FULLSCREEN EDITORIAL CURTAIN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#09090B] text-[#FAFAFA] flex flex-col justify-between p-8 md:p-16 lg:p-24 overflow-y-auto"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

            {/* Top Bar inside Overlay */}
            <div className="relative z-10 flex justify-between items-center w-full max-w-[1600px] mx-auto border-b border-white/10 pb-8">
              <span className="font-editorial text-2xl tracking-widest uppercase text-white">KJ</span>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Navigation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Content: Giant Links + Info Column */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-12">
              
              {/* Left Column: Oversized Links */}
              <div className="lg:col-span-8 flex flex-col justify-center gap-6 md:gap-8">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 md:gap-8 text-white hover:text-gray-300 transition-colors"
                    >
                      <span className="font-mono text-xs md:text-sm text-gray-500 tracking-widest">
                        {item.num}
                      </span>
                      <span className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase group-hover:translate-x-3 transition-transform duration-300">
                        {item.label}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block lg:col-span-1 border-r border-white/10 h-full"></div>

              {/* Right Column: Contact & Direct Information */}
              <div className="lg:col-span-3 flex flex-col justify-center gap-8 font-light text-gray-300">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block mb-2">Direct Inquiry</span>
                  <a href="mailto:koshalj08@gmail.com" className="text-base md:text-lg text-white hover:underline block font-sans">
                    koshalj08@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block mb-2">Location</span>
                  <p className="text-sm text-gray-300 font-sans">
                    India &bull; Available Worldwide (Remote)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block mb-3">Social Profiles</span>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.linkedin.com/in/koushal-joshi-222692377"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/koshal__joshi__06?stkn=MWFzazEwZnl6NDhtNA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Bar inside Overlay */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-mono">
              <span>&copy; {new Date().getFullYear()} Koshal Joshi &bull; Digital Engineer</span>
              <span className="mt-2 sm:mt-0">[ High-Performance Digital Experiences ]</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

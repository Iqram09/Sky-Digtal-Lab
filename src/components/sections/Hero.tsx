"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import ActionButton from "@/components/ui/ActionButton";

// Dynamically import the 3D scene to completely disable SSR for it.
// This prevents hydration mismatches and guarantees it only runs in the client browser,
// preventing crashes on specific devices/IPs that struggle with SSR WebGL initialization.
const ParticleScene = dynamic(() => import("@/components/3d/ParticleScene"), {
  ssr: false,
});

const headline = [
  { text: "WE BUILD", accent: false },
  { text: "DIGITAL SYSTEMS", accent: true },
  { text: "THAT MOVE BUSINESSES FORWARD.", accent: false },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-ink pb-20 pt-24 md:pb-32 md:pt-28"
    >
      {/* 3D Background - Wrapped in ErrorBoundary so if WebGL fails on a device, it won't crash the whole app */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ErrorBoundary fallback={<div className="absolute inset-0 bg-black" />}>
          <ParticleScene />
        </ErrorBoundary>
      </div>

      {/* Content */}
      <div className="premium-grid pointer-events-none z-10 w-full px-6 md:px-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4 md:mb-8"
          >
            <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_#c9ff4a]" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              Sky Digital Lab / Digital product studio
            </p>
          </motion.div>

          <h1 className="text-[10.5vw] font-bold leading-[0.92] tracking-tighter text-white md:text-[8.2vw] lg:text-[6.8vw]">
            {headline.map((line, index) => (
              <motion.span
                key={line.text}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`block overflow-hidden pb-2 ${line.accent ? "text-accent" : ""}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="pointer-events-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:mt-8 md:text-xl"
          >
            From high-performance websites and web applications to branding,
            automation and custom software — we design and build digital products
            that look exceptional and work flawlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pointer-events-auto mt-8 flex flex-wrap gap-3 md:mt-10"
          >
            <ActionButton href="#contact" variant="primary">
              Start a project
            </ActionButton>
            <ActionButton href="#work" variant="ghost">
              Explore our work
            </ActionButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="pointer-events-auto absolute bottom-8 left-6 hidden flex-col gap-2 md:left-12 md:flex"
      >
        <span className="font-mono text-[10px] tracking-widest text-white/50">SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-8 right-6 z-10 hidden text-right font-mono text-[10px] uppercase tracking-widest text-white/35 md:right-12 md:block">
        <span className="block">Strategy / Design / Engineering</span>
        <span className="mt-2 block text-accent">Available for new work</span>
      </div>
    </section>
  );
}

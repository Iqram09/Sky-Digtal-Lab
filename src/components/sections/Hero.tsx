"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Dynamically import the 3D scene to completely disable SSR for it.
// This prevents hydration mismatches and guarantees it only runs in the client browser,
// preventing crashes on specific devices/IPs that struggle with SSR WebGL initialization.
const ParticleScene = dynamic(() => import("@/components/3d/ParticleScene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black flex flex-col justify-center">
      {/* 3D Background - Wrapped in ErrorBoundary so if WebGL fails on a device, it won't crash the whole app */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ErrorBoundary fallback={<div className="absolute inset-0 bg-black" />}>
          <ParticleScene />
        </ErrorBoundary>
      </div>

      {/* Content */}
      <div className="premium-grid w-full px-6 md:px-12 z-10 pointer-events-none">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <p className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">
              Digital System / Active
            </p>
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-[10vw] font-bold leading-[0.9] tracking-tighter mix-blend-difference text-white">
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block overflow-hidden pb-2"
            >
              CRAFTING
            </motion.span>
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block overflow-hidden pb-2 text-white/50 italic"
            >
              DIGITAL
            </motion.span>
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block overflow-hidden"
            >
              EXPERIENCES
            </motion.span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-6 md:left-12 flex flex-col gap-2 pointer-events-auto"
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
    </section>
  );
}

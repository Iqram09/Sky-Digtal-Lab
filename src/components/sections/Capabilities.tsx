"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const capabilities = [
  {
    number: "01",
    title: "POSITIONING",
    label: "Find the signal",
    description: "We turn a sharp point of view into a system people can recognize, remember, and choose.",
    metrics: ["Strategy", "Identity", "Direction"],
  },
  {
    number: "02",
    title: "EXPERIENCE",
    label: "Make it felt",
    description: "Interfaces become environments: paced, tactile, and designed around the moments that matter.",
    metrics: ["UX / UI", "Prototyping", "Motion"],
  },
  {
    number: "03",
    title: "TECHNOLOGY",
    label: "Build the impossible",
    description: "From WebGL experiments to resilient platforms, we make ambitious ideas perform in the real world.",
    metrics: ["WebGL", "Creative Code", "Systems"],
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapability = capabilities[activeIndex];

  return (
    <section id="systems" className="relative w-full min-h-screen overflow-hidden bg-[#101312] text-[#f5f5f0] py-24 md:py-32">
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 md:col-span-3 flex justify-between md:block">
          <div className="font-mono text-xs uppercase tracking-widest text-[#c9ff4a]">
            <span className="block">02 / Systems</span>
            <span className="mt-2 block text-white/40">How we move</span>
          </div>
          <span className="font-mono text-xs text-white/30 md:mt-24 md:block">SCROLL / SELECT</span>
        </div>

        <div className="col-span-12 mt-20 md:col-span-8 md:col-start-5 md:mt-0">
          <div className="mb-14 flex items-end justify-between border-b border-white/15 pb-5">
            <h2 className="text-5xl font-semibold leading-none tracking-tight md:text-8xl">THE METHOD</h2>
            <span className="hidden font-mono text-xs text-white/40 md:block">03 CHAPTERS</span>
          </div>

          <div className="border-t border-white/15">
            {capabilities.map((capability, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={capability.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-white/15 py-6 text-left md:grid-cols-[72px_1fr_160px] md:py-8"
                  aria-pressed={isActive}
                >
                  <span className={`font-mono text-xs transition-colors ${isActive ? "text-[#c9ff4a]" : "text-white/35"}`}>
                    {capability.number}
                  </span>
                  <span className={`text-2xl font-medium tracking-tight transition-colors md:text-4xl ${isActive ? "text-white" : "text-white/45 group-hover:text-white"}`}>
                    {capability.title}
                  </span>
                  <span className={`hidden text-right font-mono text-[10px] uppercase tracking-widest transition-colors md:block ${isActive ? "text-[#c9ff4a]" : "text-white/30"}`}>
                    {capability.label}
                  </span>
                  <span className={`h-2 w-2 rounded-full transition-all md:hidden ${isActive ? "bg-[#c9ff4a]" : "bg-white/20"}`} />
                </button>
              );
            })}
          </div>

          <div className="grid gap-10 pt-10 md:grid-cols-[1fr_220px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCapability.number}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl text-2xl leading-tight text-white/75 md:text-3xl"
              >
                {activeCapability.description}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCapability.number}-metrics`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap content-start gap-2 md:flex-col md:items-start"
              >
                {activeCapability.metrics.map((metric) => (
                  <span key={metric} className="border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/55">
                    {metric}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 right-[-4vw] select-none text-[28vw] font-bold leading-none tracking-tighter text-white/[0.025]">
        02
      </div>
    </section>
  );
}

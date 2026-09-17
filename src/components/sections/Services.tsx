"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import ActionButton from "@/components/ui/ActionButton";
import { services } from "@/content/services";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeService = services[activeIndex];

  // Vertical tablist: arrow keys move between disciplines, Home/End jump to the ends.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = services.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-panel py-24 text-foreground md:py-32"
    >
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <SectionRail
          index="02"
          label="Services"
          sublabel="What we build"
          footnote="Select a discipline"
        />

        <div className="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle
            meta="06 Disciplines"
            size="display"
            description="From your first digital presence to complex business platforms, we design and engineer products around real-world goals."
          >
            WHAT WE BUILD
          </SectionTitle>

          <div
            role="tablist"
            aria-label="Service areas"
            aria-orientation="vertical"
            className="border-t border-white/15"
          >
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={service.number}
                  type="button"
                  role="tab"
                  id={`service-tab-${service.number}`}
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.number}`}
                  tabIndex={isActive ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={handleKeyDown}
                  className="group grid w-full grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-white/15 py-6 text-left md:grid-cols-[72px_1fr_160px] md:py-7"
                >
                  <span
                    className={`font-mono text-xs transition-colors ${isActive ? "text-accent" : "text-white/35"}`}
                  >
                    {service.number}
                  </span>
                  <span
                    className={`text-xl font-medium tracking-tight transition-colors md:text-3xl ${
                      isActive ? "text-white" : "text-white/45 group-hover:text-white"
                    }`}
                  >
                    {service.title}
                  </span>
                  <span
                    className={`hidden text-right font-mono text-[10px] uppercase tracking-widest transition-colors md:block ${
                      isActive ? "text-accent" : "text-white/30"
                    }`}
                  >
                    {service.label}
                  </span>
                  <span
                    aria-hidden
                    className={`h-2 w-2 rounded-full transition-all md:hidden ${isActive ? "bg-accent" : "bg-white/20"}`}
                  />
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.number}
              id={`service-panel-${activeService.number}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.number}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-10 pt-10 md:grid-cols-[1fr_1fr] md:gap-12"
            >
              <p className="max-w-xl text-xl leading-snug text-white/75 md:text-2xl">
                {activeService.description}
              </p>

              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Capabilities
                </p>
                <ul className="flex flex-wrap gap-2">
                  {activeService.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-colors hover:border-accent hover:text-accent"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-14 border-t border-white/15 pt-8">
            <ActionButton href="#contact" variant="ghost">
              Discuss your requirements
            </ActionButton>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-[-4vw] select-none text-[28vw] font-bold leading-none tracking-tighter text-white/[0.025]"
      >
        02
      </div>
    </section>
  );
}

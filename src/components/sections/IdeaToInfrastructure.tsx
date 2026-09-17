"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import ActionButton from "@/components/ui/ActionButton";
import SectionRail from "@/components/ui/SectionRail";
import { ladder } from "@/content/process";

gsap.registerPlugin(ScrollTrigger);

export default function IdeaToInfrastructure() {
  const containerRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const spine = spineRef.current;
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: spine,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      }

      // Each rung lights up as it crosses the reading line, then stays lit.
      gsap.utils.toArray<HTMLElement>(".ladder-rung").forEach((rung) => {
        gsap.fromTo(
          rung,
          { opacity: 0.18, x: -12 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rung,
              start: "top 82%",
              end: "top 55%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="09" label="Scope" sublabel="End to end" />

        <div className="col-span-12 mt-12 md:col-span-4 md:col-start-5 md:mt-0">
          <div className="md:sticky md:top-32">
            <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
              FROM IDEA TO INFRASTRUCTURE.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
              Whether you&apos;re starting from a blank page or rebuilding an
              existing system, we can help shape the technology, experience and
              infrastructure behind it.
            </p>
            <div className="mt-8">
              <ActionButton href="#contact" variant="ghost">
                Start a project
              </ActionButton>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-16 md:col-span-3 md:col-start-10 md:mt-0">
          <ol className="relative pl-8">
            <span
              aria-hidden
              className="absolute left-[3px] top-3 h-[calc(100%-2rem)] w-px bg-white/10"
            />
            <span
              ref={spineRef}
              aria-hidden
              className="absolute left-[3px] top-3 h-[calc(100%-2rem)] w-px origin-top bg-accent/70"
            />

            {ladder.map((rung, index) => (
              <li
                key={rung}
                className="ladder-rung relative pb-8 last:pb-0 md:pb-10"
              >
                <span
                  aria-hidden
                  className="absolute -left-8 top-[0.55em] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-accent"
                />
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {rung}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { processSteps } from "@/content/process";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const line = lineRef.current;
      if (!line) return;

      // The spine draws itself as the steps scroll past — same scrub language
      // as the manifesto reveal.
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail
          index="06"
          label="Process"
          sublabel="How we work"
          footnote="06 Stages"
        />

        <div className="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle
            size="display"
            description="A structured process keeps ideas moving from the first conversation to a product that works in the real world."
          >
            HOW WE WORK
          </SectionTitle>

          <ol className="relative pl-10 md:pl-16">
            {/* Spine */}
            <span
              aria-hidden
              className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-white/12 md:left-[7px]"
            />
            <span
              ref={lineRef}
              aria-hidden
              className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-accent md:left-[7px]"
            />

            {processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.number}
                delay={index * 0.06}
                className="group relative pb-10 last:pb-0 md:pb-14"
              >
                <span
                  aria-hidden
                  className="absolute -left-10 top-1.5 h-[7px] w-[7px] rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-accent md:-left-16 md:h-[15px] md:w-[15px] md:border-[5px] md:border-ink md:bg-white/30"
                />
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
                  <span className="font-mono text-xs text-accent md:w-20 md:shrink-0">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight text-white md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

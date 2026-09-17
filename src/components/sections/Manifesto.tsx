"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import SectionRail from "@/components/ui/SectionRail";
import { pipeline } from "@/content/process";

gsap.registerPlugin(ScrollTrigger);

const headlineLines = ["NOT JUST A WEBSITE.", "A DIGITAL SYSTEM."];

const body = [
  "Your website is often the first interaction someone has with your business. We treat it as more than a collection of pages.",
  "We combine strategy, design and engineering to create digital systems that communicate your value, attract customers and help your business operate better.",
];

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      textRefs.current.forEach((text) => {
        if (!text) return;

        gsap.fromTo(
          text,
          { opacity: 0.1, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 55%",
              scrub: 1,
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
      className="on-light relative flex w-full flex-col justify-center bg-foreground py-24 text-background md:min-h-screen md:py-32"
    >
      <div className="premium-grid h-full w-full px-6 md:px-12">
        <SectionRail
          index="01"
          label="Approach"
          sublabel="Strategy / Technology"
          footnote="Index: 001"
          tone="light"
          className="mb-12 md:mb-0"
        />

        {/* Impact Column */}
        <div className="col-span-12 flex flex-col justify-center md:col-span-8 md:col-start-5">
          <div className="flex flex-col gap-2 md:gap-4">
            {headlineLines.map((line, i) => (
              <h2
                key={line}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="text-4xl font-semibold leading-none tracking-tighter md:text-6xl lg:text-7xl"
              >
                {line}
              </h2>
            ))}
          </div>

          <div className="mt-10 flex max-w-2xl flex-col gap-6 md:mt-14">
            {body.map((paragraph, i) => (
              <p
                key={paragraph}
                ref={(el) => {
                  textRefs.current[headlineLines.length + i] = el;
                }}
                className="text-lg leading-relaxed text-black/65 md:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pipeline — the shape of every engagement, in five moves */}
          <div className="mt-14 border-t border-black/15 pt-8 md:mt-20">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
              How a digital system comes together
            </p>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-4 md:gap-x-4">
              {pipeline.map((step, index) => (
                <motion.li
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3 md:gap-4"
                >
                  <span className="group flex items-center gap-2 border border-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-black/70 transition-colors hover:border-black hover:text-black md:px-4">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {step}
                  </span>
                  {index < pipeline.length - 1 ? (
                    <span aria-hidden className="text-black/25">
                      →
                    </span>
                  ) : null}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="premium-grid pointer-events-none absolute inset-0 px-6 opacity-[0.03] md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-black" />
        ))}
      </div>
    </section>
  );
}

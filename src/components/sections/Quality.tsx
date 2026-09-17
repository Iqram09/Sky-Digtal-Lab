"use client";

import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import { pillars } from "@/content/principles";

export default function Quality() {
  return (
    <section className="on-light relative w-full overflow-hidden bg-foreground py-24 text-background md:py-32">
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <SectionRail index="10" label="Standard" sublabel="What we hold to" tone="light" />

        <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.02] tracking-tight text-balance md:text-5xl lg:text-6xl">
            BUILT TO BE SEEN. BUILT TO BE USED. BUILT TO LAST.
          </h2>

          <div className="mt-8 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-black/65 md:text-xl">
            <p>We care about the details people notice and the engineering they don&apos;t.</p>
            <p>
              From typography and interaction design to APIs, databases and
              deployment, every layer contributes to the final experience.
            </p>
          </div>

          <ul className="mt-14 grid border-t border-black/15 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 0.08}
                className="border-b border-black/15 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/55">
                  {pillar.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="premium-grid pointer-events-none absolute inset-0 px-6 opacity-[0.03] md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-black" />
        ))}
      </div>
    </section>
  );
}

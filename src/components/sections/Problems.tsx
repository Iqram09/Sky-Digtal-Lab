"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import ActionButton from "@/components/ui/ActionButton";
import { problems } from "@/content/problems";

export default function Problems() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="on-light relative w-full overflow-hidden bg-foreground py-24 text-background md:py-32">
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <SectionRail
          index="05"
          label="Starting points"
          sublabel="Common briefs"
          tone="light"
          footnote="Pick the closest"
        />

        <div className="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle tone="light" size="display" meta="06 Briefs">
            WHAT ARE YOU TRYING TO SOLVE?
          </SectionTitle>

          <ul className="border-t border-black/15">
            {problems.map((problem, index) => {
              const isDimmed = hovered !== null && hovered !== index;
              return (
                <Reveal
                  as="li"
                  key={problem.number}
                  delay={index * 0.05}
                  className="border-b border-black/15"
                >
                  <a
                    href="#contact"
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(index)}
                    onBlur={() => setHovered(null)}
                    data-cursor="link"
                    className={`group grid grid-cols-[36px_1fr] items-baseline gap-4 py-7 transition-opacity duration-300 md:grid-cols-[64px_1fr_auto] md:gap-6 md:py-8 ${
                      isDimmed ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <span className="font-mono text-xs text-black/40">
                      {problem.number}
                    </span>
                    <span className="text-xl font-medium leading-tight tracking-tight text-balance md:text-3xl">
                      {problem.statement}
                    </span>
                    <span className="col-start-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 md:col-start-3 md:justify-end md:text-right">
                      {problem.answer}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                      >
                        →
                      </span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>

          <div className="mt-12">
            <ActionButton href="#contact" variant="ghostLight">
              Describe your situation
            </ActionButton>
          </div>
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

"use client";

import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { principles } from "@/content/principles";

export default function Principles() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail
          index="03"
          label="Principles"
          sublabel="Why Sky Digital Lab"
          footnote="04 Beliefs"
        />

        <div className="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle
            size="display"
            description="Good digital products sit at the intersection of business strategy, thoughtful design and solid engineering."
          >
            BUILT WITH INTENTION.
          </SectionTitle>

          <ul className="grid border-t border-white/15 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal
                as="li"
                key={principle.number}
                delay={index * 0.08}
                className="group relative border-b border-white/15 py-8 md:border-r md:px-8 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n+1)]:pl-0"
              >
                {/* Hairline that fills on hover — the section's only moving part */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none"
                />
                <span className="font-mono text-xs text-accent">{principle.number}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">
                  {principle.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-[-3vw] select-none text-[26vw] font-bold leading-none tracking-tighter text-white/[0.02]"
      >
        03
      </div>
    </section>
  );
}

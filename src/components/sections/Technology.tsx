"use client";

import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { technologies } from "@/content/technologies";

export default function Technology() {
  return (
    <section className="relative w-full overflow-hidden bg-panel-alt py-24 md:py-32">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail
          index="07"
          label="Stack"
          sublabel="Technology"
          footnote="Chosen per problem"
        />

        <div className="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle description="We choose technology based on the problem — not trends. Our stack is built around performance, maintainability and scalability.">
            ENGINEERED WITH MODERN TECHNOLOGY
          </SectionTitle>

          <dl className="border-t border-white/15">
            {technologies.map((category, index) => (
              <Reveal
                key={category.number}
                delay={index * 0.06}
                className="grid grid-cols-1 gap-4 border-b border-white/15 py-7 md:grid-cols-[220px_1fr] md:gap-10 md:py-8"
              >
                <dt className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent">
                    {category.number}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-[0.18em] text-white">
                    {category.title}
                  </span>
                </dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="group relative text-lg text-white/55 transition-colors duration-300 hover:text-white md:text-xl"
                    >
                      {item}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full motion-reduce:transition-none"
                      />
                    </span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 right-[-3vw] select-none text-[26vw] font-bold leading-none tracking-tighter text-white/[0.02]"
      >
        07
      </div>
    </section>
  );
}

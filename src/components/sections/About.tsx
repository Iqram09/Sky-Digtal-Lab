"use client";

import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import ActionButton from "@/components/ui/ActionButton";

const disciplines = ["Strategy", "Design", "Engineering"];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail
          index="11"
          label="Studio"
          sublabel="About"
          footnote="One roof"
        />

        <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">
          <Reveal>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
              WE BUILD AT THE INTERSECTION OF DESIGN &amp; TECHNOLOGY.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_200px] md:gap-16">
            <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-white/60 md:text-xl">
              <Reveal delay={0.08}>
                <p>
                  Sky Digital Lab is a digital product studio focused on creating
                  meaningful digital experiences and reliable technology.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  We bring strategy, design and engineering together under one
                  roof — allowing ideas to move from concept to launch without
                  losing their original intent.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <ul className="flex flex-col gap-3 border-t border-white/15 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {disciplines.map((discipline) => (
                  <li
                    key={discipline}
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {discipline}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.26} className="mt-12">
            <ActionButton href="#contact" variant="ghost">
              Work with us
            </ActionButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

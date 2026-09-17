"use client";

import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import ActionButton from "@/components/ui/ActionButton";
import { clientTypes } from "@/content/clients";

export default function Clients() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail
          index="08"
          label="Who we work with"
          sublabel="Fit"
          footnote="05 Profiles"
        />

        <div className="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle size="display">BUILT FOR AMBITIOUS BUSINESSES</SectionTitle>

          <ul className="grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {clientTypes.map((client, index) => (
              <Reveal
                as="li"
                key={client.number}
                delay={index * 0.06}
                className="group flex min-h-[220px] flex-col justify-between bg-background p-6 transition-colors duration-500 hover:bg-panel md:p-8"
              >
                <span className="font-mono text-xs text-accent">{client.number}</span>
                <div className="mt-8">
                  <h3 className="text-xl font-medium leading-tight tracking-tight text-white text-balance md:text-2xl">
                    {client.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50 md:text-base">
                    {client.description}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Sixth cell keeps the grid whole and gives the block a way out */}
            <Reveal
              as="li"
              delay={clientTypes.length * 0.06}
              className="flex min-h-[220px] flex-col justify-between bg-background p-6 md:p-8"
            >
              <span className="font-mono text-xs text-white/30">—</span>
              <div className="mt-8">
                <p className="text-base leading-relaxed text-white/55">
                  Somewhere in between? Most good projects are.
                </p>
                <div className="mt-5">
                  <ActionButton href="#contact" variant="ghost" className="px-5 py-3">
                    Talk to us
                  </ActionButton>
                </div>
              </div>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}

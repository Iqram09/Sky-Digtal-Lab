"use client";

import Reveal from "@/components/ui/Reveal";
import ActionButton from "@/components/ui/ActionButton";
import { site } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-28 md:py-40">
      {/* Single soft accent bloom — the page's closing note */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,255,74,0.10),transparent_65%)] blur-3xl"
      />

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <Reveal>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Next step
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-[11vw] font-bold leading-[0.92] tracking-tighter text-white md:text-[7.5vw] lg:text-[6.4vw]">
              HAVE AN IDEA?
              <span className="block text-white/45">LET&apos;S BUILD IT.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              Whether you need a new website, a custom application, a stronger
              brand or an automated business workflow — let&apos;s turn the idea
              into something real.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12 flex flex-wrap gap-3">
              <ActionButton href="#contact" variant="primary">
                Start a project
              </ActionButton>
              <ActionButton href={`mailto:${site.email}`} variant="ghost">
                Talk to us
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import { pillars } from "@/content/studio";

export default function Intro() {
  return (
    <section className="on-light relative w-full overflow-hidden bg-taupe py-24 text-on-taupe md:py-36">
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <SectionRail
          index="01"
          label="Studio"
          sublabel="Who we are"
          footnote="Three disciplines"
          tone="light"
          className="mb-12 md:mb-0"
        />

        <div className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-tighter text-balance md:text-6xl lg:text-7xl">
              A small team. A complete digital mindset.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-on-taupe-muted md:mt-12 md:text-xl">
              Sky Digital Lab is a digital studio that turns business
              requirements into practical, well-designed digital solutions.
              Every project draws on the same three disciplines, held by people
              who talk to each other every day.
            </p>
          </Reveal>

          <ol className="mt-14 grid border-t border-on-taupe/20 md:mt-20 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={0.06 * index}
                className="border-b border-on-taupe/20 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-on-taupe-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-on-taupe-muted">
                  {pillar.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div aria-hidden className="premium-grid pointer-events-none absolute inset-0 px-6 md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-on-taupe/[0.06]" />
        ))}
      </div>
    </section>
  );
}

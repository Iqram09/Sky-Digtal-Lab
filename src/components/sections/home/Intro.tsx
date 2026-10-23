import Glow from "@/components/brand/Glow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import SectionRail from "@/components/ui/SectionRail";
import { pillars } from "@/content/studio";

export default function Intro() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-36">
      <Glow tone="mint" className="-left-[22rem] top-1/4 w-[min(720px,120vw)]" />

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <SectionRail
          index="01"
          label="Studio"
          sublabel="Who we are"
          footnote="Three disciplines"
          className="mb-12 md:mb-0"
        />

        <div className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tighter text-balance md:text-6xl lg:text-7xl">
            <SplitText>A small team. A complete digital mindset.</SplitText>
          </h2>

          <Reveal delay={0.08}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted md:mt-12 md:text-xl">
              Sky Digital Lab is a digital studio that turns business
              requirements into practical, well-designed digital solutions.
              Every project draws on the same three disciplines, held by people
              who talk to each other every day.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={0.06 * index}
                className="rounded-[20px] border border-foreground/10 bg-panel p-6 md:p-8"
              >
                <span className="label-caps text-[11px] text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{pillar.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

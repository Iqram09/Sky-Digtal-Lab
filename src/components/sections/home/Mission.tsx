import ActionButton from "@/components/ui/ActionButton";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import { commitments } from "@/content/studio";

export default function Mission() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-24 md:py-36">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="04" label="Mission" sublabel="Why we exist" footnote="Our standard" />

        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground text-balance md:text-6xl lg:text-7xl">
              Technology should solve real problems.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                Our mission is to help businesses turn ideas into useful,
                reliable and thoughtfully designed digital products. Not
                technology for its own sake — software and websites that make
                a real difference to how a business works or how its customers
                experience it.
              </p>
              <div className="mt-10">
                <ActionButton href="/about" variant="ghost">
                  Read our mission
                </ActionButton>
              </div>
            </Reveal>

            <ul className="border-t border-foreground/15">
              {commitments.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={0.04 * index}
                  className="flex items-baseline gap-6 border-b border-foreground/15 py-4"
                >
                  <span className="font-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg text-foreground md:text-xl">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

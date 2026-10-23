import Link from "next/link";
import Glow from "@/components/brand/Glow";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaBand from "@/components/sections/CtaBand";
import { mission, pillars, values, vision, workingPrinciples } from "@/content/studio";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Who Sky Digital Lab is, what we believe and how we work: a technology and creative studio combining business understanding, thoughtful design and software engineering.",
  path: "/about",
});

const nextSteps = [
  { href: "/services", label: "Services", text: "What we design, build and support." },
  { href: "/work", label: "Our Work", text: "Live websites we have delivered for clients." },
  { href: "/contact", label: "Contact", text: "Tell us what you're planning." },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="About us"
        title="Clear thinking, built well."
        intro="Sky Digital Lab is a technology and creative studio. We combine business understanding, thoughtful design and software engineering to build digital products that do what they were meant to do."
      />

      {/* Who we are */}
      <section className="relative w-full bg-background py-24 md:py-32">
        <div className="premium-grid w-full px-6 md:px-12">
          <SectionRail index="01" label="Who we are" sublabel="The studio" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <h2 className="sr-only">Who we are</h2>
            <div className="flex max-w-3xl flex-col gap-6 text-lg leading-relaxed text-muted md:text-xl">
              <Reveal>
                <p className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-4xl md:leading-tight">
                  We are a small studio with a complete digital mindset: the
                  people who understand your business sit next to the people
                  who design and build for it.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  That matters because most digital projects go wrong in the
                  gaps — between what a business needs and what gets designed,
                  between what gets designed and what gets built. We keep
                  strategy, design and engineering in one conversation so
                  nothing is lost in translation.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  We write plainly, plan realistically and tell clients what we
                  think — including when something isn&apos;t worth building.
                </p>
              </Reveal>
            </div>

            <ul className="mt-16 grid gap-4 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <Reveal
                  as="li"
                  key={pillar.title}
                  delay={index * 0.06}
                  className="rounded-[20px] border border-foreground/10 bg-panel p-6 md:p-8"
                >
                  <span className="label-caps text-[11px] text-subtle">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-foreground">{pillar.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{pillar.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="surface-dark relative w-full overflow-hidden bg-background py-24 md:py-36">
        <Glow tone="mint" drift className="-right-[20rem] -top-[22rem] w-[min(900px,140vw)]" />
        <Glow tone="lavender" drift className="-bottom-[24rem] -left-[18rem] w-[min(820px,130vw)]" />

        <div className="premium-grid relative z-10 w-full gap-y-16 px-6 md:px-12">
          <SectionRail index="02" label="Purpose" sublabel="Mission & vision" />
          <div className="col-span-12 grid gap-16 md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5">
            <Reveal>
              <h2 className="label-caps mb-6 text-[11px] text-subtle">Our mission</h2>
              <p className="font-display text-3xl font-semibold leading-[1.08] tracking-tighter text-balance md:text-5xl">
                {mission}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="border-t border-foreground/15 pt-12">
              <h2 className="label-caps mb-6 text-[11px] text-subtle">Our vision</h2>
              <p className="max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-muted text-balance md:text-4xl">
                {vision}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative w-full overflow-hidden bg-background py-24 md:py-36">
        <div className="premium-grid w-full px-6 md:px-12">
          <SectionRail index="03" label="Values" sublabel="What we hold to" footnote="Six values" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle size="display">Our values</SectionTitle>
          </div>
        </div>
        <ul className="mx-6 grid gap-4 sm:grid-cols-2 md:mx-12 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              delay={(index % 3) * 0.06}
              className="flex min-h-[220px] flex-col justify-between rounded-[20px] border border-foreground/10 bg-panel p-6 md:p-8"
            >
              <span className="label-caps text-[11px] text-subtle">{String(index + 1).padStart(2, "0")}</span>
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{value.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* How we work */}
      <section className="surface-dark relative w-full overflow-hidden bg-background py-24 md:py-36">
        <Glow tone="lavender" className="-right-[22rem] bottom-0 w-[min(760px,130vw)]" />

        <div className="premium-grid relative z-10 w-full px-6 md:px-12">
          <SectionRail index="04" label="Approach" sublabel="How we work" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle
              size="display"
              description="We prefer realistic planning, clear scope, transparent communication and quality delivery over unnecessary complexity."
            >
              How we work
            </SectionTitle>

            <dl className="border-t border-foreground/15">
              {workingPrinciples.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 0.05}
                  className="grid gap-3 border-b border-foreground/15 py-7 md:grid-cols-[260px_1fr] md:gap-10"
                >
                  <dt className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">{item.title}</dt>
                  <dd className="text-base leading-relaxed text-muted md:text-lg">{item.description}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal className="surface-mint mt-12 rounded-[20px] p-6 md:p-8">
              <h3 className="label-caps text-[11px] text-foreground">When a project needs more</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                When a project exceeds our internal capacity or calls for a
                specialist skill, we may bring in qualified external
                specialists. We tell you when we do, and we stay accountable
                for the deliverables we agreed with you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Onward links */}
      <nav aria-label="Continue exploring" className="w-full border-t border-foreground/10 bg-background">
        <ul className="grid md:grid-cols-3">
          {nextSteps.map((step) => (
            <li key={step.href} className="border-b border-foreground/10 md:border-b-0 md:border-r md:last:border-r-0">
              <Link
                href={step.href}
                data-cursor="link"
                className="group flex h-full flex-col justify-between gap-10 px-6 py-10 transition-colors duration-500 hover:bg-panel md:px-12 md:py-14"
              >
                <span className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{step.label}</span>
                  <span aria-hidden className="text-2xl text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transition-none">→</span>
                </span>
                <span className="text-base text-muted">{step.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CtaBand />
    </main>
  );
}

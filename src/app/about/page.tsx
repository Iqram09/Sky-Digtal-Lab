import Link from "next/link";
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
                <p className="font-display text-2xl leading-snug text-foreground md:text-4xl md:leading-tight">
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

            <ul className="mt-16 grid border-t border-foreground/15 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <Reveal
                  as="li"
                  key={pillar.title}
                  delay={index * 0.06}
                  className="border-b border-foreground/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">{pillar.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{pillar.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="on-light relative w-full overflow-hidden bg-taupe py-24 text-on-taupe md:py-36">
        <div className="premium-grid relative z-10 w-full gap-y-16 px-6 md:px-12">
          <SectionRail index="02" label="Purpose" sublabel="Mission & vision" tone="light" />
          <div className="col-span-12 grid gap-16 md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5">
            <Reveal>
              <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-on-taupe-muted">Our mission</h2>
              <p className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance md:text-5xl">
                {mission}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="border-t border-on-taupe/20 pt-12">
              <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-on-taupe-muted">Our vision</h2>
              <p className="max-w-3xl font-display text-2xl leading-snug tracking-tight text-balance md:text-4xl">
                {vision}
              </p>
            </Reveal>
          </div>
        </div>
        <div aria-hidden className="premium-grid pointer-events-none absolute inset-0 px-6 md:px-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-l border-on-taupe/[0.06]" />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="relative w-full bg-ink py-24 md:py-36">
        <div className="premium-grid w-full px-6 md:px-12">
          <SectionRail index="03" label="Values" sublabel="What we hold to" footnote="Six values" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle size="display">Our values</SectionTitle>
          </div>
        </div>
        <ul className="mx-6 grid gap-px border border-foreground/12 bg-foreground/12 sm:grid-cols-2 md:mx-12 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              delay={(index % 3) * 0.06}
              className="group relative flex min-h-[220px] flex-col justify-between bg-ink p-6 md:p-8"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none"
              />
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{value.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* How we work */}
      <section className="relative w-full bg-background py-24 md:py-36">
        <div className="premium-grid w-full px-6 md:px-12">
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

            <Reveal className="mt-12 border-l-2 border-accent bg-panel p-6 md:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">When a project needs more</h3>
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
                  <span aria-hidden className="text-2xl text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none">→</span>
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

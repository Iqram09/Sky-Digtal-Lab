import Link from "next/link";
import Glow from "@/components/brand/Glow";
import ActionButton from "@/components/ui/ActionButton";
import Accordion from "@/components/ui/Accordion";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaBand from "@/components/sections/CtaBand";
import { faqs } from "@/content/faq";
import { problems } from "@/content/problems";
import { services } from "@/content/services";
import { technologies } from "@/content/technologies";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Web design and development, UI/UX, branding, web applications, APIs and integrations, automation and AI, cloud deployment, data and analytics, and creative digital work.",
  path: "/services",
});

/** FAQ rich results only describe questions that are visible on this page. */
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/services#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Services"
        title="What we design, build and support."
        intro="Nine disciplines, one team. Find the problem you're facing below, or go straight to the service you need."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="label-caps inline-block rounded-full border border-foreground/20 bg-panel/60 px-4 py-2 text-[11px] text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {/* Starting points */}
      <section className="surface-dark relative w-full overflow-hidden bg-background py-24 md:py-32">
        <Glow tone="mint" className="-left-[22rem] -top-[20rem] w-[min(820px,130vw)]" />

        <div className="premium-grid relative z-10 w-full px-6 md:px-12">
          <SectionRail index="01" label="Starting points" sublabel="Common briefs" footnote="Pick the closest" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle size="display">
              What are you trying to solve?
            </SectionTitle>
            <ul className="border-t border-foreground/15">
              {problems.map((problem) => (
                <li key={problem.number}>
                  <a
                    href={`#${problem.service}`}
                    className="group grid grid-cols-[36px_1fr] items-baseline gap-x-4 gap-y-2 border-b border-foreground/15 py-6 transition-colors md:grid-cols-[56px_1fr_auto] md:gap-x-8"
                  >
                    <span className="label-caps text-[11px] text-subtle">{problem.number}</span>
                    <span className="font-display text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none md:text-3xl">
                      “{problem.statement}”
                    </span>
                    <span className="label-caps col-start-2 text-[11px] text-subtle transition-colors group-hover:text-foreground md:col-start-3 md:text-right">
                      {problem.answer} <span aria-hidden>↓</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services in detail */}
      <div className="w-full bg-background">
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className={index % 2 === 0 ? "w-full bg-background py-20 md:py-28" : "w-full border-y border-foreground/10 bg-panel py-20 md:py-28"}
          >
            <div className="premium-grid w-full gap-y-10 px-6 md:px-12">
              <div className="col-span-12 md:col-span-3">
                <p className="label-caps text-[11px] text-foreground">
                  {service.number} / {String(services.length).padStart(2, "0")}
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-8 lg:col-start-5">
                <Reveal>
                  <h2
                    id={`${service.slug}-title`}
                    className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-5xl"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                    {service.description}
                  </p>
                </Reveal>

                <div className="mt-12 grid gap-10 border-t border-foreground/15 pt-10 md:grid-cols-2 md:gap-12">
                  <Reveal delay={0.05}>
                    <h3 className="mb-5 label-caps text-[11px] text-subtle">
                      Problems it solves
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {service.problems.map((problem) => (
                        <li key={problem} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                          <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-foreground/50" />
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="mb-5 label-caps text-[11px] text-subtle">
                      Typical deliverables
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-foreground/15 px-3 py-1.5 text-xs font-medium text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <div className="mt-10">
                  <ActionButton href={`/contact?type=${service.slug}`} variant="ghost">
                    {service.cta}
                  </ActionButton>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Technology */}
      <section className="surface-dark relative w-full overflow-hidden bg-background py-24 md:py-32">
        <Glow tone="lavender" className="-bottom-[22rem] -right-[20rem] w-[min(820px,130vw)]" />

        <div className="premium-grid relative z-10 w-full px-6 md:px-12">
          <SectionRail index="02" label="Stack" sublabel="Technology" footnote="Chosen per problem" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle description="We choose technology for the problem in front of us, favouring tools that are well supported, maintainable and right-sized for the project.">
              Tools we build with
            </SectionTitle>
            <dl className="border-t border-foreground/15">
              {technologies.map((category, index) => (
                <Reveal
                  key={category.number}
                  delay={index * 0.05}
                  className="grid grid-cols-1 gap-4 border-b border-foreground/15 py-7 md:grid-cols-[220px_1fr] md:gap-10"
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="label-caps text-[11px] text-subtle">{category.number}</span>
                    <span className="label-caps text-xs text-foreground">{category.title}</span>
                  </dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-muted md:text-xl">
                    {category.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative w-full bg-background py-24 md:py-32">
        <div className="premium-grid w-full px-6 md:px-12">
          <SectionRail index="03" label="FAQ" sublabel="Common questions" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle>Questions, answered</SectionTitle>
            <Accordion items={faqs} />
            <p className="mt-10 text-base text-muted">
              Something else on your mind?{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-4 transition-colors hover:text-muted">
                Ask us directly
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Not sure which service you need?"
        text="Describe the problem instead. We'll recommend the right starting point — even if that turns out to be something small."
        secondary={{ label: "See our work", href: "/work" }}
      />

      <script
        type="application/ld+json"
        // Static content defined in this repository — no user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </main>
  );
}

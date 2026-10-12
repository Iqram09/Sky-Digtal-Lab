import Image from "next/image";
import Monogram from "@/components/ui/Monogram";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaBand from "@/components/sections/CtaBand";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Team",
  description:
    "Meet the founders of Sky Digital Lab: Iqram Patel (technology, development and architecture), Rashid (business, client relationships and design) and Danish (sales, marketing and operations).",
  path: "/team",
});

const collaboration = [
  {
    title: "Technology",
    owner: "Iqram",
    text: "Architecture, development, integrations and deployment — how the solution is built and kept running.",
  },
  {
    title: "Business & Design",
    owner: "Rashid",
    text: "Requirements, design direction and the project plan — what gets built, and why.",
  },
  {
    title: "Growth & Operations",
    owner: "Danish",
    text: "Outreach, marketing and day-to-day coordination — so projects start well and run smoothly.",
  },
];

export default function TeamPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Our team"
        title="The people behind the work."
        intro="Three perspectives. One shared commitment to building better digital experiences."
      />

      <section aria-label="Team profiles" className="w-full bg-background">
        {team.map((member, index) => (
          <article
            key={member.slug}
            id={member.slug}
            aria-labelledby={`${member.slug}-name`}
            className="border-b border-foreground/10 py-20 md:py-28"
          >
            <div className="premium-grid w-full gap-y-10 px-6 md:px-12">
              <Reveal className="col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-4 md:col-start-1">
                {member.portrait ? (
                  <Image
                    src={member.portrait}
                    alt={`Portrait of ${member.name}`}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 70vw, 30vw"
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <Monogram initials={member.initials} index={String(index + 1).padStart(2, "0")} />
                )}
              </Reveal>

              <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-6">
                <Reveal delay={0.06}>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {String(index + 1).padStart(2, "0")} / Founder
                  </p>
                  <h2
                    id={`${member.slug}-name`}
                    className="mt-4 font-display text-5xl font-semibold leading-none tracking-tighter text-foreground md:text-7xl"
                  >
                    {member.name}
                  </h2>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {member.role}
                  </p>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                    {member.bio}
                  </p>
                </Reveal>

                <Reveal delay={0.12} className="mt-10 border-t border-foreground/15 pt-8">
                  <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                    Responsibilities
                  </h3>
                  <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {member.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-foreground/90">
                        <span aria-hidden className="mt-[0.65em] h-px w-4 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="relative w-full bg-ink py-24 md:py-36">
        <div className="premium-grid w-full px-6 md:px-12">
          <SectionRail index="02" label="Together" sublabel="How we work together" />
          <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <SectionTitle
              size="display"
              description="Every project gets all three perspectives from the first conversation. Technology, design, business development and operations sit in the same room — so decisions are made once, with the full picture."
            >
              How we work together
            </SectionTitle>
          </div>
        </div>

        <ol className="mx-6 grid gap-px border border-foreground/12 bg-foreground/12 md:mx-12 md:grid-cols-3">
          {collaboration.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.06} className="flex min-h-[240px] flex-col justify-between bg-ink p-6 md:p-10">
              <span className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-subtle">{item.owner}</span>
              </span>
              <span className="mt-10 block">
                <span className="block font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {item.title}
                </span>
                <span className="mt-3 block text-base leading-relaxed text-muted">{item.text}</span>
              </span>
            </Reveal>
          ))}
        </ol>

        <div className="premium-grid mt-14 w-full px-6 md:px-12">
          <Reveal className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5">
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              You get one point of contact and a team that already agrees on
              the plan. When a project needs a skill we don&apos;t have
              in-house, we bring in qualified specialists and stay accountable
              for the result.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Work with the people who build it."
        text="No hand-offs between sales and delivery — the team you talk to is the team that does the work."
        secondary={{ label: "About the studio", href: "/about" }}
      />
    </main>
  );
}

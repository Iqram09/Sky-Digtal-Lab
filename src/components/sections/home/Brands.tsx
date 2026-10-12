import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import ClientLogo from "@/components/ui/ClientLogo";
import { projects } from "@/content/projects";

export default function Brands() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="05" label="Clients" sublabel="Brands we work with" />

        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground text-balance md:text-6xl">
              Trusted collaborations. Real digital work.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Businesses whose websites we have designed and built. Each logo
              links to the live site.
            </p>
          </Reveal>
        </div>
      </div>

      <ul className="mx-6 mt-14 grid gap-px border border-foreground/12 bg-foreground/12 md:mx-12 md:mt-20 md:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 0.06} className="bg-background">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group flex h-full min-h-[220px] flex-col justify-between gap-10 p-6 transition-colors duration-500 hover:bg-panel md:p-10"
            >
              <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                <span>Client</span>
                <span aria-hidden className="transition-colors group-hover:text-accent">↗</span>
              </span>
              <span className="flex h-12 items-center">
                <ClientLogo project={project} tone="light" height={project.logo.kind === "take-solution" ? 38 : 40} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm text-muted">{project.industry}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle transition-colors group-hover:text-foreground">
                  {project.displayUrl}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

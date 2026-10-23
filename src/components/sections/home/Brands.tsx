import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import SectionRail from "@/components/ui/SectionRail";
import ClientLogo from "@/components/ui/ClientLogo";
import { projects } from "@/content/projects";

export default function Brands() {
  return (
    <section className="relative w-full overflow-hidden border-t border-foreground/10 bg-background py-24 md:py-32">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="05" label="Clients" sublabel="Brands we work with" />

        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tighter text-foreground text-balance md:text-6xl">
            <SplitText>Trusted collaborations. Real digital work.</SplitText>
          </h2>
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Businesses whose websites we have designed and built. Each logo
              links to the live site.
            </p>
          </Reveal>
        </div>
      </div>

      <ul className="mx-6 mt-14 grid gap-4 md:mx-12 md:mt-20 md:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 0.06}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group flex h-full min-h-[240px] flex-col justify-between gap-10 rounded-[20px] border border-foreground/10 bg-panel p-6 transition-[border-color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-foreground/30 motion-reduce:hover:translate-y-0 md:p-10"
            >
              <span className="label-caps flex items-center justify-between text-[11px] text-subtle">
                <span>Client</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
                >
                  ↗
                </span>
              </span>
              <span className="flex h-12 items-center">
                <ClientLogo project={project} tone="dark" height={project.logo.kind === "take-solution" ? 38 : 40} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm text-muted">{project.industry}</span>
                <span className="label-caps text-[11px] text-subtle transition-colors group-hover:text-foreground">
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

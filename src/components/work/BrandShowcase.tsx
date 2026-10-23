import Image from "next/image";
import Glow from "@/components/brand/Glow";
import ClientLogo from "@/components/ui/ClientLogo";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import TextLink from "@/components/ui/TextLink";
import { brandPanelStyle } from "@/components/work/ProjectFeature";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Each client appears in its own visual language — architecture, fashion,
 * technology — with its own logo and colours. Nothing here is Sky Digital Lab
 * branding laid over a client's identity.
 */
export default function BrandShowcase() {
  return (
    <section aria-labelledby="brands-title" className="surface-dark relative w-full overflow-hidden bg-background py-24 md:py-36">
      <Glow tone="lavender" className="-right-[22rem] -top-[20rem] w-[min(820px,130vw)]" />

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <SectionRail index="02" label="Clients" sublabel="Brands & clients" />
        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <SectionTitle
            size="display"
            description="Three businesses, three industries, three distinct identities. We design for each brand on its own terms."
          >
            <span id="brands-title">Brands we&apos;ve built for</span>
          </SectionTitle>
        </div>
      </div>

      <ul className="relative z-10 grid gap-6 px-6 md:px-12 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-foreground/10">
              <div className="relative flex h-[340px] flex-col justify-between overflow-hidden p-6 md:h-[400px] md:p-8" style={brandPanelStyle(project)}>
                <div className="relative z-10 flex h-11 items-center">
                  <ClientLogo project={project} tone="light" height={project.logo.kind === "take-solution" ? 34 : 38} />
                </div>
                <div
                  className={cn(
                    "absolute bottom-0 right-6 overflow-hidden md:right-8",
                    project.spotlight.frame === "phone"
                      ? "w-[42%] translate-y-[18%] rounded-t-[1.6rem] border border-b-0 border-white/15 bg-black p-1.5 pb-0"
                      : "w-[48%] translate-y-[8%] rounded-t-[6px]"
                  )}
                >
                  <Image
                    src={project.spotlight.src}
                    alt={project.spotlight.alt}
                    width={project.spotlight.width}
                    height={project.spotlight.height}
                    sizes="(max-width: 1024px) 45vw, 15vw"
                    className={cn("h-auto w-full", project.spotlight.frame === "phone" && "rounded-t-[1.3rem]")}
                  />
                </div>
                <span
                  className="label-caps relative z-10 max-w-[45%] text-[11px] leading-relaxed"
                  style={{ color: project.theme.accent }}
                >
                  {project.theme.mood}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 bg-panel p-6 md:p-8">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{project.client}</h3>
                  <p className="mt-1 text-sm text-muted">{project.industry}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{project.clientBackground}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <TextLink href={project.url}>
                    {project.displayUrl}
                  </TextLink>
                  <TextLink href={`/work/${project.slug}`}>
                    Case study<span className="sr-only">: {project.client}</span>
                  </TextLink>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import BrowserFrame from "@/components/ui/BrowserFrame";
import ClientLogo from "@/components/ui/ClientLogo";
import Reveal from "@/components/ui/Reveal";
import TextLink from "@/components/ui/TextLink";
import { cn } from "@/lib/utils";

/** Above-the-fold features skip the scroll reveal so the LCP image paints at once. */
function Static({ className, children }: { className?: string; children: React.ReactNode; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/**
 * Brand panel texture, chosen per client so no two features look alike:
 * a blueprint grid for architecture, a plain field for fashion photography,
 * a dot matrix for technology.
 */
export function brandPanelStyle(project: Project): CSSProperties {
  const { surface, accent, mood } = project.theme;
  const base: CSSProperties = { backgroundColor: surface };

  if (mood === "Architectural") {
    return {
      ...base,
      backgroundImage: `linear-gradient(${accent}1f 1px, transparent 1px), linear-gradient(90deg, ${accent}1f 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
    };
  }
  if (mood === "Technology") {
    return {
      ...base,
      backgroundImage: `radial-gradient(${accent}33 1px, transparent 1px)`,
      backgroundSize: "18px 18px",
    };
  }
  return base;
}

type ProjectFeatureProps = {
  project: Project;
  index: number;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

export default function ProjectFeature({
  project,
  index,
  reverse = false,
  headingLevel: Heading = "h3",
  priority = false,
}: ProjectFeatureProps) {
  const number = String(index + 1).padStart(2, "0");
  const { spotlight } = project;
  const Wrap = priority ? Static : Reveal;

  return (
    <article className="grid grid-cols-12 items-center gap-y-10 lg:gap-x-14">
      <Wrap className={cn("col-span-12 lg:col-span-7", reverse && "lg:order-2")}>
        {/* The visual repeats the case-study link for pointer users only. */}
        <Link
          href={`/work/${project.slug}`}
          tabIndex={-1}
          aria-hidden
          data-cursor="project"
          className="group relative block"
        >
          <div
            className="relative overflow-hidden rounded-[20px] px-4 pb-4 pt-12 sm:px-6 sm:pb-6 md:px-10 md:pb-10 md:pt-14"
            style={brandPanelStyle(project)}
          >
            <span
              className="absolute left-4 top-4 label-caps text-[11px] sm:left-6 md:left-10 md:top-5"
              style={{ color: project.theme.accent }}
            >
              {project.theme.mood}
            </span>
            <span className="absolute right-4 top-4 label-caps text-[11px] text-white/60 sm:right-6 md:right-10 md:top-5">
              {project.displayUrl}
            </span>

            <div className={cn("transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 motion-reduce:transition-none", spotlight && "md:mr-[18%]")}>
              <BrowserFrame
                src={project.cover.src}
                alt=""
                width={project.cover.width}
                height={project.cover.height}
                url={project.displayUrl}
                sizes="(max-width: 1024px) 92vw, 52vw"
                priority={priority}
              />
            </div>

            <div
              className={cn(
                "absolute bottom-4 right-4 hidden overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 motion-reduce:transition-none md:block md:bottom-10 md:right-10",
                spotlight.frame === "phone"
                  ? "w-[21%] rounded-[1.4rem] border border-white/15 bg-black p-1.5"
                  : "w-[26%] rounded-[6px]"
              )}
            >
              <Image
                src={spotlight.src}
                alt=""
                width={spotlight.width}
                height={spotlight.height}
                sizes="(max-width: 1024px) 24vw, 14vw"
                className={cn("h-auto w-full", spotlight.frame === "phone" && "rounded-[1.1rem]")}
              />
            </div>
          </div>
        </Link>
      </Wrap>

      <Wrap delay={0.08} className={cn("col-span-12 lg:col-span-5", reverse && "lg:order-1")}>
        <div className="flex items-baseline justify-between gap-4 border-b border-foreground/15 pb-4">
          <span className="label-caps text-[11px] text-foreground">{number}</span>
          <span className="text-right label-caps text-[11px] text-subtle">
            {project.industry}
          </span>
        </div>

        <div className="mt-8 flex h-10 items-center">
          <ClientLogo project={project} tone="dark" height={project.logo.kind === "take-solution" ? 34 : 36} />
        </div>

        <Heading className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-3xl">
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-muted" data-cursor="link">
            {project.headline}
          </Link>
        </Heading>
        <p className="mt-3 label-caps text-[11px] text-subtle">
          {project.projectType}
        </p>
        <p className="mt-5 text-base leading-relaxed text-muted">{project.summary}</p>

        <dl className="mt-8 grid gap-5">
          <div>
            <dt className="mb-2 label-caps text-[11px] text-subtle">Deliverables</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-foreground/15 bg-panel px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="mb-2 label-caps text-[11px] text-subtle">Built with</dt>
            <dd className="text-sm text-muted">
              {project.technologies.join(" / ")}
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <TextLink href={`/work/${project.slug}`}>
            View Case Study<span className="sr-only">: {project.client}</span>
          </TextLink>
          <TextLink href={project.url}>
            Visit Website<span className="sr-only">: {project.client}</span>
          </TextLink>
        </div>
      </Wrap>
    </article>
  );
}

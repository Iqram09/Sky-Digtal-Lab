import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionButton from "@/components/ui/ActionButton";
import BrowserFrame from "@/components/ui/BrowserFrame";
import ClientLogo from "@/components/ui/ClientLogo";
import PhoneFrame from "@/components/ui/PhoneFrame";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import CtaBand from "@/components/sections/CtaBand";
import CaseGallery from "@/components/work/CaseGallery";
import { brandPanelStyle } from "@/components/work/ProjectFeature";
import { getAdjacentProject, getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

/** Only the case studies that exist are built; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.client} — Case Study`,
    description: `${project.headline} ${project.summary}`,
    path: `/work/${project.slug}`,
    // JPEG share image cropped from the real home page screenshot — WebP
    // isn't accepted by every social platform.
    image: {
      url: `/work/${project.slug}/og.jpg`,
      width: 1200,
      height: 630,
      alt: project.cover.alt,
    },
  });
}

function Section({
  index,
  label,
  sublabel,
  title,
  children,
  className = "bg-background",
}: {
  index: string;
  label: string;
  sublabel?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative w-full py-20 md:py-28 ${className}`}>
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index={index} label={label} sublabel={sublabel} />
        <div className="col-span-12 mt-10 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <h2 className="mb-10 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance md:mb-14 md:text-5xl">
              {title}
            </h2>
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);
  const brand = { "--brand": project.theme.accent } as CSSProperties;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Our Work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 3, name: project.client, item: `${site.url}/work/${project.slug}` },
    ],
  };

  const facts = [
    { label: "Client", value: project.client },
    { label: "Industry", value: project.industry },
    { label: "Project", value: project.projectType },
    { label: "Platform", value: project.technologies.join(", ") },
  ];

  return (
    <main id="main" style={brand}>
      {/* Header */}
      <header className="relative w-full overflow-hidden bg-ink pb-16 pt-32 md:pb-20 md:pt-44">
        <div className="premium-grid relative z-10 w-full gap-y-12 px-6 md:px-12">
          <div className="col-span-12 lg:col-span-7">
            <nav aria-label="Breadcrumb" className="fade-rise">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                <li>
                  <Link href="/work" className="transition-colors hover:text-foreground">
                    Our Work
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-(--brand)">
                  {project.client}
                </li>
              </ol>
            </nav>

            <h1 className="mt-8 font-display text-[13vw] font-semibold leading-[0.92] tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              <span className="line-mask">
                <span className="line-rise">{project.client}</span>
              </span>
            </h1>
            <p
              className="fade-rise mt-6 max-w-2xl font-display text-2xl leading-snug tracking-tight text-muted text-balance md:text-3xl"
              style={{ animationDelay: "0.15s" }}
            >
              {project.headline}
            </p>

            <div className="fade-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.25s" }}>
              <ActionButton href={project.url} variant="primary">
                Visit Live Website
              </ActionButton>
              <ActionButton href={`/contact?type=web-design-development`} variant="ghost">
                Start a similar project
              </ActionButton>
            </div>
          </div>

          <dl
            className="fade-rise col-span-12 grid grid-cols-2 gap-px self-end border border-foreground/12 bg-foreground/12 lg:col-span-4 lg:col-start-9 lg:grid-cols-1"
            style={{ animationDelay: "0.3s" }}
          >
            {facts.map((fact) => (
              <div key={fact.label} className="bg-ink p-4 md:p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">{fact.label}</dt>
                <dd className="mt-2 text-sm leading-snug text-foreground md:text-base">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Hero visual on the client's own ground */}
      <section aria-label={`${project.client} website`} className="w-full bg-ink px-6 pb-20 md:px-12 md:pb-28">
        <div className="relative overflow-hidden rounded-[16px] px-4 pb-4 pt-20 sm:px-8 sm:pb-8 md:px-16 md:pb-16 md:pt-24" style={brandPanelStyle(project)}>
          <div className="absolute left-4 top-6 sm:left-8 md:left-16 md:top-8">
            <ClientLogo project={project} tone="light" height={project.logo.kind === "take-solution" ? 30 : 34} />
          </div>
          <span className="absolute right-4 top-8 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-(--brand) sm:right-8 sm:block md:right-16 md:top-10">
            {project.theme.mood}
          </span>
          <BrowserFrame
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            url={project.displayUrl}
            sizes="(max-width: 768px) 90vw, 86vw"
            priority
          />
        </div>
      </section>

      <Section index="01" label="Overview" sublabel={project.industry} title="Project overview">
        <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted md:text-xl">
            {project.overview.map((paragraph) => (
              <Reveal key={paragraph}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <aside className="border-l-2 border-(--brand) pl-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">About the client</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/90">{project.clientBackground}</p>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section index="02" label="Brief" sublabel="Requirements" title="What the website had to do" className="bg-ink">
        <ol className="grid gap-px border border-foreground/12 bg-foreground/12 md:grid-cols-2">
          {project.requirements.map((requirement, index) => (
            <Reveal as="li" key={requirement.title} delay={(index % 2) * 0.06} className="bg-ink p-6 md:p-8 md:[&:last-child:nth-child(odd)]:col-span-2">
              <span className="font-mono text-xs text-(--brand)">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {requirement.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{requirement.detail}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section index="03" label="Structure" sublabel="Site map & journeys" title="Structure and user journeys">
        <div className="grid gap-16 xl:grid-cols-2">
          <Reveal>
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">Site structure</h3>
            <dl className="border-t border-foreground/15">
              {project.structure.map((item) => (
                <div key={item.section} className="grid gap-2 border-b border-foreground/15 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="font-display text-lg font-semibold text-foreground">{item.section}</dt>
                  <dd className="text-base leading-relaxed text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">Key journeys</h3>
            <ul className="flex flex-col gap-8 border-t border-foreground/15 pt-6">
              {project.journeys.map((journey) => (
                <li key={journey.audience}>
                  <p className="font-display text-lg font-semibold text-foreground">{journey.audience}</p>
                  <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label={`${journey.audience} journey`}>
                    {journey.path.map((step, stepIndex) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="border border-foreground/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                          {step}
                        </span>
                        {stepIndex < journey.path.length - 1 ? (
                          <span aria-hidden className="text-(--brand)">→</span>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="w-full bg-ink py-20 md:py-28">
        <div className="premium-grid w-full px-6 md:px-12">
          <SectionRail index="04" label="Gallery" sublabel="The live site" />
          <div className="col-span-12 mt-10 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
            <h2 id="gallery-title" className="mb-14 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              Inside the website
            </h2>
          </div>
        </div>
        <div className="px-6 md:px-12">
          <CaseGallery project={project} />
        </div>
      </section>

      <Section index="05" label="Craft" sublabel="Design & build" title="Design and implementation">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">Design</h3>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-muted md:text-lg">
              {project.design.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">Implementation</h3>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-muted md:text-lg">
              {project.implementation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Platform and technologies">
              {project.technologies.map((tech) => (
                <li key={tech} className="border border-(--brand)/50 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section index="06" label="Responsive" sublabel="Phone & tablet" title="Built for every screen" className="bg-panel">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">{project.responsive}</p>
          </Reveal>
          <div className="flex justify-center gap-5 sm:gap-8">
            <Reveal className="w-[44vw] max-w-[260px]">
              <PhoneFrame {...project.mobile} />
            </Reveal>
            {project.extraMobile ? (
              <Reveal delay={0.1} className="w-[44vw] max-w-[260px] sm:mt-16">
                <PhoneFrame {...project.extraMobile} />
              </Reveal>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Live site */}
      <section className="w-full bg-background px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div
            className="flex flex-col items-start justify-between gap-10 rounded-[16px] p-8 md:flex-row md:items-end md:p-14"
            style={brandPanelStyle(project)}
          >
            <div>
              <ClientLogo project={project} tone="light" height={project.logo.kind === "take-solution" ? 34 : 40} />
              <p className="mt-8 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                See it live.
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">{project.displayUrl}</p>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group inline-flex items-center gap-3 border border-white/30 bg-white/5 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              Visit Live Website
              <span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Next project */}
      <nav aria-label="Next case study" className="w-full border-t border-foreground/10 bg-background">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="link"
          className="group flex flex-col gap-4 px-6 py-14 transition-colors duration-500 hover:bg-panel md:flex-row md:items-end md:justify-between md:px-12 md:py-20"
        >
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">Next project</span>
            <span className="mt-3 block font-display text-5xl font-semibold tracking-tighter text-foreground transition-colors group-hover:text-accent md:text-7xl">
              {next.client}
            </span>
          </span>
          <span className="max-w-md text-base text-muted md:text-right">
            {next.headline} <span aria-hidden className="text-accent">→</span>
          </span>
        </Link>
      </nav>

      <CtaBand
        heading="Planning something similar?"
        text="Tell us about your business and what the website needs to do. We'll help you shape a clear, practical plan."
        secondary={{ label: "All projects", href: "/work" }}
      />

      <script
        type="application/ld+json"
        // Static content defined in this repository — no user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </main>
  );
}

import Link from "next/link";
import Wordmark from "@/components/layout/Wordmark";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { nav, site, socials } from "@/lib/site";

const linkClass =
  "text-muted transition-colors hover:text-foreground";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">{title}</h2>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-foreground/10 bg-ink pt-20 md:pt-28">
      <div className="premium-grid relative z-10 w-full gap-y-14 px-6 md:px-12">
        <div className="col-span-12 lg:col-span-4">
          <Link href="/" className="group inline-block" data-cursor="link">
            <Wordmark />
            <span className="sr-only"> — home</span>
          </Link>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            A digital studio bringing strategy, design and engineering together
            to build websites, applications and software that help businesses
            move forward.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <Link
              href="/contact"
              data-cursor="link"
              className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-on-taupe transition-colors hover:border-foreground hover:bg-foreground"
            >
              Start a Project <span aria-hidden>→</span>
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-[11px] tracking-[0.12em] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="col-span-6 md:col-span-4 lg:col-span-2 lg:col-start-6">
          <FooterColumn title="Studio">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass} data-cursor="link">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </nav>

        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <FooterColumn title="Services">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className={linkClass} data-cursor="link">
                  {service.title}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-2">
          <FooterColumn title="Selected work">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className={linkClass} data-cursor="link">
                  {project.client}
                </Link>
              </li>
            ))}
          </FooterColumn>
          {/* Social profiles render here once real accounts exist — see src/lib/site.ts */}
          {socials.length > 0 ? (
            <div className="mt-10">
              <FooterColumn title="Elsewhere">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {social.label}
                    </a>
                  </li>
                ))}
              </FooterColumn>
            </div>
          ) : null}
        </div>
      </div>

      {/*
        Closing wordmark — purely decorative (the name is announced above), so
        it is drawn as SVG and stretched to the full measure.
      */}
      <div aria-hidden className="mt-20 w-full select-none px-6 md:mt-28 md:px-12">
        <svg viewBox="0 0 1000 160" className="block h-auto w-full" focusable="false">
          <text
            x="0"
            y="128"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-foreground/[0.07] font-display font-semibold"
            style={{ fontSize: 168, letterSpacing: "-0.04em" }}
          >
            Sky Digital Lab
          </text>
        </svg>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-foreground/10 px-6 py-6 font-mono text-[10px] uppercase tracking-widest text-subtle sm:flex-row sm:items-center sm:justify-between md:px-12">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Designed with intention. Built with purpose.</span>
      </div>
    </footer>
  );
}

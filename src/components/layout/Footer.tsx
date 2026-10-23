import Image from "next/image";
import Link from "next/link";
import Glow from "@/components/brand/Glow";
import Logo from "@/components/brand/Logo";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { nav, site, socials } from "@/lib/site";

const linkClass = "text-muted transition-colors hover:text-foreground";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-caps mb-5 text-[11px] text-subtle">{title}</h2>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="surface-dark relative w-full overflow-hidden bg-background pt-20 md:pt-28">
      <Glow tone="lavender" className="-left-[20rem] -top-[24rem] w-[min(760px,130vw)]" />
      <Glow tone="mint" className="-bottom-[26rem] -right-[18rem] w-[min(880px,140vw)]" />

      <div className="premium-grid relative z-10 w-full gap-y-14 px-6 md:px-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            A digital studio bringing strategy, design and engineering together
            to build websites, applications and software that help businesses
            move forward.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <Link
              href="/contact"
              data-cursor="link"
              className="label-caps inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] text-background transition-opacity hover:opacity-85"
            >
              Start a Project <span aria-hidden>→</span>
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
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
        Sign-off: the white primary logo on charcoal, with the light app icon
        opposite — the composition of the guideline cover. Generous padding keeps
        the logo's clear space free.
      */}
      <div className="relative z-10 mt-20 flex items-end justify-between gap-10 px-6 pb-14 md:mt-28 md:px-12 md:pb-20">
        <Reveal y={48} className="w-[min(560px,78vw)]">
          <Link href="/" aria-label={`${site.name} — home`} data-cursor="link" className="block">
            <Logo version="primary" tone="white" width={560} alt="" className="w-full" />
          </Link>
        </Reveal>
        <Reveal delay={0.15} y={48} className="hidden md:block">
          <Image
            src="/brand/sdl-app-icon-light.svg"
            alt=""
            width={88}
            height={88}
            unoptimized
            className="h-auto w-[88px]"
          />
        </Reveal>
      </div>

      <div className="label-caps relative z-10 flex w-full flex-col gap-3 border-t border-foreground/10 px-6 py-6 text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between md:px-12">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Designed with intention. Built with purpose.</span>
      </div>
    </footer>
  );
}

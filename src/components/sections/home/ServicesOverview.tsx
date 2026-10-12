import Link from "next/link";
import ActionButton from "@/components/ui/ActionButton";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/content/services";

export default function ServicesOverview() {
  return (
    <section className="relative w-full overflow-hidden bg-panel py-24 md:py-36">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="03" label="Services" sublabel="What we do" footnote="Nine disciplines" />

        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <SectionTitle
            size="display"
            meta={`${String(services.length).padStart(2, "0")} Services`}
            description="From a first website to custom software, we take on the work we can do well — and say so plainly when a project needs specialist help."
          >
            What we do
          </SectionTitle>
        </div>
      </div>

      <ul className="mx-6 grid gap-px border border-foreground/12 bg-foreground/12 sm:grid-cols-2 md:mx-12 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={(index % 3) * 0.06} className="bg-panel">
            <Link
              href={`/services#${service.slug}`}
              data-cursor="link"
              className="group relative flex h-full min-h-[230px] flex-col justify-between p-6 transition-colors duration-500 hover:bg-background md:p-8"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none"
              />
              <span className="flex items-start justify-between">
                <span className="font-mono text-xs text-accent">{service.number}</span>
                <span
                  aria-hidden
                  className="text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none"
                >
                  →
                </span>
              </span>
              <span className="mt-10 block">
                <span className="block font-display text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
                  {service.title}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted">{service.short}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 flex justify-center px-6">
        <ActionButton href="/services" variant="ghost">
          Explore services
        </ActionButton>
      </div>
    </section>
  );
}

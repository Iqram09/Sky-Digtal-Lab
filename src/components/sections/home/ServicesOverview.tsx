import Link from "next/link";
import Glow from "@/components/brand/Glow";
import ActionButton from "@/components/ui/ActionButton";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/content/services";

export default function ServicesOverview() {
  return (
    <section className="surface-dark relative w-full overflow-hidden bg-background py-24 md:py-36">
      <Glow tone="lavender" className="-right-[24rem] -top-[20rem] w-[min(820px,130vw)]" />

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
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

      <ul className="relative z-10 mx-6 grid gap-4 sm:grid-cols-2 md:mx-12 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={(index % 3) * 0.06}>
            <Link
              href={`/services#${service.slug}`}
              data-cursor="link"
              className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-[20px] border border-foreground/10 bg-panel p-6 transition-[border-color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-foreground/30 motion-reduce:hover:translate-y-0 md:p-8"
            >
              {/* A soft glow rises in the corner on hover. */}
              <Glow
                tone={index % 2 === 0 ? "mint" : "lavender"}
                className="-right-28 -top-28 w-72 opacity-0 transition-opacity duration-700 group-hover:opacity-50 motion-reduce:transition-none"
              />
              <span className="relative flex items-start justify-between">
                <span className="label-caps text-[11px] text-subtle">{service.number}</span>
                <span
                  aria-hidden
                  className="text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transition-none"
                >
                  →
                </span>
              </span>
              <span className="relative mt-10 block">
                <span className="block font-display text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
                  {service.title}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted">{service.short}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="relative z-10 mt-14 flex justify-center px-6">
        <ActionButton href="/services" variant="ghost">
          Explore services
        </ActionButton>
      </div>
    </section>
  );
}

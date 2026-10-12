import ActionButton from "@/components/ui/ActionButton";
import Monogram from "@/components/ui/Monogram";
import Reveal from "@/components/ui/Reveal";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { team } from "@/content/team";

export default function TeamPreview() {
  return (
    <section className="relative w-full overflow-hidden bg-panel py-24 md:py-36">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="06" label="Team" sublabel="The founders" footnote="Three perspectives" />

        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <SectionTitle
            size="display"
            description="Technology, business and growth — three founders, one shared commitment to building better digital experiences."
          >
            The people behind the work
          </SectionTitle>
        </div>
      </div>

      <ul className="grid gap-6 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
        {team.map((member, index) => (
          <Reveal as="li" key={member.slug} delay={index * 0.08}>
            <Monogram initials={member.initials} index={String(index + 1).padStart(2, "0")} />
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {member.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{member.role}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 flex justify-center px-6">
        <ActionButton href="/team" variant="ghost">
          Meet the Team
        </ActionButton>
      </div>
    </section>
  );
}

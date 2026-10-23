import ActionButton from "@/components/ui/ActionButton";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectFeature from "@/components/work/ProjectFeature";
import { projects } from "@/content/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="relative w-full overflow-hidden border-t border-foreground/10 bg-background py-24 md:py-36">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="02" label="Work" sublabel="Selected projects" footnote="Live websites" />

        <div className="col-span-12 mt-12 md:col-span-9 md:col-start-4 md:mt-0 lg:col-span-8 lg:col-start-5">
          <SectionTitle
            size="display"
            meta={`${String(projects.length).padStart(2, "0")} Projects`}
            description="Websites we have designed and built for businesses in real estate, fashion and digital services. Each one is live — visit them and judge the work for yourself."
          >
            Selected work
          </SectionTitle>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-24 px-6 md:mt-8 md:gap-32 md:px-12">
        {projects.map((project, index) => (
          <ProjectFeature
            key={project.slug}
            project={project}
            index={index}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <div className="mt-24 flex justify-center px-6 md:mt-32">
        <ActionButton href="/work" variant="ghost">
          Explore Our Work
        </ActionButton>
      </div>
    </section>
  );
}

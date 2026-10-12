"use client";

import { useState } from "react";
import ProjectFeature from "@/components/work/ProjectFeature";
import { projectCategories, projects, type ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

/** Only categories that actually contain work are offered — no empty filters. */
const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All Projects", count: projects.length },
  ...projectCategories
    .map((category) => ({
      id: category.id as Filter,
      label: category.label,
      count: projects.filter((project) => project.categories.includes(category.id)).length,
    }))
    .filter((filter) => filter.count > 0),
];

export default function WorkIndex() {
  const [active, setActive] = useState<Filter>("all");
  const visible =
    active === "all" ? projects : projects.filter((project) => project.categories.includes(active));

  return (
    <>
      <div className="sticky top-20 z-20 border-y border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto px-6 py-4 md:px-12" role="group" aria-label="Filter projects">
          {filters.map((filter) => {
            const selected = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  selected
                    ? "border-accent bg-accent text-on-taupe"
                    : "border-foreground/20 text-muted hover:border-foreground/50 hover:text-foreground"
                )}
              >
                {filter.label}
                <span className={selected ? "text-on-taupe-muted" : "text-subtle"}>
                  {String(filter.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="flex w-full flex-col gap-24 px-6 py-20 md:gap-32 md:px-12 md:py-28">
        {visible.map((project, index) => (
          <ProjectFeature
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
            reverse={index % 2 === 1}
            headingLevel="h2"
            priority={index === 0}
          />
        ))}
      </div>
    </>
  );
}

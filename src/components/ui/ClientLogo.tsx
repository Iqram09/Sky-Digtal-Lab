import Image from "next/image";
import type { Project } from "@/content/projects";
import TakeSolutionLogo from "@/components/ui/TakeSolutionLogo";
import { cn } from "@/lib/utils";

type ClientLogoProps = {
  project: Pick<Project, "client" | "logo">;
  /** `light` artwork for dark grounds, `dark` artwork for light grounds. */
  tone?: "light" | "dark";
  /**
   * Visual height in px. Each mark keeps its own proportions — width follows
   * from the artwork, never the other way round.
   */
  height?: number;
  className?: string;
};

/**
 * Official client logos, untouched: no recolouring, no stretching. Only the
 * variant the client itself publishes for light or dark grounds is chosen.
 */
export default function ClientLogo({ project, tone = "light", height = 36, className }: ClientLogoProps) {
  const { logo } = project;

  if (logo.kind === "take-solution") {
    // The lockup is em-based (mark = 1.9em). Its solid square reads heavier
    // than the raster logos, so it is set a touch smaller for optical balance.
    return (
      <TakeSolutionLogo
        tone={tone}
        className={className}
        fontSize={Math.round((height / 1.9) * 0.85)}
      />
    );
  }

  const width = Math.round((logo.width / logo.height) * height);

  return (
    <Image
      src={tone === "light" ? logo.light : logo.dark}
      alt={`${project.client} logo`}
      // No `sizes`: a fixed-width image gets a 1x/2x srcset, the right fit for a logo.
      width={width}
      height={height}
      className={cn("h-auto max-w-full", className)}
      style={{ width, height: "auto" }}
    />
  );
}

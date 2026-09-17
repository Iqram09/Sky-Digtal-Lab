import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: ReactNode;
  meta?: string;
  description?: string;
  tone?: "dark" | "light";
  /** `display` is reserved for short, punchy headings. */
  size?: "default" | "display";
  className?: string;
};

/**
 * Heading + hairline rule + optional right-hand meta, matching the typographic
 * rhythm established by the original "WHAT WE DO" header.
 */
export default function SectionTitle({
  children,
  meta,
  description,
  tone = "dark",
  size = "default",
  className,
}: SectionTitleProps) {
  const rule = tone === "dark" ? "border-white/15" : "border-black/15";
  const muted = tone === "dark" ? "text-white/55" : "text-black/55";

  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className={cn("flex items-end justify-between border-b pb-5", rule)}>
        <h2
          className={cn(
            "font-semibold leading-[0.95] tracking-tight text-balance",
            size === "display"
              ? "text-5xl md:text-7xl lg:text-8xl"
              : "text-4xl md:text-5xl lg:text-6xl"
          )}
        >
          {children}
        </h2>
        {meta ? (
          <span
            className={cn(
              "ml-6 hidden shrink-0 font-mono text-xs uppercase tracking-widest md:block",
              tone === "dark" ? "text-white/40" : "text-black/40"
            )}
          >
            {meta}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed md:text-xl", muted)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: ReactNode;
  meta?: string;
  description?: string;
  tone?: "dark" | "light";
  /** `display` is reserved for short, punchy headings. */
  size?: "default" | "display";
  as?: "h2" | "h3";
  className?: string;
};

/**
 * Heading + hairline rule + optional right-hand meta — the typographic rhythm
 * every section shares.
 */
export default function SectionTitle({
  children,
  meta,
  description,
  tone = "dark",
  size = "default",
  as: Heading = "h2",
  className,
}: SectionTitleProps) {
  const rule = tone === "dark" ? "border-foreground/15" : "border-on-taupe/20";
  const muted = tone === "dark" ? "text-muted" : "text-on-taupe-muted";

  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className={cn("flex items-end justify-between border-b pb-5", rule)}>
        <Heading
          className={cn(
            "font-display font-semibold leading-[0.98] tracking-tight text-balance",
            size === "display"
              ? "text-4xl md:text-6xl lg:text-7xl"
              : "text-3xl md:text-5xl lg:text-[3.4rem]"
          )}
        >
          {children}
        </Heading>
        {meta ? (
          <span
            className={cn(
              "ml-6 hidden shrink-0 font-mono text-xs uppercase tracking-widest md:block",
              tone === "dark" ? "text-subtle" : "text-on-taupe-muted"
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

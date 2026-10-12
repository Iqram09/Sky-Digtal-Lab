import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  /** e.g. "About" — shown in the mono eyebrow. */
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Opening block for every inner page: mono eyebrow, display headline and a
 * short introduction. Renders without client JS, so the LCP text paints
 * immediately — motion comes from the shared CSS entrance only.
 */
export default function PageHeader({ eyebrow, title, intro, children, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative w-full overflow-hidden border-b border-foreground/10 bg-ink pb-16 pt-36 md:pb-24 md:pt-48",
        className
      )}
    >
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 lg:col-span-10">
          <p className="fade-rise mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {eyebrow}
          </p>
          <h1 className="font-display text-[12vw] font-semibold leading-[0.95] tracking-tighter text-foreground text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="line-mask">
              <span className="line-rise">{title}</span>
            </span>
          </h1>
          {intro ? (
            <p
              className="fade-rise mt-8 max-w-2xl text-lg leading-relaxed text-muted md:mt-10 md:text-xl"
              style={{ animationDelay: "0.15s" }}
            >
              {intro}
            </p>
          ) : null}
          {children ? (
            <div className="fade-rise mt-10" style={{ animationDelay: "0.25s" }}>
              {children}
            </div>
          ) : null}
        </div>
      </div>

      {/* Construction grid — the only ornament */}
      <div aria-hidden className="premium-grid pointer-events-none absolute inset-0 px-6 md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-foreground/[0.035]" />
        ))}
      </div>
    </header>
  );
}

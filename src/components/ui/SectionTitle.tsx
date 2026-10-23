import type { ReactNode } from "react";
import SplitText from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: ReactNode;
  meta?: string;
  description?: string;
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
  size = "default",
  as: Heading = "h2",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-end justify-between border-b border-foreground/15 pb-5">
        <Heading
          className={cn(
            "font-display font-semibold leading-[1.02] tracking-tighter text-balance",
            size === "display"
              ? "text-4xl md:text-6xl lg:text-7xl"
              : "text-3xl md:text-5xl lg:text-[3.4rem]"
          )}
        >
          {/* Plain-text titles rise in word by word; anything richer renders as is. */}
          {typeof children === "string" ? <SplitText>{children}</SplitText> : children}
        </Heading>
        {meta ? (
          <span
            className="label-caps ml-6 hidden shrink-0 text-[11px] text-subtle md:block"
          >
            {meta}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}

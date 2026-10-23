"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useMagnetic } from "@/lib/useMagnetic";
import { useScrollTo } from "@/lib/useScrollTo";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type ActionButtonProps = {
  children: ReactNode;
  /**
   * `#anchor` scrolls in-page through Lenis, `/route` navigates client-side,
   * and `http(s)://` / `mailto:` open as ordinary links (external ones in a new tab).
   */
  href: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

const base =
  "label-caps group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-6 py-4 text-[11px] transition-[color,background-color,border-color,translate] duration-300 ease-out md:px-7";

/*
 * Both variants are written in surface tokens, so they invert on their own:
 * charcoal on off-white, off-white on charcoal.
 */
const variants: Record<Variant, { shell: string; sweep: string; text: string }> = {
  primary: {
    shell: "border-foreground bg-foreground text-background",
    sweep: "bg-muted",
    text: "group-hover:text-background",
  },
  ghost: {
    shell: "border-foreground/25 text-foreground hover:border-foreground",
    sweep: "bg-foreground",
    text: "group-hover:text-background",
  },
};

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export default function ActionButton({
  children,
  href,
  variant = "primary",
  className,
  arrow = true,
}: ActionButtonProps) {
  const scrollTo = useScrollTo();
  // The pill leans toward the pointer while hovered.
  const magnetic = useMagnetic<HTMLAnchorElement>();
  const style = variants[variant];
  const external = isExternal(href);

  const content = (
    <>
      {/* Hover sweep — purely decorative, sits behind the label. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:transition-none",
          style.sweep
        )}
      />
      <span className={cn("relative z-10 transition-colors duration-300", style.text)}>
        {children}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </span>
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            "relative z-10 transition-all duration-300 group-hover:translate-x-1 motion-reduce:transition-none",
            style.text
          )}
        >
          {external ? "↗" : "→"}
        </span>
      ) : null}
    </>
  );

  const classes = cn(base, style.shell, className);

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          scrollTo(href);
        }}
        data-cursor="link"
        className={classes}
        {...magnetic}
      >
        {content}
      </a>
    );
  }

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor="link"
        className={classes}
        {...magnetic}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor="link" className={classes} {...magnetic}>
      {content}
    </Link>
  );
}

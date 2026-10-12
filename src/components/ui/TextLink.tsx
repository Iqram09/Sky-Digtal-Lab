import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

/**
 * Compact mono link with an underline that thickens on hover. External URLs
 * open in a new tab with a ↗ marker; internal routes use client navigation.
 */
export default function TextLink({ href, children, className, tone = "dark" }: TextLinkProps) {
  const external = /^https?:\/\//.test(href);
  const classes = cn(
    "group inline-flex items-center gap-2 border-b pb-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
    tone === "dark"
      ? "border-accent/40 text-accent hover:border-accent hover:text-foreground"
      : "border-on-taupe/40 text-on-taupe hover:border-on-taupe",
    className
  );
  const arrow = (
    <span
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
    >
      {external ? "↗" : "→"}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="link" className={classes}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor="link" className={classes}>
      {children}
      {arrow}
    </Link>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * Compact caps link with an underline that firms up on hover. External URLs
 * open in a new tab with a ↗ marker; internal routes use client navigation.
 */
export default function TextLink({ href, children, className }: TextLinkProps) {
  const external = /^https?:\/\//.test(href);
  const classes = cn(
    "label-caps group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[11px] text-foreground transition-colors hover:border-foreground",
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

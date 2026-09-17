"use client";

import type { MouseEvent, ReactNode } from "react";
import { useScrollTo } from "@/lib/useScrollTo";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "ghostLight";

type ActionButtonProps = {
  children: ReactNode;
  /** `#anchor` scrolls in-page through Lenis; anything else is a normal link. */
  href: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

const base =
  "group relative inline-flex items-center gap-3 overflow-hidden border px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 md:px-7";

const variants: Record<Variant, { shell: string; sweep: string; text: string }> = {
  primary: {
    shell: "border-accent bg-accent text-[#050505]",
    sweep: "bg-white",
    text: "group-hover:text-[#050505]",
  },
  ghost: {
    shell: "border-white/25 text-white hover:border-accent",
    sweep: "bg-accent",
    text: "group-hover:text-[#050505]",
  },
  ghostLight: {
    shell: "border-black/25 text-[#050505] hover:border-[#050505]",
    sweep: "bg-[#050505]",
    text: "group-hover:text-[#F5F5F0]",
  },
};

export default function ActionButton({
  children,
  href,
  variant = "primary",
  className,
  arrow = true,
}: ActionButtonProps) {
  const scrollTo = useScrollTo();
  const isAnchor = href.startsWith("#");
  const style = variants[variant];

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isAnchor) return;
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      data-cursor="link"
      className={cn(base, style.shell, className)}
    >
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
      </span>
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            "relative z-10 transition-all duration-300 group-hover:translate-x-1 motion-reduce:transition-none",
            style.text
          )}
        >
          →
        </span>
      ) : null}
    </a>
  );
}

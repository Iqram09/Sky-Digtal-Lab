"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a different element where a div would break semantics. */
  as?: "div" | "li" | "span";
};

/**
 * The site's standard entrance: a short rise + fade once the element is in view.
 *
 * Server and client render identical markup — the hidden starting state lives in
 * CSS (`[data-reveal]` in globals.css) and only applies when JavaScript is running
 * and the visitor hasn't asked for reduced motion. If either is missing, content
 * is simply visible; nothing can be stranded at opacity 0.
 */
export default function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useRevealOnce(ref);

  const Tag = as;
  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <Tag
      // A callback ref keeps the typing simple across the three possible tags.
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-reveal=""
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

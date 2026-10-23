"use client";

import { useRef, type CSSProperties } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  children: string;
  /** Seconds before the first word moves. */
  delay?: number;
  className?: string;
};

/**
 * A heading line that rises in word by word, each word from behind its own
 * mask, once it scrolls into view. The text stays one continuous string for
 * assistive technology; only the visual layer is split.
 */
export default function SplitText({ children, delay = 0, className }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useRevealOnce(ref);
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <span
      ref={ref}
      data-split=""
      className={cn("block", className)}
      style={{ "--split-delay": `${delay}s` } as CSSProperties}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="split-word">
            <span style={{ "--i": index } as CSSProperties}>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

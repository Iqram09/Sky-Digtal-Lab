"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type PointerParallaxProps = {
  /** Furthest the layer travels, in px. Negative values move against the pointer. */
  depth?: number;
  className?: string;
  children: ReactNode;
};

/**
 * A decorative layer (usually a Glow) that drifts gently with the pointer and
 * eases back to rest. Fills its positioned parent; off for touch screens and
 * reduced motion.
 */
export default function PointerParallax({ depth = 32, className, children }: PointerParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      layer.style.translate = `${(x * depth).toFixed(2)}px ${(y * depth).toFixed(2)}px`;
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.001 ? window.requestAnimationFrame(tick) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, [depth]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {children}
    </div>
  );
}

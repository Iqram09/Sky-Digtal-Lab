"use client";

import { useCallback, useRef, type PointerEvent } from "react";

/**
 * Lets an element lean a few pixels toward the mouse while it is hovered, then
 * settle back. Pair it with a `translate` transition on the element. Mouse
 * only, and off for reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25, max = 8) {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      const element = ref.current;
      if (!element || event.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const box = element.getBoundingClientRect();
      const clamp = (value: number) => Math.max(-max, Math.min(max, value * strength));
      const dx = clamp(event.clientX - (box.left + box.width / 2));
      const dy = clamp(event.clientY - (box.top + box.height / 2));
      element.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    },
    [strength, max]
  );

  const onPointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.translate = "";
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}

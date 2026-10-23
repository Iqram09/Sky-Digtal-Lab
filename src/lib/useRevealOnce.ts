"use client";

import { useEffect, type RefObject } from "react";

/**
 * Marks the element with `data-revealed` the first time it scrolls into view.
 * The hidden starting states live in CSS (globals.css) and only apply while JS
 * is running and motion is welcome, so nothing can be stranded invisible.
 */
export function useRevealOnce(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.revealed = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
}

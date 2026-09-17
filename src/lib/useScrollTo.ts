"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

/**
 * Anchor navigation that goes through the existing Lenis instance so in-page
 * links keep the site's smooth-scroll feel. Falls back to native scrolling when
 * Lenis is unavailable (or when the visitor prefers reduced motion).
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (hash: string) => {
      const id = hash.startsWith("#") ? hash.slice(1) : hash;
      const target = document.getElementById(id);
      if (!target) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (lenis && !prefersReduced) {
        // Negative offset keeps the section's top clear of the fixed header.
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      } else {
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
      }

      // Keep the keyboard focus with the visual position.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    [lenis]
  );
}

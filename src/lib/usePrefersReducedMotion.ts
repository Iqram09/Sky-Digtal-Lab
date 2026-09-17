"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** The server has no media query to read, so it always reports "no preference". */
function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe reduced-motion check. Use this (rather than a value read during
 * render) whenever the preference decides layout classes rather than just
 * whether an animation runs.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

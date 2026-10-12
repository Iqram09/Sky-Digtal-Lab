"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// WebGL never renders on the server: no hydration mismatch, no SSR crash on
// devices that can't initialise a context.
const ParticleScene = dynamic(() => import("@/components/3d/ParticleScene"), {
  ssr: false,
});

export default function HeroBackdrop() {
  const reduceMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  // The particle field is decoration: load it once the browser is idle, so
  // three.js never competes with the headline for the first paint.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => setReady(true), { timeout: 2500 });
    return () => cancel(handle);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 z-0 opacity-70">
      {ready ? (
        <ErrorBoundary fallback={null}>
          <ParticleScene still={reduceMotion} />
        </ErrorBoundary>
      ) : null}
    </div>
  );
}

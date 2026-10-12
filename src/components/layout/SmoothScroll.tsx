"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Header clearance for anchors comes from `scroll-margin-top` in globals.css,
// which Lenis honours — so no extra offset is passed here.

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);

  // On every route change, land where the URL says: the #anchor if there is
  // one (e.g. /services#automation-ai), otherwise the top of the new page.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;

    if (target) {
      lenis.scrollTo(target, { immediate: true, force: true });
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        // In-page #anchor links glide to their target.
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * The first page a visitor lands on renders without an entrance animation, so
 * nothing delays the first paint. Every later client-side navigation remounts
 * this template and gets a short settle-in (see `.page-enter` in globals.css,
 * which also respects reduced motion).
 */
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  // Read once per mount. The server and the first client render both see
  // `false`, so hydration always matches.
  const [animate] = useState(() => typeof window !== "undefined" && hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}

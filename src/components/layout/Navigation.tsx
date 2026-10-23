"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Glow from "@/components/brand/Glow";
import Logo from "@/components/brand/Logo";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Routes whose first section is charcoal — the header starts white there, before it can measure. */
const darkTopRoutes = new Set(["/"]);

const surfaceSelector = ".surface-dark, .surface-light, .surface-mint, .surface-lavender";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // The surface under the header, tagged with the route it was measured on.
  const [surface, setSurface] = useState<{ path: string; dark: boolean } | null>(null);
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // White logo on charcoal, charcoal logo on everything else — read straight
  // from whatever section is passing under the header.
  const measure = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const below = document
      .elementsFromPoint(window.innerWidth / 2, header.offsetHeight / 2)
      .find((element) => !header.contains(element));
    const path = window.location.pathname;
    const dark = Boolean(below?.closest(surfaceSelector)?.classList.contains("surface-dark"));
    // Keep the previous object when nothing changed, so scrolling doesn't re-render.
    setSurface((previous) => (previous?.path === path && previous.dark === dark ? previous : { path, dark }));
  }, []);

  // Drive the condensed state, the surface check and the reading-progress line
  // from the same Lenis instance that drives the page. The callback must be
  // stable: useLenis re-subscribes (and calls it) whenever it changes.
  const onScroll = useCallback(
    ({ scroll, progress }: { scroll: number; progress: number }) => {
      setScrolled(scroll > 40);
      measure();
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress || 0})`;
    },
    [measure]
  );
  useLenis(onScroll);

  // Re-read after a route change (once the new page has scrolled to the top) and on resize.
  useEffect(() => {
    const frame = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [pathname, measure]);

  // Freeze the page behind the mobile overlay.
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [menuOpen, lenis]);

  // Escape closes the overlay and hands focus back to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const overDark = surface?.path === pathname ? surface.dark : darkTopRoutes.has(pathname);
  const dark = menuOpen || overDark;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b text-foreground transition-[background-color,border-color] duration-300",
          dark ? "surface-dark" : "surface-light",
          scrolled && !menuOpen
            ? "border-foreground/10 bg-background/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex items-center justify-between gap-6 px-6 py-4 md:px-12"
        >
          <Link href="/" onClick={close} className="relative block shrink-0" data-cursor="link" aria-label={`${site.name} — home`}>
            {/* Both supplied files are loaded; the header crossfades between them. */}
            <Logo
              version="horizontal"
              tone="black"
              width={220}
              alt=""
              priority
              className={cn("w-[200px] transition-opacity duration-300 md:w-[220px]", dark ? "opacity-0" : "opacity-100")}
            />
            <Logo
              version="horizontal"
              tone="white"
              width={220}
              alt=""
              priority
              className={cn(
                "absolute inset-0 w-[200px] transition-opacity duration-300 md:w-[220px]",
                dark ? "opacity-100" : "opacity-0"
              )}
            />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-cursor="link"
                    className={cn(
                      "label-caps relative py-2 text-[11px] transition-colors",
                      active ? "text-foreground" : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                        active ? "w-full" : "w-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              data-cursor="link"
              className="label-caps hidden items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] text-background transition-opacity hover:opacity-85 md:inline-flex"
            >
              Start a Project <span aria-hidden>→</span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span
                aria-hidden
                className={cn(
                  "h-px w-6 bg-foreground transition-transform duration-300 motion-reduce:transition-none",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "h-px w-6 bg-foreground transition-transform duration-300 motion-reduce:transition-none",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>

        {/* Reading progress — a thin mint-to-lavender highlight along the header's edge. */}
        <span
          ref={progressRef}
          aria-hidden
          style={{ transform: "scaleX(0)" }}
          className={cn(
            "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-linear-to-r from-mint to-lavender transition-opacity duration-300",
            scrolled && !menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            // Not aria-modal: the close toggle lives in the header above it.
            role="region"
            aria-label="Site menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="surface-dark fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-background px-6 pb-10 pt-28 lg:hidden"
            data-lenis-prevent
          >
            <Glow tone="mint" className="-right-40 -top-40 w-[520px]" />
            <Glow tone="lavender" className="-bottom-48 -left-40 w-[520px]" />

            <ul className="relative flex flex-col">
              {nav.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-foreground/10"
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl",
                        active ? "text-foreground" : "text-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <span className="label-caps text-[11px] text-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="relative mt-10 flex flex-col gap-6">
              <Link
                href="/contact"
                onClick={close}
                className="label-caps inline-flex items-center justify-between rounded-full bg-foreground px-6 py-4 text-[11px] text-background"
              >
                Start a Project <span aria-hidden>→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="text-sm text-muted transition-colors hover:text-foreground">
                {site.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Wordmark from "@/components/layout/Wordmark";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Drive the condensed state from the same Lenis instance that drives the page.
  useLenis(({ scroll }) => setScrolled(scroll > 40));

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          scrolled && !menuOpen
            ? "border-b border-foreground/10 bg-background/85 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex items-center justify-between gap-6 px-6 py-5 md:px-12"
        >
          <Link href="/" onClick={close} className="group" data-cursor="link">
            <Wordmark />
            <span className="sr-only"> — home</span>
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
                      "relative py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                      active ? "text-foreground" : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
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
              className="hidden items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-on-taupe transition-colors hover:border-foreground hover:bg-foreground md:inline-flex"
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
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-10 pt-28 lg:hidden"
            data-lenis-prevent
          >
            <ul className="flex flex-col">
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
                        active ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-[10px] tracking-[0.2em] text-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col gap-6">
              <Link
                href="/contact"
                onClick={close}
                className="inline-flex items-center justify-between border border-accent bg-accent px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-on-taupe"
              >
                Start a Project <span aria-hidden>→</span>
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
              >
                {site.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

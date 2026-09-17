"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { nav, site } from "@/lib/site";
import { useScrollTo } from "@/lib/useScrollTo";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  // Drive the condensed state from the same Lenis instance that drives the page.
  useLenis(({ scroll }) => setScrolled(scroll > 80));

  // Freeze the page behind the mobile overlay.
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Let the overlay finish unmounting before Lenis takes over the scroll.
    window.setTimeout(() => scrollTo(href), menuOpen ? 120 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled && !menuOpen
            ? "border-b border-white/10 bg-[#050505]/80 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex items-center justify-between px-6 py-5 md:px-12"
        >
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              if (lenis) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
            data-cursor="link"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_#c9ff4a]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors group-hover:text-accent">
              {site.name}
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(item.href);
                  }}
                  data-cursor="link"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick("#contact");
              }}
              data-cursor="link"
              className="hidden items-center gap-2 border border-white/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              Start a project <span aria-hidden>→</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <span
                aria-hidden
                className={cn(
                  "h-px w-6 bg-white transition-transform duration-300 motion-reduce:transition-none",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "h-px w-6 bg-white transition-transform duration-300 motion-reduce:transition-none",
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
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#050505] px-6 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 * index,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-white/10"
                >
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="block py-5 text-4xl font-semibold uppercase tracking-tight text-white/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-6">
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick("#contact");
                }}
                className="inline-flex items-center justify-between border border-accent bg-accent px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#050505]"
              >
                Start a project <span aria-hidden>→</span>
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {site.tagline}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

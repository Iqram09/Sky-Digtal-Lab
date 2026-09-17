"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { nav, site, socials } from "@/lib/site";
import { useScrollTo } from "@/lib/useScrollTo";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const scrollTo = useScrollTo();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      gsap.fromTo(
        textRef.current,
        { y: "-20%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <footer
      ref={containerRef}
      className="on-light relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-foreground pb-16 text-background"
    >
      {/* Top Details */}
      <div className="premium-grid z-10 w-full px-6 pt-24 md:px-12">
        <div className="col-span-12 md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-50">
            {site.tagline}
          </p>
          <p className="mt-6 max-w-md text-xl font-medium leading-snug md:text-2xl">
            A digital product studio building websites, applications, brands and
            digital systems for ambitious businesses.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="col-span-6 mt-12 font-mono text-xs uppercase tracking-widest opacity-70 md:col-span-2 md:col-start-8 md:mt-0"
        >
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(item.href);
                  }}
                  className="transition-colors hover:text-black/50"
                  data-cursor="link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 mt-12 font-mono text-xs uppercase tracking-widest opacity-70 md:col-span-2 md:col-start-11 md:mt-0">
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-black/50"
                data-cursor="link"
              >
                Email us
              </a>
            </li>
            {/* Social profiles render here once real accounts exist — see src/lib/site.ts */}
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-black/50"
                  data-cursor="link"
                >
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#contact");
                }}
                className="transition-colors hover:text-black/50"
                data-cursor="link"
              >
                Start a project
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Massive Typography */}
      <div className="flex w-full flex-grow items-center justify-center px-6 py-16 md:px-12">
        <p
          ref={textRef}
          aria-hidden
          className="w-full text-center text-[21vw] font-bold leading-[0.82] tracking-tighter md:whitespace-nowrap md:text-[10vw]"
        >
          <span className="block md:inline">SKY </span>
          <span className="block md:inline">DIGITAL </span>
          <span className="block md:inline">LAB.</span>
        </p>
      </div>

      {/* Bottom Legal */}
      <div className="flex w-full flex-col gap-2 px-6 font-mono text-[10px] uppercase tracking-widest opacity-40 sm:flex-row sm:justify-between md:px-12">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>All systems nominal</span>
      </div>

      {/* Decorative Grid Lines */}
      <div className="premium-grid pointer-events-none absolute inset-0 px-6 opacity-[0.03] md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-black" />
        ))}
      </div>
    </footer>
  );
}

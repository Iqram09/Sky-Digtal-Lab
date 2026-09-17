"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTo } from "@/lib/useScrollTo";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollTo();
  const reduceMotion = usePrefersReducedMotion();

  // The horizontal track only makes sense while the pin is driving it. With
  // reduced motion the pin never runs, so the cards stay in a vertical stack
  // at every width instead of being trapped off-screen.
  const horizontal = !reduceMotion;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Horizontal pinned scroll is a desktop affordance. On touch/narrow
      // viewports the cards stack vertically instead, so nothing gets cramped.
      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        () => {
          const scrollEl = scrollRef.current;
          if (!scrollEl) return;

          const getScrollAmount = () => {
            const scrollWidth = scrollEl.scrollWidth;
            return -(scrollWidth - window.innerWidth);
          };

          const tween = gsap.to(scrollEl, {
            x: getScrollAmount,
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          // Parallax effect for images
          gsap.utils.toArray<HTMLElement>(".showcase-image").forEach((img) => {
            gsap.to(img, {
              xPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="work"
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-background py-24 text-foreground",
        horizontal && "md:h-[100dvh] md:py-0"
      )}
    >
      {/* Heading — inline on mobile, overlaid on the pinned desktop canvas */}
      <div
        className={cn(
          "px-6 md:px-0",
          horizontal
            ? "md:pointer-events-none md:absolute md:left-12 md:top-20 md:z-10 md:max-w-[340px] md:mix-blend-difference"
            : "md:px-12"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">SELECTED WORK</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/55 md:mt-3 md:text-sm">
          A selection of digital experiences, products and systems we&apos;ve
          designed and built.
        </p>
      </div>

      <div
        className={cn(
          "hidden text-right",
          horizontal &&
            "md:pointer-events-none md:absolute md:right-12 md:top-20 md:z-10 md:block md:mix-blend-difference"
        )}
      >
        <span className="block font-mono text-xs uppercase tracking-widest opacity-50">
          Scroll
        </span>
        <span className="block font-mono text-xs uppercase tracking-widest opacity-50">
          To explore
        </span>
      </div>

      {/* Horizontal on desktop, stacked on mobile */}
      <div
        ref={scrollRef}
        className={cn(
          "mt-10 flex flex-col gap-14 px-6",
          horizontal
            ? "md:mt-0 md:h-full md:flex-row md:items-center md:gap-0 md:px-0 md:pl-24 md:pr-[25vw] md:pt-56"
            : "md:px-12"
        )}
        data-cursor="drag"
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={cn(
              "group flex flex-col border border-white/10 bg-[#0b0d0d] md:flex-row",
              horizontal && "md:mr-16 md:h-[60vh] md:w-[70vw] md:shrink-0 lg:w-[60vw]"
            )}
            data-cursor="project"
          >
            {/* Image */}
            <div
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden bg-[#111] md:w-[54%]",
                horizontal ? "md:aspect-auto md:h-full" : "md:aspect-[4/3]"
              )}
            >
              <Image
                src={project.image}
                alt={`${project.title} — ${project.category} concept piece by Sky Digital Lab`}
                fill
                className="showcase-image scale-[1.15] object-cover object-center opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                sizes="(max-width: 768px) 90vw, 40vw"
                priority={index === 0}
              />
              <span className="absolute left-4 top-4 border border-white/25 bg-black/50 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                {project.kind === "concept" ? "Studio concept" : "Client work"}
              </span>
            </div>

            {/* Info panel */}
            <div className="flex flex-1 flex-col justify-between gap-5 border-t border-white/10 p-5 md:w-[46%] md:border-l md:border-t-0 md:p-6">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs text-accent">{project.id}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-2xl lg:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Services
                  </p>
                  <ul className="flex flex-wrap gap-1">
                    {project.services.map((service) => (
                      <li
                        key={service}
                        className="border border-white/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white/55"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Built with
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                    {project.technologies.join(" / ")}
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo("#contact");
                  }}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 self-start border-b border-accent/40 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-colors hover:border-accent"
                >
                  Build something like this
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

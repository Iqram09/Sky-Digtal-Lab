"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "VANGUARD",
    category: "CREATIVE DIRECTION",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "NEURA",
    category: "DIGITAL EXPERIENCE",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "SYNTHESIS",
    category: "3D & MOTION",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "OBLIVION",
    category: "WEBGL ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function Showcase() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      // Calculate how far to scroll
      const getScrollAmount = () => {
        const scrollWidth = scrollEl.scrollWidth;
        return -(scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });

      // Parallax effect for images
      gsap.utils.toArray<HTMLElement>('.showcase-image').forEach((img) => {
        gsap.to(img, {
          xPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground">
      {/* Title */}
      <div className="absolute top-12 md:top-24 left-6 md:left-12 z-10 mix-blend-difference pointer-events-none">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">SELECTED ARCHIVES</h2>
      </div>

      <div className="absolute top-12 md:top-24 right-6 md:right-12 z-10 mix-blend-difference pointer-events-none text-right">
        <span className="font-mono text-xs uppercase tracking-widest opacity-50 block">DRAG / SCROLL</span>
        <span className="font-mono text-xs uppercase tracking-widest opacity-50 block">TO EXPLORE</span>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={scrollRef} className="h-full flex items-center pl-6 md:pl-24 pr-[30vw] pt-24" data-cursor="drag">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="flex-shrink-0 w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] mr-12 md:mr-24 relative group"
            data-cursor="project"
          >
            {/* Image Container with hidden overflow for parallax */}
            <div className="w-full h-full relative overflow-hidden bg-[#111]">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="showcase-image object-cover object-center scale-[1.2] opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                sizes="(max-width: 768px) 85vw, 60vw"
                priority={index === 0}
              />
            </div>
            
            {/* Meta Data */}
            <div className="absolute -bottom-16 left-0 w-full flex justify-between items-end">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-white/50 mb-1">{project.id}</span>
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tighter">{project.title}</h3>
              </div>
              <span className="font-mono text-xs text-white/50">{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

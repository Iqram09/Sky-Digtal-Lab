"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section slightly while text reveals
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=50%",
        pin: true,
        pinSpacing: true,
      });

      textRefs.current.forEach((text) => {
        if (!text) return;
        
        gsap.fromTo(
          text,
          { opacity: 0.1, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lines = [
    "We don't build templates.",
    "We architect digital spaces.",
    "Every pixel is a decision.",
    "Every motion has a purpose.",
    "Welcome to the Lab."
  ];

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen bg-foreground text-background flex flex-col justify-center relative py-24"
    >
      <div className="premium-grid w-full px-6 md:px-12 h-full">
        
        {/* Detail Column */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-between mb-12 md:mb-0">
          <div className="font-mono text-xs uppercase tracking-widest opacity-50 flex flex-col gap-2">
            <span>Sky Digital Lab</span>
            <span>Est. 2024</span>
            <span>Index: 001</span>
          </div>
          
          <div className="font-mono text-xs uppercase tracking-widest opacity-50 flex flex-col gap-2 mt-12 md:mt-0">
            <span>Coordinates</span>
            <span>40.7128° N</span>
            <span>74.0060° W</span>
          </div>
        </div>

        {/* Impact Column */}
        <div className="col-span-12 md:col-span-8 md:col-start-5 flex flex-col justify-center">
          <h2 className="sr-only">Our Manifesto</h2>
          <div className="flex flex-col gap-4 md:gap-8">
            {lines.map((line, i) => (
              <p 
                key={i}
                ref={(el) => { textRefs.current[i] = el; }}
                className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        
      </div>
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] premium-grid px-6 md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-black" />
        ))}
      </div>
    </section>
  );
}

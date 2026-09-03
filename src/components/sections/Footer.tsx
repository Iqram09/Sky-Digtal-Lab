"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      gsap.fromTo(textRef.current,
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
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full h-[100dvh] bg-foreground text-background flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Details */}
      <div className="premium-grid w-full px-6 md:px-12 pt-12 md:pt-24 z-10">
        <div className="col-span-12 md:col-span-4">
          <p className="text-xl md:text-2xl font-medium max-w-sm">
            Ready to build the impossible? Let&apos;s engineer your digital future.
          </p>
        </div>
        <div className="col-span-12 md:col-span-2 md:col-start-9 mt-12 md:mt-0 font-mono text-xs tracking-widest uppercase opacity-70">
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">Instagram</a></li>
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">Twitter</a></li>
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">LinkedIn</a></li>
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">Awwwards</a></li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-2 mt-12 md:mt-0 font-mono text-xs tracking-widest uppercase opacity-70">
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">Work</a></li>
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">Studio</a></li>
            <li><a href="#" className="hover:text-accent transition-colors" data-cursor="link">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Massive Typography */}
      <div 
        className="w-full px-6 md:px-12 pb-12 flex justify-center items-center flex-grow"
      >
        <h2 
          ref={textRef}
          className="text-[18vw] md:text-[15vw] leading-[0.8] tracking-tighter font-bold text-center w-full whitespace-nowrap"
        >
          SKY LAB.
        </h2>
      </div>

      {/* Bottom Legal */}
      <div className="absolute bottom-6 w-full px-6 md:px-12 flex justify-between font-mono text-[10px] tracking-widest uppercase opacity-40">
        <span>© {new Date().getFullYear()} Sky Digital Lab</span>
        <span>All Systems Nominal</span>
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

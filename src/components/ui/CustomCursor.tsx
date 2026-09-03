"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CursorState = "DEFAULT" | "LINK" | "PROJECT" | "DRAG";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("DEFAULT");
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smooth interpolation
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on desktop devices with a fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseEnter);

    // Add global event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest("a, button, [data-cursor='link']")) {
        setCursorState("LINK");
      } else if (target.closest("[data-cursor='project']")) {
        setCursorState("PROJECT");
      } else if (target.closest("[data-cursor='drag']")) {
        setCursorState("DRAG");
      } else {
        setCursorState("DEFAULT");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const variants = {
    DEFAULT: {
      width: 12,
      height: 12,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    },
    LINK: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255,255,255,0.5)",
      backdropFilter: "blur(4px)",
      mixBlendMode: "normal" as const,
      x: "-50%",
      y: "-50%",
    },
    PROJECT: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    },
    DRAG: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      x: "-50%",
      y: "-50%",
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial="DEFAULT"
      animate={cursorState}
      variants={variants}
      transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: cursorState === "PROJECT" || cursorState === "DRAG" ? 1 : 0,
          scale: cursorState === "PROJECT" || cursorState === "DRAG" ? 1 : 0
        }}
        className="text-black text-xs font-mono font-bold tracking-widest whitespace-nowrap"
      >
        {cursorState === "PROJECT" && "VIEW ↗"}
        {cursorState === "DRAG" && "DRAG →"}
      </motion.div>
    </motion.div>
  );
}

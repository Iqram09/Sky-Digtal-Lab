"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "DEFAULT" | "LINK" | "PROJECT" | "DRAG";

/*
 * The dot and ring use a difference blend, so they read as charcoal on
 * off-white and as off-white on charcoal. Over a project the cursor becomes a
 * mint highlight with a charcoal label (an approved combination).
 */
const variants = {
  DEFAULT: {
    width: 10,
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 255, 255, 0)",
    mixBlendMode: "difference" as const,
    x: "-50%",
    y: "-50%",
  },
  LINK: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: "rgba(255, 255, 255, 1)",
    mixBlendMode: "difference" as const,
    x: "-50%",
    y: "-50%",
  },
  PROJECT: {
    width: 104,
    height: 104,
    backgroundColor: "rgba(189, 231, 217, 1)",
    borderColor: "rgba(189, 231, 217, 0)",
    mixBlendMode: "normal" as const,
    x: "-50%",
    y: "-50%",
  },
  DRAG: {
    width: 104,
    height: 104,
    backgroundColor: "rgba(201, 184, 255, 1)",
    borderColor: "rgba(201, 184, 255, 0)",
    mixBlendMode: "normal" as const,
    x: "-50%",
    y: "-50%",
  },
};

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

      if (target.closest("[data-cursor='project']")) {
        setCursorState("PROJECT");
      } else if (target.closest("[data-cursor='drag']")) {
        setCursorState("DRAG");
      } else if (target.closest("a, button, [data-cursor='link']")) {
        setCursorState("LINK");
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

  const labelled = cursorState === "PROJECT" || cursorState === "DRAG";

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center overflow-hidden rounded-full border"
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
        animate={{ opacity: labelled ? 1 : 0, scale: labelled ? 1 : 0 }}
        className="label-caps whitespace-nowrap text-[11px] text-charcoal"
      >
        {cursorState === "PROJECT" && "View ↗"}
        {cursorState === "DRAG" && "Drag →"}
      </motion.div>
    </motion.div>
  );
}

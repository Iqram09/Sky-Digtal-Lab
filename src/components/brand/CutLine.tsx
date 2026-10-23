"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Star from "@/components/brand/Star";
import { cn } from "@/lib/utils";

/*
 * The cut line (brand element): a thin, slightly curved diagonal taken from
 * the slanted cut through the wordmark. It rises from bottom-left to top-right
 * across whatever box it is given, bowing gently upward — a quadratic curve
 * from (0,100) through (520,38) to (1000,0) in a 1000×100 box.
 */
const PATH = "M0,100Q520,38 1000,0";

/** A point on the curve at parameter t (0–1), as percentages of the box. */
function pointAt(t: number) {
  const u = 1 - t;
  return { x: (2 * u * t * 520 + t * t * 1000) / 10, y: u * u * 100 + 2 * u * t * 38 };
}

/** The curve point at horizontal position x (0–100%): x(t) = 1040t − 40t², solved for t. */
function pointAtX(x: number) {
  return pointAt((1040 - Math.sqrt(1040 * 1040 - 1600 * x)) / 80);
}

/*
 * The light that travels the line. Keep in step with `cut-sweep` and
 * `star-flare` in globals.css: a 30%-wide beam moves from −45% to 145% over
 * the first 40% of a 9s cycle, starting 3.2s after the intro begins.
 */
const SWEEP_DELAY = 3.2;
const CYCLE = 9;
const BEAM = 0.3;
const FLARE_PEAK = 0.03;

/** Seconds until the beam's centre reaches the star, less the flare's run-up. */
function flareDelay(starX: number) {
  const position = (starX / 100 - BEAM / 2) / (1 - BEAM);
  const travelled = (position + 0.45) / 1.9;
  return SWEEP_DELAY + travelled * 0.4 * CYCLE - FLARE_PEAK * CYCLE;
}

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

type CutLineProps = {
  /** Position and size of the box the line crosses. */
  className?: string;
  /** Where the star rests along the line (0–1), or `false` for no star. */
  star?: number | false;
  /** Star size and colour, e.g. "w-6 text-foreground". */
  starClassName?: string;
  /**
   * Draw the line in, glide the star up it to its resting point, then send a
   * beam of light along the line every few seconds — the star flares as the
   * light passes it.
   */
  animate?: boolean;
};

export default function CutLine({ className, star = 0.64, starClassName = "w-6", animate = false }: CutLineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGSVGElement>(null);
  const travelRef = useRef<HTMLSpanElement>(null);
  const arrivalRef = useRef<HTMLSpanElement>(null);
  const rest = star === false ? null : pointAt(star);

  useEffect(() => {
    const root = rootRef.current;
    if (!animate || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.ready = "";
      return;
    }

    const resting = star === false ? null : pointAt(star);
    const animations: Animation[] = [];
    animations.push(
      baseRef.current!.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], {
        duration: 1600,
        delay: 150,
        easing: EASE_OUT_EXPO,
        fill: "both",
      })
    );

    if (resting && travelRef.current && arrivalRef.current) {
      // The star rises along the curve itself — dense keyframes keep it on the line.
      const steps = 40;
      const glide = Array.from({ length: steps + 1 }, (_, index) => {
        const point = pointAtX((resting.x * index) / steps);
        return { transform: `translate(${point.x}%, ${point.y}%)` };
      });
      animations.push(
        travelRef.current.animate(glide, {
          duration: 2400,
          delay: 500,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          fill: "both",
        }),
        // A quarter turn as it appears — the star is four-fold, so it settles upright.
        arrivalRef.current.animate(
          [
            { opacity: 0, transform: "scale(0.25) rotate(-90deg)" },
            { opacity: 1, transform: "scale(1) rotate(0deg)" },
          ],
          { duration: 1800, delay: 500, easing: EASE_OUT_EXPO, fill: "both" }
        )
      );
    }

    root.dataset.ready = "";
    return () => animations.forEach((animation) => animation.cancel());
  }, [animate, star]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-cut-intro={animate ? "" : undefined}
      className={cn("cut-line pointer-events-none absolute", className)}
    >
      <svg
        ref={baseRef}
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        focusable="false"
        className="cut-base absolute inset-0 h-full w-full overflow-visible"
      >
        <path d={PATH} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {animate ? (
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          focusable="false"
          className="cut-light absolute inset-0 h-full w-full overflow-visible"
        >
          <path
            d={PATH}
            fill="none"
            stroke="var(--color-foreground)"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}

      {rest ? (
        // A box-sized layer, so translate percentages are percentages of the line's box.
        <span
          ref={travelRef}
          className="cut-star absolute inset-0"
          style={{ transform: `translate(${rest.x}%, ${rest.y}%)` }}
        >
          <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
            <span ref={arrivalRef} className="relative block">
              {animate ? <span className="star-halo" /> : null}
              <span
                className={cn("relative block", animate && "star-flare")}
                style={animate ? ({ animationDelay: `${flareDelay(rest.x)}s` } as CSSProperties) : undefined}
              >
                <Star className={cn("block", starClassName)} />
              </span>
            </span>
          </span>
        </span>
      ) : null}
    </div>
  );
}

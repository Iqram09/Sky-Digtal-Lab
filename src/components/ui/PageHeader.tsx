import type { ReactNode } from "react";
import CutLine from "@/components/brand/CutLine";
import Glow from "@/components/brand/Glow";
import PointerParallax from "@/components/brand/PointerParallax";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  /** e.g. "About" — shown in the caps eyebrow. */
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Opening block for every inner page: off-white ground with soft mint and
 * lavender glows, a caps eyebrow, the display headline and a short
 * introduction, closed off by the cut line. Renders without client JS, so the
 * LCP text paints immediately — motion comes from the shared CSS entrance only.
 */
export default function PageHeader({ eyebrow, title, intro, children, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "surface-light relative w-full overflow-hidden bg-background pb-32 pt-36 md:pb-44 md:pt-48",
        className
      )}
    >
      <PointerParallax depth={36}>
        <Glow tone="mint" drift className="-top-[22rem] left-[30%] w-[min(900px,120vw)]" />
      </PointerParallax>
      <PointerParallax depth={-28}>
        <Glow tone="lavender" drift className="-right-[14rem] -top-[8rem] w-[min(640px,100vw)]" />
      </PointerParallax>

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 lg:col-span-10">
          <p className="label-caps fade-rise mb-8 flex items-center gap-3 text-[11px] text-foreground">
            <span aria-hidden className="h-px w-8 bg-foreground" />
            {eyebrow}
          </p>
          <h1 className="font-display text-[12vw] font-semibold leading-[0.98] tracking-tighter text-foreground text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="line-mask">
              <span className="line-rise">{title}</span>
            </span>
          </h1>
          {intro ? (
            <p
              className="fade-rise mt-8 max-w-2xl text-lg leading-relaxed text-muted md:mt-10 md:text-xl"
              style={{ animationDelay: "0.15s" }}
            >
              {intro}
            </p>
          ) : null}
          {children ? (
            <div className="fade-rise mt-10" style={{ animationDelay: "0.25s" }}>
              {children}
            </div>
          ) : null}
        </div>
      </div>

      {/* The cut line divides the header from the page and leads the eye on. */}
      <CutLine
        animate
        className="inset-x-0 bottom-10 h-16 text-foreground/25 md:bottom-14 md:h-24"
        starClassName="w-5 text-foreground md:w-6"
      />
    </header>
  );
}

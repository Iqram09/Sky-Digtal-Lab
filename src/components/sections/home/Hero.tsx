import CutLine from "@/components/brand/CutLine";
import Glow from "@/components/brand/Glow";
import PointerParallax from "@/components/brand/PointerParallax";
import ActionButton from "@/components/ui/ActionButton";

const headline = [
  { text: "Digital ideas.", quiet: false },
  { text: "Engineered into reality.", quiet: true },
];

/**
 * Charcoal opening in the manner of the brand guideline cover: mint glow top
 * right, lavender bottom left, and the cut line carrying the star beneath the
 * headline. The headline and copy animate in CSS, so nothing waits on
 * JavaScript to paint; the star's glide and the pointer-led glows build on top.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="surface-dark relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-background pb-56 pt-36 md:pb-64 md:pt-40"
    >
      {/* The two glows drift against each other as the pointer moves. */}
      <PointerParallax depth={48}>
        <Glow tone="mint" drift className="-right-[20rem] -top-[22rem] w-[min(1080px,150vw)]" />
      </PointerParallax>
      <PointerParallax depth={-36}>
        <Glow tone="lavender" drift className="-bottom-[26rem] -left-[20rem] w-[min(960px,140vw)]" />
      </PointerParallax>

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 lg:col-span-11">
          <p className="label-caps fade-rise mb-8 flex items-center gap-3 text-[11px] text-muted md:mb-10">
            <span aria-hidden className="h-px w-8 bg-foreground/60" />
            Strategy · Design · Engineering
          </p>

          <h1 className="font-display text-[13vw] font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-[10vw] lg:text-[8vw] 2xl:text-[8.4rem]">
            {headline.map((line, index) => (
              <span key={line.text} className="line-mask">
                <span
                  className={`line-rise ${line.quiet ? "text-muted" : ""}`}
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="fade-rise mt-8 max-w-2xl text-lg leading-relaxed text-muted md:mt-10 md:text-xl"
            style={{ animationDelay: "0.45s" }}
          >
            We bring strategy, design, and technology together to build
            meaningful digital experiences, powerful websites, and software that
            helps businesses move forward.
          </p>

          <div className="fade-rise mt-10 flex flex-wrap gap-3 md:mt-12" style={{ animationDelay: "0.6s" }}>
            <ActionButton href="/work" variant="primary">
              Explore Our Work
            </ActionButton>
            <ActionButton href="/contact" variant="ghost">
              Start a Project
            </ActionButton>
          </div>
        </div>
      </div>

      <CutLine
        animate
        star={0.72}
        className="inset-x-0 bottom-24 h-20 text-foreground/30 md:bottom-28 md:h-32"
        starClassName="w-6 text-foreground md:w-8"
      />

      <div className="absolute bottom-8 left-6 z-10 hidden flex-col gap-2 md:left-12 md:flex">
        <span className="label-caps text-[11px] text-subtle">Scroll to explore</span>
        <span aria-hidden className="relative h-12 w-px overflow-hidden bg-foreground/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.6s_linear_infinite] bg-foreground" />
        </span>
      </div>

      <p className="label-caps absolute bottom-8 right-6 z-10 hidden text-right text-[11px] text-subtle md:right-12 md:block">
        <span className="block">Think clearly. Build intelligently.</span>
        <span className="mt-2 block text-foreground">Deliver what we promise.</span>
      </p>
    </section>
  );
}

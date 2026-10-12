import ActionButton from "@/components/ui/ActionButton";
import HeroBackdrop from "@/components/sections/home/HeroBackdrop";

const headline = [
  { text: "Digital ideas.", accent: false },
  { text: "Engineered into reality.", accent: true },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-ink pb-24 pt-32 md:pb-32 md:pt-36"
    >
      <HeroBackdrop />

      {/* Soft vignette keeps the type legible over the particle field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_30%_55%,rgba(30,30,32,0.85),rgba(30,30,32,0.2)_60%,transparent)]"
      />

      <div className="premium-grid pointer-events-none relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 lg:col-span-11">
          <p className="fade-rise mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted md:mb-10">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            Sky Digital Lab / Strategy · Design · Engineering
          </p>

          <h1 className="font-display text-[13vw] font-semibold leading-[0.92] tracking-tighter text-foreground sm:text-[10vw] lg:text-[8.2vw] 2xl:text-[8.6rem]">
            {headline.map((line, index) => (
              <span key={line.text} className="line-mask">
                <span
                  className={`line-rise ${line.accent ? "text-accent" : ""}`}
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="fade-rise pointer-events-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted md:mt-10 md:text-xl"
            style={{ animationDelay: "0.45s" }}
          >
            We bring strategy, design, and technology together to build
            meaningful digital experiences, powerful websites, and software that
            helps businesses move forward.
          </p>

          <div
            className="fade-rise pointer-events-auto mt-10 flex flex-wrap gap-3 md:mt-12"
            style={{ animationDelay: "0.6s" }}
          >
            <ActionButton href="/work" variant="primary">
              Explore Our Work
            </ActionButton>
            <ActionButton href="/contact" variant="ghost">
              Start a Project
            </ActionButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 hidden flex-col gap-2 md:left-12 md:flex">
        <span className="font-mono text-[10px] tracking-widest text-subtle">SCROLL TO EXPLORE</span>
        <span aria-hidden className="relative h-12 w-px overflow-hidden bg-foreground/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.6s_linear_infinite] bg-foreground" />
        </span>
      </div>

      <p className="absolute bottom-8 right-6 z-10 hidden text-right font-mono text-[10px] uppercase tracking-widest text-subtle md:right-12 md:block">
        <span className="block">Think clearly. Build intelligently.</span>
        <span className="mt-2 block text-accent">Deliver what we promise.</span>
      </p>
    </section>
  );
}

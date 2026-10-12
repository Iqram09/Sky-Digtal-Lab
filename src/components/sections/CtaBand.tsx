import Reveal from "@/components/ui/Reveal";
import ActionButton from "@/components/ui/ActionButton";

type CtaBandProps = {
  eyebrow?: string;
  heading?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** The closing call to action used at the end of every page. */
export default function CtaBand({
  eyebrow = "Next step",
  heading = "Have an idea worth building?",
  text = "Tell us what you're planning. We'll help you turn the next step into a clear, practical plan.",
  primary = { label: "Start a Project", href: "/contact" },
  secondary = { label: "Explore Our Work", href: "/work" },
}: CtaBandProps) {
  return (
    <section className="on-light relative w-full overflow-hidden bg-taupe py-24 text-on-taupe md:py-36">
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <Reveal>
            <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-on-taupe-muted">
              <span aria-hidden className="h-px w-8 bg-on-taupe/50" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="max-w-5xl font-display text-[11vw] font-semibold leading-[0.95] tracking-tighter text-balance md:text-7xl lg:text-8xl">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-taupe-muted md:mt-10 md:text-xl">
              {text}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3 md:mt-12">
              <ActionButton href={primary.href} variant="solidDark">
                {primary.label}
              </ActionButton>
              <ActionButton href={secondary.href} variant="ghostLight">
                {secondary.label}
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>

      <div aria-hidden className="premium-grid pointer-events-none absolute inset-0 px-6 md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-on-taupe/[0.06]" />
        ))}
      </div>
    </section>
  );
}

import Glow from "@/components/brand/Glow";
import PointerParallax from "@/components/brand/PointerParallax";
import Star from "@/components/brand/Star";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import ActionButton from "@/components/ui/ActionButton";

type CtaBandProps = {
  eyebrow?: string;
  heading?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** The closing call to action used at the end of every page: off-white, lit by both glows. */
export default function CtaBand({
  eyebrow = "Next step",
  heading = "Have an idea worth building?",
  text = "Tell us what you're planning. We'll help you turn the next step into a clear, practical plan.",
  primary = { label: "Start a Project", href: "/contact" },
  secondary = { label: "Explore Our Work", href: "/work" },
}: CtaBandProps) {
  return (
    <section className="surface-light relative w-full overflow-hidden border-t border-foreground/10 bg-background py-24 md:py-36">
      <PointerParallax depth={-32}>
        <Glow tone="mint" drift className="-bottom-[24rem] -left-[18rem] w-[min(900px,130vw)]" />
      </PointerParallax>
      <PointerParallax depth={28}>
        <Glow tone="lavender" drift className="-right-[20rem] top-[10%] w-[min(760px,120vw)]" />
      </PointerParallax>

      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <Reveal>
            <p className="label-caps mb-8 flex items-center gap-3 text-[11px] text-foreground">
              <Star className="star-twinkle w-3.5" />
              {eyebrow}
            </p>
          </Reveal>

          <h2 className="max-w-5xl font-display text-[11vw] font-semibold leading-[0.98] tracking-tighter text-balance md:text-7xl lg:text-8xl">
            <SplitText delay={0.06}>{heading}</SplitText>
          </h2>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:mt-10 md:text-xl">
              {text}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3 md:mt-12">
              <ActionButton href={primary.href} variant="primary">
                {primary.label}
              </ActionButton>
              <ActionButton href={secondary.href} variant="ghost">
                {secondary.label}
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

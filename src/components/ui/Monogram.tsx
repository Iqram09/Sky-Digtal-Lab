import Glow from "@/components/brand/Glow";
import { cn } from "@/lib/utils";

type MonogramProps = {
  initials: string;
  /** Index shown in the corner, e.g. "01". */
  index?: string;
  /** Which soft glow lights the card. */
  glow?: "mint" | "lavender";
  className?: string;
};

/**
 * Initials-based portrait placeholder. Used until real photographs are supplied
 * — deliberately abstract so it never reads as a stand-in face.
 */
export default function Monogram({ initials, index, glow = "mint", className }: MonogramProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex aspect-[4/5] w-full items-end overflow-hidden rounded-[20px] border border-foreground/10 bg-panel p-6",
        className
      )}
    >
      <Glow tone={glow} className="-right-[35%] -top-[30%] w-[115%]" />
      {index ? (
        <span className="label-caps absolute left-6 top-6 text-[11px] text-subtle">{index}</span>
      ) : null}
      <span className="relative font-display text-[clamp(4.5rem,11vw,8rem)] font-semibold leading-[0.8] tracking-tighter text-foreground">
        {initials}
      </span>
    </div>
  );
}

import { cn } from "@/lib/utils";

type MonogramProps = {
  initials: string;
  /** Index shown in the corner, e.g. "01". */
  index?: string;
  className?: string;
};

/**
 * Initials-based portrait placeholder. Used until real photographs are supplied
 * — deliberately abstract so it never reads as a stand-in face.
 */
export default function Monogram({ initials, index, className }: MonogramProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex aspect-[4/5] w-full items-end overflow-hidden border border-foreground/12 bg-panel p-5",
        className
      )}
    >
      {/* Fine construction lines, echoing the site's editorial grid */}
      <span className="absolute inset-y-0 left-1/3 w-px bg-foreground/[0.06]" />
      <span className="absolute inset-y-0 left-2/3 w-px bg-foreground/[0.06]" />
      <span className="absolute inset-x-0 top-1/2 h-px bg-foreground/[0.06]" />
      {index ? (
        <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          {index}
        </span>
      ) : null}
      <span className="relative font-display text-[clamp(4.5rem,11vw,8rem)] font-semibold leading-[0.8] tracking-tighter text-accent">
        {initials}
      </span>
    </div>
  );
}

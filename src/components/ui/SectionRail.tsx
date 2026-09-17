import { cn } from "@/lib/utils";

type SectionRailProps = {
  index: string;
  label: string;
  sublabel?: string;
  footnote?: string;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * The narrow mono column that sits to the left of every section heading.
 * Lifted out of the original Capabilities section so the whole page shares it.
 */
export default function SectionRail({
  index,
  label,
  sublabel,
  footnote,
  tone = "dark",
  className,
}: SectionRailProps) {
  return (
    <div
      className={cn(
        "col-span-12 flex justify-between md:col-span-3 md:block",
        className
      )}
    >
      <div className="font-mono text-xs uppercase tracking-widest">
        <span className={tone === "dark" ? "block text-accent" : "block"}>
          {index} / {label}
        </span>
        {sublabel ? (
          <span
            className={cn(
              "mt-2 block",
              tone === "dark" ? "text-white/40" : "text-black/40"
            )}
          >
            {sublabel}
          </span>
        ) : null}
      </div>
      {footnote ? (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-widest md:mt-24 md:block",
            tone === "dark" ? "text-white/30" : "text-black/30"
          )}
        >
          {footnote}
        </span>
      ) : null}
    </div>
  );
}

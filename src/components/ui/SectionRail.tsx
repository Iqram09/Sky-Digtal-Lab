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
 */
export default function SectionRail({
  index,
  label,
  sublabel,
  footnote,
  tone = "dark",
  className,
}: SectionRailProps) {
  const muted = tone === "dark" ? "text-subtle" : "text-on-taupe-muted";

  return (
    <div
      className={cn(
        "col-span-12 flex justify-between md:col-span-3 md:block",
        className
      )}
    >
      <p className="font-mono text-xs uppercase tracking-widest">
        <span className={tone === "dark" ? "block text-accent" : "block text-on-taupe"}>
          {index} / {label}
        </span>
        {sublabel ? <span className={cn("mt-2 block", muted)}>{sublabel}</span> : null}
      </p>
      {footnote ? (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-widest md:mt-24 md:block",
            muted
          )}
        >
          {footnote}
        </span>
      ) : null}
    </div>
  );
}

import { cn } from "@/lib/utils";

type SectionRailProps = {
  index: string;
  label: string;
  sublabel?: string;
  footnote?: string;
  className?: string;
};

/**
 * The narrow column to the left of every section heading, set like the brand
 * guidelines' own section headers: an underlined number, a caps label and a
 * quiet descriptor beneath it.
 */
export default function SectionRail({ index, label, sublabel, footnote, className }: SectionRailProps) {
  return (
    <div className={cn("col-span-12 flex items-start justify-between gap-6 md:col-span-3 md:block", className)}>
      <div className="flex items-start gap-5">
        <span className="label-caps shrink-0 text-[11px] text-foreground">
          {index}
          <span aria-hidden className="mt-2 block h-px w-full min-w-6 bg-foreground" />
        </span>
        <p>
          <span className="label-caps block text-[11px] text-foreground">{label}</span>
          {sublabel ? <span className="mt-1.5 block text-sm text-subtle">{sublabel}</span> : null}
        </p>
      </div>
      {footnote ? (
        <span className="label-caps shrink-0 text-[11px] text-subtle md:mt-24 md:block">{footnote}</span>
      ) : null}
    </div>
  );
}

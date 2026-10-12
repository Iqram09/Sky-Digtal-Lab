import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  tone?: "dark" | "light";
  className?: string;
};

/** The studio's signature: a taupe point and the name set in mono. */
export default function Wordmark({ tone = "dark", className }: WordmarkProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn("h-2 w-2 rounded-full", tone === "dark" ? "bg-accent" : "bg-on-taupe")}
      />
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-[0.22em] transition-colors",
          tone === "dark" ? "text-foreground group-hover:text-accent" : "text-on-taupe"
        )}
      >
        {site.name}
      </span>
    </span>
  );
}

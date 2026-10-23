import { cn } from "@/lib/utils";

/**
 * The four-point star from the logo, path taken unchanged from the supplied
 * symbol artwork. Use it as an accent, a bullet or a highlight — one star at a
 * time, never a pattern of many. Size it with width only; it keeps its
 * proportions and takes the current text colour.
 */
export default function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 47 48"
      aria-hidden
      focusable="false"
      className={cn("inline-block h-auto w-3 shrink-0 fill-current", className)}
    >
      <path d="M23.5 0C25.85 13.92 33.37 21.6 47 24C33.37 26.4 25.85 34.08 23.5 48C21.15 34.08 13.63 26.4 0 24C13.63 21.6 21.15 13.92 23.5 0Z" />
    </svg>
  );
}

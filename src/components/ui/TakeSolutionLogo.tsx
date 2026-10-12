import { cn } from "@/lib/utils";

type TakeSolutionLogoProps = {
  /** `light` artwork for dark grounds, `dark` artwork for light grounds. */
  tone?: "light" | "dark";
  /** Font size in px — the whole lockup scales from it. */
  fontSize?: number;
  className?: string;
};

/**
 * TakeSolution's logo exactly as their own site renders it: the official
 * 32×32 SVG mark (paths and colours from digital.takesolution.co.in/icon.svg)
 * beside an Inter semibold wordmark with "Solution" in their muted tone.
 */
export default function TakeSolutionLogo({
  tone = "light",
  fontSize = 18,
  className,
}: TakeSolutionLogoProps) {
  const fg = tone === "light" ? "#F5F5F2" : "#0B0B0F";
  const canvas = tone === "light" ? "#0B0B0F" : "#F5F5F2";
  const muted = tone === "light" ? "#A1A1AA" : "#52525B";

  return (
    <span
      role="img"
      aria-label="TakeSolution logo"
      className={cn("inline-flex items-center gap-[0.32em] font-sans leading-none", className)}
      style={{ fontSize }}
    >
      <svg viewBox="0 0 32 32" aria-hidden className="h-[1.9em] w-[1.9em] shrink-0">
        <rect width="32" height="32" rx="8" fill={fg} />
        <path d="M8 8.5h16v4h-6V24h-4V12.5H8z" fill={canvas} />
        <rect x="19.5" y="19.5" width="4.5" height="4.5" fill="#FF5F1F" />
      </svg>
      <span aria-hidden className="font-semibold tracking-[-0.03em]" style={{ color: fg }}>
        Take<span style={{ color: muted }}>Solution</span>
      </span>
    </span>
  );
}

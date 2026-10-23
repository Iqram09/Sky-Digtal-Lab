import { cn } from "@/lib/utils";

type GlowProps = {
  tone: "mint" | "lavender";
  /** Position and size, e.g. "-right-40 -top-40 w-[640px]". The glow is always circular. */
  className?: string;
  /** A slow drift; switched off for reduced motion. */
  drift?: boolean;
};

/**
 * Soft glow (brand element): a large blurred circle of mint or lavender at the
 * edge of a layout. Its parent needs `relative overflow-hidden`; content that
 * should sit above it needs `relative`.
 */
export default function Glow({ tone, className, drift = false }: GlowProps) {
  return (
    <span
      aria-hidden
      className={cn("glow", tone === "mint" ? "glow-mint" : "glow-lavender", drift && "glow-drift", className)}
    />
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The supplied logo artwork (public/brand), at its own proportions. The logo is
 * only ever charcoal ("black" files, #101014) or white — never retyped,
 * recoloured, outlined or stretched.
 *
 * Minimum widths (Brand Guidelines §05) — below these, step down a version:
 *   primary 160px · primary-no-tagline 80px · horizontal 200px
 *   wordmark 40px · symbol 16px
 */
const versions = {
  primary: { width: 644, height: 405.14, label: "Sky Digital Lab — Creative Thinking. Digital Engineering." },
  "primary-no-tagline": { width: 644, height: 354, label: "Sky Digital Lab" },
  horizontal: { width: 1683, height: 354, label: "Sky Digital Lab — Creative Thinking. Digital Engineering." },
  wordmark: { width: 644, height: 354, label: "Sky Digital Lab" },
  symbol: { width: 156.7, height: 166.8, label: "Sky Digital Lab" },
} as const;

export type LogoVersion = keyof typeof versions;
export type LogoTone = "black" | "white";

type LogoProps = {
  version: LogoVersion;
  tone: LogoTone;
  /** Rendered width in px; height follows from the artwork. */
  width: number;
  className?: string;
  priority?: boolean;
  /** Pass "" when the name is already announced nearby. */
  alt?: string;
};

export default function Logo({ version, tone, width, className, priority, alt }: LogoProps) {
  const artwork = versions[version];
  return (
    <Image
      src={`/brand/sdl-${version}-${tone}.svg`}
      alt={alt ?? artwork.label}
      width={width}
      height={Math.round((width * artwork.height) / artwork.width)}
      priority={priority}
      unoptimized
      draggable={false}
      className={cn("block h-auto select-none", className)}
    />
  );
}

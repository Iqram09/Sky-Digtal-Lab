/**
 * Single source of truth for brand-level facts, navigation and contact points.
 * Everything here is real — nothing is placeholder marketing copy.
 */
export const site = {
  name: "Sky Digital Lab",
  shortName: "Sky Digital Lab",
  tagline: "Strategy. Design. Engineering.",
  description:
    "Sky Digital Lab designs and builds websites, web applications, brands and digital systems for ambitious businesses.",
  /**
   * Canonical origin, used for canonical/OG URLs, the sitemap and robots.txt.
   * Set NEXT_PUBLIC_SITE_URL in the deploy environment to the real domain —
   * the fallback below is a placeholder and should be replaced before launch.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skydigitallab.com",
  email: "hello@skymedia.dev",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Only links that actually exist belong here. Add social profiles as they go live —
 * an empty array simply renders no social column.
 */
export const socials: { label: string; href: string }[] = [];

/**
 * Single source of truth for brand-level facts, navigation and contact points.
 * Everything here is real — nothing is placeholder marketing copy.
 */

/**
 * Canonical origin, used for canonical/OG URLs, the sitemap and robots.txt.
 * The project answers on more than one *.vercel.app address, so the primary
 * one is named explicitly. Set NEXT_PUBLIC_SITE_URL to override it, e.g. once
 * a custom domain is attached.
 */
function resolveSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://skydigitallab.vercel.app";
}

export const site = {
  name: "Sky Digital Lab",
  shortName: "Sky Digital Lab",
  tagline: "Think clearly. Build intelligently. Deliver what we promise.",
  description:
    "Sky Digital Lab is a digital studio that brings strategy, design and engineering together to build websites, web applications and software that help businesses move forward.",
  url: resolveSiteUrl(),
  email: "mdiqramp@gmail.com",
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/**
 * Only links that actually exist belong here. Add the studio's social profiles
 * as they go live — an empty array simply renders no social links.
 */
export const socials: NavItem[] = [];

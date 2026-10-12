/**
 * Single source of truth for brand-level facts, navigation and contact points.
 * Everything here is real — nothing is placeholder marketing copy.
 */

/**
 * Canonical origin, used for canonical/OG URLs, the sitemap and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain is attached. Until then the
 * Vercel production URL is used, so canonicals always point at a live address.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://skylab-nine.vercel.app";
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

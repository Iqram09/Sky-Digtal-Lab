import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/about" — resolved against `metadataBase`. */
  path: string;
  /** Optional share image; defaults to the site-wide generated card. */
  image?: { url: string; width: number; height: number; alt: string };
};

/**
 * Next.js merges metadata shallowly, so a page that sets `openGraph` replaces
 * the root object entirely. This builds the full set for a page in one place.
 */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  // Setting `openGraph` here replaces the root object, which would drop the
  // generated share card — so it is restored as the default image.
  const shareImage = image ?? {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} — Digital ideas. Engineered into reality.`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}

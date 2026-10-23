import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { team } from "@/content/team";
import { site } from "@/lib/site";

// Manrope is the brand typeface for every piece of text (Brand Guidelines §07).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${site.name} — Digital Studio for Websites, Applications & Software`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f2f0",
  colorScheme: "light",
};

/**
 * Structured data describes only what is verifiably true about the studio:
 * who it is, how to reach it and who founded it. No ratings, no counts.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      founder: team.map((member) => ({ "@type": "Person", name: member.name, jobTitle: member.role })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} antialiased`}
      // The inline script below adds `js` before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Marks that JS is running so scroll-reveal styles may hide content first. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CustomCursor />
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
        <script
          type="application/ld+json"
          // Content is a static, locally-built object — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}

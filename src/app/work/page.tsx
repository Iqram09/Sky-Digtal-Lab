import PageHeader from "@/components/ui/PageHeader";
import CtaBand from "@/components/sections/CtaBand";
import BrandShowcase from "@/components/work/BrandShowcase";
import WorkIndex from "@/components/work/WorkIndex";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Websites designed and built by Sky Digital Lab for Stans Buildtech (real estate and construction), Proximo (menswear e-commerce) and Take Solution (digital marketing).",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Our work"
        title="Real projects. Live websites."
        intro="Every project here is a website we designed and built, and every one is live. Read how each came together, then visit the real thing."
      />
      <WorkIndex />
      <BrandShowcase />
      <CtaBand
        heading="Your project could be next."
        text="Tell us about your business and what you need. We'll come back with a clear, practical next step."
        secondary={{ label: "View services", href: "/services" }}
      />
    </main>
  );
}

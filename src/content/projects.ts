export type Project = {
  id: string;
  title: string;
  /** Industry or discipline the piece belongs to. */
  category: string;
  /**
   * `concept` marks in-house studio work built to demonstrate a capability —
   * it is surfaced as a visible label so nothing reads as a client engagement.
   * Switch to `client` and add a `client` field once a real engagement ships.
   */
  kind: "concept" | "client";
  description: string;
  services: string[];
  technologies: string[];
  image: string;
};

/**
 * These are the studio's own concept pieces — the same four that have always
 * been in the showcase. They are explicitly labelled as concepts. Do not add an
 * entry here unless the work genuinely exists.
 */
export const projects: Project[] = [
  {
    id: "01",
    title: "DIGITAL PRODUCTS",
    category: "Web + App Development",
    kind: "concept",
    description:
      "An exploration of how a marketing site and a product interface can share one design system, so a company's first impression and its daily tool feel like the same thing.",
    services: ["UI/UX", "Web Development", "Design System"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "SMARTER OPERATIONS",
    category: "Python + Data Analytics",
    kind: "concept",
    description:
      "A reporting concept that pulls scattered business data into one place, turning spreadsheets and exports into a live view a team can actually act on.",
    services: ["Data Pipeline", "Dashboard Design", "Automation"],
    technologies: ["Python", "PostgreSQL", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "BRAND IN MOTION",
    category: "Brand + Digital Identity",
    kind: "concept",
    description:
      "A visual identity study built for screens first — typography, colour and motion defined together so a brand stays consistent from a logo to a loading state.",
    services: ["Brand Strategy", "Visual Identity", "Motion"],
    technologies: ["Design System", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "CONNECTED BUSINESS",
    category: "CRM + Automation",
    kind: "concept",
    description:
      "A workflow concept connecting enquiries, messaging and a CRM, so a lead moves from first contact to follow-up without anyone re-typing it.",
    services: ["Workflow Automation", "API Integration", "Internal Tools"],
    technologies: ["Node.js", "REST APIs", "WhatsApp API"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
];

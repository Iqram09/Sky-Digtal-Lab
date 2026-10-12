export type Service = {
  slug: string;
  number: string;
  title: string;
  /** One line for overviews and the footer. */
  short: string;
  /** What it is. */
  description: string;
  problems: string[];
  deliverables: string[];
  cta: string;
};

/**
 * What the studio offers. Newer capabilities (AI, data, motion) are described
 * as the practical, scoped work we take on — not as a specialist practice.
 * No prices, timelines or guaranteed outcomes belong here.
 */
export const services: Service[] = [
  {
    slug: "web-design-development",
    number: "01",
    title: "Web Design and Development",
    short: "Corporate and business websites, landing pages and responsive web experiences.",
    description:
      "Websites designed around your brand and audience, then built to be fast, accessible and easy to maintain. From a focused landing page to a multi-section corporate site.",
    problems: [
      "Your website no longer reflects the business you have become.",
      "Visitors can't find what they need, or leave before they enquire.",
      "The site is slow, hard to update, or breaks on phones.",
    ],
    deliverables: [
      "Corporate & business websites",
      "Landing pages",
      "Responsive interfaces",
      "E-commerce storefronts",
      "Performance & SEO foundations",
      "Content management setup",
    ],
    cta: "Plan a website",
  },
  {
    slug: "ui-ux-product-design",
    number: "02",
    title: "UI/UX and Product Design",
    short: "Wireframes, user journeys, interface design, prototypes and design systems.",
    description:
      "We map how people move through your product, then design interfaces that make the next step obvious — tested as prototypes before anything is built.",
    problems: [
      "Users get lost or drop off at the same point every time.",
      "Every new screen looks a little different from the last.",
      "The team can't agree on how a feature should work.",
    ],
    deliverables: [
      "User journeys & flows",
      "Wireframes",
      "Interface design",
      "Clickable prototypes",
      "Usability reviews",
      "Design systems",
    ],
    cta: "Talk about your product",
  },
  {
    slug: "branding-visual-identity",
    number: "03",
    title: "Branding and Visual Identity",
    short: "Brand direction, visual systems and digital brand assets.",
    description:
      "A visual identity built for screens first: logo, typography, colour and the rules that keep them consistent from a social post to a product interface.",
    problems: [
      "Your brand looks different everywhere it appears.",
      "You're launching something new and need an identity to match.",
      "Your website and your brand feel like two different companies.",
    ],
    deliverables: [
      "Brand direction",
      "Logo & visual identity",
      "Typography & colour systems",
      "Brand guidelines",
      "Digital brand assets",
      "Website identity",
    ],
    cta: "Discuss your brand",
  },
  {
    slug: "web-applications-custom-software",
    number: "04",
    title: "Web Applications and Custom Software",
    short: "Dashboards, internal tools, customer portals and tailored business applications.",
    description:
      "Software shaped around how your business actually works — so your team and your customers stop working around tools that were built for someone else.",
    problems: [
      "Work lives in spreadsheets, inboxes and copy-paste.",
      "Off-the-shelf software covers most of what you need, and the rest is manual.",
      "Customers have no self-service way to see their orders, bookings or data.",
    ],
    deliverables: [
      "Dashboards & admin panels",
      "Internal tools",
      "Customer portals",
      "Business applications",
      "Role-based access",
      "Ongoing improvements",
    ],
    cta: "Scope an application",
  },
  {
    slug: "api-development-integration",
    number: "05",
    title: "API Development and Integration",
    short: "API design, backend integrations, third-party services and authentication.",
    description:
      "We design and build APIs, and connect the systems you already rely on — payment gateways, CRMs, messaging platforms and other third-party services — so data moves without re-typing.",
    problems: [
      "Your systems don't talk to each other.",
      "A partner or app needs secure access to your data.",
      "An integration is fragile and nobody wants to touch it.",
    ],
    deliverables: [
      "API design & development",
      "Third-party integrations",
      "Payment & messaging integrations",
      "Authentication & access control",
      "API documentation",
      "API management",
    ],
    cta: "Connect your systems",
  },
  {
    slug: "automation-ai",
    number: "06",
    title: "Automation and AI",
    short: "Workflow automation and practical AI features, where they genuinely help.",
    description:
      "We automate repetitive workflows and add AI-powered features where they solve a real problem — summarising, classifying, drafting or searching — with clear limits and human review where it matters.",
    problems: [
      "Your team repeats the same manual steps every day.",
      "Enquiries, documents or messages pile up faster than people can sort them.",
      "You want to try AI, but need it to be useful and safe rather than a demo.",
    ],
    deliverables: [
      "Workflow automation",
      "Notification & messaging flows",
      "AI feature integration",
      "Document & text processing",
      "Feasibility assessments",
      "Monitoring of automated steps",
    ],
    cta: "Explore automation",
  },
  {
    slug: "cloud-deployment",
    number: "07",
    title: "Cloud and Deployment",
    short: "Deployment, Docker, cloud infrastructure, monitoring and production readiness.",
    description:
      "Getting software into production and keeping it there: environments, containers, deployment pipelines and the monitoring that tells you something is wrong before your customers do.",
    problems: [
      "Deployments are manual, risky or depend on one person.",
      "You don't know when the application is down or slow.",
      "Development, staging and production behave differently.",
    ],
    deliverables: [
      "Application deployment",
      "Docker containerisation",
      "Cloud infrastructure setup",
      "Environment configuration",
      "CI/CD pipelines",
      "Monitoring & alerting",
    ],
    cta: "Talk deployment",
  },
  {
    slug: "data-analytics",
    number: "08",
    title: "Data and Analytics",
    short: "Data processing, dashboards and reporting interfaces.",
    description:
      "We bring scattered data into one place and turn it into dashboards and reports your team can act on — built on the data you already collect.",
    problems: [
      "Reporting means exporting, merging and cleaning spreadsheets by hand.",
      "Every team has a different version of the numbers.",
      "You collect data but can't see what it is telling you.",
    ],
    deliverables: [
      "Data processing pipelines",
      "Dashboards",
      "Reporting interfaces",
      "Analytics setup",
      "Data exports & integrations",
    ],
    cta: "Discuss your data",
  },
  {
    slug: "creative-digital-work",
    number: "09",
    title: "Creative Digital Work",
    short: "Motion graphics, video editing and visual storytelling where a project needs it.",
    description:
      "Motion, video and visual content that supports a launch, a product or a website — produced alongside the rest of the project so it matches the brand and the build.",
    problems: [
      "A launch needs visuals that explain the product quickly.",
      "Your website or social channels need motion and video, not just stills.",
      "Content is produced separately and never quite matches the brand.",
    ],
    deliverables: [
      "Motion graphics",
      "Video editing",
      "Product & launch visuals",
      "Social & website content",
      "Visual storytelling",
    ],
    cta: "Plan creative work",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

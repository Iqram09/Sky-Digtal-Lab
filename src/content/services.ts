export type Service = {
  number: string;
  title: string;
  label: string;
  description: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "WEBSITES",
    label: "Be seen",
    description:
      "High-performance websites designed around your brand, audience and business goals.",
    capabilities: [
      "Corporate Websites",
      "Business Websites",
      "Landing Pages",
      "Portfolio Websites",
      "E-commerce",
      "Real Estate Websites",
      "Custom Web Experiences",
    ],
  },
  {
    number: "02",
    title: "WEB APPLICATIONS",
    label: "Make it work",
    description:
      "Scalable web applications that solve real business problems and create better experiences for customers and teams.",
    capabilities: [
      "SaaS Platforms",
      "Admin Dashboards",
      "Customer Portals",
      "Management Systems",
      "Booking Platforms",
      "Internal Tools",
      "Custom Applications",
    ],
  },
  {
    number: "03",
    title: "UI/UX & PRODUCT DESIGN",
    label: "Make it clear",
    description:
      "We turn complex ideas into simple, intuitive and memorable digital experiences.",
    capabilities: [
      "UX Research",
      "User Flows",
      "Wireframes",
      "UI Design",
      "Design Systems",
      "Prototyping",
      "Responsive Design",
    ],
  },
  {
    number: "04",
    title: "BRANDING",
    label: "Be recognised",
    description:
      "We create visual identities that give businesses a distinct presence and a consistent voice.",
    capabilities: [
      "Brand Strategy",
      "Logo Design",
      "Visual Identity",
      "Typography",
      "Color Systems",
      "Brand Guidelines",
      "Marketing Assets",
    ],
  },
  {
    number: "05",
    title: "AUTOMATION",
    label: "Move faster",
    description:
      "Remove repetitive work and connect the tools your business already uses.",
    capabilities: [
      "Business Automation",
      "API Integrations",
      "WhatsApp Automation",
      "Email & SMS Systems",
      "CRM Integrations",
      "Workflow Automation",
      "Custom Integrations",
    ],
  },
  {
    number: "06",
    title: "CLOUD & TECHNOLOGY",
    label: "Stay standing",
    description:
      "Reliable technology infrastructure built to support modern digital products.",
    capabilities: [
      "Cloud Deployment",
      "API Development",
      "Database Architecture",
      "Docker",
      "DevOps",
      "CI/CD",
      "Cloud Architecture",
    ],
  },
];

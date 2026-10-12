export type Problem = {
  number: string;
  statement: string;
  /** The service that usually answers it — links into /services. */
  service: string;
  answer: string;
};

export const problems: Problem[] = [
  {
    number: "01",
    statement: "Our website no longer represents us.",
    service: "web-design-development",
    answer: "Website redesign",
  },
  {
    number: "02",
    statement: "We need to launch a digital product.",
    service: "ui-ux-product-design",
    answer: "Product design + development",
  },
  {
    number: "03",
    statement: "Our business relies on too much manual work.",
    service: "automation-ai",
    answer: "Automation",
  },
  {
    number: "04",
    statement: "Our systems don't communicate with each other.",
    service: "api-development-integration",
    answer: "API + system integration",
  },
  {
    number: "05",
    statement: "We need a stronger digital identity.",
    service: "branding-visual-identity",
    answer: "Branding + visual identity",
  },
  {
    number: "06",
    statement: "We need software built around how we work.",
    service: "web-applications-custom-software",
    answer: "Custom software",
  },
];

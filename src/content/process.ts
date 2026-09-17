export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We understand your business, audience, goals and the problem we're solving.",
  },
  {
    number: "02",
    title: "STRATEGIZE",
    description:
      "We define the product structure, technical approach, priorities and roadmap.",
  },
  {
    number: "03",
    title: "DESIGN",
    description:
      "We create the visual direction, user experience and interface system.",
  },
  {
    number: "04",
    title: "BUILD",
    description:
      "Our engineers turn the approved design into a fast, reliable and scalable product.",
  },
  {
    number: "05",
    title: "LAUNCH",
    description: "We test, optimize and deploy the product into production.",
  },
  {
    number: "06",
    title: "EVOLVE",
    description:
      "Launch is the beginning. We continue improving the product as your business grows.",
  },
];

/** Short pipeline shown under the hero. */
export const pipeline = [
  "STRATEGY",
  "DESIGN",
  "DEVELOPMENT",
  "DEPLOYMENT",
  "GROWTH",
] as const;

/** The long-form ladder used by the "From idea to infrastructure" section. */
export const ladder = [
  "IDEA",
  "STRATEGY",
  "BRAND",
  "DESIGN",
  "PRODUCT",
  "ENGINEERING",
  "AUTOMATION",
  "INFRASTRUCTURE",
  "GROWTH",
] as const;

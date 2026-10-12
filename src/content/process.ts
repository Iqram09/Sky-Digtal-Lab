export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, audience, and requirements.",
  },
  {
    number: "02",
    title: "Define",
    description: "Establish scope, priorities, and deliverables.",
  },
  {
    number: "03",
    title: "Design",
    description: "Create the structure and visual direction.",
  },
  {
    number: "04",
    title: "Develop",
    description: "Build and integrate the solution.",
  },
  {
    number: "05",
    title: "Validate",
    description: "Test functionality, performance, accessibility, and quality.",
  },
  {
    number: "06",
    title: "Deliver",
    description: "Launch, document, and support the agreed solution.",
  },
];

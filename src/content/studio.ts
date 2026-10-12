/**
 * Who the studio is and what it stands for. Mission and vision are working
 * brand statements and can be refined as the identity matures.
 */

export const mission =
  "To make technology useful, design meaningful, and digital solutions dependable — helping businesses turn ambitious ideas into practical outcomes.";

export const vision =
  "To build a trusted digital studio known for thoughtful work, reliable delivery, and long-term relationships with the people and businesses we serve.";

export type Pillar = { title: string; description: string };

/** The three disciplines every project draws on. */
export const pillars: Pillar[] = [
  {
    title: "Strategy",
    description: "Understand the problem before building the solution.",
  },
  {
    title: "Design",
    description: "Create intuitive, visually coherent experiences.",
  },
  {
    title: "Engineering",
    description: "Build reliable, maintainable digital products.",
  },
];

/** What the mission means in practice. */
export const commitments: string[] = [
  "Clear communication",
  "Practical solutions",
  "Quality over shortcuts",
  "Responsible use of technology",
  "Delivering on commitments",
  "Building long-term client relationships",
];

export type Value = { title: string; description: string };

export const values: Value[] = [
  { title: "Ownership", description: "We take responsibility for our work — the decisions, the details and the result." },
  { title: "Reliability", description: "We respect commitments and communicate honestly, especially when plans change." },
  { title: "Quality", description: "We build solutions that work well today and stay maintainable tomorrow." },
  { title: "Clarity", description: "We make complex problems easier to understand, for clients and for ourselves." },
  { title: "Collaboration", description: "We work closely with clients and with each other. Good work is rarely solitary." },
  { title: "Continuous Learning", description: "We improve our skills and methods as technology evolves." },
];

export const workingPrinciples: { title: string; description: string }[] = [
  {
    title: "Realistic planning",
    description: "We agree what is achievable before we start, and say so when something isn't.",
  },
  {
    title: "Clear scope",
    description: "Every project begins with a written scope, priorities and deliverables everyone has seen.",
  },
  {
    title: "Transparent communication",
    description: "You always know what we're working on, what's next, and what we need from you.",
  },
  {
    title: "Quality delivery",
    description: "We prefer a well-built solution to an over-complicated one, and test before we hand over.",
  },
];

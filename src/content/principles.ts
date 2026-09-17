export type Principle = {
  number: string;
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "DESIGN FIRST",
    description:
      "Every interface has a reason. We design around people, context and business objectives rather than decoration alone.",
  },
  {
    number: "02",
    title: "ENGINEERED TO SCALE",
    description:
      "We build foundations that can evolve with your business instead of creating technology that needs to be replaced as you grow.",
  },
  {
    number: "03",
    title: "BUSINESS FOCUSED",
    description:
      "Technology should solve a problem, improve an experience or create an opportunity. Every decision starts there.",
  },
  {
    number: "04",
    title: "BUILT AROUND YOU",
    description:
      "No unnecessary templates. No one-size-fits-all solutions. We build around your requirements, audience and goals.",
  },
];

export type Pillar = {
  title: string;
  description: string;
};

export const pillars: Pillar[] = [
  { title: "EXPERIENCE", description: "Beautiful, intuitive interfaces." },
  { title: "PERFORMANCE", description: "Fast and responsive digital products." },
  { title: "ENGINEERING", description: "Reliable and maintainable technology." },
];

export type TechCategory = {
  number: string;
  title: string;
  items: string[];
};

export const technologies: TechCategory[] = [
  {
    number: "01",
    title: "FRONTEND",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "BACKEND",
    items: ["Node.js", "Python", "FastAPI", "Java"],
  },
  {
    number: "03",
    title: "DATA",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    number: "04",
    title: "INFRASTRUCTURE",
    items: ["AWS", "Docker", "Kubernetes", "Linux"],
  },
  {
    number: "05",
    title: "INTEGRATIONS",
    items: [
      "REST APIs",
      "OAuth",
      "Payment Systems",
      "WhatsApp",
      "SMS",
      "Third-party APIs",
    ],
  },
];

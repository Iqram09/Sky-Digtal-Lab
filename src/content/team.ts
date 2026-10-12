export type TeamMember = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  /** Short focus label for previews. */
  focus: string;
  bio: string;
  responsibilities: string[];
  /**
   * Path to a real portrait once one is supplied. Until then the profile shows
   * an initials monogram — never a stock photo.
   */
  portrait?: string;
};

/**
 * The founding team. Bios describe what each person does at the studio and
 * nothing more: no degrees, years of experience, awards or past employers are
 * stated, because none have been provided.
 */
export const team: TeamMember[] = [
  {
    slug: "iqram-patel",
    name: "Iqram Patel",
    initials: "IP",
    role: "Technology, Development and Architecture",
    focus: "Technology",
    bio: "Iqram leads the technical side of the studio — how a product is architected, built, integrated and deployed — turning agreed requirements into working software and answering for its technical quality.",
    responsibilities: [
      "Full-stack development",
      "Technical architecture",
      "Software engineering",
      "APIs and integrations",
      "Deployment and infrastructure",
      "Exploring AI-powered solutions",
      "Technical quality and implementation",
    ],
  },
  {
    slug: "rashid",
    name: "Rashid",
    initials: "R",
    role: "Business, Client Relationships and Design",
    focus: "Business & Design",
    bio: "Rashid is the first conversation most clients have with the studio — working out what a business really needs, shaping the design direction and keeping both the project plan and the client relationship on track.",
    responsibilities: [
      "Business strategy",
      "Client communication",
      "Understanding client requirements",
      "Design direction",
      "Creative coordination",
      "Project planning",
    ],
  },
  {
    slug: "danish",
    name: "Danish",
    initials: "D",
    role: "Sales, Marketing and Operations",
    focus: "Growth & Operations",
    bio: "Danish brings new work to the studio and keeps it running smoothly — from outreach and marketing to the operational coordination that supports every project through delivery.",
    responsibilities: [
      "Lead generation",
      "Sales and outreach",
      "Marketing strategy",
      "Business development",
      "Operational coordination",
      "Supporting project delivery",
    ],
  },
];

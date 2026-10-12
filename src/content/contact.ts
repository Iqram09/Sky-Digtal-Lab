import { services } from "@/content/services";

/** Project types mirror the services page, so a service CTA can preselect one. */
export const projectTypes: { value: string; label: string }[] = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: "other", label: "Something else" },
];

export const budgets = [
  "Under ₹50K",
  "₹50K – ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹5L",
  "₹5L+",
  "Not sure yet",
] as const;

export const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type ContactMethod = (typeof contactMethods)[number]["value"];

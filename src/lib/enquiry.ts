import { budgets, contactMethods, projectTypes } from "@/content/contact";

/**
 * Enquiry shape and validation, shared by the contact form (instant feedback)
 * and the server action (the check that actually counts).
 */
export type EnquiryValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
  contactMethod: string;
  phone: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  description: "",
  contactMethod: "email",
  phone: "",
};

export const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  description: 5000,
  phone: 32,
} as const;

export const MIN_DESCRIPTION = 20;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,}$/;

export function needsPhone(contactMethod: string) {
  return contactMethod === "phone" || contactMethod === "whatsapp";
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const description = values.description.trim();

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > LIMITS.name) errors.name = "That name is a little long — please shorten it.";

  if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email) {
    errors.email = "Please enter an email address we can reply to.";
  }

  if (values.company.trim().length > LIMITS.company) {
    errors.company = "Please shorten the company name.";
  }

  if (!projectTypes.some((type) => type.value === values.projectType)) {
    errors.projectType = "Choose the closest project type — “Something else” is fine.";
  }

  if (values.budget && !budgets.includes(values.budget as (typeof budgets)[number])) {
    errors.budget = "Choose one of the listed ranges.";
  }

  if (description.length < MIN_DESCRIPTION) {
    errors.description = "A sentence or two about the project helps us respond properly.";
  } else if (description.length > LIMITS.description) {
    errors.description = `Please keep the description under ${LIMITS.description} characters.`;
  }

  if (!contactMethods.some((method) => method.value === values.contactMethod)) {
    errors.contactMethod = "Choose how you'd like us to get in touch.";
  } else if (needsPhone(values.contactMethod)) {
    const phone = values.phone.trim();
    if (!PHONE_PATTERN.test(phone) || phone.length > LIMITS.phone) {
      errors.phone = "Please add a phone number we can reach you on, including the country code.";
    }
  }

  return errors;
}

export function labelFor(list: readonly { value: string; label: string }[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}

/** Plain-text summary used for the notification email and the mailto fallback. */
export function summarise(values: EnquiryValues) {
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company / brand: ${values.company.trim() || "—"}`,
    `Project type: ${labelFor(projectTypes, values.projectType)}`,
    `Estimated budget: ${values.budget || "Not specified"}`,
    `Preferred contact: ${labelFor(contactMethods, values.contactMethod)}${
      needsPhone(values.contactMethod) ? ` — ${values.phone.trim()}` : ""
    }`,
    "",
    "Project description:",
    values.description.trim(),
  ].join("\n");
}

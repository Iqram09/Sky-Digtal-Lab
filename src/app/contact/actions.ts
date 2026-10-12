"use server";

import {
  type EnquiryErrors,
  type EnquiryValues,
  summarise,
  validateEnquiry,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      errors?: EnquiryErrors;
      /** True when the problem is on our side — offer the direct email route. */
      offerEmail?: boolean;
    };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Minimum time a human plausibly needs to fill the form. */
const MIN_FILL_MS = 2500;

function read(formData: FormData, key: keyof EnquiryValues) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Sends a project enquiry to the studio inbox through Resend.
 *
 * Configuration (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      required — https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    optional — defaults to the public studio address
 *   CONTACT_FROM_EMAIL  optional — a sender on a domain verified in Resend.
 *                       Defaults to Resend's onboarding sender, which can only
 *                       deliver to the email the Resend account was created with.
 */
export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Spam traps: a hidden field people never see, and a fill time no human beats.
  // Bots get a quiet "success" so they learn nothing.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) return { status: "success" };
  const startedAt = Number(formData.get("startedAt"));
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) return { status: "success" };

  const values: EnquiryValues = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    company: read(formData, "company"),
    projectType: read(formData, "projectType"),
    budget: read(formData, "budget"),
    description: read(formData, "description"),
    contactMethod: read(formData, "contactMethod") || "email",
    phone: read(formData, "phone"),
  };

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured — enquiry was not sent.");
    return {
      status: "error",
      message: "Our contact form can't send messages right now.",
      offerEmail: true,
    };
  }

  // Strip line breaks from anything that ends up in a header-like field.
  const name = values.name.trim().replace(/[\r\n]+/g, " ");
  const company = values.company.trim().replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: values.email.trim(),
        subject: `New project enquiry — ${name}${company ? ` (${company})` : ""}`,
        text: `${summarise(values)}\n\n—\nSent from the contact form on ${site.url}`,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[contact] Resend responded ${response.status}: ${detail}`);
      return {
        status: "error",
        message: "We couldn't send your enquiry just now.",
        offerEmail: true,
      };
    }
  } catch (error) {
    console.error("[contact] Failed to reach Resend:", error);
    return {
      status: "error",
      message: "We couldn't send your enquiry just now.",
      offerEmail: true,
    };
  }

  return { status: "success" };
}

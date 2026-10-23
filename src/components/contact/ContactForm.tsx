"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import { budgets, contactMethods, projectTypes } from "@/content/contact";
import {
  type EnquiryErrors,
  type EnquiryValues,
  emptyEnquiry,
  LIMITS,
  needsPhone,
  summarise,
  validateEnquiry,
} from "@/lib/enquiry";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const initialState: EnquiryState = { status: "idle" };

const labelClass = "label-caps mb-2 block text-[11px] text-muted";
const fieldClass =
  "w-full border-b bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-subtle focus:border-foreground md:text-lg";

/** Order in which invalid fields receive focus. */
const fieldOrder: (keyof EnquiryValues)[] = [
  "name",
  "email",
  "company",
  "projectType",
  "budget",
  "description",
  "contactMethod",
  "phone",
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {message}
    </p>
  );
}

export default function ContactForm({ initialProjectType = "" }: { initialProjectType?: string }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const [values, setValues] = useState<EnquiryValues>({ ...emptyEnquiry, projectType: initialProjectType });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  // The action's last result stays "success" until the next submission, so a
  // local flag lets the visitor return to an empty form.
  const [successDismissed, setSuccessDismissed] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  // Stamped after hydration: the server action uses it to spot instant bot submissions.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  // Move focus to the outcome so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const serverErrors = state.status === "error" ? state.errors ?? {} : {};
  const errorFor = (key: keyof EnquiryValues) => errors[key] ?? serverErrors[key];
  const describedBy = (key: keyof EnquiryValues) => (errorFor(key) ? `${key}-error` : undefined);

  const update = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Stop here — the server action only runs for a valid form.
      event.preventDefault();
      const first = fieldOrder.find((key) => nextErrors[key]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setSuccessDismissed(false);
  };

  const replyVia =
    contactMethods.find((method) => method.value === values.contactMethod)?.label.toLowerCase() ?? "email";

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project enquiry — ${values.name.trim() || "new project"}`
  )}&body=${encodeURIComponent(summarise(values))}`;

  if (state.status === "success" && !successDismissed) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="surface-mint rounded-[20px] p-6 outline-none md:p-10"
      >
        <p className="label-caps text-[11px] text-foreground">Enquiry sent</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Thank you{values.name.trim() ? `, ${values.name.trim().split(" ")[0]}` : ""}.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Your project details are with us. We&apos;ll read them properly and
          get back to you by {replyVia === "whatsapp" ? "WhatsApp" : replyVia}
          {values.contactMethod === "email" ? (
            <>
              {" "}at <span className="text-foreground">{values.email.trim()}</span>
            </>
          ) : null}
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ ...emptyEnquiry });
            setErrors({});
            setSuccessDismissed(true);
          }}
          className="label-caps mt-8 rounded-full border border-foreground/40 px-5 py-3 text-[11px] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const showPhone = needsPhone(values.contactMethod);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={pending}
      aria-describedby="form-note"
      className="flex flex-col gap-10"
    >
      {state.status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[16px] border border-danger/50 bg-danger/[0.06] p-5 outline-none md:p-6"
        >
          <p className="text-base text-foreground">{state.message}</p>
          {state.offerEmail ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your details are still in the form. You can{" "}
              <a href={mailtoHref} className="text-foreground underline underline-offset-4 hover:text-muted">
                send them by email instead
              </a>{" "}
              — it reaches the same inbox at {site.email}.
            </p>
          ) : null}
        </div>
      ) : null}

      <p id="form-note" className="label-caps text-[11px] text-subtle">
        Fields marked <span className="text-foreground">*</span> are required.
      </p>

      {/* Honeypot — invisible to people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-foreground">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-required
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
            placeholder="Your name"
            className={cn(fieldClass, errorFor("name") ? "border-danger" : "border-foreground/50")}
          />
          <FieldError id="name-error" message={errorFor("name")} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Business email <span className="text-foreground">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-required
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email")}
            placeholder="you@company.com"
            className={cn(fieldClass, errorFor("email") ? "border-danger" : "border-foreground/50")}
          />
          <FieldError id="email-error" message={errorFor("email")} />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company or brand <span className="normal-case tracking-normal text-subtle">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            aria-invalid={Boolean(errorFor("company"))}
            aria-describedby={describedBy("company")}
            placeholder="Company or brand name"
            className={cn(fieldClass, errorFor("company") ? "border-danger" : "border-foreground/50")}
          />
          <FieldError id="company-error" message={errorFor("company")} />
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type <span className="text-foreground">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            aria-required
            aria-invalid={Boolean(errorFor("projectType"))}
            aria-describedby={describedBy("projectType")}
            className={cn(
              fieldClass,
              "cursor-pointer appearance-none bg-[length:12px] bg-[right_4px_center] bg-no-repeat pr-8",
              "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%234a4a52' stroke-width='1.5'/%3E%3C/svg%3E\")]",
              errorFor("projectType") ? "border-danger" : "border-foreground/50",
              values.projectType ? "text-foreground" : "text-subtle"
            )}
          >
            <option value="">
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <FieldError id="projectType-error" message={errorFor("projectType")} />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Estimated budget <span className="normal-case tracking-normal text-subtle">(optional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={values.budget}
          onChange={(event) => update("budget", event.target.value)}
          aria-invalid={Boolean(errorFor("budget"))}
          aria-describedby={describedBy("budget")}
          className={cn(
            fieldClass,
            "cursor-pointer appearance-none bg-[length:12px] bg-[right_4px_center] bg-no-repeat pr-8 md:max-w-[calc(50%-1rem)]",
            "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%234a4a52' stroke-width='1.5'/%3E%3C/svg%3E\")]",
            errorFor("budget") ? "border-danger" : "border-foreground/50",
            values.budget ? "text-foreground" : "text-subtle"
          )}
        >
          <option value="">
            Prefer not to say
          </option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
        <FieldError id="budget-error" message={errorFor("budget")} />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Project description <span className="text-foreground">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          maxLength={LIMITS.description}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          aria-required
          aria-invalid={Boolean(errorFor("description"))}
          aria-describedby={["description-hint", describedBy("description")].filter(Boolean).join(" ")}
          placeholder="Tell us about your business, what you want to build or improve, and anything we should know."
          className={cn(
            fieldClass,
            "resize-y leading-relaxed",
            errorFor("description") ? "border-danger" : "border-foreground/50"
          )}
        />
        <p id="description-hint" className="mt-2 text-right text-xs tabular-nums text-subtle">
          {values.description.length} / {LIMITS.description}
        </p>
        <FieldError id="description-error" message={errorFor("description")} />
      </div>

      <fieldset aria-describedby={describedBy("contactMethod")}>
        <legend id="contactMethod" tabIndex={-1} className={cn(labelClass, "outline-none")}>
          Preferred contact method <span className="text-foreground">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {contactMethods.map((method) => {
            const checked = values.contactMethod === method.value;
            return (
              <label
                key={method.value}
                className={cn(
                  "label-caps cursor-pointer rounded-full border px-5 py-3 text-[11px] transition-colors",
                  "focus-within:outline focus-within:outline-2 focus-within:outline-offset-[3px] focus-within:outline-foreground",
                  checked
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/40 text-muted hover:border-foreground hover:text-foreground"
                )}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method.value}
                  checked={checked}
                  onChange={() => update("contactMethod", method.value)}
                  className="sr-only"
                />
                {method.label}
              </label>
            );
          })}
        </div>
        <FieldError id="contactMethod-error" message={errorFor("contactMethod")} />
      </fieldset>

      {showPhone ? (
        <div className="md:max-w-[calc(50%-1rem)]">
          <label htmlFor="phone" className={labelClass}>
            Phone number <span className="text-foreground">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-required
            aria-invalid={Boolean(errorFor("phone"))}
            aria-describedby={describedBy("phone")}
            placeholder="+91 98765 43210"
            className={cn(fieldClass, errorFor("phone") ? "border-danger" : "border-foreground/50")}
          />
          <FieldError id="phone-error" message={errorFor("phone")} />
        </div>
      ) : null}

      <div className="flex flex-col gap-5 border-t border-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="label-caps group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-foreground bg-foreground px-7 py-4 text-[11px] text-background transition-opacity disabled:cursor-wait disabled:opacity-70"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-muted transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-disabled:translate-x-[-100%] motion-reduce:transition-none"
          />
          <span className="relative z-10">{pending ? "Sending…" : "Send enquiry"}</span>
          {pending ? (
            <span
              aria-hidden
              className="relative z-10 h-3 w-3 animate-spin rounded-full border border-background border-t-transparent"
            />
          ) : (
            <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
              →
            </span>
          )}
        </button>

        <p className="text-sm leading-relaxed text-muted">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4 transition-colors hover:text-muted">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}

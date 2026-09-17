"use client";

import { useState } from "react";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { budgets, projectTypes, timelines } from "@/content/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  needs: string[];
  description: string;
  budget: string;
  timeline: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  email: "",
  company: "",
  needs: [],
  description: "",
  budget: "",
  timeline: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (form.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Please enter an email address we can reply to.";
  }
  if (form.needs.length === 0) {
    errors.needs = "Select at least one area.";
  }
  if (form.description.trim().length < 20) {
    errors.description =
      "A sentence or two about the project helps us respond properly.";
  }
  if (!form.budget) {
    errors.budget = "Choose a budget range — not sure yet is a valid answer.";
  }
  if (!form.timeline) {
    errors.timeline = "Choose a timeline.";
  }

  return errors;
}

function buildSummary(form: FormState) {
  return [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Company: ${form.company.trim() || "—"}`,
    `Needs: ${form.needs.join(", ")}`,
    `Budget: ${form.budget}`,
    `Timeline: ${form.timeline}`,
    "",
    "Project description:",
    form.description.trim(),
  ].join("\n");
}

/** Shared field chrome — a hairline that lights up on focus. */
const fieldClass =
  "w-full border-b bg-transparent py-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent md:text-lg";

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const toggleNeed = (need: string) => {
    update(
      "needs",
      form.needs.includes(need)
        ? form.needs.filter((item) => item !== need)
        : [...form.needs, need]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    // No submission backend exists yet, so the validated payload is handed to the
    // visitor's mail client. To wire this to an API later, POST `form` (or
    // `buildSummary(form)`) here and keep the same success state below.
    const subject = `Project request — ${form.name.trim()}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildSummary(form))}`;

    setSubmitted(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary(form));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const errorId = (field: keyof FormState) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail index="13" label="Contact" sublabel="Start here" />

        <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle
            size="display"
            description="Tell us what you're trying to build, improve or solve. We'll review the requirements and come back with the right next step."
          >
            TELL US WHAT YOU&apos;RE BUILDING.
          </SectionTitle>

          {submitted ? (
            <div
              role="status"
              className="border border-accent/40 bg-accent/[0.06] p-6 md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Request ready
              </p>
              <h3 className="mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
                Your project details are on their way.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                We&apos;ve opened an email addressed to{" "}
                <span className="text-white">{site.email}</span> with everything
                you entered. If your mail app didn&apos;t open, copy the summary
                below and send it across — it reaches the same place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="border border-white/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {copied ? "Copied" : "Copy summary"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setSubmitted(false);
                  }}
                  className="border border-white/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errorId("name")}
                    placeholder="Your name"
                    className={cn(
                      fieldClass,
                      errors.name ? "border-red-400" : "border-white/20"
                    )}
                  />
                  {errors.name ? (
                    <p id="name-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errorId("email")}
                    placeholder="you@company.com"
                    className={cn(
                      fieldClass,
                      errors.email ? "border-red-400" : "border-white/20"
                    )}
                  />
                  {errors.email ? (
                    <p id="email-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                >
                  Company <span className="text-white/25">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(event) => update("company", event.target.value)}
                  placeholder="Company or project name"
                  className={cn(fieldClass, "border-white/20")}
                />
              </div>

              <fieldset>
                <legend
                  id="needs"
                  tabIndex={-1}
                  className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                >
                  What do you need? <span className="text-accent">*</span>
                </legend>
                <div className="flex flex-wrap gap-2" aria-describedby={errorId("needs")}>
                  {projectTypes.map((type) => {
                    const checked = form.needs.includes(type);
                    return (
                      <label
                        key={type}
                        className={cn(
                          "cursor-pointer border px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors",
                          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-[3px] focus-within:outline-accent",
                          checked
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-white/20 text-white/55 hover:border-white/50 hover:text-white"
                        )}
                      >
                        <input
                          type="checkbox"
                          name="needs"
                          value={type}
                          checked={checked}
                          onChange={() => toggleNeed(type)}
                          className="sr-only"
                        />
                        {type}
                      </label>
                    );
                  })}
                </div>
                {errors.needs ? (
                  <p id="needs-error" role="alert" className="mt-3 text-xs text-red-400">
                    {errors.needs}
                  </p>
                ) : null}
              </fieldset>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                >
                  Project description <span className="text-accent">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={(event) => update("description", event.target.value)}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errorId("description")}
                  placeholder="Tell us about your business, what you're trying to build and what you're looking to achieve."
                  className={cn(
                    fieldClass,
                    "resize-y leading-relaxed",
                    errors.description ? "border-red-400" : "border-white/20"
                  )}
                />
                {errors.description ? (
                  <p
                    id="description-error"
                    role="alert"
                    className="mt-2 text-xs text-red-400"
                  >
                    {errors.description}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                  >
                    Budget <span className="text-accent">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={(event) => update("budget", event.target.value)}
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={errorId("budget")}
                    className={cn(
                      fieldClass,
                      "cursor-pointer appearance-none",
                      errors.budget ? "border-red-400" : "border-white/20",
                      form.budget ? "text-white" : "text-white/35"
                    )}
                  >
                    <option value="" className="bg-[#050505]">
                      Select a range
                    </option>
                    {budgets.map((budget) => (
                      <option key={budget} value={budget} className="bg-[#050505] text-white">
                        {budget}
                      </option>
                    ))}
                  </select>
                  {errors.budget ? (
                    <p id="budget-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.budget}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="timeline"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                  >
                    Timeline <span className="text-accent">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={(event) => update("timeline", event.target.value)}
                    aria-invalid={Boolean(errors.timeline)}
                    aria-describedby={errorId("timeline")}
                    className={cn(
                      fieldClass,
                      "cursor-pointer appearance-none",
                      errors.timeline ? "border-red-400" : "border-white/20",
                      form.timeline ? "text-white" : "text-white/35"
                    )}
                  >
                    <option value="" className="bg-[#050505]">
                      Select a timeline
                    </option>
                    {timelines.map((timeline) => (
                      <option
                        key={timeline}
                        value={timeline}
                        className="bg-[#050505] text-white"
                      >
                        {timeline}
                      </option>
                    ))}
                  </select>
                  {errors.timeline ? (
                    <p id="timeline-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.timeline}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden border border-accent bg-accent px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#050505]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:transition-none"
                  />
                  <span className="relative z-10">Send project request</span>
                  <span
                    aria-hidden
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </button>

                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/35">
                  Or email us directly at{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-white/70 underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

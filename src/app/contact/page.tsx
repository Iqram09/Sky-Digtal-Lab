import ContactForm from "@/components/contact/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { projectTypes } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { site, socials } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with Sky Digital Lab. Tell us what you're planning — a website, an application, a brand or an integration — and we'll reply with a clear next step.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read it properly", text: "Someone from the team reviews your enquiry — not an autoresponder." },
  { title: "We reply with questions", text: "Usually a few, to understand the business, the audience and the constraints." },
  { title: "We propose a next step", text: "A short call, a written scope, or an honest recommendation if we're not the right fit." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // A service CTA links here as /contact?type=<service>; preselect it, even without JS.
  const { type } = await searchParams;
  const requested = Array.isArray(type) ? type[0] : type;
  const initialProjectType = projectTypes.some((option) => option.value === requested) ? requested! : "";

  return (
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title="Let's build something meaningful."
        intro="Tell us what you're planning — a new website, an application, a brand or an integration. The more context you share, the more useful our reply."
      />

      <section className="w-full bg-background py-20 md:py-28">
        <div className="premium-grid w-full gap-y-16 px-6 md:px-12">
          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">Write to us</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block break-all font-display text-2xl font-semibold tracking-tight text-foreground underline-offset-[6px] transition-colors hover:text-accent hover:underline md:text-3xl"
              >
                {site.email}
              </a>

              {socials.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              <h2 className="mt-14 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">What happens next</h2>
              <ol className="mt-5 border-t border-foreground/15">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-5 border-b border-foreground/15 py-5">
                    <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-display text-lg font-semibold text-foreground">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <h2 className="sr-only">Project enquiry form</h2>
            <ContactForm initialProjectType={initialProjectType} />
          </div>
        </div>
      </section>
    </main>
  );
}

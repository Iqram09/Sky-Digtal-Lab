import type { Metadata } from "next";
import Link from "next/link";
import ActionButton from "@/components/ui/ActionButton";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

const shortcuts = [
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-ink pb-20 pt-32">
      <div className="premium-grid relative z-10 w-full px-6 md:px-12">
        <div className="col-span-12 lg:col-span-10">
          <p className="fade-rise flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            Error 404
          </p>
          <h1 className="mt-8 font-display text-[14vw] font-semibold leading-[0.9] tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
            <span className="line-mask">
              <span className="line-rise">Nothing built here.</span>
            </span>
          </h1>
          <p className="fade-rise mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl" style={{ animationDelay: "0.15s" }}>
            The page you were looking for doesn&apos;t exist or has moved. Here
            are a few places that do.
          </p>
          <div className="fade-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.25s" }}>
            <ActionButton href="/" variant="primary">
              Back to home
            </ActionButton>
            <ActionButton href="/contact" variant="ghost">
              Start a Project
            </ActionButton>
          </div>
          <nav aria-label="Popular pages" className="fade-rise mt-16" style={{ animationDelay: "0.35s" }}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {shortcuts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] select-none font-display text-[42vw] font-semibold leading-none tracking-tighter text-foreground/[0.03]"
      >
        404
      </p>
    </main>
  );
}

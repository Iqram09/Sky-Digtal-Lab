# Sky Digital Lab — studio website

The website for Sky Digital Lab, a digital studio for websites, applications and software.
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Framer Motion,
GSAP, Lenis and a small three.js scene in the home page hero.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, studio intro, selected work, services, mission, clients, team, process |
| `/about` | Who we are, mission & vision, values, how we work |
| `/services` | Nine services in detail, starting points, technology, FAQ |
| `/work` | Filterable portfolio and the brands & clients showcase |
| `/work/[slug]` | Case studies — `stans-buildtech`, `proximo`, `take-solution` |
| `/team` | Founder profiles and how the team works together |
| `/contact` | Project enquiry form (`/contact?type=<service-slug>` preselects a service) |

Unknown routes render the custom 404 in `src/app/not-found.tsx`.

## Editing content

All copy lives in typed data files — pages render from them, so most edits never touch a component.

- `src/lib/site.ts` — studio name, tagline, public email, navigation, social links (empty until real profiles exist)
- `src/content/projects.ts` — client case studies. Every statement was checked against the live sites; add business results only once a client has confirmed them.
- `src/content/services.ts`, `problems.ts`, `technologies.ts`, `faq.ts` — services page
- `src/content/team.ts` — founder profiles. Set `portrait` to an image in `/public` to replace the initials monogram.
- `src/content/studio.ts` — mission, vision, values, working principles
- `src/content/process.ts` — the six-stage process

Client imagery (logos, screenshots, official renders and product photography) lives in `public/work/<client>/`.
Logos are the clients' own artwork, trimmed of transparent margin only — don't recolour or stretch them.

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | API key from https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | No | Inbox for enquiries. Defaults to the public email in `site.ts`. |
| `CONTACT_FROM_EMAIL` | No | Sender, e.g. `Sky Digital Lab <hello@yourdomain.com>`, on a domain verified in Resend. Defaults to Resend's `onboarding@resend.dev`, which only delivers to the address the Resend account was created with. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin once a custom domain is attached. Defaults to `https://skydigitallab.vercel.app`. |

Without `RESEND_API_KEY` the form still validates, but on submit it tells the visitor it can't send right now and
offers a pre-filled email instead — nothing is silently lost.

## Contact form

`src/app/contact/actions.ts` is a Server Action that validates the enquiry (rules shared with the browser in
`src/lib/enquiry.ts`), filters bots with a honeypot field and a minimum fill time, and sends a plain-text
notification through the Resend API with the visitor's address as `reply-to`.

## Deployment

The `skylab` project on Vercel is connected to this repository: pushes to `main` deploy to production at
https://skydigitallab.vercel.app (the older skylab-nine.vercel.app address serves the same deployment), and
other branches get preview deployments. Nothing beyond the environment variables above is needed.

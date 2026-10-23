# Sky Digital Lab — studio website

The website for Sky Digital Lab, a digital studio for websites, applications and software.
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Framer Motion,
GSAP and Lenis, and designed to the Sky Digital Lab Brand Guidelines (v1.0, 2026).

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

## Brand

The look follows the brand guidelines; please keep to them when adding pages.

- **Logo** — always the supplied artwork in `public/brand/`, rendered through `src/components/brand/Logo.tsx`.
  Only charcoal ("black") or white versions; never retype, recolour, outline or stretch it. The header uses the
  horizontal logo (min. 200px wide), the footer the primary logo. Favicon, Apple icon and `icon.svg` in `src/app/`
  are made from the dark app icon.
- **Colour** — roughly 60% off-white `#F3F2F0`, 30% charcoal `#101014`, 10% accents. Mint `#BDE7D9` and lavender
  `#C9B8FF` are for soft glows and highlights only, never for the logo or body text.
- **Surfaces** — colour tokens (`background`, `foreground`, `panel`, `muted`, `subtle`) are light by default. Add
  `surface-dark` to a section to flip them to charcoal; `surface-mint` / `surface-lavender` make accent cards. The
  header reads the surface under it and switches between the black and white logo by itself.
- **Type** — Manrope only. Headings SemiBold with slightly tight tracking; labels use the `label-caps` utility
  (Medium, caps, wide spacing).
- **Brand elements** — `Star` (one at a time, never a pattern), `Glow` (large mint/lavender circles at the edges of
  a layout) and `CutLine` (the slanted cut from the wordmark, used to divide space), all in `src/components/brand/`.
- **Motion** — `CutLine animate` draws the line, glides the star up it and sends a beam of light along it every
  9s (the star flares as it passes; timings shared between `CutLine.tsx` and `globals.css`). Glows follow the
  pointer through `PointerParallax`, plain-text section titles rise word by word (`SplitText`), primary buttons
  lean toward the cursor (`useMagnetic`) and the header shows reading progress. Everything respects
  `prefers-reduced-motion`.
- The share card (`src/app/opengraph-image.tsx`) embeds the white primary logo and renders labels with
  `assets/fonts/manrope-latin-500-normal.woff`.

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

# Portfolio

A personal portfolio for an AI Product Manager / Technical PM. It is built to do three things: prove thinking (case studies, teardowns, how-tos), prove shipping (built products, architecture, video) and convert (book a call).

**Stack:** Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · Lenis · MDX (validated with Zod) · cmdk · Vercel Analytics.

> All copy, links and metrics are **placeholders** wrapped in `[BRACKETS]`, for example `[METRIC]`. Nothing here is a real claim. Search the project for `[` before you launch.

## Setup

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap, Open Graph and JSON-LD (set to your production URL). |
| `NEXT_PUBLIC_BOOKING_URL` | Embeddable booking page (Cal.com, Calendly, SavvyCal...). Opens in the modal and the inline embed. If unset, "Book a call" jumps to the contact section and the embed shows an email fallback. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address used for "Email me" and "Copy email". |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery through [Resend](https://resend.com). Without them the form returns a clear error and points people to your email. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile. The honeypot and time-trap run regardless. |

## Editing content (no component changes needed)

| What | Where |
| --- | --- |
| Name, email, social links, nav items, home sections | `config/site.ts` |
| "I'm here to…" audiences and their tailored copy | `config/audiences.ts` |
| Hero headline and statement | `content/hero.ts` |
| Proof strip (years, products, domains) | `content/proof.ts` |
| Which case studies appear in the stack | `content/work.ts` |
| "What I work on" tiles | `content/focus.ts` |
| Architecture diagrams, stack and deployment notes | `content/built.ts` |
| Experience bricks | `content/experience.ts` |
| Testimonials | `content/testimonials.ts` |
| Case studies | `content/case-studies/*.mdx` |
| Teardowns | `content/teardowns/*.mdx` |
| How-tos | `content/how-tos/*.mdx` |
| Videos | `content/videos/*.mdx` (see `docs/youtube-checklist.md`) |

### MDX content

Each `.mdx` file has frontmatter that is validated against the schemas in `lib/schemas.ts`. A typo fails the build with the file and field named.

- **Case studies** must keep these `##` sections: *Context and problem, Who it's for, Discovery and key insight, Options considered and decisions, AI approach, What I built, Outcomes, What I'd do differently*. The hero summary comes from frontmatter. Use `<ArchDiagram project="tiaago" />` (a slug from `content/built.ts`) to embed a diagram.
- **Teardowns** must keep: *What it does well, Where it breaks, Metrics I'd track, How I'd improve it*. Add a *Mock or prototype* section and `prototypeUrl` if you have one.
- **How-tos** are free-form; tags come from `howToTags` in `lib/schemas.ts`.
- `<Placeholder>…</Placeholder>` renders a dashed "placeholder" box. Delete it as you replace the text.
- Add a screenshot by saving it under `public/work/` and setting `cover` / `coverAlt` in the case study frontmatter. Without a `cover` a drawn placeholder frame is shown.
- Add a resume at `public/resume.pdf` (the footer sign links to it).

New file = new page. Slugs are the file names.

## Architecture notes

- `app/` routes: `/` (home), `/work/[slug]`, `/teardowns`, `/teardowns/[slug]`, `/writing`, `/writing/[slug]`, `/videos`, `/videos/[slug]`, plus `/api/contact`, `/api/og`, `sitemap.xml`, `video-sitemap.xml`, `rss.xml`, `robots.txt`.
- `lib/content.ts` loads and validates MDX at build time (server only). `lib/schemas.ts` holds the Zod schemas.
- Motion: every animation uses `transform` and `opacity` only. `useMotionPref()` swaps springs and parallax for simple fades under `prefers-reduced-motion`, Lenis is not started, and the custom cursor is disabled. The custom cursor only runs on `(hover: hover) and (pointer: fine)` devices.
- Booking: `BookCallProvider` + `useBookCall()`. Every "Book a call" button is a real link to the booking URL that opens the modal when JS runs.
- Videos use a click-to-load facade (no YouTube iframe until play), hover preview frames, and `VideoObject` JSON-LD. Videos whose `youtubeId` is `PLACEHOLDER` render a poster and are left out of JSON-LD and the video sitemap.

## Deploy (Vercel)

1. Import this repo in Vercel (the app is at the repo root, so no Root Directory change is needed).
2. Add the environment variables above (Production and Preview).
3. Deploy. Vercel Analytics works out of the box once enabled in the project's **Analytics** tab.
4. Set `NEXT_PUBLIC_SITE_URL` to your final domain and redeploy so canonical URLs, the sitemap and OG images are correct.
5. Submit `/sitemap.xml` and `/video-sitemap.xml` in Google Search Console.

## Pre-launch checklist

- [ ] Replace every `[PLACEHOLDER]` (search for `[`), including `config/site.ts`
- [ ] Add real screenshots, `public/avatar.svg` (or swap in a photo), `public/resume.pdf`
- [ ] Set the booking URL and email; submit the contact form once end to end
- [ ] Publish at least one video and set its real `youtubeId`
- [ ] Run Lighthouse on the production URL (mobile and desktop)

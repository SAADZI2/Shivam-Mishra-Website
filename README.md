# Dr. Shivam Mishra — Website v3

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. Same content, colours and images as the current site, with a new design system built for trust, speed and conversions.

## Run it

```bash
npm install
npm run fetch-images   # downloads the 8 clinic photos into public/images (one time)
npm run dev            # development only — compiles each page on first visit, so it feels slow
npm run build && npm start   # real speed: this is what visitors get on Vercel
```

> **Judge speed only with `npm run build && npm start` (or the Vercel deployment).** `npm run dev` compiles every page the first time you open it, adds debugging tools and disables caching — it is several times slower than production by design.

## Bookings & admin dashboard
- Every booking is saved to a private MongoDB database and emailed to the clinic.
- Staff sign in at **`/admin`** (password protected) to view, search, filter by status, update status (new → contacted → confirmed → completed / cancelled), export CSV or delete.
- Setup takes ~10 minutes: see **[ADMIN-SETUP.md](ADMIN-SETUP.md)** and `.env.example`.

Deploy on Vercel as-is. Update `site.url` in `content/site.ts` if the live domain changes (it drives SEO, sitemap and social previews).

## Editing content (no code knowledge needed)

Everything the client may want to change lives in **`content/`**:

| File | What it controls |
| --- | --- |
| `site.ts` | Phone, WhatsApp, address, hours, map, stats, main menu |
| `home.ts` | Hero highlights, About text and stats, featured conditions, home stories, gallery preview |
| `conditions.ts` | All 23 condition protocols and filter categories |
| `stories.ts` | Patient success stories (carousel) |
| `reviews.ts` | Google reviews |
| `faqs.ts` | FAQ questions and answers (also feeds Google's FAQ rich results) |
| `gallery.ts` | Gallery photos, titles, categories |
| `pillars.ts`, `panchakarma.ts`, `booking.ts`, `legal.ts` | Trust pillars, Panchakarma steps, booking options, privacy/terms/disclaimer |

Change the phone number once in `site.ts` and it updates in the header, footer, booking, contact page, mobile bar and Google structured data.

## Pages
`/` · `/about` · `/why-trust` · `/conditions` · `/panchakarma` · `/patient-stories` · `/reviews` · `/gallery` · `/faqs` · `/contact` · `/privacy` · `/terms` · custom 404

## Design system
- **Colours** (unchanged brand): forest `#0F5132`, deep forest `#0A2D1C`, leaf `#1B8A5A`, gold `#C9A227`, ivory `#FFFDF5`, mint `#E8F5E9`. A darker gold (`gold-ink`) is used for small text so it passes WCAG contrast.
- **Type**: Fraunces (soft botanical serif) for headings, Manrope for body and UI — self-hosted via `next/font`.
- **Signature**: the temple-arch (jharokha) frame on portraits and key images, drawn in gold on load.
- **Buttons** never wrap (`.btn` = one height scale, `white-space: nowrap`); long labels have shorter phone versions.
- **Motion**: one orchestrated hero entrance + gentle scroll reveals; all disabled for users who prefer reduced motion. Content is never hidden if JavaScript fails.

## What changed vs. v1
- Navigation cut from 10 cramped links to 6 grouped items with dropdowns; logo always on one line.
- Phone users get a sticky bottom bar: Call · WhatsApp · Book.
- One booking form everywhere, saved to the database with an email alert (v1 only showed a fake "submitted" message). WhatsApp is offered as a fallback. Clicking "Book consult" on a condition preselects that condition.
- Footer links go to real pages (v1 used `#anchors` that broke on most pages). Privacy and Terms are proper pages.
- FAQ accordion uses native `<details>` (works without JS); modals use native `<dialog>` (focus trap + Esc).
- SEO: per-page titles/descriptions/canonicals, `sitemap.xml`, `robots.txt`, Physician + MedicalClinic + FAQ structured data, Open Graph.

## Speed
- Most sections are server components; only interactive parts ship JavaScript. No icon library, no animation library, no UI kit.
- Fonts self-hosted (no render-blocking Google Fonts request). Images via `next/image` (AVIF/WebP, responsive `sizes`, lazy below the fold, 1-year cache). Hero image loads with high priority.
- Google Map iframe is lazy-loaded.

## Security
- Strict headers on every route (`next.config.ts`): Content-Security-Policy, HSTS (preload-ready), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP. `X-Powered-By` removed.
- No third-party scripts. Bookings are validated on the server, rate-limited, protected by a bot honeypot and stored with typed MongoDB queries. Admin uses a signed httpOnly session cookie with login lockout. Details in ADMIN-SETUP.md.
- External links use `rel="noopener noreferrer"`; form fields have length limits and phone validation.

## v3 fixes
- Pages now always open at the top after navigation (smooth-scroll on `<html>` was fighting Next.js scroll restoration).
- Sharp images: correct `sizes` and higher quality for portraits; no low-resolution photo is stretched full-width any more.
- Scroll reveals are pure CSS (no JavaScript, nothing hidden while the page loads); entrance animations are shorter.
- Real booking backend + `/admin` dashboard.

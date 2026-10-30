# TODO Growth: Hospitality Growth landing page

A static, dependency-free landing page with no build step. The current creative direction is **v3, "The View"**: see [docs/HOSPITALITY_CREATIVE_DIRECTION.md](docs/HOSPITALITY_CREATIVE_DIRECTION.md). The earlier Sunpath and Arrivals directions were abandoned; their audits remain in `docs/` for history.

- **Locally:** <http://localhost/hospitality%20growth/>
- **Live (intended):** `https://hospitality.todo.rw/`, with the page served at the root. `/hospitality-growth` 301-redirects to `/` via `vercel.json`.

```
index.html                 the page (all copy is in the HTML)
vercel.json, robots.txt, sitemap.xml
assets/css/site.css        design system "The View": limestone, forest ink, terracotta; Bodoni Moda + Manrope; the arch
assets/js/config.js        ← contact details, form delivery, client stories with permissions
assets/js/nav.js           chapter navigation, reading progress, full-screen mobile menu (focus-trapped, Escape closes)
assets/js/hero.js          photography motion: hero opening (arch aperture → full bleed), scroll drift, closing reveal
assets/js/who.js           Who it’s for: one photographic stage, five kinds of business (aria-pressed buttons)
assets/media/stock/        licensed stock photographs (WebP) — see docs/ASSET_CREDITS.md
assets/js/leak.js          Missed arrivals: canvas guest-flow illustration + "Close the gaps" toggle
assets/js/journey.js       guest journey rail: marks the stage in view
assets/js/services.js      What we do: disclosure index + self-drawing line illustration in the sticky arch
assets/js/lead-form.js     validation, drafts, duplicate guard, honest states
assets/js/submit.js        EmailJS REST adapter (the only backend touchpoint)
assets/js/main.js          mounts everything: contacts, client stories, reveals, mobile dock, review bar
```

## Page flow

| # | Section | Signature |
|---|---|---|
| — | Navigation | Transparent over the hero, then a slim limestone bar with a terracotta reading-progress line. Numbered chapter links; the current one is underlined. Below 1100px, a full-screen menu with large serif chapter links. |
| — | Hero | Full-bleed photograph (Muhavura volcano, stock, credited) that opens from an arch-shaped aperture while the camera settles; four-line headline rises; value line + CTA; a journey strip (Discover · Explore · Enquire · Book) along the base. |
| 01 | Missed arrivals | A canvas illustration: dots (guests) flow through five gates and some drift away; few reach the arch, "your room". The toggle shows the same interest with the gaps closed. No numbers. Runs only while visible; a still frame with reduced motion. |
| 02 | Guest journey | A sticky rail (desktop) with six stages; the stage in view is highlighted. |
| 03 | What we do | An editorial index of six services under Attract · Convert · Serve (disclosure buttons). A sticky arch draws a line illustration of the open service. |
| 04 | Work | Client stories render from config. Production shows a "Reserved" arch until a story is approved. |
| — | Interlude | Full-bleed Lake Kivu photograph (stock, credited) with one line: guests fall for a place long before they arrive. |
| 05 | Who it's for | Five kinds of business beside one large photographic stage; choosing one wipes in its photo and copy. On phones each is its own photo-and-text scene. “This is us” pre-selects the form. |
| 06 | How we work | Four steps. |
| 07 | Enquiry | The form on a limestone panel, with WhatsApp alongside. |
| — | Closing + footer | Full-bleed Virunga photograph opening from the arch; “Your next guest is already looking.” rises; CTA. Then a dark footer: positioning, chapters, contact (only once confirmed), photo credits, back to top. |

## Review mode

| URL | What you see |
|---|---|
| `localhost` (default) or `?review=1` | A review bar with open items. Pending Stay Stories (Grotta Resort, Eagleview Farm) are shown, badged "Review only · pending client approval". Form errors show technical detail. |
| any other host or `?review=0` | Production. Only approved stories appear; with none approved, an honest "client stories are on their way" panel shows. No client names appear in the page. |

## Launch gates (all in `assets/js/config.js`, no markup changes)

| Gate | Status 30 Oct 2026 | To clear |
|---|---|---|
| **EmailJS delivery** | **Blocked.** Service `service_tyheci5` answers `412 Outlook: Invalid grant` (per the Marketing page's live test). The form shows an honest "not sent" state, keeps the visitor's details and offers pre-filled WhatsApp and email. | Reconnect the Outlook account in the EmailJS dashboard (Email Services → `service_tyheci5`). Confirm the template's "To Email" is `Richie@todo.rw` or `{{to_email}}`. Submit one real test from the live page and confirm it arrives. |
| **Hospitality contact** | Confirmed 30 Oct 2026: richie@todo.rw and WhatsApp 0799 537 999 (wa.me/250799537999). Shown in the footer. | Done |
| **Client stories** | Grotta Resort approved (story and photography) and shown publicly; sources in docs/ASSET_CREDITS.md. Eagleview Farm is still review-only. | Eagleview: written consent |
| Privacy notice | privacy.html, linked from the form and footer; written from the actual implementation | Confirm the open items in docs/PRIVACY_OPEN_ITEMS.md |
| Tracking | None loaded (no Pixel, no cookies) | Decide whether to add Meta Pixel / consent. The enquiry email already includes the page URL (with UTMs) and the referrer. |

## Lead form

The fields are name, business, phone/WhatsApp (required, normalised to `+250…`), email (optional, per sales policy), business type, help needed (≥1), a short description, and a honeypot.

- **Success** is shown only on HTTP 200 from EmailJS.
- **Errors** keep the input and offer WhatsApp and email routes, pre-filled with the whole enquiry.
- **Duplicates:** only one submission runs at a time, and an identical enquiry that was already accepted is not resent within the session.
- **Drafts** are kept in `sessionStorage`.

The EmailJS public key in config is public by design; there are no private credentials in the code.

The payload uses the todo.rw contact template's fields (`name`, `reply_to`, `company`, `message`). It also sends `to_email`, `phone`, `service`, `business_type`, `needs`, `brief`, `page_url`, `referrer`, `utm_*` and `fbclid` for a dedicated template.

## Hosting and DNS (not done; outside this project)

1. Create a hosting project (Vercel, matching the Marketing page) from this folder, with the root as the output directory and no build command.
2. Add the domain `hospitality.todo.rw` to that project.
3. At the DNS provider for `todo.rw` (Cloudflare, per the discovery audit), add `CNAME hospitality → cname.vercel-dns.com` (or the target the host specifies). If Cloudflare proxying causes certificate issues during verification, set it to DNS-only.
4. Check `https://hospitality.todo.rw/` serves the page at the root, and that `/hospitality-growth` redirects to `/`.
5. Optional: add a link from todo.rw. The main site was not changed.

The folder is not a Git repository yet. Nothing has been committed, pushed or deployed.

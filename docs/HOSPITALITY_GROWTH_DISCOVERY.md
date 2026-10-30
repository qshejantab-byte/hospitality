# TODO Growth: Hospitality Growth landing page
## Phase 1: Discovery, content audit and creative direction

Prepared 30 October 2026. Discovery and planning only. No website code was written or changed.

Evidence labels used throughout:
- **[Verified]** seen in a file, a live site or a live bundle during this audit.
- **[Self-reported]** stated by TODO Growth about its own work (for example on the live todo.rw portfolio). True to our records, but not client-confirmed.
- **[Unconfirmed]** plausible but no evidence found. It must be confirmed before publication.
- **[Recommendation]** a proposal for approval.

---

## 0. Summary

1. **The project folder is empty and not a Git repository** [Verified]. Nothing will be overwritten. The two completed pages live in sibling folders with their own repos, and neither will be touched.
2. **The technical foundation can be reused; the look cannot.** Both completed pages are static, dependency-free HTML/CSS/vanilla JS with a single `config.js`, an EmailJS submit adapter, honest form states and a review mode. Hospitality Growth should copy that *architecture* and none of the visual system.
3. **Lead delivery is currently broken** [Verified, Marketing README, 30 Oct 2026]. EmailJS service `service_tyheci5` returns `412 Outlook: Invalid grant`. This blocks launch for every page until someone reconnects it.
4. **Proof is real but thin and unapproved.** TODO's own live portfolio lists Grotta Resort (website, photo/video, marketing and SEO, 360° tour, sales support) and Eagleview Farm (website, photo/video, marketing and SEO, sales support). Five Grotta room tours are live on Kuula. **No client permission for advertising use, no testimonials and no verified results were found for either client.**
5. **The most distinctive hospitality asset, the Grotta WhatsApp digital concierge, is unproven.** A privacy policy and terms exist for an AI concierge on WhatsApp (Microsoft Copilot Studio + Meta). TODO's role in it, and whether it is live, are not documented. The live portfolio lists Microsoft integrations for Grotta as *upcoming*.
6. **Recommended creative direction: "Sunpath".** The page is told as one day in the life of a property and its guests. Dawn is *Discovery* and the next dawn is *Return*. A sun arc is the navigation, the light temperature of the page changes as the visitor moves through the journey, and each stage shows what the guest feels and what the operator gains. It does not use the Marketing page's noise-to-colour story or the Virtual Tours page's plan-and-aperture drawing language.
7. **URL conflict to resolve.** The brief says `https://todo.rw/hospitality-growth/`, but Marketing deploys to `marketing.todo.rw` (root) and Virtual Tours also redirects its path to root. The owner must choose subdomain or path before the build.

---

## 1. Project structure and technical findings

### 1.1 Local environment

| Location | What it is | Relevance |
|---|---|---|
| `htdocs/hospitality growth/` | **Empty. Not a Git repo.** Note the space in the folder name (served as `/hospitality%20growth/` on XAMPP). | Target folder. Run `git init` before the build (owner's call). |
| `htdocs/marketing landing page/` | Marketing & Social Media page. Git, 3 commits, clean tree. Static. `index.html`, `assets/{css/marketing.css, js/config.js, main.js, lead-form.js, submit.js}`, `vercel.json` (301 `/marketing` → `/`), `robots.txt`, `sitemap.xml`. Live at `marketing.todo.rw`. | Reuse the form/submit/config pattern. **Do not reuse the visuals.** |
| `htdocs/virtualtourlandingpage/` | Virtual Tours, five pages. Git, clean tree. Static. `site.css` ("Plan & Aperture"), `config.js` with `tours[]` and permission flags, `tour-theatre.js` (tap-to-load Kuula), `attribution.js` (UTM/fbclid first touch), `tracking.js` (Pixel adapter, inactive until ID + consent), `lead-form.js`, `submit.js`. WebP posters of the five Grotta rooms in `assets/img/portfolio/`. | Reuse `attribution.js`, `tracking.js` and the tour-theatre *behaviour*. |
| `htdocs/todo/` | React/Vite (Lovable) version of todo.rw. **Not the live site's source** (per the VT audit). | No reuse. The logo master is `src/assets/LOGO.png` (1024 px). |
| `htdocs/grotta/` | Grotta Resort static site. Remote `qshejantab-byte/grotta`. **13 uncommitted changes.** ~60 `AV7I*.jpg` professional photos. | Proof source only. Do not modify. |
| `htdocs/grottachristmas/` | Grotta Christmas Village site. **257 uncommitted changes.** | Proof source (seasonal event web work). Do not modify. |
| `htdocs/grottawifi/` | Grotta guest Wi-Fi captive-portal **prototype**. README: "does not authenticate anyone". | Illustrates guest-experience thinking. Not deployable proof. |
| `htdocs/grottamenuQR/` | Grotta QR menu (static). | Possible "on-property digital touchpoint" proof. Deployment status unknown. |
| `htdocs/ai conciege/` | Privacy policy and terms page for the **Grotta Resort Digital Concierge** (WhatsApp AI). | Evidence that a concierge service was specified. See §4. |
| `Downloads/` | Blueprint PDF (source of truth), `TODO_Growth_Services_Website_Page.pdf`, the concierge policy PDF, `Grotta_Resort_Knowledge_Base_Blueprint 1.pdf` (image-only, could not be text-extracted), Grotta menus/rates/catalogue, SVF agreement. | Content sources. |

### 1.2 Reusable functionality (the "engine", not the "skin")

| Module | Source | Reuse | Notes |
|---|---|---|---|
| `config.js` single source of truth + `REVIEW_MODE` (localhost or `?review=1`) | Both pages | **Yes** | Add `page.id = "hospitality-growth"`, `proof[]`, `caseStudies[]`, `audiences[]`, each with a `permission` field. |
| `submit.js` EmailJS REST adapter (`accepted` / `not_connected` / `error`) | Marketing | **Yes, copied unchanged** | Same service `service_tyheci5`, template `template_0n9539s`, public key in config. **Blocked by the 412 error.** |
| `lead-form.js` validation, `+250` normalisation, honeypot, honest error with email/WhatsApp fallback | Marketing | **Yes, adapted** | New fields (§12). |
| `attribution.js` first-touch UTM/fbclid in `sessionStorage`, with link fallback | Virtual Tours | **Yes** | Marketing only reads the page URL; VT's is the better version. |
| `tracking.js` Pixel adapter, off until ID + consent | Virtual Tours | **Yes, inactive** | Marketing excluded tracking "by decision". Keep it off until the owner decides. |
| Tour theatre (poster first, tap-to-load iframe, 15 s timeout, fallback, ARIA) | Virtual Tours / grottachristmas | **Behaviour only** | A *new* visual wrapper is required (no crop marks, no aperture iris). |
| Sticky mobile dock with WhatsApp | Both | **Behaviour only** | New visual form (§11). |

### 1.3 Contact and integration facts

- WhatsApp **+250 799 537 999** [Verified, confirmed by the business 30 Oct 2026 per the Marketing README]. The older local repos use +250 794 003 368. Do not use that number.
- Lead recipient **Richie@todo.rw** [Verified in config].
- No Pixel, consent or privacy page exists on todo.rw [Verified in the VT audit]. The page needs a privacy link to *something* real before paid traffic.
- Brand: TODO logo WebP 192 px already in both projects. Both pages use a yellow action colour (#ffc83d / #e8c547), the only element shared across the family. Hospitality Growth may keep a yellow CTA for family recognition. Everything else changes.

### 1.4 Deployment and routing

- Marketing: Vercel-style `vercel.json`, canonical `https://marketing.todo.rw/`, plus an XAMPP-safe redirect stub.
- Virtual Tours: `vercel.json` redirects `/virtual-tours/*` → `/*` (also root-of-domain).
- **Decision needed:** `todo.rw/hospitality-growth/` (as briefed) cannot be served from a separate project unless the live todo.rw (React SPA on Render behind Cloudflare, source not available locally) proxies or rewrites the path. The consistent option is `hospitality.todo.rw/` with a `/hospitality-growth` → `/` redirect. [Recommendation] Build with relative paths so either works.

---

## 2. Hospitality offer and content analysis

### 2.1 What the blueprint fixes (non-negotiable)

- **Promise / H1:** "We Help Hospitality Businesses Attract, Convert and Serve More Guests."
- **Journey to illustrate:** Discovery → Explore → Enquire → Book → Experience → Return.
- **Must connect:** marketing, websites, virtual tours, WhatsApp, AI concierge and operations.
- **Offer areas:** hospitality marketing, content, virtual tours, websites, Meta advertising, WhatsApp journeys, AI concierge, automation and digital transformation.
- **Solution process line:** Attract → Convert → Serve → Retain.
- **Proof:** approved Grotta Resort and Eagleview Farm work, "with clear permissions and only verified facts/results".
- **CTA:** "Grow My Hospitality Business." The hero also needs one secondary, proof-oriented CTA.
- **Ad hook:** "A great property still needs a complete guest-acquisition journey." Proof format: "hospitality case study / journey story". The page must deliver on this hook in the first two screens.
- **Retargeting:** "show the connected guest journey and a credible hospitality proof point".

### 2.2 How the two process vocabularies fit

The guest journey (six stages, the *guest's* view) and the TODO process (four verbs, the *operator's* view) are the same story told from two sides. The page should pair them openly:

| TODO verb | Guest stage | What the guest does | What breaks today | TODO capability (business language) |
|---|---|---|---|---|
| **Attract** | Discovery | Scrolls, searches, asks friends, checks Maps | Invisible or forgettable online, or photos that undersell the place | Hospitality marketing, Meta advertising, photography and video, search and Google Business visibility |
| **Attract → Convert** | Explore | Studies rooms, views and food, compares | Photos don't answer "what is it really like?", and the website is slow or unclear | Website design, 360° virtual tours, content that shows the real experience |
| **Convert** | Enquire | Sends a WhatsApp, an email or a DM | Slow replies, the same questions answered by hand, enquiries lost across phones | WhatsApp customer journeys, AI concierge with human handover |
| **Convert** | Book | Chooses dates, pays, gets confirmation | Friction, unclear next steps, an enquiry that never becomes a reservation | Booking and enquiry integrations on the website, clear WhatsApp-to-booking routes |
| **Serve** | Experience | Arrives, connects, eats, explores | Information scattered, staff repeating answers, a disconnected on-site experience | On-property digital touchpoints (menus, guest information, concierge), staff knowledge systems |
| **Retain** | Return | Remembers, reviews, recommends, comes back | No follow-up, no reason to return, reviews left to chance | Follow-up content and campaigns, review and return journeys, automation |

### 2.3 Capabilities: what can be claimed, and how

| Capability | Status | Source |
|---|---|---|
| Hospitality marketing, social media, Meta advertising | Offered [Verified] | Blueprint, services copy, live portfolio |
| Photography, cinematic video, drone | Offered [Verified] | Services copy |
| Website design and development, booking/enquiry integrations | Offered [Verified] | Services copy, live portfolio |
| 360° virtual tours, Google Street View tours | Offered [Verified] | Services copy, Grotta tours live |
| WhatsApp customer journeys | In the blueprint offer list [Verified]. **No delivered example verified.** | Blueprint |
| AI concierge / customer-service agents | Offered [Verified] ("Sales and customer service agents", "Knowledge bases"). Grotta concierge **specified**, delivery and TODO's role **[Unconfirmed]**. | Services copy, concierge policy |
| Automation, Microsoft Copilot / M365, staff training agents | Offered [Verified] | Services copy, blueprint |
| Sales and commercialisation (offer packaging, pricing support, experience design) | Offered [Verified]. Delivered to Grotta and Eagleview [Self-reported]. | Services copy, live portfolio |
| "Hospitality Transformation Package" (strategy, website redesign, tour, content, AI knowledge base, staff training) | Defined, **custom quote** | Services copy |

**Prices.** The services copy lists "starting from" prices ($250 tour, $500 website, $750/$1,500 packages) and says they "should be validated internally before publication". [Recommendation] Publish no prices. Use "Scoped to your property" until the owner approves.

**Language rule.** Lead with the guest and the business outcome ("guests get an answer at 11 pm", "fewer enquiries lost between phones"). Name the technology second, small, as a label. Never promise more bookings or revenue as a guarantee. The services copy says "measurable results"; on this page we can only promise to *measure*, not a result.

---

## 3. Target audience and customer problems

The blueprint and services copy name hotels, resorts, lodges and guest houses. The brief adds restaurants and venues. Tour operators and experiences are adjacent (services copy: "Tourism"). Their needs are different, so the page should show them as distinct cases, not one list.

| Audience | Typical situation (Rwanda / region) | Main friction | Where TODO starts | Lead offer |
|---|---|---|---|---|
| **Destination resorts and eco-lodges** (Musanze, Nyungwe, Akagera, Kivu) | International and diaspora guests, often via tour operators. High rate, long decision. | Guests decide from afar, so they need to *see* and *trust*. Enquiries come in by WhatsApp and email across time zones. Rates differ for operators and direct guests. | Content + website + virtual tour, then WhatsApp/concierge for after-hours enquiries | Integrated growth plan |
| **City and business hotels** (Kigali) | Corporate, MICE, conference guests, OTA-dependent | Competing on visibility, OTA commission, quick-response expectations, events sales | Search/Google visibility, direct-booking website, WhatsApp enquiry routes, venue tours | Direct-booking + enquiry journey |
| **Boutique hotels, guest houses and farm stays** (Eagleview-type) | Small team, the owner does marketing, a story-led product | No time, inconsistent content, a weak website, the owner answering every message | Story-led content + website + simple WhatsApp journey | Starter scope |
| **Restaurants, cafés and venues** | Local and expat diners, events, weddings | Menus and atmosphere invisible online, reservations by phone, events enquiries lost | Content + Maps + digital menu + reservation/enquiry route | Content + enquiry route |
| **Event and wedding venues within resorts** | High value, high-touch enquiries | Long questions, site visits needed | Virtual tour + enquiry qualification + follow-up | Venue journey |
| **Tour operators and experiences** (secondary) | Package sellers | Showing the experience before purchase | Content + landing pages + WhatsApp | Refer to Marketing page if marketing-only |

**Problems in the visitor's own words** (draft copy for the problem section; to be validated with sales):
- "Guests love us once they arrive. Getting them to choose us is the hard part."
- "Our photos don't show what it actually feels like to stay here."
- "Half our enquiries come in on WhatsApp at night, and by morning they've booked somewhere else."
- "We answer the same ten questions every day."
- "Our website looks fine, but nobody books through it."
- "Guests leave happy, and we never hear from them again."

---

## 4. Available project proof and asset audit

### 4.1 Grotta Resort, Musanze

| Item | What it involved | TODO contribution | Evidence | Public-use approval | Results verifiable? |
|---|---|---|---|---|---|
| Website `grottaresort.rw` | Multi-page resort site: stay, dining, caves, experiences, weddings, retreats, booking bar | "Website design & development" [Self-reported, live portfolio]. Local repo `qshejantab-byte/grotta` [Verified]. | Live site, screenshots on todo.rw (`grotta-desktop-*.webp`, `grotta-mobile`) labelled "real" | **None found.** It is on TODO's own portfolio, but there is no written client consent for advertising. | No metrics found |
| 360° room tours (5 Kuula collections) | Standard, King Volcano View, King Pool View, Deluxe, Executive | "360° virtual tour" [Self-reported]. Embedded on the client's site [Verified]. | Kuula URLs return 200 [Verified in VT audit]. WebP posters already in the VT project. | VT config marks them `permission: "portfolio"`. Ad use is **[Unconfirmed]**. Kuula account ownership unknown. | No |
| Photography and video | ~60 `AV7I*.jpg` professional photos | "Photography & video for social media" [Self-reported]. Authorship of this specific shoot **[Unconfirmed]**. | Local files | **None found** | n/a |
| Digital marketing and SEO | Social and search work | [Self-reported] | `Grotta_Resort_SEO_Strategy_and_Outreach_Plan.docx` in Downloads | **None found** | No metrics found |
| Sales and commercialisation | Rates, packages, curated experiences | [Self-reported] | Rate sheets, tour-operator rates, curated-experiences PDF in Downloads | **Internal. Do not publish figures.** | No |
| **WhatsApp digital concierge** | AI-assisted WhatsApp concierge for stays, rates, availability, dining, reservations, with human handoff. Meta WhatsApp Business Platform + Microsoft (Copilot Studio, Teams). | **[Unconfirmed].** The policy names Grotta as operator. TODO's role is not stated. The live portfolio lists "Microsoft systems integrations" as *upcoming*. | `ai conciege/index.html`, policy PDF, knowledge-base blueprint PDF (image-only) | **None** | Not live-verified |
| Christmas Village 2026 web pages | Seasonal event site | Local repo `grotta-christmas` [Verified] | Repo, master plan PDFs | **None** | n/a |
| QR menu | Digital menu | Local build [Verified] | `grottamenuQR/` | **None.** Deployment unknown. | n/a |
| Guest Wi-Fi portal | Branded captive portal | **Prototype only** [Verified] | `grottawifi/` README | Not deployable proof | n/a |

**The Grotta story is the strongest single proof in the TODO portfolio for this page.** It already touches every stage: Discovery (marketing, SEO, content), Explore (website, tours), Enquire/Book (booking bar, concierge if confirmed), Experience (menu, Wi-Fi, concierge), Return (content). But it can only be told once Grotta approves it.

### 4.2 Eagleview Farm, Bugesera

| Item | TODO contribution | Evidence | Approval | Notes |
|---|---|---|---|---|
| Website `eagleviewfarm.rw` ("Lakeside Retreat in Rwanda") | "Website design & development" [Self-reported]. The todo.rw alt text says "designed and developed by TODO Growth". | Live site [Verified]. Screenshots on todo.rw. | **None found** | Booking goes to a third-party engine (`bookings.net`) [Verified]. **Do not claim the booking system.** We can say the website links guests to booking. |
| Photography and video, marketing and SEO, sales support | [Self-reported] | Live portfolio | **None found** | |
| Virtual tour | **None.** Not delivered [Verified, VT audit]. | | | Do not show Eagleview in any tour context. |

### 4.3 Other

- **Sustainable Villages Foundation:** not hospitality. Its agreement permits portfolio use. Not relevant here except as evidence that TODO uses portfolio clauses.
- **Front-end-forge:** contains AI-generated third-party images. **Never use.**
- **Testimonials, logos with permission, verified metrics:** none found anywhere.

### 4.4 Illustrative versus real (presentation rule)

Everything built to *explain* (the sun-arc journey, conversation demos, guest-moment scenes) must carry a visible small label such as **"Illustration"** or **"Example conversation"**. Real client work gets its own label: **"Client work · Grotta Resort"**, plus a "Delivered by TODO Growth" line listing only the delivered items above. The two must never share a frame without labels.

### 4.5 Showcase structure that works with zero approvals

The proof system should be built like the Marketing `CONFIG.work` / `caseStudy` pattern, with three states:
1. **Production, nothing approved:** the "Stay Stories" section (§9) shows the *journey map* with an "In the field" placeholder card per stage: "Client stories are shared on request, as we only publish work our clients have approved." The secondary CTA becomes "See how the journey works".
2. **Partial approval** (for example Grotta website and tours only): only the approved stages light up with real work.
3. **Full case study:** client, challenge, solution, deliverables, visuals and *verified* results with source and date range.

---

## 5. Missing content and approvals

| # | Item | Owner | Blocks |
|---|---|---|---|
| 1 | **Written Grotta Resort consent** to name them and show the website, tours, photos and concierge in a *paid-ad* landing page | Owner → Grotta | Case study, hero proof |
| 2 | Written Eagleview Farm consent (same scope) | Owner → Eagleview | Second case study |
| 3 | TODO's actual role in the Grotta digital concierge: built, live, channel number, date. A screen recording if it is live. | Owner / AI lead | The "Enquire" and "Experience" proof, the strongest differentiator |
| 4 | Who shot the `AV7I*` photography, and usage rights | Owner | Any Grotta photo use |
| 5 | Kuula account ownership of the Grotta tours | Owner | Tour embed |
| 6 | Any verified results (enquiry volume, direct-booking share, response time, follow-up) with source and date range | Owner + clients | Results row (optional; the page works without it) |
| 7 | A client quote (named, approved) | Owner | Trust section |
| 8 | **EmailJS Outlook reconnect** (412 error) + one inbox test | Owner | Launch |
| 9 | URL decision: `todo.rw/hospitality-growth/` vs `hospitality.todo.rw` | Owner | Deployment |
| 10 | Pricing stance (publish none? "custom quote"?) | Commercial lead | Included section |
| 11 | Confirm that "WhatsApp customer journeys" have been delivered for anyone, or present them as a service without a case | Owner | Copy wording |
| 12 | Privacy notice URL that the form can link to | Owner | Launch |
| 13 | Pixel/consent decision (Marketing excluded it; VT has an inactive adapter) | Marketing lead | Tracking |
| 14 | Approved short hospitality video or reel (optional, high value for the hero on mobile) | Creative | Hero enhancement |

---

## 6. Creative directions (three genuinely different options)

Guardrails for every option. The page must not use:
- **Marketing:** grey "fog" posts turning to colour, a phone feed, a noise/scope line, door-split reveals, the "tune" motion verb, Bricolage/Schibsted type, the navy/sun palette.
- **Virtual Tours:** plaster paper with ink drawing, Space Grotesk/Mono annotation, rules and dimension lines, crop-marked apertures, an iris-open hero, a 3D demo room, a floor-plan menu, the "drawn/opened/walked" motion verbs.

### Direction A: "Sunpath" (a day in the life of a property)

**Idea.** Hospitality runs on a daily rhythm: the first light when someone discovers you on their phone, golden hour when they book, lantern-lit evening when they're finally there, and the next morning when they leave and decide whether to come back. The page *is* that day. A sun travels along an arc across the top of the hero and down the page. The six journey stages sit on the arc like hours on a sundial. As the visitor scrolls, the page's **light temperature** changes: cool dawn blue-grey, warm morning cream, gold at booking, deep terracotta dusk, indigo night with lantern points, then pale dawn again at Return. This is a change of *colour temperature*, always in full colour, which is the opposite of Marketing's desaturated-to-colour device.

**Look.**
- Palette: Dawn `#DCE3E8`, Limestone cream `#F5EFE4`, Volcanic basalt `#1E1B18` (text), Lake `#2F5D6B`, Terracotta `#B5532F`, Dusk plum `#3A2436`, Night `#141826`, Lantern `#F4B53F` (the action colour, a warmer cousin of the family yellow).
- Type: a warm high-contrast serif for display, **Fraunces** (soft optical size, italics for the guest's voice), and a humanist sans for body, **Hanken Grotesk**. Small caps for stage labels ("06:12 · DISCOVERY"). Neither face is used by Marketing, Virtual Tours or Grotta.
- Texture: soft light gradients and long cast shadows (window-light patterns, as when sun falls through shutters), never grain or drawn lines.
- Signature object: **the sun arc**, a thin gold semicircle with six hour marks.

**Strength.** The six-stage journey is the *structure* of the page, not a diagram in it. Emotionally hospitable (light, warmth, time). Commercially clear: every hour pairs "the guest feels" with "you gain". Works with no proof and gets better with it.

**Risk.** Gradient backgrounds can look like a weather app if overdone. Mitigation: light changes in large, calm sections, with typography doing the work.

### Direction B: "The Guest Folio" (the hotel's stationery, opened)

**Idea.** Every good property has a folio: the leather-bound guest compendium, the key card sleeve, the folded note on the pillow. The page is a premium guest folio for the *operator*. The hero is a closed folio on a dark linen surface with the H1 debossed on the cover. Scrolling opens it, and each spread is a stage of the journey: a "postcard" for Discovery, a "room key sleeve" for Book, a "pillow note" for Experience, a "return postcard" for Return. WhatsApp and concierge appear as handwritten-feeling notes.

**Look.** Deep forest-green linen `#1F3A33`, ivory card `#F8F3E8`, brass foil `#B8925A`, oxblood `#6E2A2A`. Display in **Instrument Serif** (or Gloock) with **Inter Tight** for body. Not Cormorant/Jost, which Grotta already uses. Paper-object compositions with gentle 3D tilt and shadow.

**Strength.** Instantly "hospitality", very premium, highly tactile, and a natural home for real case studies (each client becomes a folio insert).

**Risk.** It can drift into skeuomorphism and slow mobile pages. It's also a paper/stationery metaphor, which sits closer to VT's "paper drawing" world than A does. Weaker at expressing *systems* (automation, operations).

### Direction C: "Open Line" (the property that never stops answering)

**Idea.** Hospitality is a conversation that starts with "Hi, do you have rooms on the 14th?" and ends with "Thank you, we'll be back". The page is told as one continuous conversation between a guest and a property, with TODO's systems working in the margin. The hero is a large typographic exchange: the guest's message types in on the left, the property's answer arrives on the right, and the margin annotates what made it possible ("Answered at 23:41 · concierge · handed to reservations at 08:00").

**Look.** Warm white `#FBF8F3`, charcoal `#22201E`, a single green for "answered" `#1E7A5A`, lantern yellow CTA. Large editorial type, **Newsreader** + **Geist**. A chat-like layout but deliberately *not* a phone mock-up.

**Strength.** Shows the value of WhatsApp, concierge and automation in seconds. Very conversion-oriented, with the WhatsApp CTA as a natural climax.

**Risk.** It overlaps heavily with the coming **AI & Automation** page (its blueprint flow is literally "customer question → answer → lead → human escalation"). Its proof leans on the concierge, which is the least verified asset. It underplays marketing, content and the physical experience.

### Comparison

| | A Sunpath | B Guest Folio | C Open Line |
|---|---|---|---|
| Shows the six-stage journey | Is the structure | Spreads | Conversation turns |
| Distance from Marketing / VT | High / High | High / Medium | High / High |
| Distance from the future AI page | High | High | **Low** |
| Works with no approved proof | Yes | Partly | Weak |
| Mobile performance | Good (CSS gradients, SVG) | Medium (paper 3D) | Very good |
| Emotional "hospitality" | Very high | Very high | Medium |
| Shows integrated systems | High | Low | Medium |

---

## 7. Recommended direction: A, "Sunpath"

1. **It makes the blueprint's journey the experience itself.** Visitors don't read about six stages. They move through a day and see each stage happen.
2. **It is the furthest from both siblings and from the AI page.** Marketing is about *signal versus noise*, VT about *space and drawing*, AI (likely) about *conversation and flow*. Sunpath is about *time and light*: a new axis.
3. **It sells integration without jargon.** The single arc shows that marketing at dawn and the concierge at night are one system, the core claim of Hospitality Growth.
4. **It degrades honestly.** With no proof, it is still a complete, persuasive journey (labelled illustration). As approvals arrive, real work slots into the hour it belongs to.
5. **It is cheap to run.** Light changes are CSS custom-property transitions. The arc is one SVG. No canvas, WebGL or video is required.

Borrowed from B: a tactile **"Stay Story"** card format for real case studies. Borrowed from C: one short **example conversation** at the Enquire hour (labelled "Example conversation") that does not compete with the AI page.

**Motion verb:** *rise*. Things rise and settle like the sun and like guests arriving: the sun climbs, light warms, cards rise into place, the lantern lights. No snap, glitch, wipe or drawing strokes.

---

## 8. Proposed hero experience

**First screen (desktop 1440×900).**
- **Background:** a calm dawn gradient (blue-grey to cream), with a faint window-shutter light pattern falling diagonally across the right half.
- **Top:** a slim header with the TODO logo, "Hospitality Growth" in small caps, a WhatsApp icon and a "Grow My Hospitality Business" button.
- **Centre-left:** the H1 in Fraunces, ~5.5 rem, three lines, with *Attract*, *Convert* and *Serve* each in italic:
  > We Help Hospitality Businesses *Attract*, *Convert* and *Serve* More Guests.
- **Subhead** (Hanken, 1.25 rem, max 52 ch):
  > From the first scroll to the second stay: marketing, content, websites, virtual tours, WhatsApp and smart guest service, built as one journey.
- **CTAs:** primary **Grow My Hospitality Business** (lantern yellow, basalt text); secondary, proof-oriented, **Follow a guest's journey ↓** (text link with a small sun glyph). When a case study is approved this becomes **See the Grotta Resort story**.
- **The Sunpath arc:** spans the hero's right two-thirds, rising behind the headline. Six hour marks with stage labels in small caps: `06:00 DISCOVER · 09:00 EXPLORE · 12:00 ENQUIRE · 16:00 BOOK · 20:00 EXPERIENCE · 06:00 RETURN`. The final mark sits on the *next* dawn, and a faint dotted line loops back to the start. The loop *is* the Return message.
- **On load (≈1.6 s):** the sun (a soft-edged 28 px disc with glow) rises from below the horizon to the 06:00 mark. The six marks light in sequence. A small "guest moment" chip floats beside the sun: *"Saw you on Instagram. Is that the view from the room?"*, labelled "Illustration".
- **Interaction:** hovering or tapping an hour mark moves the sun there (a 600 ms arc ease), re-tints the hero light to that hour and swaps the chip text (one line per stage). Each mark is also a jump link to its section. Keyboard: arrow keys move between marks (a `role="tablist"` pattern, with live-region announcements).
- **Below the fold edge:** an "Immediate proof" strip peeks in (§9.2).

**Hero copy alternatives** (same H1 per the blueprint; alternatives are for sub-lines and ads):
- "A great property still needs a complete guest-acquisition journey." (ad hook; used as the line above the H1)
- "Your guests' day starts long before check-in."
- "Be found at dawn. Booked by noon. Remembered after checkout."

---

## 9. Proposed page structure and storytelling

The blueprint's eleven blocks, mapped to the day. Section light is shown in brackets.

| # | Blueprint block | Section | Light | Content |
|---|---|---|---|---|
| 1 | Hero | **First light** | Dawn | As in §8 |
| 2 | Immediate proof | **"Already in the field"** | Dawn → morning | A horizontal strip of real-work tiles, each pinned to its hour: *Website · Grotta Resort (Explore)*, *360° room tours · Grotta Resort (Explore, tap to load)*, *Website · Eagleview Farm (Explore)*, *Photography & content (Discovery)*. Each tile has a "Client work" label. **Production with no approvals:** the strip shows three labelled illustration tiles plus the line "Client work is shared on request." |
| 3 | Customer problem | **"Guests love you once they arrive."** | Morning | Heading: *Guests love you once they arrive. Getting them there is the hard part.* Six problem lines (§3) set as large serif quotes, each tagged to the hour where it breaks, for example "Half our enquiries come in on WhatsApp at night…" (tag: 23:40 · Enquire). One sentence of argument: *Most properties invest in the stay and leave the journey to chance.* |
| 4 | TODO solution | **The Sunpath** (the signature, a sticky arc) | Shifts per stage | Six chapters. The arc stays pinned (desktop) while the page light changes per chapter. Each chapter has: hour + stage; **The guest** (one-line moment in italic); **What gets in the way**; **What we build** (two or three capabilities in plain words, tech named small); **What you gain**. A small "Attract / Convert / Serve / Retain" band runs under the arc and highlights the verb for the current stage. See the example below. |
| 5 | Case studies | **Stay Stories** | Golden hour | One featured story card per approved client. Card anatomy: a large photo, client + location, *The challenge*, *What we connected* (a mini arc with only the delivered stages lit), *Deliverables* list, *Results* (verified only, with source and dates; otherwise omitted), "Visit the live site ↗". Grotta's mini arc lights Discover, Explore, Book and Return, plus Experience if the concierge is confirmed. Eagleview's lights Discover and Explore, with booking "via their booking partner". **Hidden in production until `permission: "approved"`.** |
| 6 | What is included | **"Everything a stay needs, connected"** | Afternoon | Not service cards. A single **three-column "day planner"**: *Before they arrive* (marketing, ads, photography and video, Google and search, website, virtual tour), *While they decide* (WhatsApp journeys, AI concierge with human handover, booking and enquiry integration), *When they're with you and after* (guest information and digital menus, staff knowledge systems, follow-up and return campaigns, automation). Under it: **"Start where it hurts most"**, three entry routes: *Get found* · *Turn enquiries into bookings* · *Run a smoother stay*, plus "Or the full journey: Hospitality Transformation (custom scope)". No prices. |
| 7 | Who it is for | **"Every property keeps a different hour"** | Dusk | Five audiences (§3) as a horizontal set of "clock faces", each showing the hour where that business usually loses guests. For example *Destination lodges: lose them at Explore, as guests decide from 8,000 km away.* *City hotels: lose them at Book, to OTAs.* *Guest houses and farm stays: lose them at Enquire, the owner can't answer every message.* *Restaurants and venues: lose them at Discover, the atmosphere is invisible online.* *Event and wedding venues: lose them between Enquire and Book.* Each has a "This is us →" link that pre-selects the business type in the form. |
| 8 | Trust | **"How we work"** | Dusk | Facts only: Rwanda-based team; marketing, content, websites, tours and AI under one delivery team; "We only publish work our clients have approved"; the four-step process from the services copy (Choose the outcome → Clear scope → Build and launch → Improve). Client logos and quotes only when approved. A clear note on AI: *Concierge assistants hand over to your team, and never confirm a booking your staff haven't confirmed* (consistent with the Grotta concierge terms). |
| 9 | Lead form | **"Tonight's arrivals"**: the form | Night | Lantern-lit night section. The form appears as a **reservation card** (§12). |
| 10 | WhatsApp route | Beside the form + dock | Night | "Prefer WhatsApp? So do your guests." |
| 11 | Final CTA | **Next morning** | Dawn again | The sun rises once more on the arc's final mark. Headline: *Every great stay ends with a reason to return.* Then: *Let's build the journey that brings guests to you, and back.* Primary CTA + WhatsApp. Footer. |

**Example Sunpath chapter (Enquire, 12:00, though shown at 23:40 to make the point).**
> **23:40 · Enquire**
> *The guest:* "Do you have a room with the volcano view for two nights next weekend?"
> *What gets in the way:* Your team is asleep. By morning she has booked the lodge that replied.
> *What we build:* A WhatsApp journey that answers common questions instantly, captures the dates and hands the conversation to your reservations team. (WhatsApp Business · AI concierge · human handover)
> *What you gain:* Fewer lost enquiries and a team that starts the day with qualified requests, not a backlog.
> [Small label: Example conversation · Illustration]

Other chapter headlines:
- 06:00 Discover: *Be the place they stop scrolling for.*
- 09:00 Explore: *Let them walk the room before they book it.*
- 16:00 Book: *Make "yes" the easiest step.*
- 20:00 Experience: *Serve the stay, not just the room.*
- 06:00 Return: *The best marketing is the next booking.*

---

## 10. Signature animations and interactions

All animation keeps content readable without JS. `prefers-reduced-motion` shows final states with fades only.

1. **Sunrise intro (hero):** the sun disc rises along an SVG path (`offset-path` or a precomputed `getPointAtLength` table), with hour marks lighting by stagger (60 ms). Once only, ≤1.6 s, never blocking the CTAs (which render immediately).
2. **Light-temperature scroll:** each section declares `data-hour`. An IntersectionObserver sets `--sky-a`, `--sky-b`, `--ink` and `--glow` on `<body>`, and CSS transitions (registered `@property` colours, 900 ms) blend them. This is one observer and no scroll handler.
3. **The pinned Sunpath (desktop ≥1024 px):** the arc is `position: sticky`. The sun's position along the path is driven by chapter progress (rAF-throttled). The active hour mark swells and the verb band updates. A **long cast shadow** of window shutters rotates slightly with the sun's angle across the section background, a subtle "time passing" effect.
4. **Guest-moment chips:** small italic speech chips that *rise* 12 px and fade in beside the sun at each stage, then settle. Labelled "Illustration".
5. **Lantern lighting (night):** entering the form section, five or six small lantern points (CSS radial gradients) brighten in sequence and the form card warms. The submit button carries the lantern colour. On successful submission (HTTP 200 only), the card's "status" stamp changes from *Pending* to *Received · we'll reply within one working day*. The response promise needs owner confirmation; otherwise use "We'll be in touch".
6. **Stay Story mini-arcs:** in each case card, only the stages TODO delivered light up, drawn left to right. A visual, honest statement of scope.
7. **Audience clock faces:** a hand sweeps to the "hour you lose guests" on reveal. Tap to flip and see the remedy.
8. **Next-morning finale:** the sun completes the loop and rises again, with a dotted line returning to the first mark.

Performance budget: ≤ 45 KB gzipped JS, ≤ 35 KB gzipped CSS, hero LCP is text (no hero image required), and real photos are lazy WebP at 640/1280. Decorative loops pause off-screen.

---

## 11. Mobile-specific experience

Target 320–430 px, inside the Facebook and Instagram in-app browsers.

- **Hero (360×640):** a compact header; the H1 at ~2.4 rem over four lines; the subhead trimmed to one line ("Marketing, content, websites, tours, WhatsApp and guest service, as one journey."); both CTAs visible without scrolling. The arc becomes a **low horizon arc** under the CTAs, with six dots and the sun at 06:00.
- **Sunpath on mobile:** no pinning. A **horizontal "hour strip"** sticks under the header during the solution section (six small hour chips, with the active one filled). Each chapter is a full-width card. Swiping the strip jumps between chapters. The light-temperature change still runs, as it's cheap.
- **Immediate proof:** a swipe rail with snap points. Tours stay tap-to-load with an "Open full screen" link (the iOS WebView fullscreen issue is already solved in VT).
- **Who it is for:** a horizontal scroll of clock faces, tap to flip.
- **Dock:** after the hero, a bottom bar shaped like a **room-key sleeve**: "Grow My Hospitality Business" + a WhatsApp icon. It hides while the form is in view and respects safe-area insets.
- **Form:** single column, `inputmode` and `autocomplete` set, chips for choices, no select menus where chips work. The WhatsApp alternative sits above the submit button.
- **Touch targets** ≥ 44 px. Tested at 320 px.

---

## 12. Conversion and lead-capture strategy

**CTA language** (consistent everywhere):
- Primary: **Grow My Hospitality Business** (hero, dock, after the Sunpath, final).
- Secondary: **Follow a guest's journey** → **See the Grotta Resort story** (once approved).
- Contextual WhatsApp: **"Ask us on WhatsApp"**, prefilled: *"Hello TODO Growth, I run a hospitality business and I'd like to talk about growing it. Could we discuss what you'd recommend?"*
- Stage-level micro-CTAs inside the Sunpath ("Fix my enquiries →") open the form with that need pre-checked.

**Form: the "reservation card"** (blueprint fields, kept short):

| Field | Required | Notes |
|---|---|---|
| Name | Yes | |
| Business name | Yes | |
| Phone / WhatsApp | Yes | `+250` default, normalised (reuse) |
| Email | Optional | Per the current sales policy in Marketing config |
| Type of business | Yes | Chips: Hotel · Resort/Lodge · Guest house/Farm stay · Restaurant/Café · Event venue · Other. Pre-filled from "This is us" links. |
| What do you want to improve? | Yes, ≥1 | Chips mapped to the journey: *Get found* · *Show the experience* · *Answer enquiries faster* · *More direct bookings* · *Smoother guest experience* · *Bring guests back* · *Not sure, advise me* |
| Brief description | Yes | 15–800 chars. Placeholder: "e.g. 18-room lodge near Musanze, most enquiries via WhatsApp, want more direct bookings" |
| Location | Optional | Short text (useful for content/tour visits) |
| Honeypot + hidden attribution | Auto | `service: "Hospitality Growth"`, page URL, UTMs, fbclid, referrer (VT `attribution.js`) |

This is one extra qualifier (business type) beyond Marketing's form, justified by the blueprint's "route and qualify". The "improve" chips double as the service-interest field.

**Honest states** (reuse): success only on HTTP 200; errors keep the data and offer a pre-filled email and WhatsApp; "not connected" when disabled. **The form is currently undeliverable** until EmailJS is reconnected (§5 #8).

**Funnel touchpoints:** hero CTA, post-problem CTA, every Sunpath chapter, Stay Story, audience cards, form, final CTA and the persistent dock: eight routes, all to one form or WhatsApp.

**Measurement** (if the owner enables it): `Lead` on accepted submission only, `Contact` on WhatsApp click, through VT's inactive `tracking.js`. Without the Pixel, the enquiry email carries the page URL and UTMs, as Marketing does.

---

## 13. Technical implementation plan (Phase 2, after approval)

**Stack:** static HTML + one CSS file + ES modules. No build, no dependencies, relative paths. Google Fonts (Fraunces with variable opsz + Hanken Grotesk; two weights each, `display=swap`) or self-hosted woff2 (preferred for in-app browsers).

```
hospitality growth/
  index.html                       all content in HTML (reads without JS)
  hospitality-growth/index.html    redirect stub → / (if a subdomain is chosen)
  vercel.json                      301 /hospitality-growth → /
  robots.txt, sitemap.xml
  assets/css/hospitality.css       design system "Sunpath": tokens, hours, light themes, components
  assets/js/config.js              contact, WhatsApp message, submission, proof[], stories[], audiences[], REVIEW_MODE
  assets/js/main.js                mounts modules, dock, reveals
  assets/js/sunpath.js             arc SVG, sun position, hour marks (tablist), light-temperature observer
  assets/js/proof.js               renders proof strip and Stay Stories from config by permission
  assets/js/tour-embed.js          tap-to-load Kuula (behaviour from VT, new skin)
  assets/js/lead-form.js           adapted from Marketing
  assets/js/submit.js              copied from Marketing (EmailJS)
  assets/js/attribution.js         copied from Virtual Tours
  assets/js/tracking.js            copied from Virtual Tours (inactive)
  assets/img/brand/todo-logo-192.webp
  assets/media/                    approved client work only
  docs/HOSPITALITY_GROWTH_DISCOVERY.md
  README.md                        page flow, review mode, adding approved work, launch gates
```

**Build order**
1. Tokens and typography, the hour themes (six CSS custom-property sets), a static page with all copy (no JS).
2. The Sunpath SVG and hero intro; the hour tablist with keyboard support.
3. The light-temperature observer; the sticky Sunpath (desktop) and hour strip (mobile).
4. Proof strip and Stay Stories rendered from config, with review/production states.
5. Form, submit, attribution, WhatsApp, dock.
6. Reduced motion, no-JS, 320 px, in-app browser QA, Lighthouse (target ≥ 90 performance on mobile), axe accessibility pass, and contrast checks for every hour theme (text ≥ 4.5:1 on each sky).
7. README with launch gates.

**Launch gates** (all config changes, no markup): EmailJS reconnected and tested; URL decided; Grotta and Eagleview approvals → `permission: "approved"`; concierge role confirmed (or the Enquire chapter stays "illustration" only); privacy link; Pixel decision.

**Boundaries kept in this phase:** no code written; Marketing and Virtual Tours untouched; nothing installed, committed, pushed or deployed; Grotta repos with uncommitted changes were only read.

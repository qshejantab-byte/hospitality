# Hospitality Growth: creative audit of the Sunpath build

30 October 2026. This audit compares the page as it stood after the first build with the two completed TODO Growth pages, inspected in a browser at 1440px and 390px:

- **Marketing:** `htdocs/marketing landing page`, "Impossible to Ignore".
- **Virtual Tours:** `htdocs/virtualtourlandingpage`, "Plan & Aperture".

**Verdict:** the page works technically and is honest about proof, but creatively it is well below both benchmarks. It reads as a well-organised document with a tinted background, not as a designed experience. It should be replaced, not refined.

## What the benchmarks do that Sunpath does not

| | Marketing | Virtual Tours | Sunpath |
|---|---|---|---|
| Hero object | A phone feed you watch scroll and stop, over a wall of grey posts | A full-bleed drawn room you can drag to look around, with a floor plan | A thin dotted arc and a rounded card on a pale gradient |
| Headline | 4 words that carry the whole idea, on a highlighter slab | Short, huge, one accent word | The required H1 (long), with three italic words |
| Second screen | "Great business. Weak social media? Let's fix that." with the feed splitting open | "A photo shows one corner…" with a live comparison you can toggle | Six paragraphs of a day log |
| How they explain | They show it (a demo, a toggle, a feed) | They show it (rooms, a floor plan, hotspots) | They tell it (definition lists of "What gets in the way / What we build / What you gain") |
| Visual memory | Yellow slab, grey fog, colour breaking through | Night window, plan lines, aperture | Hard to recall. A beige gradient. |

## Content weaknesses

- **Far too much text.** About 1,900 words of body copy. Each of the six journey chapters carries a quote, a scene, and three labelled paragraphs, so the journey alone is 18 paragraphs.
- **Repetition.** The services are explained four times:
  - the hero lede ("marketing, website, virtual tours, WhatsApp…");
  - the journey's "What we build" paragraphs;
  - the "Connected growth system" lists;
  - the "Who we help" descriptions.

  The problem is also told twice: the day log, then "What gets in the way" in every chapter.
- **Documentation tone.** The "What gets in the way / What we build / What you gain" blocks, "What we don't do", the "composite day" disclaimer paragraph and the proof section's explanation all read like a brief, not a landing page.
- **Paragraphs that should be headlines.** "Most properties invest in the stay and leave the journey to chance." "Guests rarely disappear at your door." Each of these is a headline buried in body text.
- **Could be cut entirely:**
  - the three-period "system" lists (they duplicate the journey);
  - the second note card;
  - the hero's long lede;
  - "Not every property loses guests at every hour…".
- **What conversion actually needs:** the promise, what TODO touches across the guest journey, who it is for, honest proof status, a short process, and the form with a WhatsApp route.

## Design weaknesses

- **Ordinary compositions.** It's split two-column layouts almost everywhere: sticky heading left and a list right, used four times (problem, journey, how, enquire).
- **Generic components.** Rounded cards with thin borders (moment card, scenes, system notes, story card, form) are the "AI landing page" look the brief warns against.
- **The background carries the concept.** The time-of-day idea lives in gradient colour changes the visitor barely notices while reading. When a whole idea depends on a gradient, it's a weak idea.
- **The hero has no object.** The arc is thin and dotted. There is no image, no scene and no texture of hospitality.
- **Scenes are too small and too many.** Six mini-illustrations (search bar, window, chat, booking card, guide, postcard) are each nice but tiny, and none is memorable.
- **Animations are underdeveloped.** The sun slides, cards fade up, and that's it. Nothing a visitor would describe to a colleague.
- **No hospitality texture.** No materials, objects, rituals or places. It could be a SaaS page.

## Commercial weaknesses

- **The service is understandable, but slowly.** You need to read the chapters to see what TODO actually does.
- **The value proposition is diffuse.** "Connected journey" is said many times but never shown.
- **Why TODO is never made concrete.** "One team" is the real differentiator and appears once, in a list heading.
- **CTAs exist but aren't compelling.** The form sits in a dark section after about 15,000px of scrolling on mobile, and nothing builds desire before it.
- **Honesty is right but presented apologetically.** The proof placeholder is a grey box saying "awaiting approval". It should be a designed object that turns permission into a trust signal.

## Keep

- The honest proof mechanism (`CONFIG.stories`, permission flags, review mode).
- The form engine: validation, drafts, duplicate guard, honest 412 state, pre-filled fallbacks.
- The no-build static architecture and the performance discipline.
- The idea of the guest journey as the backbone, which is a blueprint requirement.

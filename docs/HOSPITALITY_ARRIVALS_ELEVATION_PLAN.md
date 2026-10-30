# Arrivals: elevation plan

30 October 2026. This document critiques the first Arrivals build and sets out what to change.

## What works

- **The concept.** An arrivals board means "guests coming" to any owner, and nothing on the Marketing or Virtual Tours pages resembles it.
- **The copy budget** of about 450 words, with each topic said once.
- **The objects:** pass, key rack, guest book, directory, key cards and registration card. They belong to the same hotel.
- **All the functionality:** the board engine, pass, tablist, form, review mode and reduced motion.

## Why the hero lacks impact

1. **The board is a widget, not architecture.** It sits *below* the headline in a 1.2rem frame. At 1440×900 only its top three rows are visible, so it reads as an element on a page, not the room you've walked into.
2. **Wrong hierarchy.** The headline, lede, CTA and board all compete. The eye lands on a big serif paragraph, not on the board.
3. **The flaps don't look mechanical.** Each character "squashes" with `scaleY`. A real split flap has a top leaf falling over a bottom leaf, with light changing on it. Ours flickers instead of clattering.
4. **No light, no depth, no surroundings.** A flat green field with faint stripes. Nothing tells you this is a lobby: no ceiling light, no wall, no desk, no materials around the board.
5. **Letters too small.** With four columns (about 47 cells) each cell is about 24px at 1440. Grand boards have big letters.

## What else is weak

- **Repetitive two-column rhythm:** missed, pass, keys, book, directory and enquiry all split heading against object.
- **The directory** is a brass box beside a heading. It should be a full-width sign you read like a lift panel.
- **The board's link to the services is implicit.** "Found you via INSTAGRAM / 360° TOUR / WHATSAPP" are TODO's services, but nothing says so.

## The new hero: "The Lobby Wall"

One scene, top to bottom, in a single viewport:

```
┌──────────────────────────────── header ────────────────────────────────┐
│         ◡ ceiling light ◡          ◡ ceiling light ◡                   │
│   ┌ brass plate: ARRIVALS ─────────────── TONIGHT · KIGALI 21:14 ┐     │
│   │ ■■■■■■■■■■■■  ■■■■■■■■■■■■■■  ■■■■■■■■■■■■  ●                │     │  the board: ~92% width,
│   │ ■■■■■■■■■■■■  ■■■■■■■■■■■■■■  ■■■■■■■■■■■■  ●                │     │  3 columns, cells up to 38px
│   │ … 5 rows                                                     │     │
│   └──────────────────────────────────────────────────────────────┘     │
│  ═════════════════════ brass rail / desk edge ══════════════════════   │
│  We Help Hospitality Businesses Attract,          Marketing, websites… │  the reception desk:
│  Convert and Serve More Guests.                   [🔔 Grow My …]       │  headline + CTA on the desk front
└────────────────────────────────────────────────────────────────────────┘
```

- **Board.**
  - Three columns: GUEST · FOUND YOU VIA · STATUS. "From" moves into the guest label, which makes the letters about 40% larger.
  - A layered brass frame: an outer bevel, a dark inset, a reveal shadow and mounting bolts.
  - An engraved brass header plate.
  - Warm ceiling light falls on the wall above it, and a soft glow spills from the board onto the wall.
- **Desk.** A dark walnut and brass rail across the full width. The headline sits on the desk front in large ivory serif, two lines on desktop. The CTA is a brass service bell on the right, with the one-line value statement.
- **Proportions at 1440×900.** The board fills about 55% of the height and the desk about 35%. The board, the headline and the CTA are all above the fold.
- **Flaps.** True split-flap construction: each cell has a static top half, a static bottom half and two moving leaves. The old top leaf falls (`rotateX` 0→−90°, darkening), then the new bottom leaf lands (90→0°, lightening). This runs per character, left to right, at about 70ms per leaf, with a stagger per row.
- **Choreography.**
  1. The wall lights warm up (0–0.6s).
  2. The board rows clatter in, top to bottom (0.4–2.4s).
  3. The headline wipes in on the desk (0.9s).
  4. The bell CTA settles (1.3s).

  After that, one row re-flips every 5 seconds, only while the board is on screen.
- **Mobile.** The board leads at full bleed (minus the gutter), with four rows in the two-line layout. The desk follows with the headline and a full-width bell CTA. Board, headline and CTA are all visible on a 390×844 screen.

## The rest of the page: rhythm

| Section | Composition | Change |
|---|---|---|
| Missed arrivals | Full-width editorial on ivory: oversized headline, then the board as a wide "lost" ledger | Add the commercial bridge: *Every name on the board arrived through something we build.* |
| Guest pass | Paper; sticky pass beside the stages | Keep; larger pass |
| Key rack | Dark walnut and green | Keep; the panel lists the stages each key opens |
| Guest book | Ivory | Keep |
| Directory | **Full-width brass lift panel** under a centred headline | Redesigned from two-column |
| Check-in | Key cards | Keep |
| Registration card | Green | Keep |
| Close | Charcoal board | Keep |

## Preserved

The board engine API, cycling and reduced-motion behaviour; the pass; the key-rack tablist; directory→form pre-selection; the whole form and submission flow; review and production modes; all proof rules; contacts in config, flagged as unconfirmed.

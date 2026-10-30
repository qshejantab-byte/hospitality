# Hospitality Arrivals: redesign of the navigation, hero, Missed Arrivals, What We Do and footer

30 October 2026. This reviews the five areas the brief names (counted as six sections, because the closing board and the footer become one finale) and records the redesign implemented.

## 1. Navigation

- **Why it's weak.** It's a standard SaaS bar: logo, four grey links and a yellow button on a blurred green strip. Nothing about it belongs to a hotel. There is no active state, and the bar doesn't change on scroll. Mobile has no menu at all, because the links are hidden below 1100px.
- **Remove:** the blur strip, the plain text links, and the full-width hairline.
- **Reimagine as a lift lobby.** Hotels tell you where you are with a brass floor indicator.
  - **Floor dial.** The bar carries a small brass dial whose needle swings to the section you're on, with the floor name beside it.
  - **Numbered links.** Links read like lift-panel floors (`01 Missed arrivals`), and the active floor lights up.
  - **Scrolled state.** On load the bar is transparent over the lobby. Once you scroll, it settles into a slim green bar with a brass rail.
  - **Mobile menu.** "Menu" closes two brass lift doors over the page, and inside is a panel of round, numbered floor buttons. Choosing a floor opens the doors and takes you there. Escape closes it, and focus stays inside while it's open.

## 2. Hero

- **Why it's weak.** The board hung on the wall, and the headline sat underneath on a walnut desk: an object first, then a text block. The headline was separate from the object rather than part of the room.
- **Remove:** the desk band, the eyebrow, and the fifth board row on desktop.
- **Reimagine as one wall.**
  - **Brass lettering.** The headline becomes *signage*: polished brass letters mounted on the panelled wall above the board, the way hotels letter their name. A light sheen passes across them once as the lights come on.
  - **The board** hangs beneath the lettering on brass rods.
  - **The floor.** The stone floor below shows a soft reflection of the board.
  - **The ledge.** One line of value and the bell CTA sit on a thin brass ledge, the only text that isn't part of the architecture.
- **Choreography.**
  1. The lights come on.
  2. A sheen passes over the lettering.
  3. The board lowers into place and its rows clatter in.
  4. The ledge fades in.

## 3. Missed Arrivals

- **Why it's weak.** A second board with red lamps repeated the hero object. It was a table to read, not a story you feel.
- **Remove:** the second board, and the generic layout of headline, lede and table.
- **Reimagine as "The room that waited."** A pinned, scroll-driven scene of a hotel room drawn in SVG:
  - The bed is turned down, with a RESERVED card on the pillow.
  - The lamp is lit.
  - The Virunga volcanoes are visible through the window.

  As you scroll through five moments (Discovery, Exploration, Enquiry, Booking, Communication), the light in the room drains. The door hanger on the handle flips to say where the guest was lost, and one short line tells it. At the end the lamp goes out. Then the punchline: *Every arrival comes through something we build.*
- **Honesty.** It's labelled "Illustration · a familiar story, not a client". All five lines stay in the DOM for screen readers. Without JS, or with reduced motion, the steps show as a plain list.

## 4. What We Do

- **Why it's weak.** The key rack is a charming object, but it says "eight separate things". Clicking a key shows one paragraph, and nothing shows how the services *connect*, which is the actual offer.
- **Remove:** the key rack and the eight-service list (it overlapped with the guest pass).
- **Reimagine as the Journey Switchboard.** A walnut and brass console with three parts:
  - **Lamps.** Six indicator lamps on an arc, one per guest moment (Discover … Return).
  - **Switches.** Six toggle switches below, one per service.
  - **Wires.** Brass wires link each switch to the moments it serves.

  Switching a service on lights its wires and lamps. A readout counts "*n* of 6 guest moments connected" and gives the service, what it does and the business value. "Connect everything" lights the whole board: *that's Hospitality Growth: one team, one journey.*

  The switches are real buttons (`aria-pressed`), and the readout is a live region.

## 5–6. Close and footer

- **Why it's weak.** A centred board with a headline and buttons, then a conventional dark strip with a logo and three links. Both stop rather than end.
- **Reimagine as the night porter.**
  - **Finale.** The board in a lit alcove: "NEXT ARRIVAL · COULD BE YOURS", the headline, and the bell CTA.
  - **Plaque.** Then the building's engraved brass plaque: brand and positioning, a numbered floor directory (the page's sections), and contact.
  - **Rail.** It ends on a brass rail with the copyright, the illustration notice and a round "▲ Lobby" lift button back to the top.
- **Contact.** The plaque shows WhatsApp and email **only when** `CONFIG.contact.confirmed` is `true`. Until then it points people to the enquiry card and todo.rw.
- **No legal links**, because no privacy page exists.

## Motion language (whole page)

Every motion is mechanical and lit, never a generic fade:

| Element | Motion |
|---|---|
| Boards | Flip |
| Brass letters | Sheen |
| Nav dial | Needle swing |
| Mobile menu | Lift doors |
| Room scene | Light drains |
| Door hanger | Flips |
| Switchboard | Wires light up |
| Lamps | Glow |

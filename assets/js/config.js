/**
 * Hospitality Growth landing page: single source of configuration.
 *
 * Every business decision, credential and piece of approved proof lives
 * here, so clearing a launch gate never requires touching the markup.
 * See README.md → "Launch gates".
 */

/** Review mode lists open items for the team. On for localhost by default.
 *  ?review=1 forces it on, ?review=0 shows the production view. */
function detectReviewMode() {
  const flag = new URLSearchParams(location.search).get("review");
  if (flag === "1") return true;
  if (flag === "0") return false;
  return ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
}

export const REVIEW_MODE = detectReviewMode();

export const CONFIG = {
  page: {
    id: "hospitality-growth",
    service: "Hospitality Growth",
    canonical: "https://hospitality.todo.rw/",
  },

  /**
   * CONTACT. Confirmed for Hospitality Growth enquiries by the business on
   * 30 Oct 2026. `confirmed: true` shows these details in the footer.
   */
  contact: {
    confirmed: true,
    email: "richie@todo.rw",
    mainSite: "https://todo.rw/",
    privacy: "privacy.html",
    whatsapp: {
      number: "250799537999", // digits only, with country code (local: 0799 537 999)
      display: "0799 537 999",
      message:
        "Hello TODO Growth, I run a hospitality business and I'd like to talk about growing it. Could we discuss what you'd recommend?",
    },
  },

  form: {
    emailRequired: false, // sales policy (same as the Marketing page): email optional
    messageMin: 15,
    messageMax: 800,
  },

  /**
   * Lead delivery through EmailJS (same account and contact template as
   * todo.rw). The public key is designed to be public; there is no private
   * key in this code.
   * KNOWN ISSUE (30 Oct 2026): the service answers 412 "Outlook: Invalid
   * grant" until the Outlook connection is reconnected in the EmailJS
   * dashboard. Until then the form shows an honest error with email and
   * WhatsApp alternatives. Set `enabled: false` to show "not connected".
   */
  submission: {
    enabled: true,
    endpoint: "https://api.emailjs.com/api/v1.0/email/send",
    serviceId: "service_tyheci5",
    templateId: "template_0n9539s",
    publicKey: "C7fH5rnk5-9g05t9A",
    timeoutMs: 15000,
  },

  /**
   * STAY STORIES (case studies). Only entries with permission "approved"
   * appear in production. "pending" entries appear in review mode only,
   * badged, so the team can see the layout with real candidates.
   *
   * stages: which of the six journey stages TODO actually delivered for
   * (0 Discover · 1 Explore · 2 Enquire · 3 Book · 4 Experience · 5 Return).
   * results: verified only, each with a source and date range. Omit if none.
   * image: { src, srcset, alt } from assets/media/, approved for public use.
   */
  stories: [
    {
      id: "grotta-resort",
      client: "Grotta Resort",
      location: "Musanze, Northern Rwanda",
      url: "https://grottaresort.rw/stay.html",
      // Facts from grottaresort.rw/stay.html (checked 30 Oct 2026); see docs/ASSET_CREDITS.md.
      summary:
        "An adventure resort 2 km from Volcanoes National Park, with 26 rooms and suites across six room types.",
      headline: "Let guests stand in the room before they book it.",
      story:
        "Grotta's King Volcano View room promises “ancient peaks and highland mist” from a private terrace. That is hard to judge from one photo. On grottaresort.rw, guests can open a 360° tour of five of the six room types and look around before they choose.",
      // Deliverables as listed in TODO Growth's own portfolio (todo.rw).
      delivered: [
        "Website design & development",
        "Photography & video for social media",
        "Digital marketing & SEO",
        "360° virtual tours of the rooms",
        "Sales & commercialisation support",
      ],
      stages: [0, 1],
      results: [], // no verified figures; none are shown
      image: {
        src: "assets/media/grotta/grotta-room-1600.webp",
        alt: "A Grotta Resort room: a made bed, warm pendant lights and glass doors opening onto a garden terrace",
        credit: "Photo: Grotta Resort, used with permission",
      },
      permission: "approved", // story and photography approved by Grotta Resort, 30 Oct 2026
      // Not part of the story: the digital concierge (TODO's role unconfirmed).
    },
    {
      id: "eagleview-farm",
      client: "Eagleview Farm",
      location: "Bugesera, Rwanda",
      url: "https://eagleviewfarm.rw/",
      summary: "A working lakeside retreat farm near Lake Mirayi, built around slow stays and farm-to-table dining.",
      delivered: [
        "Website design & development",
        "Photography & video for social media",
        "Digital marketing & SEO",
        "Sales & commercialisation support",
      ],
      stages: [0, 1],
      results: [],
      // Photo supplied by TODO Growth, 30 Oct 2026. Shown in review mode only until Eagleview approves publication.
      image: {
        src: "assets/media/eagleview/eagleview-room-1800.webp",
        alt: "An Eagleview Farm room: timber walls, a canopy bed with a mosquito net and a teal sofa beside the terrace door",
        credit: "Photo: Eagleview Farm",
      },
      permission: "pending",
      note: "Needs written consent. Booking runs on a third-party engine: never claim it.",
    },
  ],
};

export function waLink() {
  const { number, message } = CONFIG.contact.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Open items shown in the review bar. */
export function openItems() {
  const items = [];
  if (!CONFIG.contact.confirmed) items.push("Confirm Hospitality contact (email + WhatsApp)");
  if (CONFIG.submission.enabled) items.push("EmailJS: reconnect Outlook (412) and send one test");
  if (!CONFIG.stories.some((s) => s.permission === "approved")) items.push("No approved Stay Story yet");
  if (!CONFIG.contact.privacy) items.push("Privacy notice URL");
  items.push("Privacy notice: confirm open items in docs/PRIVACY_OPEN_ITEMS.md");
  return items;
}

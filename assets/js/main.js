/**
 * Mounts the page: navigation, the hero and photography motion, the leaky journey, the guest
 * journey rail, the services index, client stories, contact links,
 * reveals, the mobile dock, the form and the review bar.
 */
import { CONFIG, REVIEW_MODE, waLink, openItems } from "./config.js";
import { initNav } from "./nav.js";
import { initHero } from "./hero.js";
import { initWho } from "./who.js";
import { initLeak } from "./leak.js";
import { initPass } from "./journey.js";
import { initServices } from "./services.js";
import { initLeadForm } from "./lead-form.js";

const STAGES = ["Discover", "Explore", "Enquire", "Book", "Experience", "Return"];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ── Contact links from config ── */
function wireContacts() {
  const wa = waLink();
  document.querySelectorAll("[data-wa]").forEach((a) => (a.href = wa));
  document.querySelectorAll("[data-wa-display]").forEach((s) => (s.textContent = CONFIG.contact.whatsapp.display));
  document.querySelectorAll("[data-email]").forEach((a) => {
    a.href = `mailto:${CONFIG.contact.email}`;
    const t = a.querySelector("[data-email-text]");
    (t || a).textContent = CONFIG.contact.email;
  });
  // footer contact block: shown only once the Hospitality contact is confirmed in config
  const confirmed = CONFIG.contact.confirmed === true;
  document.querySelectorAll("[data-contact-confirmed]").forEach((el) => (el.hidden = !confirmed));
  document.querySelectorAll("[data-contact-pending]").forEach((el) => (el.hidden = confirmed));
  document.querySelectorAll("[data-year]").forEach((s) => (s.textContent = new Date().getFullYear()));
}

/* ── Client stories: approved only; pending ones in review mode, badged ── */
function renderStories() {
  const root = document.querySelector("[data-stories]");
  if (!root) return;
  const list = CONFIG.stories.filter((s) => s.permission === "approved" || (REVIEW_MODE && s.permission === "pending"));
  if (!list.length) return; // keep the honest "Reserved" placeholder from the HTML

  root.innerHTML = list.map((s) => {
    const pending = s.permission !== "approved";
    // pending stories only ever render in review mode, so their supplied photo can be previewed there
    const img = s.image
      ? `<img src="${esc(s.image.src)}" ${s.image.srcset ? `srcset="${esc(s.image.srcset)}" sizes="(min-width: 1024px) 30vw, 90vw"` : ""} alt="${esc(s.image.alt)}" loading="lazy" decoding="async">`
      : `<span>${pending ? "Image pending approval" : "Image to come"}</span>`;
    const stages = STAGES.map((n, i) => `<li class="${s.stages.includes(i) ? "on" : ""}">${n}</li>`).join("");
    const results = s.results && s.results.length
      ? `<div class="story__results">${s.results.map((r) => `<p><b>${esc(r.value)}</b><small>${esc(r.label)} · ${esc(r.source)}</small></p>`).join("")}</div>`
      : "";
    return `
      <article class="story">
        <figure class="story__figure"><div class="story__arch">${img}</div>${s.image && s.image.credit ? `<figcaption class="story__credit">${esc(s.image.credit)}</figcaption>` : ""}</figure>
        <div class="story__body">
          <p class="story__badge${pending ? "" : " story__badge--ok"}">${pending ? "Review only · pending client approval" : "Client work"}</p>
          <h3 class="story__client">${esc(s.client)}</h3>
          <p class="story__loc">${esc(s.location)}</p>
          ${s.headline ? `<p class="story__headline">${esc(s.headline)}</p>` : ""}
          ${s.story ? `<p class="story__story">${esc(s.story)}</p>` : ""}
          <p class="story__summary">${esc(s.summary)}</p>
          <p class="story__label">Delivered by TODO Growth</p>
          <ul class="story__list">${s.delivered.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
          <ol class="story__stages">${stages}</ol>
          ${results}
          ${pending && s.note ? `<p class="story__review">${esc(s.note)}</p>` : ""}
          ${s.url ? `<a class="link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.linkText || `Visit ${s.client}`)}</a>` : ""}
        </div>
      </article>`;
  }).join("");
}

/* ── Reveals: headlines rise, the final arch draws ── */
function initReveals() {
  const els = document.querySelectorAll(".reveal, .stage, .how__steps li, .story, .who__panel");
  if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

/* ── Mobile dock: after the hero, hidden while the form is on screen ── */
function initDock() {
  const dock = document.querySelector("[data-dock]");
  const hero = document.querySelector(".hero");
  const form = document.getElementById("enquire");
  const final = document.querySelector(".final");
  if (!dock || !("IntersectionObserver" in window)) return;
  const seen = new Map([[hero, true], [form, false], [final, false]]);
  const links = dock.querySelectorAll("a");
  const set = () => {
    const on = ![...seen.values()].some(Boolean);
    dock.classList.toggle("is-on", on);
    dock.setAttribute("aria-hidden", String(!on));
    links.forEach((a) => (on ? a.removeAttribute("tabindex") : a.setAttribute("tabindex", "-1")));
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting));
    set();
  }, { threshold: 0.05 });
  seen.forEach((_, el) => el && io.observe(el));
}

/* ── Back to top: scroll to the very top, then put keyboard focus there too ── */
function initToTop() {
  document.querySelectorAll("[data-to-top]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", location.pathname + location.search);
    const target = document.querySelector(".nav__brand");
    if (target) target.focus({ preventScroll: true });
  }));
}

/* ── Review bar ── */
function initReview() {
  if (!REVIEW_MODE) return;
  const items = openItems();
  const el = document.createElement("details");
  el.className = "review";
  el.innerHTML = `<summary>Review mode · ${items.length} open</summary><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul><p>Add <code>?review=0</code> for the production view.</p>`;
  document.body.appendChild(el);
}

wireContacts();
renderStories();
initNav();
initHero();
initLeak();
initPass();
initServices();
initWho();
initReveals();
initDock();
initLeadForm();
initToTop();
initReview();

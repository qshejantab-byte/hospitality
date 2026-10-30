/**
 * Enquiry card: validation, draft keeping, submission and honest states.
 *
 * Rules:
 *  - Success is shown only when the adapter says "accepted" (HTTP 200).
 *  - On any failure the visitor's details stay in the form, and email and
 *    WhatsApp alternatives are offered, pre-filled with the enquiry.
 *  - One submission at a time; an identical enquiry already accepted in
 *    this session is not sent twice.
 */
import { CONFIG, REVIEW_MODE } from "./config.js";
import { submitLead } from "./submit.js";

const DRAFT_KEY = "hg-enquiry-draft";
const SENT_KEY = "hg-enquiry-sent";

const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* storage blocked (some in-app browsers) */ } },
  del(k) { try { sessionStorage.removeItem(k); } catch { /* ignore */ } },
};

/** Rwandan numbers in any common format → +2507XXXXXXXX; others kept in E.164. */
export function normalisePhone(raw) {
  let d = String(raw).replace(/[^\d+]/g, "");
  if (d.startsWith("00")) d = "+" + d.slice(2);
  if (/^07\d{8}$/.test(d)) return "+250" + d.slice(1);
  if (/^7\d{8}$/.test(d)) return "+250" + d;
  if (/^2507\d{8}$/.test(d)) return "+" + d;
  if (/^\+\d{8,15}$/.test(d)) return d;
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;
  const btn = form.querySelector("[data-submit]");
  const btnLabel = btn.textContent;
  const msg = form.querySelector("[data-form-msg]");
  const stamp = form.querySelector("[data-status-stamp]");
  const message = form.elements.message;
  const count = document.getElementById("c-message");
  let busy = false;

  /* ── draft: keep what the visitor typed, even across a reload ── */
  const snapshot = () => {
    const f = form.elements;
    return {
      name: f.name.value, business: f.business.value, phone: f.phone.value, email: f.email.value,
      type: f.type.value, needs: [...form.querySelectorAll('[name="needs"]:checked')].map((i) => i.value),
      message: f.message.value,
    };
  };
  const restore = () => {
    const raw = store.get(DRAFT_KEY);
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      for (const k of ["name", "business", "phone", "email", "message"]) if (d[k]) form.elements[k].value = d[k];
      if (d.type) form.querySelectorAll('[name="type"]').forEach((r) => (r.checked = r.value === d.type));
      if (d.needs) form.querySelectorAll('[name="needs"]').forEach((c) => (c.checked = d.needs.includes(c.value)));
    } catch { /* ignore a broken draft */ }
  };
  restore();

  const updateCount = () => { count.textContent = `${message.value.length} / ${CONFIG.form.messageMax}`; };
  updateCount();

  form.addEventListener("input", (e) => {
    store.set(DRAFT_KEY, JSON.stringify(snapshot()));
    if (e.target === message) updateCount();
    if (stamp.classList.contains("is-sent")) setStamp("Draft");
    const err = fieldError(e.target.name);
    if (err && err.textContent) validate(e.target.name); // clear errors as they are fixed
  });

  /* "This is us →" links on the Who section pre-select the business type */
  document.querySelectorAll("[data-type]").forEach((a) => a.addEventListener("click", () => {
    const r = form.querySelector(`[name="type"][value="${a.dataset.type}"]`);
    if (r) { r.checked = true; store.set(DRAFT_KEY, JSON.stringify(snapshot())); validate("type"); }
  }));

  /* ── validation ── */
  const fieldError = (name) => {
    const id = { name: "e-name", business: "e-business", phone: "e-phone", email: "e-email", type: "e-type", needs: "e-needs", message: "e-message" }[name];
    return id ? document.getElementById(id) : null;
  };
  const target = (name) => (name === "type" || name === "needs"
    ? form.querySelector(`[name="${name}"]`).closest("fieldset")
    : form.elements[name]);

  const rules = {
    name: (v) => (v.trim().length < 2 ? "Please tell us your name." : ""),
    business: (v) => (v.trim().length < 2 ? "Please add the name of your business." : ""),
    phone: (v) => (!v.trim() ? "Please add a phone or WhatsApp number so we can reply."
      : !normalisePhone(v) ? "That number doesn't look complete. Try a format like 0788 123 456 or +250 788 123 456." : ""),
    email: (v) => (!v.trim() ? (CONFIG.form.emailRequired ? "Please add your email address." : "")
      : !EMAIL_RE.test(v.trim()) ? "That email address doesn't look right. Check for a missing @ or dot." : ""),
    type: () => (!form.querySelector('[name="type"]:checked') ? "Please choose the type of business." : ""),
    needs: () => (!form.querySelector('[name="needs"]:checked') ? "Choose at least one, or “Not sure yet”." : ""),
    message: (v) => (v.trim().length < CONFIG.form.messageMin
      ? `Please add a sentence or two about your property (at least ${CONFIG.form.messageMin} characters).` : ""),
  };

  function validate(name) {
    const el = target(name);
    const value = name === "type" || name === "needs" ? "" : form.elements[name].value;
    const text = rules[name](value);
    fieldError(name).textContent = text;
    if (text) el.setAttribute("aria-invalid", "true");
    else el.removeAttribute("aria-invalid");
    return !text;
  }

  ["name", "business", "phone", "email", "message"].forEach((n) =>
    form.elements[n].addEventListener("blur", () => { if (form.elements[n].value) validate(n); }));

  /* ── messages ── */
  function setStamp(text, cls = "") {
    stamp.textContent = text;
    stamp.className = "reg__stamp" + (cls ? " " + cls : "");
  }
  function show(kind, html, focus = true) {
    msg.hidden = false;
    msg.className = `form-msg is-${kind}`;
    msg.innerHTML = html;
    if (focus) msg.focus({ preventScroll: true });
    if (focus) msg.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* ── submit ── */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;
    if (form.elements.website.value) return; // honeypot: silently ignore bots

    const ok = Object.keys(rules).map(validate);
    if (ok.includes(false)) {
      const first = Object.keys(rules)[ok.indexOf(false)];
      const el = target(first);
      (el.matches("fieldset") ? el.querySelector("input") : el).focus();
      show("error", `<strong>A few details are missing.</strong> Please check the highlighted fields.`, false);
      return;
    }

    const d = snapshot();
    const phone = normalisePhone(d.phone);
    const fingerprint = JSON.stringify([d.name, d.business, phone, d.type, d.needs, d.message.trim()]);
    if (store.get(SENT_KEY) === fingerprint) {
      show("info", `<strong>We already have this enquiry.</strong> It was sent a moment ago, so there's no need to send it again. Change any detail if you'd like to send an update.`);
      return;
    }

    const q = new URLSearchParams(location.search);
    const summary = [
      `New Hospitality Growth enquiry`,
      ``,
      `Name: ${d.name.trim()}`,
      `Business: ${d.business.trim()}`,
      `Type: ${d.type}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${d.email.trim() || "(not given)"}`,
      `Help with: ${d.needs.join(", ")}`,
      ``,
      `About the property:`,
      d.message.trim(),
      ``,
      `Page: ${location.href}`,
      `Referrer: ${document.referrer || "(none)"}`,
    ].join("\n");

    const params = {
      // fields the existing todo.rw contact template uses
      name: d.name.trim(),
      reply_to: d.email.trim(),
      company: d.business.trim(),
      message: summary,
      // extra fields for a dedicated template
      to_email: CONFIG.contact.email,
      phone,
      service: CONFIG.page.service,
      business_type: d.type,
      needs: d.needs.join(", "),
      brief: d.message.trim(),
      page_url: location.href,
      referrer: document.referrer,
      utm_source: q.get("utm_source") || "",
      utm_medium: q.get("utm_medium") || "",
      utm_campaign: q.get("utm_campaign") || "",
      utm_content: q.get("utm_content") || "",
      fbclid: q.get("fbclid") || "",
    };

    busy = true;
    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");
    btn.textContent = "Sending your enquiry…";
    setStamp("Sending");
    msg.hidden = true;

    const res = await submitLead(params);

    busy = false;
    btn.disabled = false;
    btn.removeAttribute("aria-busy");
    btn.textContent = btnLabel;

    const mailto = `mailto:${CONFIG.contact.email}?subject=${encodeURIComponent("Hospitality Growth enquiry: " + d.business.trim())}&body=${encodeURIComponent(summary)}`;
    const wa = `https://wa.me/${CONFIG.contact.whatsapp.number}?text=${encodeURIComponent(
      `Hello TODO Growth, I'd like to talk about growing my hospitality business.\n\n${d.name.trim()}, ${d.business.trim()} (${d.type})\nHelp with: ${d.needs.join(", ")}\n\n${d.message.trim()}`)}`;
    const alternatives = `<div class="msg-actions"><a href="${esc(wa)}" target="_blank" rel="noopener">Send on WhatsApp</a><a href="${esc(mailto)}">Send by email</a></div>`;

    if (res.status === "accepted") {
      store.set(SENT_KEY, fingerprint);
      store.del(DRAFT_KEY);
      setStamp("Received", "is-sent");
      show("ok", `<strong>Thank you, ${esc(d.name.trim().split(" ")[0])}. Your enquiry is on its way.</strong> We'll be in touch on ${esc(phone)}${d.email.trim() ? " or by email" : ""} to arrange a first conversation.`);
      form.reset();
      updateCount();
      return;
    }

    setStamp("Not sent", "is-error");
    if (res.status === "not_connected") {
      show("info", `<strong>Online sending isn't switched on yet, so nothing was sent.</strong> Your details are still in the form. Please send them to us directly. Both buttons below include everything you wrote.${alternatives}`);
      return;
    }
    const why = res.reason === "offline" || res.reason === "network"
      ? "It looks like the connection dropped."
      : res.reason === "timeout" ? "Our form took too long to respond." : "Our form couldn't deliver it right now.";
    const tech = REVIEW_MODE ? `<br><code>${esc(res.reason)} ${esc(res.detail || "")}</code>` : "";
    show("error", `<strong>Your enquiry wasn't sent.</strong> ${why} Your details are still in the form, so you can try again, or send them directly. Both buttons include everything you wrote.${alternatives}${tech}`);
  });

}

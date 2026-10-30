/**
 * Navigation.
 *
 *  - Transparent over the hero; once you scroll it settles into a slim
 *    limestone bar (class .is-settled) with a reading-progress hairline.
 *  - The link for the chapter in view is marked aria-current.
 *  - Below 1100px, "Menu" opens a full-screen panel of chapter links.
 *    Escape closes it, focus stays inside while open and returns to the
 *    Menu button afterwards.
 */

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initNav() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  const progress = nav.querySelector("[data-progress]");
  const links = [...nav.querySelectorAll("[data-chapter]")];
  const sections = [...document.querySelectorAll("[data-chapter-section]")];
  let current = "";

  let ticking = false;
  const update = () => {
    ticking = false;
    nav.classList.toggle("is-settled", scrollY > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    const line = innerHeight * 0.35;
    let active = "top";
    for (const s of sections) if (s.getBoundingClientRect().top <= line) active = s.dataset.chapterSection;
    if (active === current) return;
    current = active;
    links.forEach((a) => (a.dataset.chapter === active ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current")));
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  requestAnimationFrame(() => nav.classList.add("is-ready"));

  initMenu(nav);
}

function initMenu(nav) {
  const btn = nav.querySelector("[data-menu]");
  const panel = document.querySelector("[data-menu-panel]");
  if (!btn || !panel) return;
  const focusables = () => [...panel.querySelectorAll("a, button")];
  let open = false;

  const show = () => {
    open = true;
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("menu-open");
    requestAnimationFrame(() => {
      panel.classList.add("is-open");
      setTimeout(() => focusables()[0].focus(), reduced() ? 0 : 300);
    });
  };
  const hide = (then) => {
    if (!open) return;
    open = false;
    panel.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("menu-open");
    setTimeout(() => {
      panel.hidden = true;
      if (then) then(); else btn.focus();
    }, reduced() ? 0 : 450);
  };

  btn.addEventListener("click", () => (open ? hide() : show()));
  panel.querySelector("[data-close]").addEventListener("click", () => hide());
  panel.querySelectorAll("[data-go]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    hide(() => {
      if (!target) return;
      target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
      history.replaceState(null, "", href);
      const h = target.querySelector("h1, h2");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    });
  }));
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); hide(); return; }
    if (e.key !== "Tab") return;
    const f = focusables();
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  matchMedia("(min-width: 1100px)").addEventListener("change", (m) => { if (m.matches && open) hide(); });
}

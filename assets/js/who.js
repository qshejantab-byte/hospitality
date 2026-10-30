/**
 * Who it's for: one large photograph with changing category information.
 *
 * Desktop (≥1024px): a list of five kinds of business beside one stage.
 * Choosing a category (click, keyboard, or hovering a fine pointer) reveals
 * its photograph with a wipe over the previous one, and swaps the copy.
 * Category buttons use aria-pressed; inactive panels are aria-hidden.
 * On smaller screens every category is shown as its own full-width scene,
 * so nothing is hidden and there is nothing to operate.
 */

const desktop = () => matchMedia("(min-width: 1024px)").matches;

export function initWho() {
  const root = document.querySelector("[data-who]");
  if (!root) return;
  const tabs = [...root.querySelectorAll("[data-who-tab]")];
  const panels = [...root.querySelectorAll("[data-who-panel]")];
  let active = 0;

  const sync = () => {
    const on = desktop();
    panels.forEach((p, i) => {
      p.classList.toggle("is-active", i === active);
      if (on && i !== active) p.setAttribute("aria-hidden", "true");
      else p.removeAttribute("aria-hidden");
      p.querySelectorAll("a").forEach((a) => (on && i !== active ? a.setAttribute("tabindex", "-1") : a.removeAttribute("tabindex")));
    });
    tabs.forEach((t, i) => t.setAttribute("aria-pressed", String(i === active)));
  };

  const select = (i) => {
    if (i === active) return;
    panels[active].classList.add("is-leaving");
    const leaving = panels[active];
    setTimeout(() => leaving.classList.remove("is-leaving"), 900);
    active = i;
    sync();
  };

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("focus", () => { if (desktop()) select(i); });
    t.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && desktop()) select(i); });
  });
  matchMedia("(min-width: 1024px)").addEventListener("change", sync);
  sync();
}

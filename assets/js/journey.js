/**
 * The guest pass (journey): as each stage crosses the reading line, its
 * stamp lands on the pass. The stamps are ordinary links to the stages.
 */

export function initPass() {
  const stages = [...document.querySelectorAll(".stage")];
  const stamps = [...document.querySelectorAll("[data-stamp]")];
  if (!stages.length) return;
  let active = -1;

  const set = (i) => {
    if (i === active) return;
    active = i;
    stamps.forEach((a, k) => {
      a.classList.toggle("is-stamped", k <= i);
      if (k === i) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
    });
    stages.forEach((s, k) => s.classList.toggle("is-active", k === i));
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const line = innerHeight * 0.55;
    let i = -1;
    stages.forEach((s, k) => { if (s.getBoundingClientRect().top < line) i = k; });
    set(i);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

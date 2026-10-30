/**
 * Photography motion: the opening sequence and gentle parallax.
 *
 *  - Hero: once the photograph has decoded, the page adds .is-in. CSS opens
 *    the image from an arch-shaped aperture to full bleed while the camera
 *    settles, then the headline lines rise.
 *  - Hero, interlude and closing photographs drift slightly against the
 *    scroll (transform only, one rAF-throttled handler).
 *  - The closing scene adds .is-in when it enters view (its own reveal).
 * Reduced motion: everything is shown in its final state, nothing drifts.
 */

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initHero() {
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const img = hero.querySelector(".hero__media img");
    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => hero.classList.add("is-in"));
      // once the camera has settled, let the scroll drift follow without easing lag
      setTimeout(() => hero.classList.add("is-settled"), reduced() ? 0 : 2800);
    };
    if (img.complete) go();
    else { img.addEventListener("load", go, { once: true }); img.addEventListener("error", go, { once: true }); setTimeout(go, 2500); }
  }

  const final = document.querySelector("[data-final]");
  if (final && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { final.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(final);
  } else if (final) final.classList.add("is-in");

  if (reduced()) return;
  const layers = [
    [hero, hero?.querySelector(".hero__media img"), 0.18],
    [document.querySelector("[data-interlude]"), document.querySelector(".interlude__media img"), 0.22],
    [final, final?.querySelector(".final__media img"), 0.16],
  ].filter(([s, i]) => s && i);

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    for (const [sec, img, k] of layers) {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const centre = r.top + r.height / 2 - vh / 2;
      img.style.setProperty("--drift", `${(-centre * k).toFixed(1)}px`);
    }
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update, { passive: true });
  update();
}

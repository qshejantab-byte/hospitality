/**
 * What we do: the editorial index.
 *
 * Six services as a disclosure list (one open at a time; each heading is a
 * button with aria-expanded). Opening a service redraws the line
 * illustration inside the sticky arch, which draws itself in.
 */

const ART = {
  content: `<rect x="70" y="150" width="160" height="110" rx="10"/><circle cx="150" cy="205" r="32"/><circle cx="150" cy="205" r="14"/><path d="M110 150 l14 -20 h52 l14 20"/><circle cx="208" cy="170" r="4"/><path d="M60 300 h180 M90 320 h120"/>`,
  web: `<rect x="55" y="120" width="190" height="150" rx="8"/><path d="M55 145 h190"/><circle cx="72" cy="133" r="3"/><circle cx="84" cy="133" r="3"/><circle cx="96" cy="133" r="3"/><rect x="72" y="160" width="80" height="58" rx="3"/><path d="M166 166 h60 M166 184 h48 M166 202 h56"/><rect x="72" y="234" width="64" height="20" rx="10"/><path d="M110 300 h80 M135 270 v30 M165 270 v30"/>`,
  tour: `<circle cx="150" cy="210" r="78"/><ellipse cx="150" cy="210" rx="78" ry="26"/><path d="M150 132 v156"/><path d="M84 160 a90 60 0 0 1 132 0"/><path d="M210 152 l8 8 -11 4"/><path d="M80 300 c30 -18 110 -18 140 0"/>`,
  chat: `<path d="M60 140 h120 a12 12 0 0 1 12 12 v54 a12 12 0 0 1 -12 12 h-80 l-24 20 v-20 h-16 a12 12 0 0 1 -12 -12 v-54 a12 12 0 0 1 12 -12z"/><path d="M128 230 h100 a12 12 0 0 1 12 12 v44 a12 12 0 0 1 -12 12 h-12 v18 l-22 -18 h-66 a12 12 0 0 1 -12 -12 v-44 a12 12 0 0 1 12 -12z"/><path d="M80 170 h86 M80 188 h60 M150 258 h70 M150 274 h46"/>`,
  assist: `<path d="M70 150 h110 a12 12 0 0 1 12 12 v50 a12 12 0 0 1 -12 12 h-74 l-22 18 v-18 h-14 a12 12 0 0 1 -12 -12 v-50 a12 12 0 0 1 12 -12z"/><path d="M216 120 l6 16 16 6 -16 6 -6 16 -6 -16 -16 -6 16 -6z"/><circle cx="200" cy="268" r="18"/><path d="M168 320 a32 26 0 0 1 64 0"/><path d="M120 250 c20 10 40 14 58 16" stroke-dasharray="4 6"/><path d="M88 182 h70 M88 198 h46"/>`,
  ops: `<rect x="70" y="120" width="96" height="150" rx="6"/><path d="M90 150 h56 M90 172 h40 M90 194 h50 M90 216 h36 M90 238 h46"/><circle cx="214" cy="200" r="22"/><circle cx="214" cy="200" r="7"/><path d="M214 222 v74 M214 262 h18 M214 282 h12"/><path d="M60 320 h180"/>`,
};

export function initServices() {
  const index = document.querySelector("[data-index]");
  if (!index) return;
  const items = [...index.querySelectorAll(".svc")];
  const svg = document.querySelector("[data-art-svg]");
  const cap = document.querySelector("[data-art-cap]");

  const showArt = (item) => {
    svg.innerHTML = `<g class="art__lines">${ART[item.dataset.art] || ""}</g>`;
    svg.querySelectorAll("path, rect, circle, ellipse").forEach((el, i) => {
      el.setAttribute("pathLength", "1");
      el.style.setProperty("--i", String(i));
    });
    cap.textContent = item.querySelector(".svc__name").textContent;
  };

  const open = (item) => {
    items.forEach((it) => {
      const on = it === item;
      it.classList.toggle("is-open", on);
      it.querySelector(".svc__head").setAttribute("aria-expanded", String(on));
      it.querySelector(".svc__body").hidden = !on;
    });
    showArt(item);
  };

  items.forEach((it) => it.querySelector(".svc__head").addEventListener("click", () => {
    if (it.classList.contains("is-open")) return;
    open(it);
  }));
  open(items[0]);
}

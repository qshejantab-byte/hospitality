/**
 * Missed arrivals: the leaky journey.
 *
 * A quiet data-art piece drawn on canvas. Dots (interested guests) flow
 * left to right through five gates; at each gate some drift down and fade.
 * The survivors reach the arch on the right ("your room"), which fills with
 * warm light in proportion to recent arrivals. The toggle "Close the gaps"
 * shows the same interest with the gaps narrowed.
 *
 * It is an illustration (labelled in the HTML): no numbers are shown or
 * implied. It runs only while on screen and the tab is visible. With
 * reduced motion it draws one still frame of each state.
 */

const LEAKY = [0.34, 0.3, 0.32, 0.28, 0.2];
const CONNECTED = [0.08, 0.06, 0.07, 0.05, 0.04];
const GATES = [0.16, 0.31, 0.46, 0.61, 0.76];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initLeak() {
  const root = document.querySelector("[data-leak]");
  if (!root) return;
  const canvas = root.querySelector("[data-leak-canvas]");
  const toggle = root.querySelector("[data-leak-toggle]");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1;
  let dots = [];
  let connected = false;
  let glow = 0.2;
  let running = false;
  let visible = false;
  let raf = 0;
  let last = 0;
  let spawnAcc = 0;

  const size = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const arch = () => {
    const w = Math.min(W * 0.12, H * 0.55);
    const h = Math.min(H * 0.78, w * 1.45);
    return { x: W * 0.9 - w / 2, y: H * 0.5 - h / 2, w, h };
  };

  const spawn = () => {
    const band = H * 0.26;
    dots.push({ x: -6, y: H * 0.5 + (Math.random() - 0.5) * band, vx: 0.07 + Math.random() * 0.03, vy: 0, lost: false, a: 1, gate: 0, r: 2 + Math.random() * 1.6 });
  };

  const step = (dt) => {
    const rates = connected ? CONNECTED : LEAKY;
    spawnAcc += dt;
    while (spawnAcc > 70) { spawnAcc -= 70; spawn(); }
    const A = arch();
    let arrived = 0;
    dots = dots.filter((d) => {
      d.x += d.vx * dt * (W / 900);
      if (d.lost) {
        d.vy += 0.0009 * dt;
        d.y += d.vy * dt;
        d.a -= 0.0016 * dt;
        return d.a > 0 && d.y < H + 10;
      }
      // gently pull the stream towards the centre line
      d.y += (H * 0.5 - d.y) * 0.0006 * dt;
      while (d.gate < GATES.length && d.x > W * GATES[d.gate]) {
        if (Math.random() < rates[d.gate]) { d.lost = true; d.vx *= 0.35; d.vy = 0.02; }
        d.gate++;
      }
      if (!d.lost && d.x > A.x + A.w * 0.5) { arrived++; return false; }
      return true;
    });
    const target = Math.min(1, arrived ? glow + arrived * 0.03 : glow);
    glow += (target - glow) * 0.5;
    glow -= 0.0004 * dt;
    glow = Math.max(0.12, Math.min(1, glow));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    // the path
    ctx.strokeStyle = "rgba(243,238,230,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H * 0.5); ctx.lineTo(W * 0.86, H * 0.5); ctx.stroke();
    // gates
    GATES.forEach((g, i) => {
      const x = W * g;
      ctx.strokeStyle = "rgba(243,238,230,0.28)";
      ctx.setLineDash([2, 5]);
      ctx.beginPath(); ctx.moveTo(x, H * 0.2); ctx.lineTo(x, H * 0.8); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(243,238,230,0.55)";
      ctx.font = "500 11px Manrope, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(i + 1).padStart(2, "0"), x, H * 0.14);
    });
    // the arch: your room
    const A = arch();
    const r = A.w / 2;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(A.x, A.y + A.h); ctx.lineTo(A.x, A.y + r); ctx.arc(A.x + r, A.y + r, r, Math.PI, 0); ctx.lineTo(A.x + A.w, A.y + A.h); ctx.closePath();
    const fill = ctx.createLinearGradient(0, A.y, 0, A.y + A.h);
    fill.addColorStop(0, `rgba(242,196,132,${0.15 + glow * 0.7})`);
    fill.addColorStop(1, `rgba(181,86,47,${0.1 + glow * 0.45})`);
    ctx.fillStyle = fill;
    ctx.shadowColor = `rgba(242,196,132,${glow * 0.8})`;
    ctx.shadowBlur = 40 * glow;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(243,238,230,0.7)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "rgba(243,238,230,0.75)";
    ctx.font = "500 11px Manrope, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("YOUR ROOM", A.x + r, A.y + A.h + 18);
    // guests
    for (const d of dots) {
      ctx.globalAlpha = Math.max(0, d.a);
      ctx.fillStyle = d.lost ? "#C98A6B" : "#F3EEE6";
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const loop = (t) => {
    const dt = Math.min(48, t - (last || t));
    last = t;
    step(dt);
    draw();
    if (running) raf = requestAnimationFrame(loop);
  };

  /** One still frame: simulate quietly, then draw once. */
  const still = () => {
    dots = [];
    glow = connected ? 0.85 : 0.22;
    for (let i = 0; i < 260; i++) step(32);
    glow = connected ? 0.85 : 0.22;
    draw();
  };

  const run = () => {
    const should = visible && !document.hidden && !reduced();
    if (should && !running) { running = true; last = 0; raf = requestAnimationFrame(loop); }
    if (!should && running) { running = false; cancelAnimationFrame(raf); }
    if (reduced()) still();
  };

  toggle.addEventListener("click", () => {
    connected = !connected;
    toggle.setAttribute("aria-pressed", String(connected));
    root.classList.toggle("is-connected", connected);
    toggle.querySelector(".toggle__label").textContent = connected ? "Show the gaps again" : "Close the gaps";
    if (reduced()) still();
  });

  size();
  // warm start: the stream is already flowing when it comes into view
  for (let i = 0; i < 180; i++) step(32);
  draw();
  addEventListener("resize", () => { size(); draw(); }, { passive: true });
  document.addEventListener("visibilitychange", run);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }, { threshold: 0.1 }).observe(canvas);
  } else { visible = true; run(); }
}

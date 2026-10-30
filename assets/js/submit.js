/**
 * Submission adapter: the only module that talks to a backend.
 *
 * Resolves to one of:
 *   { status: "accepted" }              EmailJS answered HTTP 200
 *   { status: "not_connected" }         submission switched off in config
 *   { status: "error", reason, detail } network, timeout or refusal (safe to retry)
 *
 * The UI may only show success for "accepted".
 */
import { CONFIG } from "./config.js";

export async function submitLead(params) {
  const s = CONFIG.submission;
  if (!s.enabled || !s.endpoint) return { status: "not_connected" };
  if (navigator.onLine === false) return { status: "error", reason: "offline" };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), s.timeoutMs);
  try {
    const res = await fetch(s.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      signal: ctrl.signal,
      body: JSON.stringify({
        service_id: s.serviceId,
        template_id: s.templateId,
        user_id: s.publicKey,
        template_params: params,
      }),
    });
    if (res.ok) return { status: "accepted" };
    let detail = "";
    try {
      detail = (await res.text()).slice(0, 200);
    } catch {
      /* no body */
    }
    return { status: "error", reason: `http_${res.status}`, detail };
  } catch (err) {
    return { status: "error", reason: err && err.name === "AbortError" ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}

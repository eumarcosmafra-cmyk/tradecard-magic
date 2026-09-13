/**
 * Eventos de funil — nunca enviam dado pessoal (CPF, telefone, e-mail, nome).
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "bella_attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landingPath?: string;
  referrer?: string;
};

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const stored = getAttribution();
  const fresh: Attribution = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) fresh[key] = value.slice(0, 120);
  });

  const hasFresh = Object.keys(fresh).length > 0;
  if (!hasFresh && stored.landingPath) return stored;

  const attribution: Attribution = {
    ...(hasFresh ? fresh : stored),
    landingPath: stored.landingPath || window.location.pathname,
    referrer: stored.referrer || document.referrer || undefined,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* ignore */
  }
  return attribution;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export type FunnelEvent =
  | "landing_view"
  | "early_access_cta_click"
  | "form_started"
  | "form_completed"
  | "registration_success"
  | "registration_duplicate"
  | "store_page_view"
  | "store_directions_click"
  | "product_view"
  | "add_to_cart"
  | "begin_checkout";

const PERSONAL_KEYS = ["cpf", "nome", "name", "email", "whatsapp", "phone", "telefone"];

function stripPersonalData(params: Record<string, unknown>): Record<string, unknown> {
  const safe: Record<string, unknown> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (PERSONAL_KEYS.some((p) => key.toLowerCase().includes(p))) return;
    safe[key] = value;
  });
  return safe;
}

export function trackEvent(event: FunnelEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const safe = { ...stripPersonalData(params), ...getAttribution() };

  const w = window as any;
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...safe });
    if (typeof w.gtag === "function") w.gtag("event", event, safe);
    if (typeof w.fbq === "function") w.fbq("trackCustom", event, safe);
  } catch {
    /* analytics nunca deve quebrar a página */
  }
}

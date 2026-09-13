import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "bella_cookie_consent";

/** Regiões que exigem consentimento prévio (UE/EEE + Reino Unido + Suíça). */
const CONSENT_REQUIRED_ZONES = [
  "Europe/", "Atlantic/Azores", "Atlantic/Madeira", "Atlantic/Canary", "Atlantic/Reykjavik",
];

function requiresConsent(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("America/Sao_Paulo") || tz.startsWith("America/")) return false;
    return CONSENT_REQUIRED_ZONES.some((zone) => tz.startsWith(zone));
  } catch {
    return false;
  }
}

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (requiresConsent()) setVisible(true);
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4">
      <div className="container mx-auto max-w-3xl rounded-2xl bg-ink text-white p-5 shadow-volt holo-border">
        <p className="font-body text-sm text-white/80">
          Usamos cookies de medição para entender como as pessoas chegam até a Bella. Você pode aceitar ou recusar —
          e mudar de ideia depois.{" "}
          <Link to="/politica-de-privacidade" className="underline text-electric">
            Política de privacidade
          </Link>
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => decide("accepted")}
            className="flex-1 font-display tracking-widest uppercase text-sm bg-gradient-electric text-ink py-2.5 rounded-lg"
          >
            Aceitar
          </button>
          <button
            onClick={() => decide("rejected")}
            className="flex-1 font-display tracking-widest uppercase text-sm border border-white/25 text-white py-2.5 rounded-lg"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
};

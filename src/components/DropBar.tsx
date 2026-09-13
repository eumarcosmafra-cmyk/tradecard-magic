import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";
import { isBeforeDrop, DROP_DATE_SHORT } from "@/lib/drop";
import { trackEvent } from "@/lib/analytics";

export const DropBar = () => {
  const { pathname } = useLocation();

  if (!isBeforeDrop()) return null;
  if (pathname.startsWith("/acesso-antecipado") || pathname.startsWith("/primeiro-drop")) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-volt border-b border-electric/30">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="inline-flex items-center gap-2 font-body text-xs sm:text-sm text-white/90">
          <Zap size={15} className="text-electric shrink-0" />
          30 anos de cards: o primeiro drop da nova Bella acontece em {DROP_DATE_SHORT}
        </span>
        <Link
          to="/acesso-antecipado"
          onClick={() => trackEvent("early_access_cta_click", { placement: "drop_bar" })}
          className="font-display text-xs sm:text-sm tracking-widest uppercase bg-gradient-electric text-ink px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
        >
          Quero entrar
        </Link>
      </div>
    </div>
  );
};

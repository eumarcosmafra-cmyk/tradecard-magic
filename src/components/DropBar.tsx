import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import { STORE_OPEN_LINE } from "@/lib/drop";
import { trackEvent } from "@/lib/analytics";

export const DropBar = () => {
  const { pathname } = useLocation();

  const hidden =
    pathname.startsWith("/acesso-antecipado") ||
    pathname.startsWith("/primeiro-drop") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/lista-cadastros") ||
    pathname.startsWith("/convite-influenciadores") ||
    pathname.startsWith("/lista-influenciadores");

  /** Libera espaço no fim da página para a barra fixa não cobrir o conteúdo. */
  useEffect(() => {
    if (hidden) return;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "6rem";
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-volt border-t border-electric/30">
      <div className="container mx-auto px-4 py-2 pr-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="inline-flex items-center gap-2 font-body text-xs sm:text-sm text-white/90">
          <MapPin size={15} className="text-electric shrink-0" />
          {STORE_OPEN_LINE}
        </span>
        <Link
          to="/loja-fisica"
          onClick={() => trackEvent("store_directions_click", { placement: "drop_bar" })}
          className="font-display text-xs sm:text-sm tracking-widest uppercase bg-gradient-electric text-ink px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
        >
          Como chegar
        </Link>
      </div>
    </div>
  );
};

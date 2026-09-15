import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/logo-bella.png";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Pokémon", href: "/pokemon", isRoute: true },
    { label: "Cards & Colecionáveis", href: "/cards-e-colecionaveis", isRoute: true },
    { label: "COPAG", href: "/copag", isRoute: true },
    { label: "Copa 2026", href: "/copa-2026", isRoute: true },
    { label: "Loja Física", href: "/loja-fisica", isRoute: true },
    { label: "Quem Somos", href: "/quem-somos", isRoute: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-md" : "bg-transparent"
      }`}
    >
      <div className="kiosk-stripe h-1.5 w-full" />
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link to="/" className="flex items-center">
          <span className="inline-flex items-center justify-center bg-ink rounded-lg px-3 py-1.5 border border-white/15 shadow-sm">
            <img src={logo} alt="Bella Figurinha" className="h-10 md:h-12 w-auto" />
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => {
            const linkClass = `font-display text-base tracking-wider uppercase hover:text-secondary transition-colors ${
              scrolled ? "text-foreground/70" : "text-white drop-shadow-md"
            }`;
            return (l as any).isRoute ? (
              <Link key={l.href} to={l.href} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            );
          })}
          <Link
            to="/acesso-antecipado"
            className="bg-gradient-yellow text-primary-foreground font-display text-base tracking-widest uppercase px-4 py-2 rounded-lg shadow-yellow"
          >
            Acesso antecipado
          </Link>
          <CartDrawer />
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <CartDrawer />
          <button className={scrolled ? "text-foreground" : "text-white drop-shadow-md"} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card/98 backdrop-blur-md border-b border-border px-4 pb-6 animate-fade-in">
          {links.map((l) =>
            (l as any).isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-display text-lg tracking-wider uppercase text-foreground/70 hover:text-secondary transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-display text-lg tracking-wider uppercase text-foreground/70 hover:text-secondary transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/acesso-antecipado"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center bg-gradient-yellow text-primary-foreground font-display text-lg tracking-widest uppercase py-3 rounded-xl shadow-yellow"
          >
            Acesso antecipado
          </Link>
        </div>
      )}
    </nav>
  );
};

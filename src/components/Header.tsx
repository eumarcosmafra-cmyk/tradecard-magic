import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/logo-bella.png";

const mainLinks = [
  { label: "Pokémon", href: "/pokemon" },
  { label: "Copa 2026", href: "/copa-2026" },
  { label: "Loja Física", href: "/loja-fisica" },
  { label: "Quem Somos", href: "/quem-somos" },
];

const categoryLinks = [
  { label: "Cards & Colecionáveis", href: "/cards-e-colecionaveis" },
  { label: "COPAG", href: "/copag" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = `font-display text-base tracking-wider uppercase hover:text-secondary transition-colors ${
    scrolled ? "text-foreground/70" : "text-white drop-shadow-md"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-md" : "bg-transparent"
      }`}
    >
      <div className="kiosk-stripe h-1.5 w-full" />
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link to="/" className="flex items-center">
          <span className="inline-flex items-center justify-center bg-foreground rounded-lg px-3 py-1.5 shadow-sm">
            <img src={logo} alt="Bella Figurinha" className="h-10 md:h-12 w-auto" />
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/pokemon" className={linkClass}>
            Pokémon
          </Link>

          <div className="relative group">
            <button className={`${linkClass} inline-flex items-center gap-1`}>
              Categorias <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block">
              <div className="min-w-[14rem] rounded-xl border border-border bg-card shadow-md p-2">
                {categoryLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="block rounded-lg px-3 py-2 font-body text-sm text-foreground/80 hover:bg-muted hover:text-secondary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks.slice(1).map((l) => (
            <Link key={l.href} to={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}

          <Link
            to="/loja-fisica"
            className="bg-gradient-yellow text-primary-foreground font-display text-base tracking-widest uppercase px-4 py-2 rounded-lg shadow-yellow"
          >
            Visite o quiosque
          </Link>
          <CartDrawer />
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <CartDrawer />
          <button
            aria-label="Abrir menu"
            className={scrolled ? "text-foreground" : "text-white drop-shadow-md"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card/98 backdrop-blur-md border-b border-border px-4 pb-6 animate-fade-in">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-display text-lg tracking-wider uppercase text-foreground/70 hover:text-secondary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <p className="pt-3 font-display text-sm tracking-widest uppercase text-secondary">Categorias</p>
          {categoryLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 font-body text-base text-foreground/70 hover:text-secondary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/loja-fisica"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center bg-gradient-yellow text-primary-foreground font-display text-lg tracking-widest uppercase py-3 rounded-xl shadow-yellow"
          >
            Visite o quiosque
          </Link>
        </div>
      )}
    </nav>
  );
};

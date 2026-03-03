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
    { label: "Produtos", href: "/#produtos", isRoute: true },
    { label: "Quem Somos", href: "/quem-somos", isRoute: true },
    { label: "Nossas Lojas", href: "/lojas", isRoute: true },
    { label: "Contato", href: "/contato", isRoute: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Bella Figurinha" className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            (l as any).isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className="font-display text-lg tracking-wider uppercase text-foreground/70 hover:text-secondary transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-lg tracking-wider uppercase text-foreground/70 hover:text-secondary transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <CartDrawer />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <CartDrawer />
          <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-b border-border px-4 pb-6 animate-fade-in">
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
        </div>
      )}
    </nav>
  );
};

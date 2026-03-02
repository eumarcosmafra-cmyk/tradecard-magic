import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <span className="text-xl font-bold text-foreground tracking-tight">Bella Figurinha</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
          <a href="#produtos" className="hover:text-foreground transition-colors">Catálogo</a>
          <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};

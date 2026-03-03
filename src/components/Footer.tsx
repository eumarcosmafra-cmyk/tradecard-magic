import { Link } from "react-router-dom";
import logo from "@/assets/logo-bella.png";

export const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <img src={logo} alt="Bella Figurinha" className="h-16 mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed font-body">
            Distribuidor oficial Panini. Cards e figurinhas colecionáveis.
          </p>
        </div>
        <div>
          <h5 className="font-display text-lg tracking-wider uppercase mb-4 text-secondary">Navegação</h5>
          <ul className="space-y-2">
            <li><Link to="/#produtos" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Produtos</Link></li>
            <li><Link to="/quem-somos" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Quem Somos</Link></li>
            <li><Link to="/lojas" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Nossas Lojas</Link></li>
            <li><Link to="/contato" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Contato</Link></li>
            <li><Link to="/perguntas-frequentes" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-display text-lg tracking-wider uppercase mb-4 text-secondary">Institucional</h5>
          <ul className="space-y-2">
            <li><Link to="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Política de Privacidade</Link></li>
            <li><Link to="/termos-de-uso" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Termos de Uso</Link></li>
            <li><Link to="/politica-de-trocas-e-devolucoes" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Trocas e Devoluções</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-display text-lg tracking-wider uppercase mb-4 text-secondary">Contato</h5>
          <p className="text-sm text-muted-foreground font-body">contato@bellafigurinha.com.br</p>
          <p className="text-sm text-muted-foreground font-body">(11) 97660-9139</p>
          <p className="text-sm text-muted-foreground font-body mt-3">Rua Brigadeiro Franco, 80420-200</p>
          <p className="text-sm text-muted-foreground font-body">Curitiba, PR - Brasil</p>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} Bella Figurinha — Distribuidor oficial Panini. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

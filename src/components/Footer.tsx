import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import logo from "@/assets/logo-bella.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
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
            <li><Link to="/perguntas-frequentes" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Perguntas Frequentes</Link></li>
            <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Blog</Link></li>
            <li><Link to="/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026" className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body">Como Jogar Adrenalyn XL Copa</Link></li>
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
        <div>
          <h5 className="font-display text-lg tracking-wider uppercase mb-4 text-secondary">Siga a Bella</h5>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Nos acompanhe nas redes e fique por dentro das novidades!
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/bellafigurinha?igsh=MWs3bnp2Y2tqYnNrNA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white px-4 py-3 rounded-lg font-body text-sm hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
              <span className="font-medium">@bellafigurinha</span>
            </a>
            <a
              href="https://www.tiktok.com/@bellafigurinhaof?_r=1&_t=ZS-95iykYG2PhA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black text-white px-4 py-3 rounded-lg font-body text-sm hover:opacity-90 transition-opacity border border-white/20"
            >
              <TikTokIcon className="w-5 h-5" />
              <span className="font-medium">@bellafigurinhaof</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground font-body">
          Bella Figurinha LTDA — CNPJ: 65.289.034/0001-93
        </p>
        <p className="text-xs text-muted-foreground font-body mt-1">
          © {new Date().getFullYear()} Bella Figurinha — Distribuidor oficial Panini. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

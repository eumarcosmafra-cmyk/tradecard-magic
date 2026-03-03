import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, Package, Truck, Shield, Award, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-bella.png";

const Index = () => {
  const { data: products, isLoading, error } = useProducts();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Bella Figurinha | Comprar Figurinhas e Cards FIFA World Cup 2026 Panini"
        description="Distribuidor oficial Panini. Compre figurinhas e cards Adrenalyn XL FIFA World Cup 2026™ com envio para todo Brasil. Produto original, frete grátis nos kits."
        canonical="https://bellafigurinha.com.br/"
      />
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="floating opacity-0 animate-fade-in">
              <img src={logo} alt="Bella Figurinha" className="w-44 md:w-64 drop-shadow-2xl" />
            </div>

            <span className="inline-block bg-secondary/90 text-secondary-foreground font-display text-sm md:text-base tracking-widest uppercase px-5 py-1.5 rounded-full opacity-0 animate-fade-in [animation-delay:0.1s]">
              Distribuidor Oficial Panini
            </span>

            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl tracking-wider leading-none text-white opacity-0 animate-fade-in [animation-delay:0.15s] drop-shadow-lg">
              COLECIONE{" "}
              <span className="text-gradient-yellow">MEMÓRIAS!</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-body opacity-0 animate-fade-in [animation-delay:0.3s] drop-shadow">
              Cards FIFA World Cup 2026™ Adrenalyn XL™ — Os melhores cards e figurinhas colecionáveis. Confira nosso catálogo!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in [animation-delay:0.45s]">
              <a
                href="#produtos"
                className="bg-gradient-yellow text-primary-foreground font-display text-xl md:text-2xl tracking-wider uppercase px-12 py-5 rounded-xl hover:opacity-90 transition-opacity shadow-yellow-lg animate-pulse-glow"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white/70 text-sm font-body">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-primary" />
                <span>Envio para todo Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-primary" />
                <span>Produto 100% Original</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-primary" />
                <span>Distribuidor Oficial Panini</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ArrowDown size={24} className="text-white" />
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Catálogo
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase text-foreground">
            Nossos <span className="text-gradient-yellow">Produtos</span>
          </h2>
          <p className="text-muted-foreground mt-3 font-body">Confira os lançamentos disponíveis</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            <p className="font-body">Erro ao carregar produtos. Tente novamente mais tarde.</p>
          </div>
        )}

        {!isLoading && !error && products && products.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Nenhum produto encontrado.</p>
          </div>
        )}

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Index;

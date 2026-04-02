import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, Package, Truck, Shield, Award, ArrowDown, Calendar, Star } from "lucide-react";
import { type ShopifyProduct } from "@/lib/shopify";
import { homePageJsonLd, injectJsonLd } from "@/lib/jsonld";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-bella.png";
import { CopaBannerCarousel } from "@/components/CopaBannerCarousel";

/** Palavras-chave que identificam produtos de Figurinhas/Álbuns da Copa */
const isCopaStickerProduct = (p: ShopifyProduct) => {
  const text = (p.node.title + " " + p.node.handle).toLowerCase();
  return (
    text.includes("album") ||
    text.includes("álbum") ||
    text.includes("figurinha") ||
    text.includes("sticker") ||
    (text.includes("envelope") && !text.includes("adrenalyn"))
  );
};

const Index = () => {
  const { data: products, isLoading, error } = useProducts();
  const location = useLocation();

  const copaProducts = products?.filter(isCopaStickerProduct) || [];
  const adrenalynProducts = products?.filter((p) => !isCopaStickerProduct(p)) || [];

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  // Inject Home page JSON-LD
  useEffect(() => {
    return injectJsonLd("home", homePageJsonLd());
  }, []);

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

      {/* Banner Oficial Panini */}
      <section className="bg-[#006B3F]">
        <div className="max-w-7xl mx-auto">
          <img
            src={bannerPanini}
            alt="Banner Oficial Panini FIFA World Cup 2026 - Álbum de Figurinhas Oficial - 7 figurinhas por envelope - Pré-venda disponível"
            className="w-full h-auto block"
            loading="eager"
          />
        </div>
      </section>

      {/* ====== SEÇÃO 1 — Figurinhas & Álbuns Copa 2026 (Destaque + Pré-venda) ====== */}
      <section id="produtos" className="container mx-auto px-4 pt-20 pb-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-display text-sm tracking-widest uppercase px-5 py-2 rounded-full mb-4">
            <Calendar size={16} />
            Pré-venda — Envio na 1ª quinzena de Abril
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase text-foreground">
            <Star className="inline-block text-primary mb-2 mr-2" size={32} />
            Álbum & Figurinhas <span className="text-gradient-yellow">Copa 2026</span>
          </h2>
          <p className="text-muted-foreground mt-3 font-body max-w-2xl mx-auto">
            O álbum oficial e os envelopes de figurinhas FIFA World Cup 2026™ chegaram! Garanta já na pré-venda com envio prioritário.
          </p>
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

        {!isLoading && !error && copaProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Em breve — produtos da Copa serão adicionados.</p>
          </div>
        )}

        {copaProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {copaProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} showPreSale />
            ))}
          </div>
        )}
      </section>

      {/* ====== SEÇÃO 2 — Cards Adrenalyn XL ====== */}
      {!isLoading && !error && adrenalynProducts.length > 0 && (
        <section className="container mx-auto px-4 pt-10 pb-20">
          <div className="text-center mb-14">
            <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Coleção
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase text-foreground">
              Cards <span className="text-gradient-yellow">Adrenalyn XL</span>
            </h2>
            <p className="text-muted-foreground mt-3 font-body">
              A coleção oficial de trading cards FIFA World Cup 2026™
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {adrenalynProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;

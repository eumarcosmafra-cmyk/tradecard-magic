import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, Package, Calendar, Star } from "lucide-react";
import { type ShopifyProduct } from "@/lib/shopify";
import { homePageJsonLd, injectJsonLd } from "@/lib/jsonld";
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
      {/* Banners Oficiais Panini Copa 2026 */}
      <CopaBannerCarousel />

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

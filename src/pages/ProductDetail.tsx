import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingCart, ArrowLeft, Zap, Star, Shield, Truck, RefreshCw, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { EnvelopeContent } from "@/components/EnvelopeContent";
import { CardCategories } from "@/components/CardCategories";
import { GoldenBallers } from "@/components/GoldenBallers";
import { Eternos22 } from "@/components/Eternos22";
import { Mascotes } from "@/components/Mascotes";
import { Selecoes } from "@/components/Selecoes";
import { ProductFAQ } from "@/components/ProductFAQ";
import { FinalCTA } from "@/components/FinalCTA";

/* ─── Sub-components ─── */

const TrustStrip = () => (
  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground font-body">
    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> Produto original Panini</span>
    <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-primary" /> Pronta entrega</span>
    <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-primary" /> Troca 30 dias</span>
    <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-primary" /> Pagamento seguro</span>
  </div>
);

const RatingBadge = () => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    <span className="text-sm text-muted-foreground font-body">4.9 · Produto licenciado FIFA & Panini</span>
  </div>
);

interface VariantCardProps {
  title: string;
  description: string;
  price: string;
  formatPrice: (amount: string) => string;
  isSelected: boolean;
  isAvailable: boolean;
  badges?: Array<{ label: string; color: "fire" | "green" }>;
  onSelect: () => void;
}

const VariantCard = ({ title, description, price, formatPrice, isSelected, isAvailable, badges = [], onSelect }: VariantCardProps) => (
  <button
    onClick={() => isAvailable && onSelect()}
    disabled={!isAvailable}
    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
      isSelected
        ? "border-primary bg-primary/5 shadow-yellow"
        : isAvailable
        ? "border-border hover:border-primary/40 bg-card"
        : "border-border bg-muted/30 opacity-50 cursor-not-allowed"
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-primary" : "border-muted-foreground/40"}`}>
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-base tracking-wider uppercase">{title}</span>
            {badges.map((b) => (
              <span
                key={b.label}
                className={`text-[10px] font-display tracking-wider uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${
                  b.color === "fire"
                    ? "bg-orange-500/15 text-orange-600 border border-orange-500/30"
                    : "bg-green-500/15 text-green-600 border border-green-500/30"
                }`}
              >
                {b.label}
              </span>
            ))}
            {!isAvailable && (
              <span className="text-xs font-display tracking-wider uppercase text-destructive">Esgotado</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-body mt-0.5">{description}</p>
        </div>
      </div>
      <span className="font-display text-xl tracking-wide text-foreground whitespace-nowrap flex-shrink-0">
        {formatPrice(price)}
      </span>
    </div>
  </button>
);

/* ─── Main page ─── */

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground font-body">Produto não encontrado.</p>
          <Link to="/" className="text-secondary hover:underline mt-4 inline-block font-display text-lg tracking-wider uppercase">Voltar à loja</Link>
        </div>
      </div>
    );
  }

  const { node } = product;
  const images = node.images.edges;
  const variants = node.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const selectedImage = images[selectedImageIndex]?.node;

  const formatPrice = (amount: string) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: selectedVariant?.price.currencyCode || "BRL" }).format(parseFloat(amount));

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { description: `${node.title} — ${selectedVariant.title}` });
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    // Open window immediately in click context to avoid popup blocker
    const win = window.open("about:blank", "_blank");
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    if (checkoutUrl && win) {
      win.location.href = checkoutUrl;
    } else if (win) {
      win.close();
      toast.error("Erro ao gerar link de checkout. Tente novamente.");
    }
  };

  /* Badge logic: detect keywords in variant titles for enrichment */
  const getVariantBadges = (title: string, index: number): Array<{ label: string; color: "fire" | "green" }> => {
    const badges: Array<{ label: string; color: "fire" | "green" }> = [];
    const lowerTitle = title.toLowerCase();
    // "Mais vendido" for the middle/popular variant
    if (index === 1 || lowerTitle.includes("20") || lowerTitle.includes("popular")) {
      badges.push({ label: "Mais vendido 🔥", color: "fire" });
    }
    // "Frete Grátis" for kits with 20+ envelopes
    if (index >= 1 || lowerTitle.includes("30") || lowerTitle.includes("caixa")) {
      badges.push({ label: "Frete Grátis", color: "green" });
    }
    return badges;
  };

  /* Build variant description from selectedOptions */
  const getVariantDescription = (v: typeof selectedVariant) => {
    if (!v) return "";
    const opts = v.selectedOptions?.map((o) => `${o.value}`).join(" · ") || "";
    // Attempt to generate a descriptive line
    const title = v.title.toLowerCase();
    if (title.includes("10")) return "80 cards + cupom por envelope";
    if (title.includes("20")) return "160 cards + cupom por envelope";
    if (title.includes("24")) return "192 cards + cupom por envelope";
    if (title.includes("30")) return "240 cards + cupom por envelope";
    return opts;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${node.title} | Bella Figurinha — Cards Panini FIFA 2026`}
        description={node.description || `Compre ${node.title} na Bella Figurinha, distribuidor oficial Panini. Produto original com envio para todo Brasil.`}
        canonical={`https://bellafigurinha.com.br/produto/${handle}`}
        ogImage={images[0]?.node.url}
      />
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-6 font-body">
          <ArrowLeft className="w-4 h-4" />
          Voltar à loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ─── Images ─── */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border-2 border-primary/20 relative">
              {/* PRÉ-VENDA badge */}
              <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-display tracking-widest uppercase px-3 py-1.5 rounded-md shadow-yellow">
                Pré-venda
              </div>
              {selectedImage ? (
                <img src={selectedImage.url} alt={selectedImage.altText || node.title} className="w-full h-full object-contain p-6" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">Sem imagem</div>
              )}
              {!selectedVariant?.availableForSale && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs font-display tracking-wider uppercase px-3 py-1.5 rounded-md">
                  Esgotado
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      i === selectedImageIndex ? "border-primary shadow-yellow scale-105" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Info ─── */}
          <div className="space-y-5">
            {/* Breadcrumb badge */}
            <div className="inline-block border border-primary/40 rounded-full px-4 py-1">
              <span className="text-[11px] font-display tracking-[0.15em] uppercase text-foreground/60">
                PANINI · FIFA WORLD CUP 2026™ · ADRENALYN XL™
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] tracking-wider uppercase text-foreground leading-tight">
              {node.title}
            </h1>

            {node.description && (
              <p className="text-muted-foreground leading-relaxed font-body text-sm">{node.description}</p>
            )}

            <RatingBadge />

            {/* Price box */}
            {selectedVariant && (
              <div className="bg-white border border-border rounded-xl p-5 shadow-[0_4px_0_0_hsl(var(--border)),0_8px_20px_-4px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground font-body uppercase tracking-wide">Por</span>
                  <span className="font-display text-4xl md:text-5xl tracking-wide text-foreground">
                    {formatPrice(selectedVariant.price.amount)}
                  </span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant?.availableForSale}
                size="lg"
                className="w-full bg-gradient-yellow text-primary-foreground font-display text-xl tracking-wider uppercase shadow-yellow-lg hover:opacity-90 transition-opacity py-7"
              >
                {cartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : !selectedVariant?.availableForSale ? (
                  "Produto Esgotado"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={cartLoading || !selectedVariant?.availableForSale}
                variant="outline"
                size="lg"
                className="w-full font-display text-xl tracking-wider uppercase border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all py-7"
              >
                <Zap className="w-5 h-5 mr-2" />
                Comprar Agora
              </Button>
            </div>

            {/* Free shipping banner */}
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2.5">
              <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-body text-green-700 font-medium">Frete grátis em pedidos acima de R$ 299,90</span>
            </div>

            {/* Trust strip */}
            <TrustStrip />
          </div>
        </div>

        {/* ─── Stats bar ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { emoji: "🃏", value: "8", label: "Cards por envelope" },
            { emoji: "🏆", value: "630", label: "Cards na coleção total" },
            { emoji: "⭐", value: "9", label: "Golden Ballers exclusivos" },
            { emoji: "🏴", value: "42", label: "Seleções na coleção" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 text-center space-y-2 hover:border-primary/40 transition-colors">
              <span className="text-3xl">{stat.emoji}</span>
              <p className="font-display text-3xl tracking-wide text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Envelope content section ─── */}
        <EnvelopeContent
          imageUrl={images[0]?.node.url}
          imageAlt={node.title}
          variantTitle={selectedVariant?.title}
        />

        {/* ─── 42 Seleções ─── */}
        <Selecoes />

        {/* ─── Card categories section ─── */}
        <CardCategories />

        {/* ─── Golden Ballers ─── */}
        <GoldenBallers />

        {/* ─── Eternos 22 ─── */}
        <Eternos22 />

        {/* ─── Mascotes ─── */}
        <Mascotes />

        {/* ─── FAQ ─── */}
        <ProductFAQ />

        {/* ─── Final CTA ─── */}
        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;

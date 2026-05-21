import { useState, useEffect } from "react";
import { productJsonLd, breadcrumbSchema, organizationSchema, faqPageJsonLd, injectJsonLd } from "@/lib/jsonld";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingCart, ArrowLeft, Zap, Star, Shield, Truck, RefreshCw, CreditCard, Calendar } from "lucide-react";
import { toast } from "sonner";
import { getArrivalDate } from "@/lib/arrivalDate";
import { EnvelopeContent } from "@/components/EnvelopeContent";
import { CardCategories } from "@/components/CardCategories";
import { GoldenBallers } from "@/components/GoldenBallers";
import { Eternos22 } from "@/components/Eternos22";
import { Mascotes } from "@/components/Mascotes";
import { Selecoes } from "@/components/Selecoes";
import { ProductFAQ, getFaqItemsForHandle } from "@/components/ProductFAQ";
import { FinalCTA } from "@/components/FinalCTA";
import AdrenalynDescription from "@/components/AdrenalynDescription";

const getProductCategory = (handle: string): "album-only" | "envelopes-only" | "album-with-envelopes" | "adrenalyn" | "default" => {
  const h = handle.toLowerCase();
  // Handles específicos do Shopify (cópias com nome enganoso) que são álbuns sozinhos
  const albumOnlyHandles = [
    "copa-do-mundo-2026-kit-com-12-envelopes-fifa-world-cup-2026™️-copy",
    "copa-do-mundo-2026-kit-com-12-envelopes-fifa-world-cup-2026-copy",
  ];
  if (albumOnlyHandles.includes(h)) return "album-only";
  if (h.includes("album-capa-dura") && !h.includes("envelope")) return "album-only";
  if (h.includes("album-brochura") && !h.includes("envelope")) return "album-only";
  if (h.includes("album-capa-cartao") && !h.includes("envelope")) return "album-only";
  if (h.includes("album") && h.includes("envelope")) return "album-with-envelopes";
  if (h.includes("envelope") && !h.includes("album")) return "envelopes-only";
  if (h.includes("kit") && !h.includes("album")) return "envelopes-only";
  if (h.includes("caixa") && !h.includes("album")) return "envelopes-only";
  if (h.includes("adrenalyn") || h.includes("cards")) return "adrenalyn";
  return "default";
};

const extractEnvelopeCount = (title: string, handle: string): number => {
  const source = `${title} ${handle}`.toLowerCase();
  const match = source.match(/(\d+)\s*[-_]?\s*envelope/);
  return match ? parseInt(match[1], 10) : 12;
};


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
  const productCategory = getProductCategory(handle || "");
  const isAlbumOnly = productCategory === "album-only";
  const isEnvelopesOnly = productCategory === "envelopes-only";
  const isAlbumWithEnvelopes = productCategory === "album-with-envelopes";
  const comboAlbumType: "brochura" | "capa-dura" | "capa-dura-ouro" | "capa-dura-prata" = (() => {
    const h = (handle || "").toLowerCase();
    if (h.includes("capa-dura-ouro")) return "capa-dura-ouro";
    if (h.includes("capa-dura-prata")) return "capa-dura-prata";
    if (h.includes("capa-dura")) return "capa-dura";
    return "brochura";
  })();
  const comboAlbumLabel = {
    "brochura": "brochura",
    "capa-dura": "capa dura",
    "capa-dura-ouro": "capa dura ouro",
    "capa-dura-prata": "capa dura prata",
  }[comboAlbumType];
  const _h = (handle || "").toLowerCase();
  const isAlbumBrochura = isAlbumOnly && (_h.includes("album-brochura") || _h.includes("album-capa-cartao"));
  const isAlbumTradicional = isAlbumOnly && !isAlbumBrochura && _h.includes("album-capa-dura") && _h.endsWith("-copy") && !_h.includes("prata");
  const isAlbumPrata = isAlbumOnly && !isAlbumBrochura && !isAlbumTradicional && _h.includes("prata");
  const albumColorAdj = isAlbumBrochura ? "brochura" : isAlbumTradicional ? "tradicional" : isAlbumPrata ? "prateado" : "dourado";
  const albumColorNoun = isAlbumBrochura ? "brochura" : isAlbumTradicional ? "tradicional" : isAlbumPrata ? "prata" : "ouro";
  const albumFinishLabel = isAlbumBrochura
    ? "Capa flexível · 4 cores"
    : isAlbumTradicional
    ? "Capa dura · 4 cores"
    : `Metalizado ${albumColorAdj} · 4 cores`;
  const albumFormatLabel = isAlbumBrochura ? "Brochura · 232 × 270 mm" : "Capa dura · 232 × 270 mm";
  const albumDescriptionPhrase = isAlbumBrochura
    ? "brochura (capa flexível)"
    : isAlbumTradicional
    ? "capa dura tradicional"
    : `capa dura com acabamento metalizado ${albumColorAdj}`;

  // Inject Product + Breadcrumb JSON-LD into <head> for crawlers
  useEffect(() => {
    if (!product) return;
    const { node: n } = product;
    const imgs = n.images.edges;
    const vars = n.variants.edges;

    const cleanup1 = injectJsonLd("product", productJsonLd({
      name: n.title,
      description: n.description || `Compre ${n.title} na Bella Figurinha, distribuidor oficial Panini.`,
      handle: handle || n.handle,
      images: imgs.map((img) => img.node.url),
      variants: vars.map((v) => ({
        title: v.node.title,
        price: v.node.price.amount,
        currencyCode: v.node.price.currencyCode || "BRL",
        available: v.node.availableForSale,
      })),
    }));

    const cleanup2 = injectJsonLd("breadcrumb-product", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Produtos", url: "https://bellafigurinha.com.br/#produtos" },
      { name: n.title, url: `https://bellafigurinha.com.br/produto/${handle}` },
    ]));
    const cleanup3 = injectJsonLd("org-product", { "@context": "https://schema.org", ...organizationSchema });
    const cleanup4 = injectJsonLd("faq-product", faqPageJsonLd(getFaqItemsForHandle(handle)));

    return () => { cleanup1(); cleanup2(); cleanup3(); cleanup4(); };
  }, [product, handle]);

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
  const envelopeCount = (isEnvelopesOnly || isAlbumWithEnvelopes) ? extractEnvelopeCount(node.title, handle || "") : 0;
  const totalFigurinhas = envelopeCount * 7;
  const percentColecao = ((totalFigurinhas / 980) * 100).toFixed(1);
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
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
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
              {isAlbumWithEnvelopes ? (
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-foreground/60">
                  PANINI · FIFA WORLD CUP 2026™ · ÁLBUM + ENVELOPES
                </span>
              ) : isAlbumOnly ? (
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-foreground/60">
                  PANINI · FIFA WORLD CUP 2026™ · ÁLBUM OFICIAL
                </span>
              ) : isEnvelopesOnly ? (
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-foreground/60">
                  PANINI · FIFA WORLD CUP 2026™ · ENVELOPES OFICIAIS
                </span>
              ) : (
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-foreground/60">
                  PANINI · FIFA WORLD CUP 2026™ · ADRENALYN XL™
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] tracking-wider uppercase text-foreground leading-tight">
              {node.title}
            </h1>

            {isAlbumWithEnvelopes ? (
              <p className="text-muted-foreground leading-relaxed font-body text-sm">
                Combo de início da coleção FIFA World Cup 2026™: 1 álbum oficial Panini em formato {comboAlbumLabel} (112 páginas)
                + {envelopeCount} envelopes lacrados com 7 cromos cada — {totalFigurinhas} figurinhas para começar a colar.
                A coleção completa tem 980 cromos das 48 seleções do Mundial no México, EUA e Canadá.
                Produto licenciado, pronta entrega e envio para todo o Brasil.
              </p>
            ) : isAlbumOnly ? (
              <p className="text-muted-foreground leading-relaxed font-body text-sm">
                Álbum oficial Panini da FIFA World Cup 2026™ na versão {albumDescriptionPhrase}.
                112 páginas + capa para colar os 980 cromos da coleção (68 especiais), com todas as 48
                seleções que disputam o Mundial no México, Estados Unidos e Canadá. Produto licenciado,
                pronta entrega e envio para todo o Brasil.
              </p>
            ) : isEnvelopesOnly ? (
              <p className="text-muted-foreground leading-relaxed font-body text-sm">
                Kit com {envelopeCount} envelopes lacrados da FIFA World Cup 2026™, cada um contendo 7 cromos
                originais Panini — {totalFigurinhas} figurinhas no total para colar no álbum oficial.
                A coleção completa tem 980 cromos das 48 seleções que disputam o Mundial.
                Produto licenciado, pronta entrega e envio para todo o Brasil.
              </p>
            ) : (
              node.description && (
                <p className="text-muted-foreground leading-relaxed font-body text-sm">{node.description}</p>
              )
            )}

            {(() => {
              const arrivalDate = getArrivalDate(node.title);
              if (!arrivalDate) return null;
              return (
                <div className="flex items-center gap-3 bg-primary/10 border border-primary/40 rounded-xl px-4 py-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div className="font-body text-sm text-foreground">
                    <span className="font-display tracking-wider uppercase text-primary">Previsão de chegada:</span>{" "}
                    <strong className="text-base">{arrivalDate}</strong>
                  </div>
                </div>
              );
            })()}

            {(isAlbumOnly || isEnvelopesOnly) ? (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground font-body">Distribuidor oficial Panini · Produto licenciado FIFA</span>
              </div>
            ) : (
              <RatingBadge />
            )}

            {/* Price box */}
            {selectedVariant && (
              <div className="border border-border rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground font-body uppercase tracking-wide">Por</span>
                  <span className="font-display text-3xl md:text-4xl tracking-wide text-foreground">
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

            {/* Installment info */}
            <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5">
              <CreditCard className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-body text-foreground/80 font-medium">
                Parcele em até 6x sem juros (parcela mínima de R$ 100,00)
              </span>
            </div>

            {/* Trust strip */}
            <TrustStrip />
          </div>
        </div>

        {/* ─── Stats bar ─── */}
        {isAlbumOnly ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { emoji: "📖", value: "112", label: "Páginas + capa" },
              { emoji: "🃏", value: "980", label: "Cromos na coleção" },
              { emoji: "✨", value: "68", label: "Cromos especiais" },
              { emoji: "🏴", value: "48", label: "Seleções participantes" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 text-center space-y-2 hover:border-primary/40 transition-colors">
                <span className="text-3xl">{stat.emoji}</span>
                <p className="font-display text-3xl tracking-wide text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : isEnvelopesOnly ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { emoji: "✉️", value: String(envelopeCount), label: "Envelopes lacrados" },
              { emoji: "🃏", value: "7", label: "Cromos por envelope" },
              { emoji: "📚", value: String(totalFigurinhas), label: "Figurinhas no kit" },
              { emoji: "🏴", value: "48", label: "Seleções na coleção" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 text-center space-y-2 hover:border-primary/40 transition-colors">
                <span className="text-3xl">{stat.emoji}</span>
                <p className="font-display text-3xl tracking-wide text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : (
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
        )}

        {isAlbumOnly && (
          <section className="mt-16">
            <div className="inline-block bg-primary/10 border border-primary/40 rounded-full px-4 py-1 mb-3">
              <span className="text-[11px] font-display tracking-[0.15em] uppercase text-primary">
                SOBRE O PRODUTO
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase mb-6">
              O álbum oficial da Copa do Mundo 2026
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <p className="font-body text-foreground/80 leading-relaxed mb-4">
                Este é o álbum oficial da FIFA World Cup 2026™ na versão <strong>{albumDescriptionPhrase}</strong> —
                {isAlbumBrochura
                  ? " a edição mais acessível da coleção, ideal para quem quer aproveitar a Copa colando as figurinhas sem pagar a mais pelo acabamento premium, "
                  : isAlbumTradicional
                  ? " a edição clássica do álbum, ideal para colecionar e colar os cromos da maior Copa do Mundo da história, "
                  : " a edição premium da coleção para colecionadores que querem preservar a memória do maior Mundial da história, "}
                com 48 seleções participantes e três países-sede (México, Estados Unidos e Canadá).
              </p>
              <p className="font-body text-foreground/80 leading-relaxed">
                O álbum tem 112 páginas com espaço para os 980 cromos da coleção, com cromos especiais em papel
                metalizado e o universo completo do torneio. <strong>O produto vem apenas com o álbum</strong> —
                os envelopes com figurinhas são vendidos separadamente.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-4">Ficha técnica</p>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Formato</span>
                  <span className="font-medium text-right">{albumFormatLabel}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Acabamento</span>
                  <span className="font-medium text-right">{albumFinishLabel}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Páginas</span>
                  <span className="font-medium text-right">112 + capa</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Espaço para</span>
                  <span className="font-medium text-right">980 cromos (68 especiais)</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Seleções</span>
                  <span className="font-medium text-right">48 (todas as classificadas)</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Idioma</span>
                  <span className="font-medium text-right">Português</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Editora</span>
                  <span className="font-medium text-right">Panini · Licenciado FIFA™</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {isAlbumOnly && (
          <section className="mt-16">
            <div className="bg-primary/5 border border-primary/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">✉️</div>
                <div className="flex-1">
                  <p className="text-xs font-display tracking-widest uppercase text-primary mb-2">
                    ATENÇÃO
                  </p>
                  <h3 className="font-display text-xl md:text-2xl tracking-wide uppercase mb-2 text-foreground">
                    Este produto contém apenas o álbum
                  </h3>
                  <p className="font-body text-foreground/80 leading-relaxed mb-4">
                    Os envelopes com figurinhas são vendidos separadamente. Cada envelope contém 7 cromos
                    no formato 80 × 100 mm. Para completar os 980 espaços da coleção, você pode comprar
                    envelopes avulsos, kits ou caixas na Bella Figurinha.
                  </p>
                  <Link to="/" className="inline-flex items-center gap-2 text-primary font-display text-sm tracking-wider uppercase hover:underline">
                    Ver envelopes e kits disponíveis
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {isEnvelopesOnly && (
          <>
            <section className="mt-16">
              <div className="inline-block bg-primary/10 border border-primary/40 rounded-full px-4 py-1 mb-3">
                <span className="text-[11px] font-display tracking-[0.15em] uppercase text-primary">
                  CONTEÚDO DO KIT
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase mb-6">
                O que você vai receber
              </h2>
              <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 text-center mb-6">
                <p className="text-sm font-body text-muted-foreground mb-2">{envelopeCount} envelopes × 7 cromos</p>
                <p className="font-display text-4xl md:text-5xl tracking-wide text-primary">= {totalFigurinhas} figurinhas</p>
                <p className="text-sm font-body text-muted-foreground mt-2">para colar no álbum oficial</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <ul className="space-y-3 font-body text-sm">
                  {[
                    <><strong>{envelopeCount} envelopes lacrados</strong> no formato 80 × 100 mm</>,
                    <><strong>7 cromos por envelope</strong> no formato 49 × 65 mm</>,
                    <><strong>Cromos das 48 seleções</strong> participantes do Mundial 2026 (México, EUA e Canadá)</>,
                    <><strong>Chance de cromos especiais</strong> em papel metalizado (68 na coleção completa)</>,
                    <><strong>Produto licenciado FIFA</strong> e produzido pela Panini Brasil</>,
                  ].map((content, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      </div>
                      <span>{content}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-4">Ficha técnica</p>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Envelopes no kit</span>
                    <span className="font-medium text-right">{envelopeCount} unidades lacradas</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Formato do envelope</span>
                    <span className="font-medium text-right">80 × 100 mm</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Cromos por envelope</span>
                    <span className="font-medium text-right">7 figurinhas</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Total de figurinhas</span>
                    <span className="font-medium text-right">{totalFigurinhas} cromos</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Formato do cromo</span>
                    <span className="font-medium text-right">49 × 65 mm</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Coleção completa</span>
                    <span className="font-medium text-right">980 cromos (68 especiais)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Editora</span>
                    <span className="font-medium text-right">Panini · Licenciado FIFA™</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-16">
              <div className="bg-primary/5 border border-primary/30 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">📕</div>
                  <div className="flex-1">
                    <p className="text-xs font-display tracking-widest uppercase text-primary mb-2">ATENÇÃO</p>
                    <h3 className="font-display text-xl md:text-2xl tracking-wide uppercase mb-2 text-foreground">
                      Este produto não inclui o álbum
                    </h3>
                    <p className="font-body text-foreground/80 leading-relaxed mb-4">
                      Este kit contém apenas os {envelopeCount} envelopes com figurinhas. Para colar os cromos,
                      você precisa do álbum oficial da Copa do Mundo 2026, vendido separadamente em três versões:
                      brochura (capa flexível), capa dura comum e capa dura com acabamento metalizado (Ouro ou Prata).
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 text-primary font-display text-sm tracking-wider uppercase hover:underline">
                      Ver álbuns disponíveis
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {!isAlbumOnly && !isEnvelopesOnly && (
          <>
            {/* ─── Envelope content section ─── */}
            <EnvelopeContent
              imageUrl={images[0]?.node.url}
              imageAlt={node.title}
              variantTitle={selectedVariant?.title}
              productHandle={node.handle}
            />

            <AdrenalynDescription />
            <Selecoes />
            <CardCategories />
            <GoldenBallers />
            <Eternos22 />
            <Mascotes />
          </>
        )}

        {/* ─── FAQ ─── */}
        <ProductFAQ productHandle={node.handle} />

        {/* ─── Final CTA ─── */}
        {isAlbumOnly ? (
          <section className="mt-16">
            <div className="bg-gradient-yellow rounded-3xl p-8 md:p-12 text-center shadow-yellow-lg">
              <p className="text-xs font-display tracking-widest uppercase text-primary-foreground/80 mb-2">
                PRÉ-VENDA · ENVIO EM 25 DE MAIO
              </p>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider uppercase text-primary-foreground mb-3">
                Começa a sua coleção da Copa
              </h2>
              <p className="font-body text-primary-foreground/90 mb-6 max-w-xl mx-auto">
                Garanta o álbum oficial antes do início do Mundial e prepare-se para colar os 980 cromos
                da maior Copa do Mundo da história.
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="bg-white text-primary border-white hover:bg-white/90 font-display text-lg tracking-wider uppercase px-8 py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar álbum agora ↑
              </Button>
            </div>
          </section>
        ) : isEnvelopesOnly ? (
          <section className="mt-16">
            <div className="bg-gradient-yellow rounded-3xl p-8 md:p-12 text-center shadow-yellow-lg">
              <p className="text-xs font-display tracking-widest uppercase text-primary-foreground/80 mb-2">
                PRÉ-VENDA · ENVIO EM ABRIL/2026
              </p>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider uppercase text-primary-foreground mb-3">
                Comece sua coleção da Copa
              </h2>
              <p className="font-body text-primary-foreground/90 mb-6 max-w-xl mx-auto">
                {envelopeCount} envelopes com {totalFigurinhas} cromos pra abrir antes do Mundial começar.
                Garanta agora e receba antes da abertura da Copa do Mundo 2026.
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="bg-white text-primary border-white hover:bg-white/90 font-display text-lg tracking-wider uppercase px-8 py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar kit agora ↑
              </Button>
            </div>
          </section>
        ) : (
          <FinalCTA />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;

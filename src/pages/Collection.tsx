import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { useCollection } from "@/hooks/useCollection";
import { Loader2, Package, Layers, Sparkles, Shield, MapPin, Zap, RefreshCw } from "lucide-react";
import AdrenalynContent from "@/components/AdrenalynContent";
import AdrenalynFAQ from "@/components/AdrenalynFAQ";
import { organizationSchema, injectJsonLd } from "@/lib/jsonld";

/* ── collection metadata (expandable) ── */
interface TrustPill {
  icon: React.ReactNode;
  label: string;
}

interface CollectionMeta {
  badge: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  heroImage: string;
  bgImage: string;
  trustPills: TrustPill[];
}

const collectionsMeta: Record<string, CollectionMeta> = {
  "adrenalyn-xl": {
    badge: "Coleção Oficial Panini",
    headline: "FIFA World Cup 2026™",
    headlineHighlight: "Adrenalyn XL™",
    subtitle:
      "Trading cards oficiais da Copa do Mundo 2026. Colecione, monte seu time e desafie seus amigos em duelos épicos. Cada envelope traz 8 cards.",
    stats: [
      { value: "630", label: "Cards" },
      { value: "42", label: "Seleções" },
      { value: "9", label: "Golden Ballers" },
      { value: "100%", label: "Original" },
    ],
    heroImage:
      "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/kit_2_starter_pack_copa_do_mundo_2026_1_20260130123457_1da24aeb1b04-removebg-preview.png?v=1772559072",
    bgImage:
      "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/fundo_copa2026.png?v=1772553117",
    trustPills: [
      { icon: <Shield size={12} />, label: "100% originais Panini" },
      { icon: <MapPin size={12} />, label: "Envio todo Brasil" },
      { icon: <Zap size={12} />, label: "Pix instantâneo" },
      { icon: <RefreshCw size={12} />, label: "Troca em 30 dias" },
    ],
  },
};

const defaultMeta: CollectionMeta = {
  badge: "Coleção",
  headline: "",
  headlineHighlight: "",
  subtitle: "",
  stats: [],
  heroImage: "",
  bgImage: "",
  trustPills: [],
};

const Collection = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: collection, isLoading, error } = useCollection(handle || "");
  const meta = collectionsMeta[handle || ""] || defaultMeta;

  const title = collection?.title || meta.headline || "Coleção";
  const description =
    collection?.description || meta.subtitle || "";

  // Inject CollectionPage + ItemList + Organization JSON-LD
  useEffect(() => {
    const BASE_URL = "https://bellafigurinha.com.br";
    const products = collection?.products || [];

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": title, "item": `${BASE_URL}/colecao/${handle}` },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${BASE_URL}/colecao/${handle}/#collectionpage`,
          "url": `${BASE_URL}/colecao/${handle}`,
          "name": `${title} | Bella Figurinha`,
          "description": description.slice(0, 160),
          "isPartOf": { "@id": `${BASE_URL}/#website` },
          "about": { "@id": `${BASE_URL}/#organization` },
          "inLanguage": "pt-BR",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": products.length,
            "itemListElement": products.map((p: any, i: number) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `${BASE_URL}/produto/${p.node.handle}`,
              "name": p.node.title,
            })),
          },
        },
      ],
    };

    const cleanup = injectJsonLd(`collection-${handle}`, jsonLd);
    return cleanup;
  }, [handle, collection, title, description]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${title} | Bella Figurinha`}
        description={description.slice(0, 160)}
        canonical={`https://bellafigurinha.com.br/colecao/${handle}`}
      />
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: meta.bgImage
            ? `url(${meta.bgImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,70%,10%)]/95 via-[hsl(220,70%,32%)]/85 to-[hsl(220,70%,10%)]/93 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Left – text */}
            <div className="text-center md:text-left space-y-4">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary font-display text-xs tracking-[.18em] uppercase px-5 py-2 rounded-full border border-primary/30">
                <Sparkles size={14} />
                {meta.badge}
              </span>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider leading-none text-white">
                {meta.headline || title}
                {meta.headlineHighlight && (
                  <span className="block text-primary">{meta.headlineHighlight}</span>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-white/70 text-[15px] leading-relaxed max-w-lg mx-auto md:mx-0 font-body">
                {description}
              </p>

              {/* Stats */}
              {meta.stats.length > 0 && (
                <div className="flex flex-wrap gap-0 pt-4 justify-center md:justify-start">
                  {meta.stats.map((s, i) => (
                    <div
                      key={s.label}
                      className={`text-center px-5 ${
                        i < meta.stats.length - 1
                          ? "border-r border-white/10"
                          : ""
                      }`}
                    >
                      <span className="block font-display text-2xl md:text-3xl tracking-wider text-primary">
                        {s.value}
                      </span>
                      <span className="block text-[11px] uppercase tracking-widest text-white/50 font-display mt-0.5">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right – hero image */}
            {meta.heroImage && (
              <div className="flex justify-center md:justify-end">
                <img
                  src={meta.heroImage}
                  alt={title}
                  className="w-56 md:w-72 drop-shadow-2xl rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      {meta.trustPills.length > 0 && (
        <section className="bg-[hsl(220,70%,10%)] border-t border-white/[.07]">
          <div className="container mx-auto px-6 py-4 flex justify-center gap-2.5 flex-wrap">
            {meta.trustPills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 bg-white/[.07] border border-white/[.12] rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/70 whitespace-nowrap"
              >
                <span className="text-primary">{pill.icon}</span>
                {pill.label}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── Products grid ── */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-10">
          <Layers size={20} className="text-primary" />
          <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground">
            Produtos da Coleção
          </h2>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            <p className="font-body">
              Erro ao carregar a coleção. Tente novamente mais tarde.
            </p>
          </div>
        )}

        {!isLoading && !error && collection && collection.products.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              Nenhum produto encontrado nesta coleção.
            </p>
          </div>
        )}

        {collection && collection.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ── Supporting content ── */}
      {handle === "adrenalyn-xl" && (
        <>
          <AdrenalynContent />
          <AdrenalynFAQ />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Collection;

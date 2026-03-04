import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useCollections } from "@/hooks/useCollections";
import { Loader2, LayoutGrid, ArrowRight } from "lucide-react";
import { organizationSchema, injectJsonLd } from "@/lib/jsonld";

const Collections = () => {
  const { data: collections, isLoading, error } = useCollections();

  useEffect(() => {
    if (!collections) return;

    const BASE_URL = "https://bellafigurinha.com.br";

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Coleções", item: `${BASE_URL}/colecao` },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${BASE_URL}/colecao/#collectionpage`,
          url: `${BASE_URL}/colecao`,
          name: "Coleções | Bella Figurinha",
          description: "Explore todas as coleções de figurinhas e cards colecionáveis Panini disponíveis na Bella Figurinha.",
          isPartOf: { "@id": `${BASE_URL}/#website` },
          about: { "@id": `${BASE_URL}/#organization` },
          inLanguage: "pt-BR",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: collections.length,
            itemListElement: collections.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${BASE_URL}/colecao/${c.handle}`,
              name: c.title,
            })),
          },
        },
      ],
    };

    const cleanup = injectJsonLd("collections-listing", jsonLd);
    return cleanup;
  }, [collections]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Coleções | Bella Figurinha — Figurinhas e Cards Panini"
        description="Explore todas as coleções de figurinhas e cards colecionáveis Panini disponíveis na Bella Figurinha. Adrenalyn XL, FIFA World Cup 2026 e mais."
        canonical="https://bellafigurinha.com.br/colecao"
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,70%,8%)] via-[hsl(220,60%,18%)] to-[hsl(220,70%,8%)]">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary font-display text-xs tracking-[.18em] uppercase px-5 py-2 rounded-full border border-primary/30 mb-6">
            <LayoutGrid size={14} />
            Catálogo Completo
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-white leading-none">
            Nossas <span className="text-primary">Coleções</span>
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed max-w-lg mx-auto mt-4 font-body">
            Figurinhas, trading cards e kits colecionáveis Panini. Encontre a coleção perfeita para você.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-16">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            <p className="font-body">Erro ao carregar as coleções. Tente novamente mais tarde.</p>
          </div>
        )}

        {!isLoading && !error && collections && collections.length === 0 && (
          <div className="text-center py-20">
            <LayoutGrid className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Nenhuma coleção encontrada.</p>
          </div>
        )}

        {collections && collections.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/colecao/${collection.handle}`}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  {collection.image ? (
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <LayoutGrid className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-display text-xl tracking-wider uppercase text-foreground group-hover:text-primary transition-colors">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-muted-foreground text-sm font-body mt-1.5 line-clamp-2 leading-relaxed">
                      {collection.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-display tracking-widest uppercase mt-4 group-hover:gap-2.5 transition-all">
                    Ver Coleção <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Collections;

import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Loader2, Package } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { type ShopifyProduct } from "@/lib/shopify";
import { breadcrumbSchema, injectJsonLd } from "@/lib/jsonld";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  path: string;
  breadcrumbLabel: string;
  filter: (product: ShopifyProduct) => boolean;
  emptyMessage?: string;
  children?: ReactNode;
  dark?: boolean;
  /** Optional split of the filtered list into titled sections. */
  sections?: {
    title: string;
    description?: string;
    filter: (product: ShopifyProduct) => boolean;
  }[];
};

export const CategoryPage = ({
  eyebrow,
  title,
  intro,
  seoTitle,
  seoDescription,
  path,
  breadcrumbLabel,
  filter,
  emptyMessage = "Em breve — estamos preparando essa coleção.",
  children,
  dark = false,
}: Props) => {
  const { data: products, isLoading, error } = useProducts(100);
  const list = products?.filter(filter) ?? [];

  useEffect(() => {
    return injectJsonLd(`breadcrumb-${path}`, breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: breadcrumbLabel, url: `https://bellafigurinha.com.br${path}` },
    ]));
  }, [path, breadcrumbLabel]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={seoTitle} description={seoDescription} canonical={`https://bellafigurinha.com.br${path}`} />
      <Header />

      <section className={`${dark ? "bg-arena text-white" : "bg-muted"} pt-32 pb-16`}>
        <div className="container mx-auto px-4 text-center space-y-4">
          <span
            className={`inline-block rounded-full px-4 py-1.5 font-display text-sm tracking-widest uppercase ${
              dark ? "bg-electric/15 text-electric" : "bg-secondary/10 text-secondary"
            }`}
          >
            {eyebrow}
          </span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider uppercase leading-none">{title}</h1>
          <p className={`font-body max-w-2xl mx-auto ${dark ? "text-white/80" : "text-muted-foreground"}`}>{intro}</p>
        </div>
      </section>

      {children}

      <section className="container mx-auto px-4 py-16">
        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <p className="text-center font-body text-destructive py-16">
            Erro ao carregar produtos. Tente novamente mais tarde.
          </p>
        )}

        {!isLoading && !error && list.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-body text-muted-foreground">{emptyMessage}</p>
            <Link
              to="/acesso-antecipado"
              className="inline-block mt-6 bg-gradient-yellow text-primary-foreground font-display text-lg tracking-widest uppercase px-8 py-3 rounded-xl shadow-yellow"
            >
              Avise-me no primeiro drop
            </Link>
          </div>
        )}

        {list.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

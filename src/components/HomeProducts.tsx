import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { isPokemonProduct } from "@/lib/catalog";

export const HomeProducts = () => {
  const { data: products, isLoading, error } = useProducts(100);
  const pokemon = products?.filter(isPokemonProduct) ?? [];

  return (
    <section id="produtos" className="container mx-auto px-4 py-20">
      <div className="text-center mb-12 space-y-3">
        <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full">
          Na loja
        </span>
        <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">Cards Pokémon</h2>
        <p className="font-body text-muted-foreground max-w-2xl mx-auto">
          Os produtos da coleção de 30 anos disponíveis na Bella Figurinha.
        </p>
      </div>

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

      {!isLoading && !error && pokemon.length === 0 && (
        <p className="text-center font-body text-muted-foreground py-12">Nenhum produto encontrado.</p>
      )}

      {pokemon.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pokemon.slice(0, 6).map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/pokemon"
              className="inline-flex items-center gap-2 font-display text-lg tracking-widest uppercase text-secondary"
            >
              Ver todos os produtos <ArrowRight size={18} />
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

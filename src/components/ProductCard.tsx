import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  showPreSale?: boolean;
}

export const ProductCard = ({ product, showPreSale = false }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const available = variant?.availableForSale ?? false;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(amount);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { description: node.title });
  };

  return (
    <Link to={`/produto/${node.handle}`} className="group block">
      <div className="bg-card rounded-xl overflow-hidden border border-border card-hover relative">
        <div className="aspect-square overflow-hidden bg-muted relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sem imagem
            </div>
          )}
          {!available && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-md font-display tracking-wider uppercase">
              Esgotado
            </div>
          )}
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-display text-xl tracking-wider uppercase text-foreground line-clamp-2">{node.title}</h3>
          <p className="text-2xl font-bold text-gradient-yellow font-display tracking-wide">{formatPrice(price)}</p>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !available}
            className="w-full bg-gradient-yellow text-primary-foreground font-display text-base tracking-wider uppercase shadow-yellow hover:opacity-90 transition-opacity"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-2" />{available ? 'Adicionar' : 'Esgotado'}</>}
          </Button>
        </div>
      </div>
    </Link>
  );
};

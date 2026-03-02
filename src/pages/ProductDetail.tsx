import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
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
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Voltar à loja</Link>
        </div>
      </div>
    );
  }

  const { node } = product;
  const images = node.images.edges;
  const variants = node.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const selectedImage = images[selectedImageIndex]?.node;

  const formatPrice = (amount: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: selectedVariant?.price.currencyCode || 'BRL',
    }).format(parseFloat(amount));
  };

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
    toast.success("Adicionado ao carrinho!", { description: node.title });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar à loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
              {selectedImage ? (
                <img src={selectedImage.url} alt={selectedImage.altText || node.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sem imagem</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${i === selectedImageIndex ? 'border-primary' : 'border-border'}`}
                  >
                    <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{node.title}</h1>
              <p className="text-2xl font-bold text-primary mt-3">
                {selectedVariant ? formatPrice(selectedVariant.price.amount) : ''}
              </p>
            </div>

            {node.description && (
              <p className="text-muted-foreground leading-relaxed">{node.description}</p>
            )}

            {/* Variants */}
            {variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Variante</label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIndex(i)}
                      disabled={!v.node.availableForSale}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        i === selectedVariantIndex
                          ? 'bg-primary text-primary-foreground border-primary'
                          : v.node.availableForSale
                          ? 'border-border hover:border-primary/50'
                          : 'border-border opacity-50 cursor-not-allowed line-through'
                      }`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
              size="lg"
              className="w-full text-base"
            >
              {cartLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {selectedVariant?.availableForSale ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

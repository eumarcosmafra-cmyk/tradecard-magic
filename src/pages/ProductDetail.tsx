import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingCart, ArrowLeft, Zap } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const getCheckoutUrl = useCartStore(state => state.getCheckoutUrl);
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
    // Wait briefly for state to update then open checkout
    setTimeout(() => {
      const checkoutUrl = useCartStore.getState().getCheckoutUrl();
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    }, 300);
  };

  // Build breadcrumb from product tags/vendor
  const breadcrumb = [node.variants.edges[0]?.node.selectedOptions?.map(o => o.value).join(' · ')].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-6 font-body">
          <ArrowLeft className="w-4 h-4" />
          Voltar à loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border-2 border-primary/20 relative">
              {selectedImage ? (
                <img src={selectedImage.url} alt={selectedImage.altText || node.title} className="w-full h-full object-contain p-6" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">Sem imagem</div>
              )}
              {!selectedVariant?.availableForSale && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-display tracking-wider uppercase px-3 py-1.5 rounded-md">
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
                      i === selectedImageIndex ? 'border-primary shadow-yellow scale-105' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Breadcrumb badge */}
            <div className="inline-block border border-primary rounded-full px-4 py-1">
              <span className="text-xs font-display tracking-widest uppercase text-foreground/70">
                PANINI · {node.title.split(' - ')[0]}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase text-foreground leading-tight">
              {node.title}
            </h1>

            {node.description && (
              <p className="text-muted-foreground leading-relaxed font-body text-sm">{node.description}</p>
            )}

            {/* Variant selector as radio cards */}
            {variants.length > 1 && (
              <div className="space-y-3">
                <p className="font-display text-lg tracking-wider uppercase text-foreground">Selecione a quantidade</p>
                <div className="space-y-3">
                  {variants.map((v, i) => {
                    const isSelected = i === selectedVariantIndex;
                    const isAvailable = v.node.availableForSale;
                    return (
                      <button
                        key={v.node.id}
                        onClick={() => isAvailable && setSelectedVariantIndex(i)}
                        disabled={!isAvailable}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-yellow'
                            : isAvailable
                            ? 'border-border hover:border-primary/40 bg-card'
                            : 'border-border bg-muted/30 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {/* Radio circle */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'border-primary' : 'border-muted-foreground/40'
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display text-base tracking-wider uppercase">{v.node.title}</span>
                                {!isAvailable && (
                                  <span className="text-xs font-display tracking-wider uppercase text-destructive">Esgotado</span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground font-body mt-0.5">
                                {v.node.selectedOptions?.map(o => `${o.name}: ${o.value}`).join(' · ')}
                              </p>
                            </div>
                          </div>
                          <span className="font-display text-xl tracking-wide text-foreground whitespace-nowrap">
                            {formatPrice(v.node.price.amount)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Single variant price */}
            {variants.length === 1 && (
              <p className="text-3xl font-bold text-gradient-yellow font-display tracking-wide">
                {selectedVariant ? formatPrice(selectedVariant.price.amount) : ''}
              </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

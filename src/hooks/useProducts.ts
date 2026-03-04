import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useProducts(first = 20) {
  return useQuery({
    queryKey: ['shopify-products', first],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first });
      const products = (data?.data?.products?.edges || []) as ShopifyProduct[];
      return products.sort((a, b) => 
        parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    },
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = data?.data?.productByHandle;
      if (!product) return null;
      return { node: product } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}

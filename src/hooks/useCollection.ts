import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, type ShopifyProduct } from '@/lib/shopify';

const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

export interface CollectionData {
  id: string;
  title: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  products: ShopifyProduct[];
}

export function useCollection(handle: string, first = 50) {
  return useQuery({
    queryKey: ['shopify-collection', handle, first],
    queryFn: async (): Promise<CollectionData | null> => {
      const data = await storefrontApiRequest(COLLECTION_BY_HANDLE_QUERY, { handle, first });
      const collection = data?.data?.collection;
      if (!collection) return null;
      return {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        image: collection.image,
        products: (collection.products?.edges || []).map((edge: { node: ShopifyProduct['node'] }) => ({ node: edge.node })),
      };
    },
    enabled: !!handle,
  });
}

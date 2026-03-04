import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest } from '@/lib/shopify';

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          image {
            url
            altText
          }
          productsCount: products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export interface ShopifyCollectionListItem {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: { url: string; altText: string | null } | null;
}

export function useCollections(first = 50) {
  return useQuery({
    queryKey: ['shopify-collections', first],
    queryFn: async (): Promise<ShopifyCollectionListItem[]> => {
      const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first });
      const edges = data?.data?.collections?.edges || [];
      return edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        description: edge.node.description,
        handle: edge.node.handle,
        image: edge.node.image,
      }));
    },
  });
}

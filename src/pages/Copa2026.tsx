import { CategoryPage } from "@/components/CategoryPage";
import { isCopaProduct } from "@/lib/catalog";
import { type ShopifyProduct } from "@/lib/shopify";

const productText = (p: ShopifyProduct) =>
  `${p.node.title} ${p.node.handle} ${(p.node as any).productType ?? ""} ${((p.node as any).tags ?? []).join(" ")}`.toLowerCase();

const isAdrenalyn = (p: ShopifyProduct) => productText(p).includes("adrenalyn");

const Copa2026 = () => (
  <CategoryPage
    eyebrow="Coleção"
    title={<>Copa <span className="text-gradient-yellow">2026</span></>}
    intro="Álbuns, figurinhas e cards Adrenalyn XL da FIFA World Cup 2026™. Produtos originais Panini, com envio para todo o Brasil."
    seoTitle="Copa 2026 | Álbuns, Figurinhas e Adrenalyn XL — Bella Figurinha"
    seoDescription="Álbuns, envelopes de figurinhas e cards Adrenalyn XL da FIFA World Cup 2026™ na Bella Figurinha, distribuidor oficial Panini."
    path="/copa-2026"
    breadcrumbLabel="Copa 2026"
    filter={isCopaProduct}
    emptyMessage="Em breve — produtos da Copa serão adicionados."
    sections={[
      {
        title: "Álbuns e Figurinhas",
        description: "Álbuns oficiais e envelopes de figurinhas da FIFA World Cup 2026™.",
        filter: (p) => !isAdrenalyn(p),
      },
      {
        title: "Adrenalyn XL",
        description: "Trading cards oficiais Panini Adrenalyn XL™ da Copa do Mundo 2026.",
        filter: isAdrenalyn,
      },
    ]}
  />
);

export default Copa2026;

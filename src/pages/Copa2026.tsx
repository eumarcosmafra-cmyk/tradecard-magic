import { CategoryPage } from "@/components/CategoryPage";
import { isCopaProduct } from "@/lib/catalog";

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
  />
);

export default Copa2026;

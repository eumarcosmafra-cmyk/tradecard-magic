import { CategoryPage } from "@/components/CategoryPage";
import { isCopagProduct } from "@/lib/catalog";

const Copag = () => (
  <CategoryPage
    eyebrow="Muito além dos cards"
    title="COPAG"
    intro="Jogos, colecionáveis e experiências para reunir pessoas dentro e fora da mesa."
    seoTitle="Produtos COPAG | Bella Figurinha"
    seoDescription="Jogos e colecionáveis COPAG na Bella Figurinha: produtos para reunir pessoas dentro e fora da mesa."
    path="/copag"
    breadcrumbLabel="COPAG"
    filter={isCopagProduct}
    emptyMessage="Em breve — os produtos COPAG estão chegando ao catálogo."
  />
);

export default Copag;

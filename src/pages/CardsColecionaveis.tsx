import { CategoryPage } from "@/components/CategoryPage";
import { isCardsColecionaveis } from "@/lib/catalog";

const CardsColecionaveis = () => (
  <CategoryPage
    dark
    eyebrow="Nova fase"
    title={<>Cards & <span className="text-gradient-electric">Colecionáveis</span></>}
    intro="Lançamentos, booster packs, boxes, coleções e acessórios para quem leva colecionar a sério."
    seoTitle="Cards e Colecionáveis | Bella Figurinha"
    seoDescription="Booster packs, boxes, coleções especiais e acessórios para colecionadores de trading cards na Bella Figurinha."
    path="/cards-e-colecionaveis"
    breadcrumbLabel="Cards & Colecionáveis"
    filter={isCardsColecionaveis}
  />
);

export default CardsColecionaveis;

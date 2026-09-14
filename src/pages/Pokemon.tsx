import { CategoryPage } from "@/components/CategoryPage";
import { Pokemon30Showcase } from "@/components/Pokemon30Showcase";
import { isPokemonProduct } from "@/lib/catalog";

const Pokemon = () => (
  <CategoryPage
    dark
    eyebrow="30 anos de cards"
    title={<>Cards <span className="text-gradient-electric">Pokémon</span></>}
    intro="Boosters, boxes, coleções especiais e acessórios. O principal ativo da nova fase da Bella, com lançamento no primeiro drop de 25 de setembro."
    seoTitle="Cards Pokémon | Bella Figurinha"
    seoDescription="Cards Pokémon, booster packs, boxes e acessórios colecionáveis na Bella Figurinha. Primeiro drop em 25 de setembro, com acesso antecipado para a lista."
    path="/pokemon"
    breadcrumbLabel="Pokémon"
    filter={isPokemonProduct}
    emptyMessage="Em breve — os primeiros produtos chegam no drop de 25 de setembro."
  />
);

export default Pokemon;

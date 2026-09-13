import { type ShopifyProduct } from "@/lib/shopify";

const text = (p: ShopifyProduct) =>
  `${p.node.title} ${p.node.handle} ${(p.node as any).productType ?? ""} ${((p.node as any).tags ?? []).join(" ")}`.toLowerCase();

export const isPokemonProduct = (p: ShopifyProduct) => {
  const t = text(p);
  return t.includes("pokemon") || t.includes("pokémon") || t.includes("tcg");
};

export const isCopagProduct = (p: ShopifyProduct) => text(p).includes("copag");

export const isCopaProduct = (p: ShopifyProduct) => {
  const t = text(p);
  return (
    t.includes("album") ||
    t.includes("álbum") ||
    t.includes("figurinha") ||
    t.includes("sticker") ||
    t.includes("adrenalyn") ||
    t.includes("we are 26") ||
    t.includes("envelope") ||
    t.includes("copa") ||
    t.includes("fifa")
  );
};

/** Cards & colecionáveis = tudo que não é Copa nem COPAG. */
export const isCardsColecionaveis = (p: ShopifyProduct) => !isCopaProduct(p) && !isCopagProduct(p);

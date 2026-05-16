/**
 * Retorna a previsão de chegada para álbuns capa dura, com base em
 * palavras-chave no título do produto.
 *
 * IMPORTANTE: a detecção é feita SOMENTE pelo título, pois alguns handles
 * do Shopify foram criados como cópias e contêm palavras (ex: "ouro") que
 * não correspondem ao produto real.
 */
export function getArrivalDate(text: string): string | null {
  const t = (text || "").toLowerCase();
  if (!t.includes("capa dura") && !t.includes("hardcover")) {
    return null;
  }
  if (t.includes("ouro") || t.includes("gold") || t.includes("prata") || t.includes("silver")) {
    return "25 de Maio";
  }
  return "18 de Maio";
}

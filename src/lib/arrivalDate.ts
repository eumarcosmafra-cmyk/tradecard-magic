/**
 * Retorna a previsão de chegada para álbuns capa dura, com base em
 * palavras-chave no título/handle do produto.
 */
export function getArrivalDate(text: string): string | null {
  const t = (text || "").toLowerCase();
  if (!t.includes("capa dura") && !t.includes("capa-dura") && !t.includes("hardcover")) {
    return null;
  }
  if (t.includes("ouro") || t.includes("gold") || t.includes("prata") || t.includes("silver")) {
    return "25 de Maio";
  }
  return "18 de Maio";
}

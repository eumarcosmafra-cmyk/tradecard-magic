# Avaliação do site — o que eu mudaria

O site já está bem posicionado no lançamento de 25/09. Os pontos abaixo são o que mais atrapalha hoje, em ordem de prioridade.

## 1. Produtos Pokémon aparecem como "Esgotado" e sem preço

Os cinco produtos Pokémon estão no Shopify com preço R$ 0,00 e sem estoque, então a loja mostra "R$ 0,00" e botão "Esgotado" — passa impressão de site quebrado.

Duas frentes:
- Você preenche preço e estoque no Shopify (fora do site).
- Enquanto o preço for zero, o site deixa de mostrar "R$ 0,00" e "Esgotado" e passa a exibir "Em breve · disponível no drop de 25/09" com botão que leva para a pré-lista.

## 2. A home repete a mesma oferta quatro vezes

Hoje o desconto de 20% aparece no topo, em "Como funciona", na lista de produtos e no bloco de destaque Pokémon. Proposta: manter a oferta forte no topo e em "Como funciona", e enxugar as outras duas repetições para o site não parecer um panfleto.

## 3. Duas seções de produto concorrendo entre si

A home mostra a lista real de produtos e, logo abaixo, a vitrine "Os produtos do primeiro drop" com as mesmas coleções. Proposta: manter só a lista real de produtos e usar a vitrine apenas como conteúdo explicativo (o que vem dentro de cada coleção), ou removê-la da home.

## 4. "O que está chegando" está genérico

Os cinco quadros ("Booster Packs", "Boxes", "Acessórios"...) levam todos para a mesma página e dizem "Em breve", mesmo já havendo produtos reais. Proposta: transformar em atalhos reais por categoria ou remover.

## 5. Copa 2026 sumiu demais da home

A Copa saiu por decisão sua, mas ainda há estoque para girar e hoje ela só existe no menu. Proposta: uma faixa discreta no rodapé da home ("Coleção Copa 2026 — últimas unidades") levando para a categoria, sem roubar o espaço do Pokémon.

## 6. Conversão da pré-lista

- Repetir o botão de cadastro no final da home (hoje o fechamento é a COPAG).
- Deixar claro na barra superior quanto tempo falta, já que a contagem só aparece no topo da home.

## 7. Detalhes de acabamento

- A página Pokémon promete "boosters, boxes e acessórios" mas o texto não bate com os produtos cadastrados.
- Página inicial e página de produto ainda usam textos escritos antes de os produtos existirem; vale uma revisão de texto depois que preços e estoques estiverem no Shopify.

## Sugestão de ordem

1. Estado "Em breve" para produto sem preço/estoque (item 1)
2. Limpeza da home: repetição da oferta, vitrine duplicada, "O que está chegando" (itens 2, 3, 4)
3. Faixa da Copa e reforço de conversão (itens 5, 6)
4. Revisão de textos (item 7)

## Notas técnicas

- Itens 2–6 são mudanças de conteúdo e layout em `src/pages/Index.tsx`, `src/components/HomeProducts.tsx`, `src/components/Pokemon30Showcase.tsx` e `src/pages/Pokemon.tsx`.
- Item 1 é uma regra de exibição em `src/components/ProductCard.tsx` e `src/pages/ProductDetail.tsx`: preço `0` ou `availableForSale: false` → selo "Em breve" e CTA para `/acesso-antecipado`.
- Nenhuma alteração de banco de dados nem de checkout.

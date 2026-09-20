# Deixar o site mais fluido

O conteúdo já está certo. O que atrapalha hoje é a ordem das seções da home, a repetição de botões iguais e alguns blocos longos demais. Abaixo, o que eu organizaria.

## 1. Home: ordem mais curta e com um caminho claro

Hoje a home tem 9 blocos e o visitante passa por três convites iguais ("Quero meus 20% de desconto") antes de ver um produto. Nova ordem proposta:

1. Abertura (topo) — promessa, contagem regressiva e um único botão principal
2. Produtos Pokémon na loja (sobe para logo depois do topo)
3. Como funciona o desconto (resumido em 3 passos, sem repetir o botão)
4. O que vem em cada coleção
5. Quiosque no Palladium
6. Navegue por categoria
7. Fechamento: entrar na pré-lista (o único lugar com o botão repetido)
8. Faixa discreta da Copa 2026 + linha da COPAG

Ganho: o visitante vê produto na segunda rolagem, e não depois de duas seções de explicação.

## 2. Um botão principal por seção

Hoje o mesmo convite aparece no topo, em "Como funciona", em "O que vem em cada coleção", no bloco de destaque e no fechamento. Proposta: manter no topo e no fechamento; nas seções do meio, virar um link simples de texto.

## 3. Enxugar o topo

O bloco do topo tem hoje selo, título, subtítulo, caixa da oferta, aviso, parágrafo do quiosque, contagem e dois botões — informação demais de uma vez. Proposta: título, subtítulo, caixa da oferta com a regra em uma linha, contagem e um botão. O aviso completo ("não reserva produto") passa a aparecer uma vez só, em "Como funciona".

## 4. Remover o bloco de destaque duplicado

A seção "Cards Pokémon na Bella" repete o que a lista de produtos e "O que vem em cada coleção" já dizem. Proposta: remover da home.

## 5. Rodapé mais navegável

A coluna "Navegação" tem 12 links em lista única. Proposta: separar em "Comprar" (categorias e pré-lista) e "Ajuda" (contato, FAQ, revenda, blog, guia).

## 6. Menu do topo

São 6 itens + botão. Proposta: manter Pokémon, Copa 2026, Loja Física e Quem Somos no nível principal, e agrupar Cards & Colecionáveis e COPAG sob o item de categorias — menu mais leve, principalmente no celular.

## 7. Detalhes de rolagem

- A barra fixa de baixo cobre o final das páginas; aumentar o espaço livre no rodapé para o último botão nunca ficar escondido.
- Padronizar o espaçamento das seções (hoje varia entre blocos), deixando a rolagem mais constante.

## Notas técnicas

- Alterações em `src/pages/Index.tsx` (ordem e enxugamento das seções), `src/components/Pokemon30Showcase.tsx` e `src/components/HomeProducts.tsx` (CTAs), `src/components/Header.tsx` e `src/components/Footer.tsx` (navegação), `src/components/DropBar.tsx` (espaçamento inferior).
- Nada de banco de dados, checkout, produtos ou preços.

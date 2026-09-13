# Ajustes no site a partir do texto para o Smolka

O desenho descrito no seu texto já está, em quase tudo, refletido no site: a Copa ficou como área separada (só no menu), a home virou Pokémon/30 anos, a página de cadastro da pré-lista existe com limite de 1 CPF, e a retirada é presencial no quiosque do Palladium. O que falta mudar na página são quatro pontos.

## 1. A oferta fica clara e específica

Trocar o texto genérico "produtos selecionados" pela oferta real, repetida na home, na página de cadastro, na barra fixa, na página do quiosque e no regulamento:

**20% de desconto em produtos Pokémon 30 anos — 1 unidade por CPF, por ordem de chegada, enquanto durar o estoque.**

## 2. Destaque para "não garante o produto"

Tratar isso como aviso visível, não letra miúda: bloco destacado na página de cadastro (acima e abaixo do formulário) e na home, com a frase "O cadastro dá acesso ao desconto, não reserva produto. O atendimento é por ordem de chegada no quiosque, enquanto durar o estoque."

## 3. Prazo da pré-lista: até 25/09

Hoje o 25/09 aparece como data do lançamento, mas não como limite de cadastro. Deixar explícito "cadastros até 25/09" na página, no regulamento e na barra fixa, com o formulário passando para o estado "cadastros encerrados" depois da data.

## 4. Medição do funil

Os eventos campanha → página → cadastro → quiosque já são registrados. Acrescento o evento de clique de compra no site, para fechar o funil de e-commerce descrito no texto.

## Detalhes técnicos

- Criar `OFFER_*` em `src/lib/drop.ts` (rótulo da oferta, percentual, limite por CPF) e usar em todas as páginas, para não haver texto divergente.
- Textos: `src/pages/AcessoAntecipado.tsx`, `src/pages/RegulamentoAcessoAntecipado.tsx`, `src/pages/LojaFisica.tsx`, `src/components/DropBar.tsx` e bloco Pokémon em `src/pages/Index.tsx`.
- Regulamento: cláusulas de 20%, ordem de chegada, ausência de reserva, prazo de cadastro até 25/09 e retirada presencial com CPF.
- Prazo: usar `DROP_DATE` como corte do formulário.
- Novo evento `ecommerce_buy_click` em `src/lib/analytics.ts`.
- Sem mudanças de banco de dados.

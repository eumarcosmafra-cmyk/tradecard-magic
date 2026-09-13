# Ajustes no site a partir do texto para o Smolka

O desenho descrito no seu texto já está, em quase tudo, refletido no site: a Copa ficou como área separada (só no menu), a home virou Pokémon/30 anos, a página de cadastro da pré-lista existe com limite de 1 CPF, e a retirada é presencial no quiosque do Palladium. O que falta mudar na página são três pontos.

## 1. Prazo da pré-lista: até 25/09

Hoje o site fala do dia 25/09 como data do lançamento/abertura do quiosque, mas não diz que o cadastro fica aberto "até" essa data. Passar a deixar isso explícito na página de cadastro, no regulamento e na barra fixa: cadastros até 25/09, com o formulário mostrando "encerrado" depois disso.

## 2. "O cadastro não reserva produto"

O regulamento já diz que não há reserva. Subir essa frase para a própria página de cadastro (perto do botão) e para o bloco da home, para evitar expectativa errada: o cadastro dá acesso ao preço especial, não garante unidade.

## 3. Quantidade limitada de produtos (não só Pokémon)

O texto fala em "preço especial para uma quantidade limitada de produtos". Hoje o site diz "cards Pokémon selecionados". Ajustar a redação para "produtos selecionados, com destaque para cards Pokémon", mantendo o Pokémon como carro-chefe visual sem travar a oferta a uma única linha.

## Medição do funil

Os eventos de campanha → página → cadastro → quiosque já são registrados (visita, início de formulário, cadastro concluído, cadastro duplicado, clique em "como chegar" no quiosque, cliques nos botões de acesso antecipado). Complemento com o evento que falta para fechar o funil do texto: clique para comprar no site (e-commerce).

## Detalhes técnicos

- Textos: `src/pages/AcessoAntecipado.tsx`, `src/pages/RegulamentoAcessoAntecipado.tsx`, `src/pages/LojaFisica.tsx`, `src/components/DropBar.tsx`, bloco Pokémon em `src/pages/Index.tsx`.
- Prazo: usar `DROP_DATE`/`DROP_DATE_SHORT` de `src/lib/drop.ts` como data-limite de cadastro, com estado "encerrado" no formulário após 25/09.
- Novo evento `ecommerce_buy_click` em `src/lib/analytics.ts`, disparado nos botões de compra.
- Sem mudanças de banco de dados.

## Pendência sua

- Confirmar se a oferta de lançamento é só Pokémon ou também outras linhas.

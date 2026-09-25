# Encerrar pré-lista e comunicar "Quiosque aberto no Palladium"

## Objetivo
Travar novos cadastros dos 20% (prazo encerrado em 25/09) e mudar o site inteiro para comunicar: a Bella Figurinha Pokémon 30 anos está aberta e funcionando no Shopping Palladium, em Curitiba.

## 1. Travar a inscrição
- **Página de acesso antecipado**: o formulário some. No lugar, aviso claro: "Cadastros encerrados. O prazo da pré-lista terminou em 25/09." + botões "Ver como chegar ao quiosque" e "Comprar Pokémon 30 anos no site".
- **Bloqueio real no servidor**: o envio de cadastro passa a recusar qualquer tentativa após 25/09 (hoje só a tela verifica a data; alguém poderia contornar).
- Quem já se cadastrou continua na lista; a área `/lista-cadastros` segue funcionando para a equipe validar CPF no quiosque.
- Regulamento continua no ar (histórico), com uma faixa "Ação encerrada em 25/09".

## 2. Novo banner principal (home)
```text
[selo]  ABERTO AGORA · SHOPPING PALLADIUM · CURITIBA
[título] Pokémon 30 anos chegou à Bella
[subtítulo] Cards, coleções e raridades. Venha conhecer nosso quiosque.
[info] Shopping Palladium · Curitiba · Aberto no horário do shopping
[botões] Como chegar (Google Maps)   |   Comprar online
```
- Fundo: foto do quiosque (arena), no lugar da imagem genérica de cards.
- Sai: bloco "20% OFF", contagem regressiva e "Quero meus 20% de desconto".

## 3. Resto da home
- Remover a seção "Como funciona o desconto".
- Manter produtos Pokémon da loja e "O que vem em cada coleção" (botão passa a "Ver produtos").
- Seção do quiosque vira destaque principal de visita: foto, endereço, horário, botões Maps e WhatsApp.
- CTA final troca "Ainda dá tempo de entrar na pré-lista" por "Te esperamos no Palladium" + Como chegar / Comprar online.

## 4. Demais lugares com os 20%
- **Barra fixa inferior**: vira "Quiosque aberto no Palladium · Curitiba — Como chegar".
- **Menu e rodapé**: remover "Acesso antecipado"; botão de destaque do menu vira "Visite o quiosque".
- **Cards e página de produto**: tirar "Quero avisos e 20% OFF"; produto sem preço mostra "Disponível no quiosque" com link para a loja física.
- **Loja física**: tirar contagem regressiva e oferta; mostrar "Aberto agora", endereço, horário e mapa.
- **Página Pokémon / categorias**: remover chamadas para pré-lista.
- **SEO (título/descrição do Google)**: trocar por "Quiosque Pokémon 30 anos aberto no Shopping Palladium, Curitiba".

## O que precisamos de você
- **Horário de funcionamento** do quiosque (ou usamos "horário do shopping").
- **Localização exata** no Palladium (piso / perto de qual loja), se quiser mostrar.
- Confirmar o **WhatsApp** do quiosque para o botão (hoje há (41) 6347-5741 e (11) 97660-9139 no site).

## Detalhes técnicos
- `src/lib/drop.ts`: adicionar textos de operação aberta (`STORE_OPEN_*`, endereço, link Maps); manter `isSignupOpen()` como fonte do bloqueio.
- `supabase/functions/early-access-signup`: retornar 410 "Cadastros encerrados" se `now >= 2026-09-25T10:00-03:00`; front trata essa resposta.
- `AcessoAntecipado.tsx`: renderizar estado encerrado quando `!isSignupOpen()` (esconder form e Countdown).
- Editar `Index.tsx`, `DropBar.tsx`, `Header.tsx`, `Footer.tsx`, `ProductCard.tsx`, `ProductDetail.tsx`, `LojaFisica.tsx`, `CategoryPage.tsx`, `Pokemon30Showcase.tsx`, `RegulamentoAcessoAntecipado.tsx`.
- Tracking: novo evento `store_directions_click` para medir cliques em "Como chegar".
- Sem mudanças no banco de dados.

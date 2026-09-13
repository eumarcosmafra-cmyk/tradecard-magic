# Bella Figurinha 2.0

Reposicionamento completo: a Bella deixa de ser "a loja da Copa" e passa a ser uma marca de cards, colecionáveis e comunidade. A Copa vira uma categoria dentro do site. Nada de produto, carrinho, checkout ou integração com a loja é removido ou quebrado.

Três metas guiam todas as decisões do site:

1. **Levar gente ao quiosque do Palladium** — página da loja forte, "Como chegar", data de abertura e o resgate do acesso antecipado acontecendo lá.
2. **Encher a lista de acesso antecipado** — página dedicada para as campanhas, cadastro rápido com CPF.
3. **Vender na loja online** — produtos novos (cards, COPAG e demais) com compra normal, sem quebrar carrinho nem checkout.

Cada meta tem seu caminho visível na home: um bloco de loja física, um bloco de acesso antecipado e a vitrine de produtos. A medição do funil separa os três, para saber quantos cadastraram, quantos resgataram no quiosque e quantos compraram online.

## O que muda para quem visita

**Nova home**
- Abertura nova: "Um novo universo está chegando à Bella" + "Cards. Coleções. Raridades." 
- Botões "Quero acesso antecipado" e "Descobrir a nova Bella", com contagem regressiva para 25/09.
- Seção "O que está chegando": Booster Packs, Boxes, Coleções Especiais, Acessórios, Outros Colecionáveis — em "Em breve" enquanto não houver produtos cadastrados.
- Seção "Muito além dos cards" para COPAG.
- A Copa aparece como um bloco/categoria, não mais como identidade do site.

**Página de acesso antecipado (/acesso-antecipado)**
- Funciona sozinha, pensada primeiro para celular, cadastro em menos de 30 segundos.
- Formulário: nome completo, CPF, WhatsApp, e-mail + caixa obrigatória de consentimento com link para regulamento e privacidade.
- CPF com máscara e validação real; CPF repetido mostra "Você já está na lista!" sem criar novo cadastro e sem exibir dados de ninguém.
- Tela de confirmação "Você está dentro", com botões para conhecer a nova Bella e seguir no Instagram.
- Nunca chamamos de "pré-venda" — sempre "acesso antecipado".

**Barra fixa no topo** (até 25/09, em todas as páginas): "O primeiro drop da nova Bella acontece em 25/09" + botão "Quero entrar".

**Loja física (/loja-fisica)**
- Apenas Shopping Palladium, Curitiba – PR, abertura em 25/09/2026, horário do shopping, botão "Como chegar".
- Os 13 quiosques antigos saem da comunicação. A página /lojas passa a levar para a nova.

**Quem Somos** — nova narrativa "Somos movidos por coleções", sem menção aos quiosques da Copa.

**Menu novo**: Início | Cards & Colecionáveis | COPAG | Copa 2026 | Loja Física | Sobre a Bella, mais busca, minha conta e carrinho.

**Visual**: amarelo elétrico, azul intenso, branco, preto/grafite, vermelho como detalhe, brilhos e holografia discreta. Premium e energético, não infantil. Sem qualquer elemento gráfico de marcas de terceiros.

**Painel da campanha (/admin, com login)**
- Lista de inscritos com busca por CPF, nome e telefone; data, origem e campanha; exportação em CSV.
- Marcar promoção como utilizada (com data), impedindo segunda utilização do mesmo CPF — serve inclusive para uso no quiosque.

## Privacidade e medição

- CPF e telefone nunca vão para endereço da página, analytics, pixel ou registros públicos. Ficam guardados no banco com acesso restrito a administradores autenticados.
- Guardamos data/hora do consentimento, versão dos termos, origem e UTMs de cada cadastro.
- Eventos do funil: landing_view, early_access_cta_click, form_started, form_completed, registration_success — sem dado pessoal.
- Banner de cookies exibido só para visitantes em regiões que exigem consentimento; no Brasil a medição segue normal. Rejeitar é tão fácil quanto aceitar e a escolha pode ser alterada depois.
- Política de privacidade atualizada citando os dados coletados, as plataformas de medição e as finalidades.

## Catálogo

Taxonomia por coleções, fácil de editar depois:
- Cards & Colecionáveis (Lançamentos, Booster Packs, Boxes, Coleções, Acessórios)
- COPAG
- Copa 2026 (Álbuns, Figurinhas, Adrenalyn XL)
- Outros produtos existentes

Nenhum produto é apagado. URLs de produto continuam iguais; as páginas antigas que mudarem de endereço ganham redirecionamento para preservar o SEO.

## Detalhes técnicos

- Nova tabela `early_access_leads`: nome, cpf_normalizado (único), whatsapp, email, consentimento (data, versão dos termos), utm_source/medium/campaign/content, origem, `promo_redeemed`, `redeemed_at`, `redeem_code` (preparado para QR Code futuro). Grants + RLS: gravação via função de servidor; leitura somente para administradores.
- Cadastro feito por edge function (não por escrita direta do navegador), validando CPF no servidor e devolvendo apenas "novo" ou "já cadastrado" — sem vazar dados existentes.
- Papéis em tabela `user_roles` separada, com função `has_role`, nunca no perfil. Login por e-mail e senha para o painel.
- Front: novas rotas `/acesso-antecipado` (com alias `/primeiro-drop`), `/loja-fisica`, `/cards-e-colecionaveis`, `/copag`, `/copa-2026`, `/admin`, `/admin/login`. `/lojas` redireciona para `/loja-fisica`.
- Tokens de cor e gradientes novos em `index.css` e `tailwind.config.ts`; componentes seguem usando tokens semânticos.
- Reaproveitados sem alteração: integração da loja, `cartStore`, `CartDrawer`, `ProductCard`, `ProductDetail`, hooks de produtos/coleções, `SEOHead`, JSON-LD.
- GA4/Meta: reutilizo as tags já instaladas no site e adiciono os eventos do funil sob controle de consentimento.

## Ordem de execução

1. Banco, cadastro seguro e página de acesso antecipado + barra fixa.
2. Nova home e identidade visual 2.0.
3. Loja física Palladium, remoção dos quiosques antigos, Copa como categoria e redirects.
4. Eventos de funil, banner de cookies e política de privacidade.
5. Painel administrativo com login, busca, CSV e marcação de resgate.
6. Catálogo reorganizado, COPAG e nova página Quem Somos.

## Pendente de você

- Os identificadores do GA4 e do Meta Pixel, caso sejam diferentes dos que já estão no site.
- Texto do regulamento da ação (ou confirmo que posso redigir uma primeira versão).
- E-mail que será o administrador do painel.
- Piso/quiosque no Palladium, se já estiver definido (senão, não invento).

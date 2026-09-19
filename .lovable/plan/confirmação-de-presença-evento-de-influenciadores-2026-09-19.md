# Confirmação de presença — Evento de Influenciadores

Página exclusiva por link (não aparece em menus nem na home) para influenciadores confirmarem presença, e uma lista de presença protegida por senha para você acompanhar.

## Evento
- Data: 27/09/2026
- Local: Quiosque da Bella — Shopping Palladium (Pokémon 30 anos)

## Página de confirmação — `/convite-influenciadores`
- Visual no estilo do site (fundo escuro, dourado/vermelho, Bebas Neue).
- Título do convite, data e local em destaque, contagem regressiva para o evento.
- Foto do quiosque já existente no projeto.
- Formulário: Nome completo, @Instagram, WhatsApp, E-mail e aceite de contato.
- Validação de e-mail/WhatsApp e mensagem de confirmação após envio ("Presença confirmada").
- Se a pessoa já tiver confirmado com o mesmo e-mail ou @, mostra "Você já está confirmado".
- Sem link a partir da home, menu ou rodapé; a página também não é indexada por buscadores.

## Lista de presença — `/lista-influenciadores`
- Mesmo padrão da lista de cadastros atual, com a senha **Bella2026**.
- Tabela com nome, @Instagram, WhatsApp, e-mail, data da confirmação.
- Busca por nome/@/telefone/e-mail, total de confirmados.
- Botão para marcar "compareceu" no dia do evento (check-in) e exportar planilha CSV.

## Detalhes técnicos
- Nova tabela `influencer_rsvps` (nome, instagram, whatsapp, email, consent, attended, attended_at, origem/UTM, created_at) com RLS restrita; nenhum acesso público de leitura.
- Escrita via nova função `influencer-rsvp` (valida dados, normaliza @ e telefone, detecta duplicidade por e-mail/instagram).
- Leitura/check-in via nova função `influencer-lista`, protegida pelo secret `LEADS_PASSWORD` já existente (Bella2026), usando service role.
- Duas rotas novas em `App.tsx`, com `DropBar` oculta nas duas, `noindex` na página de convite.

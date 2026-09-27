# Controle de Retirada Pokémon por CPF (limite 3 produtos)

## O que muda para o atendente
Nova tela principal em `/lista-cadastros` (mesma senha Bella2026): **CONTROLE DE RETIRADA**.

```text
[ Digite o CPF do cliente ]  [BUSCAR CPF]
        |
   encontrado ----------------------> card grande
   não encontrado -> "CPF NÃO ENCONTRADO" + cadastro rápido (Nome, WhatsApp opcional)
        |
 card: Nome | CPF
       Selo separado: "20% PRÉ-CADASTRO" ou "SEM DESCONTO DO PRÉ-CADASTRO"
       Destaque: "ESTE CPF AINDA PODE LEVAR 2 PRODUTOS"  (verde / amarelo se 1 / vermelho se 0)
       Botões: [1 PRODUTO] [2 PRODUTOS] [3 PRODUTOS]  (só os que cabem no saldo)
        |
 Confirmação: quantidade, já usados, total após, saldo após -> CONFIRMAR / CANCELAR
        |
 "RETIRADA REGISTRADA — 3 DE 3 UTILIZADOS"
```

- CPF aceito com ou sem pontuação, validado (11 dígitos + dígitos verificadores).
- Quem não está no pré-cadastro pode comprar normalmente (até 3), só sem os 20%.
- Histórico de retiradas visível no card (data, hora, quantidade).

## Aba "Lista geral" (mesma página)
- Indicadores: CPFs cadastrados, Clientes do pré-cadastro, Produtos retirados, CPFs que atingiram 3/3.
- Colunas: Nome | CPF | WhatsApp | Pré-cadastro | Utilizados | Disponíveis | Última retirada | Ver.
- Busca por CPF (prioridade), nome, telefone. Exportação CSV mantida.

## Estorno (somente administrador)
- Botão "ESTORNAR RETIRADA" no histórico exige uma **senha de administrador separada** (nova, diferente da Bella2026) e um motivo.
- Estorno nunca apaga: fica registrado com data, hora, quantidade, motivo e quem estornou.

## Dados atuais preservados
- Os 236 cadastros continuam intactos, marcados como pré-cadastro = SIM.
- O antigo "resgatado sim/não" fica guardado só como histórico.
- Os **48 que já usaram o desconto** entram com **1 retirada já registrada** (data original), ficando com 2 disponíveis.

## Detalhes técnicos
- Tabela `early_access_leads` ganha coluna `pre_cadastro boolean default true`; `email` passa a ser opcional; índice único no CPF só dígitos (normalizar CPFs existentes; checar duplicados antes).
- Nova tabela `retiradas` (id, lead_id, quantidade 1–3, status confirmada/estornada, atendente, estornado_em, estorno_motivo, created_at). RLS ligada, acesso apenas via service_role pela função.
- Função SQL `registrar_retirada(cpf, qtd, atendente)` com `SELECT ... FOR UPDATE` na linha do cliente, soma das confirmadas + qtd <= 3, senão erro — atômica contra dois atendentes ao mesmo tempo. Trigger de segurança reforçando o limite.
- Função `estornar_retirada(id, motivo)`.
- Backfill: uma retirada de 1 unidade para cada `promo_redeemed = true`, com `created_at = redeemed_at`.
- Edge function `leads-lista` ganha ações: `buscar`, `cadastrar`, `retirar`, `estornar` (valida `ADMIN_PASSWORD`, novo secret), `listar` com totais.
- `ListaCadastros.tsx` reescrita com as abas Controle / Lista geral, mantendo a identidade visual atual.

## Ponto para confirmar
- Nome do atendente: sem login individual, o atendente digita o nome uma vez (fica salvo no aparelho) e ele vai em cada retirada para auditoria.

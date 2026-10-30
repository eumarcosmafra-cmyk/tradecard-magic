# Incluir ETB e Fichário no Controle de Retirada

## O que muda para a equipe
No cartão do cliente (depois de buscar o CPF), além do quadro "Combo Booster — 0/1", aparecem mais dois quadros iguais:
- **ETB — 0/1** com botão "Retirar ETB"
- **Fichário — 0/1** com botão "Retirar Fichário"

Cada um funciona igual ao Combo Booster:
- Limite de **1 por CPF**; depois de retirado, o quadro fica vermelho e o sistema bloqueia outra retirada (inclusive se dois atendentes tentarem ao mesmo tempo).
- Não entra no limite de 3 produtos gerais.
- Aparece no histórico com o nome, e pode ser estornado com a senha de administrador + motivo.
- A frase do topo passa a listar o que ainda está disponível, ex.: "Este CPF ainda pode levar 3 produtos + 1 Combo Booster + 1 ETB + 1 Fichário".

Na **Lista geral**: novas colunas **ETB (0/1)** e **Fichário (0/1)** (ordenáveis), também nos cartões do celular e na exportação CSV.

## Detalhes técnicos
- Banco: nova função transacional genérica `registrar_retirada_item(_lead_id, _produto, _atendente)` que trava a linha do lead e rejeita se já existir retirada confirmada do mesmo produto; aceita `booster`, `etb`, `fichario` (booster atual continua funcionando).
- Edge function `leads-lista`: ação `retirar` aceita `produto` em `booster | etb | fichario`; `buscar`/lista retornam contagens por produto.
- `ListaCadastros.tsx`: transformar o quadro do Booster num componente reutilizável por item, com modal de confirmação; atualizar frase de disponibilidade, colunas e CSV.
- Testar com CPF real: retirar ETB, tentar de novo (bloqueia), estornar.

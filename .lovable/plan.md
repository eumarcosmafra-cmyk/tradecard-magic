# Incluir "Triplo" no Controle de Retirada (2 por CPF)

## O que a equipe pediu
A Denize pediu para incluir o **Triplo** no painel, com limite de **2 por CPF**, porque um cliente comprou 4 e está mandando outras pessoas buscarem para ele.

## O que muda no painel
- Ao buscar o CPF aparece um quadro novo, **"Triplo — 0/2"**, ao lado de Combo Booster, ETB e Fichário, com o botão "Retirar Triplo".
- Cada toque registra 1 unidade. Na 2ª retirada o quadro fica vermelho e o sistema bloqueia a 3ª para o mesmo CPF.
- O Triplo **não conta** no limite de 3 produtos gerais, assim como os outros itens.
- A frase do cliente passa a citar o Triplo enquanto houver saldo (ex.: "pode levar 3 produtos + 1 Combo Booster + 2 Triplos...").
- Histórico mostra "Triplo" e o estorno funciona normalmente, liberando a unidade de volta.
- Lista geral e planilha exportada ganham a coluna **Triplo (0/2)**, que também dá para ordenar.

## Observação importante
O limite é por CPF. Ele impede o mesmo CPF de levar mais de 2, mas não impede uma pessoa de mandar amigos com CPFs diferentes. Para ajudar nisso, a equipe pode usar o campo de Instagram/WhatsApp e a lista geral para perceber padrões.

## Detalhes técnicos
- Migração: atualizar `registrar_retirada_item` para aceitar `triplo` com limite 2 (limite por item via CASE: booster/etb/fichario = 1, triplo = 2).
- `leads-lista`: aceitar `triplo` na ação retirar e somar `triplo` no agregado da lista.
- `ListaCadastros.tsx`: novo quadro com contador X/2, coluna ordenável, CSV, rótulo no histórico, frase de saldo.
- Testar com cliente fictício: 2 retiradas OK, 3ª bloqueada, estorno libera; depois apagar o cliente de teste.

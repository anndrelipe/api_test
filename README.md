# Projeto de API bancária

Este projeto é integralmente dedicado para o estudo de desenvolvimento de aplicações backend. Seu intuito é simular uma API de transação bancária.

# Resumo do desafio

Crie um sistema de gestão bancária por meio de uma API, composta por dois endpoints:
"/conta" e "/transacao". O endpoint "/conta" deve criar e fornecer informações sobre o número
da conta e o saldo. O endpoint "/transacao" será responsável por realizar diversas operações
financeiras.

Os endpoints devem ter o seguintes padrões de entrada e saída no formato json:
Use as seguintes siglas para as formas de pagamento:

* P => Pix
* C => Cartão de Crédito
* D => Cartão de Débito

# 
Referências:
* POST /transacao
input => JSON {"forma_pagamento":"D", "conta_id": 1234, "valor":10}
output => HTTP STATUS 201 / JSON {“conta_id”: 1234, “saldo”: 189.70}
HTTP STATUS 404 (Caso não tenha saldo disponível)

* POST /conta
input => JSON { "conta_id": 1234, "valor":10}
output => HTTP STATUS 201 / JSON {“conta_id”: 1234, “saldo”: 189.70}

* GET /conta?id=1234
output => Caso não exista a conta deve retornar HTTP STATUS 404
Caso exista a conta retorna HTTP STATUS 200 e um JSON:
{“conta_id”: 1234, “saldo”: 200}

# 
Etapas do desafio:
Há três formas de transação disponíveis: débito, crédito e Pix, cada uma com taxas diferentes.
Taxa de débito: 3% sobre a operação
Taxa de crédito: 5% sobre a operação
Taxa do Pix: Sem custo

Após criar a conta e definir as taxas, execute sua api com as seguintes operações:
1. Validar se uma conta existe
2. Criar uma conta com saldo inicial de R$ 500
3. Consultar o saldo dela
4. Efetue uma compra no valor de R$50 utilizando a opção de débito.
5. Execute uma compra de R$100 usando a opção de crédito.
6. Realize uma transferência via Pix no valor de R$75.

Importante lembrar que todas as contas não possuem limite de cheque especial, o que
significa que não é permitido ter saldo negativo. Portanto, implementar as validações
necessárias para garantir que as transações não excedam o saldo disponível.
As chamadas devem interferir no saldo da conta para as próximas operações.

Fica facultativo autenticação de sessão.
Após realizar o teste, disponibilize o código no github.
Adicione um readme de como executar sua aplicação

Diferenciais:
* Realize commits bem escritos;
* Realize os testes necessários;
* Mantenha um código limpo;

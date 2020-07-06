# OmniGen Back-End

## Projeto

O OmniGen foi criado baseado em typesccript e nodeJS utilizando as seguintes tecnologias:

* cors
  >Configurar o acesso ao back-end.
* express
  >Framework para configurar a api.
* sqlite
  >Banco de dados utilizado para o exemplo.
* knex
  >Realizar a conexao com o banco de dados.

## Prototipagem

A prototipagem da maioria das telas foi feita no figma e pode ser vista por [aqui](https://www.figma.com/file/HwnUyaeyv36n6F8OSrPzdy/Mega-Hack-3.0?node-id=1%3A14).

## Base de dados

A base de dados foi mockada, ou seja, assumimos que baseado nas documentacoes de cada canal seria possivel construi-la.

  >Exemplos de Canais:
  >
  >* [Cielo](https://developercielo.github.io/manual/cielo-ecommerce)
  >* [GetNet](https://developers.getnet.com.br/api)
  >* [MagaLu](https://magazineluiza.docs.apiary.io/#)
  >* [MecadoLivre](https://developers.mercadolivre.com.br/pt_br/api-docs-pt-br)
  >* [PagSeguro](https://dev.pagseguro.uol.com.br/docs)

A partir do fornecimento desses dados na tela de cadastro de canais seriamos capazes de construir a tabela dados_pagamentos:

| id | id_forma | n_campos | campo_1 | campo_2 | campo_3 | campo_4|
|----|----------|----------|---------|---------|---------|-------|

A tabela nao foi populada. Para fins explicativos: os campos seriam opcionais dependendo de cada metodo, por exemplo: a GetNet fornece apenas uma chave, ja para acessar a Api da cielo e necessario duas chaves.

Assim definimos a tabela de produto que e cadastrado pelo cliente com o valor de custo/venda.

| id | nome | custo | valor |
|----|------|-------|-------|
| 1 | Tenis corrida hyndel - feminino | 190 | 400 |

Alem disso, definimos uma tabela de pagamentos que podera ser construida com o restulado de todas as requisicoes das APIs acima.

| id | id_produto | id_forma |
|----|------------|----------|
| 1  | 2          | 3        |

Assim, temos nossa tabela mais importante, que seria preenchida pela nossa equipe e contem os dados de cada canal que o cliente usa:

| id | nome | taxa_inicial | taxa_fixa | taxa_inicial_per | taxa_deb | taxa_cred | taxa_cred_parc | taxa_universal |
|----|----|----|----|----|----|----|----|----|
| 1 | Cielo | 00.00 | 00.00 | 00.00 | 0.02 | 0.025 | 0.0325 | 00.00 |
| 2 | GetNet | 00.00 | 00.40 | 00.00 | 0.028 | 0.028 | 0.03 | 00.00 |
| 3 | MagaLu | 00.00 | 00.00 | 00.00 | 0.00 | 0.00 | 0.00 | 00.20 |
| 4 | MecadoLivre | 00.00 | 05.00 | 00.00 | 0.00 | 0.00 | 0.00 | 00.16 |

A partir dessa tabela somos capazes de definir o rendimento, custo, porcentagem do rendimento total e ofertar uma visao mais clara para o cliente.

## API

A nossa API desenvolvida para esse exemplo e composta de dois GETs:

O GET abaixo retorna os dados de todas os canais em relacao ao valor total.

### API: [https://omnigem.herokuapp.com/formasPag](https://omnigem.herokuapp.com/formasPag)

Exemplo de resposta:

```javascript
[
  {
    "id": 1,
    "nome": "Cielo",
    "custo": "1336.35",
    "receita": "2550.00",
    "rendimento": "1213.65",
    "porcentagem": "0.31"
  },
  {
    "id": 2,
    "nome": "GetNet",
    "custo": "1227.68",
    "receita": "2220.00",
    "rendimento": "992.32",
    "porcentagem": "0.27"
  },
  {
    "id": 3,
    "nome": "MagaLu",
    "custo": "1330.00",
    "receita": "2500.00",
    "rendimento": "1170.00",
    "porcentagem": "0.30"
  },
  {
    "id": 4,
    "nome": "MecadoLivre",
    "custo": "480.00",
    "receita": "1000.00",
    "rendimento": "520.00",
    "porcentagem": "0.12"
    }
]
```

### API: [https://omnigem.herokuapp.com/canais/{id}](https://omnigem.herokuapp.com/canais/1)

E necessario informar o id do canal para receber suas informacoes.

Exemplo de resposta:

```javascript
{
  "id": 4,
  "nome": "MecadoLivre",
  "taxa_inicial": "00.00",
  "taxa_fixa": "05.00",
  "taxa_inicial_per": "00.00",
  "taxa_deb": "0.00",
  "taxa_cred": "0.00",
  "taxa_cred_parc": "0.00",
  "taxa_universal": "00.16",
  "lucro_bruto_mes": ""
}
```

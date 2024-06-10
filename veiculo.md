---
description: Requests relacionadas aos veículos.
---

# Veículo

***

## Cadastrar novo veículo

<mark style="color:green;">`POST`</mark> `/veiculo/create`

Usado para adicionar novos veículos ao sistema.

**Headers**

| Name          | Value            |
| ------------- | ---------------- |
| Authorization | `Bearer <token>` |

**Body**

| Name          | Type   | Description                |
| ------------- | ------ | -------------------------- |
| `placa`       | string | Placa do veículo           |
| `capacidade`  | number | Capacidade do veículo      |
| `motoristaid` | number | Id do motorista do veículo |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
    "id": number,
    "placa": string,
    "capacidade": number,
    "createdAt": Date,
    "updatedAt": Date,
    "motoristaId": number
}
```
{% endtab %}
{% endtabs %}

***

## Ver veículos pelo motorista

<mark style="color:blue;">`GET`</mark> `/veiculo/{id_motorista}`

Usada para ver os veículos de um determinado motorista através do seu id.

**Headers**

| Name          | Value            |
| ------------- | ---------------- |
| Authorization | `Bearer <token>` |

**Response**

{% tabs %}
{% tab title="200" %}
```json
[
    {
        "id": number,
        "placa": string,
        "capacidade": number,
        "createdAt": Date,
        "updatedAt": Date,
        "motoristaId": number
    }
]
```
{% endtab %}
{% endtabs %}

***

## Excluir veículos

<mark style="color:red;">`DELETE`</mark> `/veiculo/{id}`

Usada para excluir um determinado veículo.

**Headers**

| Name          | Value            |
| ------------- | ---------------- |
| Authorization | `Bearer <token>` |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
    "id": number,
    "placa": string,
    "capacidade": number,
    "createdAt": Date,
    "updatedAt": Date,
    "motoristaId": number
}
```
{% endtab %}
{% endtabs %}

***

## Alterar dados do veículo

<mark style="color:orange;">`PUT`</mark> `/veiculo/{id}`

Usado para alterar os dados de um veículo.

**Headers**

| Name          | Value            |
| ------------- | ---------------- |
| Authorization | `Bearer <token>` |

**Body**

| Name          | Type   | Description                |
| ------------- | ------ | -------------------------- |
| `placa`       | string | Placa do veículo           |
| `capacidade`  | number | Capacidade do veículo      |
| `motoristaId` | number | Id do motorista do veículo |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
    "id": number,
    "placa": string,
    "capacidade": number,
    "createdAt": Date,
    "updatedAt": Date,
    "motoristaId": number
}
```
{% endtab %}
{% endtabs %}

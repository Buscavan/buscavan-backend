# Usuário

## Registro de novo usuário

<mark style="color:green;">`POST`</mark> `/auth/register`

Registro de novos usuário no sistema.

**Body**

| Name       | Type   | Description       |
| ---------- | ------ | ----------------- |
| `email`    | string | E-mail do usuário |
| `name`     | string | Nome do usuário   |
| `cpf`      | string | CPF do usuário    |
| `password` | string | Senha do usuário  |

**Response**

{% tabs %}
{% tab title="200" %}
{% code fullWidth="false" %}
```json
{
    "id": number;
    "email": string;
    "name": string;
    "password": string;
    "cpf": string;
    "createdAt": Date;
    "updatedAt": Date;
    "token": string;
    "expiresin": number;
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

***

## Login de usuário

<mark style="color:green;">`POST`</mark> `/auth/login`

Login de usuários já cadastrados.

**Body**

| Name       | Type   | Description      |
| ---------- | ------ | ---------------- |
| `cpf`      | string | CPF do usuário   |
| `password` | string | Senha do usuário |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
   "token": string;
   "expiresIn": number;
   "id": number;
}


```
{% endtab %}
{% endtabs %}

***

## Alteração de dados do usuário

`PUT` `/users/{id}`

Altera os dados de um usuário através de seu Id.

**Headers**

| Name          | Value            |
| ------------- | ---------------- |
| Authorization | `Bearer <token>` |

**Body**

| Name       | Type   | Description      |
| ---------- | ------ | ---------------- |
| `cpf`      | string | CPF do usuário   |
| `password` | string | Senha do usuário |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
    "id": number;
    "email": string;
    "name": string;
    "password": string;
    "cpf": string;
    "createdAt": Date;
    "updatedAt": Date;
}
```
{% endtab %}
{% endtabs %}

***

## Ver todos os usuários

<mark style="color:blue;">`GET`</mark> `/users/all`

Retorna todos os usuários cadastrados.

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
        "id": number;
        "email": string;
        "name": string;
        "password": string;
        "cpf": string;
        "createdAt": Date;
        "updatedAt": Date;
    }
]
```
{% endtab %}

{% tab title="400" %}
```json
{
  "error": "Invalid request"
}
```
{% endtab %}
{% endtabs %}

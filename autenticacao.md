# Autenticação

## Registro de novo usuário

<mark style="color:green;">`POST`</mark> `/auth/register`

Request usada para realizar o registro de novos usuário no sistema.

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

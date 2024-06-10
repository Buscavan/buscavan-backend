---
description: Documentação para rodar a aplicação localmente.
---

# Rodando a API

## Índice

* [Requisitos](rodando-a-api.md#requisitos)
* [Clonando o repositório](rodando-a-api.md#clonando-o-repositorio)
* [Configuração do banco de dados](rodando-a-api.md#configuracao-do-banco-de-dados)
* [Iniciando a API](rodando-a-api.md#iniciando-a-api)

## Requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

* [Node](https://nodejs.org/en)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Clonando o repositório

Clone o repositório do Github para sua máquina local:

```bash
git clone https://github.com/Buscavan/back-end.git
cd back-end
```

Instale as dependências do projeto usando npm install:

```bash
npm install
```

## Configuração do banco de dados

Use o seguinte comando para fazer o download e iniciar o container docker do banco de dados postgreSQL:

```bash
docker compose up -d
```

{% hint style="info" %}
Observação: se quiser, você ainda pode rodar o postgreSQL localmente, mas será necessário alterar o usuário e senha no arquivo de configuração (.env)
{% endhint %}

Crie um arquivo '.env' na raiz do projeto e adicione as variáveis de ambiente necessárias:

````bash
```properties
DATABASE_URL="postgresql://admin:123@localhost:5433/buscavan"
JWT_SECRET=md9q347890qnbf8owbno 
JWT_EXPIRATION_TIME=600
```
````

Após criar o '.env', rodar as migrations para criar as tabelas no banco:

```bash
npx prisma migrate dev --name init
```

Se quiser ver os dados inseridos no banco pode-se usar o prisma studio:

```bash
npx prisma studio
```

## Iniciando a API

Para rodar a api, use o seguinte comando:

```bash
npm run start:dev
```

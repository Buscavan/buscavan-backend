# Buscavan

Documentação para rodar a aplicação

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Docker](#docker)
- [Configuração](#configuração)
- [Execução](#execução)

## Requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node](https://nodejs.org/en)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instalação

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

Instale as dependências do projeto usando npm

```bash
npm install
```

## Configuração

Você deve rodar o docker para a criação do banco de dados:

```bash
docker compose up -d
```

Obs: O docker somente é para rodar o container do **banco de dados**

Crie um arquivo '.env' na raiz do projeto e adicione as variáveis de ambiente necessárias:

```bash
DATABASE_URL="postgresql://admin:123@localhost:5432/buscavan"
```

Após criar o '.env' deve rodas a migrations para poder executar o projeto:

```bash
npx prisma migrate dev --name init
```

Se quiser ver os dados inseridos no banco pode-se usar o prisma studio:

```bash
npx prisma studio
```

## Execução

Para rodar a aplicação localmente, use o seguinte comando:

```bash
npm run start:dev
```

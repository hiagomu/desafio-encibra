## 📔 **Documentação**

- [📔 **Documentação**](#-documentação)
- [📚 **Sobre o projeto**](#-sobre-o-projeto)
- [📈 **Regras de Negócio**](#-regras-de-negócio)
- [🙾 **Prototipagem**](#-prototipagem)
- [🤖 **API**](#-api)
- [💻 **Endpoints**](#-endpoints)
- [🚀 **Tecnologias utilizadas**](#-tecnologias-utilizadas)
- [📋 **Pré-requisitos**](#-pré-requisitos)
- [⏱ **Iniciar o projeto**](#-iniciar-o-projeto)

## 📚 **Sobre o projeto**

O desafio apresentado pela empresa Encibra é desenvolver uma plataforma destinada a organizar os perfis dos colaboradores em diversas áreas, tais como Frontend, Backend, Design e outras. Essa plataforma será essencial para todos os colaboradores, proporcionando acesso aos seus próprios perfis e aos perfis dos colegas. Adicionalmente, ela concederá aos gestores a capacidade de gerenciar e atualizar os perfis dos colaboradores de forma eficaz.

## 📈 **Regras de Negócio**

- Colaboradores devem estar associados a áreas de atuação.
- Colaboradores devem conter dados de identificação.
- O sistema deve identificar Colaboradores Normais e Gestores.
- Gestores podem realizar ações em Colaboradores.
- Gestores podem alocar Colaboradores a Projetos.
- Projetos devem conter dados de identificação.
- Projetos precisam de, no mínimo, um Gestor, um Backend e um Frontend.
- Gestores podem ver dados de Regime de Contratação de Colaboradores.
- Colaboradores Normais não podem realizar ações em outros Colaboradores.
- Apenas Gestores podem realizar ações em Colaboradores.

## 🙾 **Prototipagem**

O desenvolvimento da plataforma teve início com a criação de protótipos no Figma, o que permitiu a organização de ideias para o design das telas, contribuindo para a otimização do desenvolvimento de estilos e componentes. Para visualizar as telas, você pode acessá-las através deste [link do projeto no Figma](https://www.figma.com/file/WXrZiXJhEvaQ8f9GdyPTbc/ColPainel?type=design&node-id=0%3A1&mode=design&t=fnefI39qQQvgv27z-1).

<div align="center">
    <img width="1000" src="https://i.imgur.com/hsxCIha.png">
</div>

## 🤖 **API**

A API foi desenvolvida utilizando as API Routes do Next.js 13, e para isso, foi utilizado o Prisma como ORM. Essa escolha se mostrou fundamental para simplificar a interação e manipulação de dados com o banco de dados PostgreSQL, proporcionando uma base sólida e eficiente para a nossa aplicação. O uso do Prisma permitiu a criação de modelos de dados intuitivos e a geração automática de consultas SQL, simplificando assim a tarefa de desenvolver e manter a lógica de acesso aos dados do sistema. Além disso, para a implementação do login, foi utilizado o NextAuth como uma solução mais simplificada.

## 💻 **Endpoints**

### Login:

- POST /api/auth/callback/credentials

### Endpoints de usuário:

- GET /api/users
  - Busca todos os usuários cadastrados
- GET /api/users/:id
  - Busca o usuário pelo ID fornecido na URL ou parâmetro da requisição
- POST /api/users
  - Cria um usuário através dos dados fornecidos no body da requisição
- PUT /api/users
  - Atualiza os dados de um usuário através dos dados fornecidos no body da requisição
- DELETE /api/users
  - Remove um usuário através do ID fornecido no body da requisição

### Endpoints de projeto:

- GET /api/projects
  - Busca todos os projetos cadastrados
- GET /api/projects/:id
  - Busca um projeto pelo ID fornecido na URL ou parâmetro da requisição
- POST /api/projects
  - Cria um projeto através dos dados fornecidos no body da requisição
- PUT /api/projects
  - Atualiza os dados de um projeto através dos dados fornecidos no body da requisição
- DELETE /api/projects
  - Remove um projeto através do ID fornecido no body da requisição

### Endpoints de membro:

- POST /api/members
  - Adiciona um membro a um projeto através dos IDs fornecidos no body da requisição
- DELETE /api/members
  - Remove um membro de um projeto através dos IDs fornecidos no body da requisição

## 🚀 **Tecnologias utilizadas**

- Next.js
- Tailwind CSS
- TypeScript
- PostgreSQL
- Prisma
- Formik
- React Query
- Figma
- Yup

## 📋 **Pré-requisitos**

Para executar este projeto, você precisará do seguinte:

- **Node.js**: Certifique-se de que o Node.js esteja instalado. Você pode baixá-lo [aqui](https://nodejs.org/en/download).

## ⏱ **Iniciar o projeto**

Para começar a utilizar o projeto, siga os passos abaixo:
- Clone o repositório com o seguinte comando:
```bash
git clone https://github.com/hiagomu/desafio-encibra.git

```
- Instale as depedências com o seguinte comando:
```bash
npm install

```
- Por fim, inicie a aplicação com o seguinte comando:
```bash
npm run dev

```

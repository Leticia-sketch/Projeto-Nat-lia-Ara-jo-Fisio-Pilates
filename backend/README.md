# Estúdio Natália Araújo FisioPilates — Backend

Sistema web completo para gerenciamento do estúdio de fisioterapia e pilates.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MySQL
- tsx
- bcrypt (hash de senhas)
- express-session (autenticação por sessão)

## Estrutura do Projeto

backend/

├── controllers/       # Regras de negócio e respostas HTTP

├── models/            # Acesso ao banco via Prisma Client

├── routes/            # Definição dos endpoints

├── middlewares/       # Middleware de autenticação

├── database/          # Configuração do Prisma Client

├── types/             # Extensões de tipagem (ex: sessão)

├── prisma/

│   ├── schema.prisma  # Modelagem do banco

│   ├── seed.ts        # Dados iniciais + conta administrativa

│   └── migrations/    # Histórico de migrations

├── server.ts          # Entrada da aplicação

├── .env               # Variáveis de ambiente

└── ERD.svg            # Diagrama ERD


## Como Instalar

```bash
cd backend
npm install
```

## Configurar o Banco e Variáveis de Ambiente

Crie um banco MySQL chamado `studio_pilates` e configure o `.env` com três variáveis:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/studio_pilates"
SESSION_SECRET="uma-string-aleatoria-grande-aqui"
SEED_ADMIN_PASSWORD="senha-da-conta-administrativa-inicial"
```

- `DATABASE_URL` — conexão do Prisma com o MySQL.
- `SESSION_SECRET` — chave usada pelo `express-session` para assinar o cookie de sessão. Gere uma com:
```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- `SEED_ADMIN_PASSWORD` — senha em texto puro usada **apenas no momento do seed** para gerar o hash da conta administrativa inicial. O seed falha propositalmente se essa variável não estiver definida, para nunca criar uma senha padrão conhecida.

O `.env` nunca deve ser commitado — ele já está no `.gitignore`.

## Criar as Tabelas

```bash
npx prisma migrate dev --name init
```

## Popular o Banco

```bash
npx prisma db seed
```

Isso cria os dados iniciais do site **e** a conta administrativa única (usando `SEED_ADMIN_PASSWORD`, com a senha já hasheada via bcrypt antes de ir para o banco).

## Executar em Desenvolvimento

```bash
npm run dev
```

## Autenticação

O sistema foi desenhado para **uma única administradora** (a proprietária do estúdio) — não existe cadastro público. A conta administrativa é criada apenas pelo seed.

### Modelagem e segurança das credenciais

O model `Admin` (`prisma/schema.prisma`) guarda:

| Campo | Tipo | Observação |
|---|---|---|
| `id` | Int | chave primária |
| `nome` | String | |
| `email` | String | `@unique` — impede duas contas com o mesmo e-mail |
| `senhaHash` | String | hash bcrypt (custo 10) — a senha em texto puro nunca é armazenada |
| `createdAt` / `updatedAt` | DateTime | controle de datas |

A tentativa de criar um e-mail duplicado é rejeitada pelo próprio MySQL (constraint `UNIQUE`); o Prisma traduz isso em um erro `P2002`, que o `authController` converte em `409 Conflict`.

### Fluxo de login e sessão

A sessão é mantida via `express-session` (cookie assinado com `SESSION_SECRET`, guardado em memória no processo do servidor).


A mensagem de erro é sempre a mesma para "usuário não existe" e "senha incorreta" — evita que a API revele se um e-mail está cadastrado.

### Rotas de autenticação

| Método | Rota | Descrição | Protegida? |
|---|---|---|---|
| POST | /auth/login | Login | Não |
| POST | /auth/logout | Encerra a sessão | Não |
| GET | /auth/me | Retorna o admin autenticado | Sim |
| POST | /auth/registrar | Cria um novo admin | **Sim** — só um admin já logado pode criar outro |

`registrar` existe para demonstrar o fluxo de cadastro exigido pela avaliação, mas fica atrás do `authMiddleware` de propósito: não há formulário público de cadastro, coerente com a regra de negócio de uma única administradora.

### Middleware de autenticação

`middlewares/authMiddleware.ts` verifica `req.session.admin`. Se não existir, responde `401 { erro: "Não autenticado" }` e interrompe a requisição; caso contrário, deixa passar (`next()`).

Esse middleware protege:
- `GET /dashboard` (o HTML do painel só é servido para quem está autenticado)
- Todos os métodos de **escrita** (`POST`/`PUT`/`DELETE`) das rotas de conteúdo abaixo

Os métodos `GET` de conteúdo continuam públicos, pois alimentam o site institucional, visitado por qualquer pessoa sem login.

## Endpoints da API

| Método | Rota | Descrição | Protegida? |
|--------|------|-----------|---|
| GET | /dados | Todos os dados do site | Não |
| GET | /hero | Hero | Não |
| PUT | /hero | Atualizar hero | Sim |
| GET | /estudio | Estúdio | Não |
| POST/PUT/DELETE | /estudio | Gerenciar estúdio | Sim |
| GET | /sobre | Sobre | Não |
| PUT | /sobre | Atualizar sobre | Sim |
| GET | /servicos | Serviços | Não |
| POST/PUT/DELETE | /servicos | Gerenciar serviços | Sim |
| GET | /planos | Planos | Não |
| POST/PUT/DELETE | /planos | Gerenciar planos | Sim |
| GET | /planos-detalhados | Planos Detalhados | Não |
| POST/PUT | /planos-detalhados | Gerenciar planos detalhados | Sim |
| GET | /depoimentos | Depoimentos | Não |
| POST/PUT/DELETE | /depoimentos | Gerenciar depoimentos | Sim |
| GET | /footer | Footer | Não |
| PUT | /footer | Atualizar footer | Sim |
| POST | /auth/login | Login | Não |
| POST | /auth/logout | Logout | Não |
| GET | /auth/me | Admin autenticado | Sim |
| POST | /auth/registrar | Criar novo admin | Sim |

## Testando a Autenticação

O arquivo `teste.http` (extensão REST Client do VS Code) cobre os fluxos de autenticação, incluindo:

- Login válido, com senha incorreta e com usuário inexistente
- Acesso ao dashboard e a `/auth/me` sem autenticação (401)
- Acesso às mesmas rotas autenticado (200), reaproveitando o cookie de sessão retornado pelo login
- Cadastro de novo admin e tentativa de cadastro com e-mail duplicado (409)
- Logout e tentativa de acesso à rota protegida depois do logout (401)
- Cada rota de conteúdo tem exemplos de escrita sem login (401) e com login (sucesso)

## Autor

Desenvolvido por Ana Leticia
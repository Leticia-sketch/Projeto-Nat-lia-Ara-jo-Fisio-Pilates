# Estúdio Natália Araújo FisioPilates — Backend

Sistema web completo para gerenciamento do estúdio de fisioterapia e pilates.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MySQL
- tsx
- argon2 (hash de senhas)
- express-session (autenticação por sessão)
- Zod (validação de dados de entrada)
- Nodemailer (envio de e-mail, com conta de teste Ethereal em desenvolvimento)

## Estrutura do Projeto

backend/

├── controllers/       # Regras de negócio e respostas HTTP

├── models/            # Acesso ao banco via Prisma Client

├── routes/            # Definição dos endpoints

├── middlewares/       # Autenticação, validação e tratamento de erros

├── schemas/           # Schemas Zod (validação de body/params/query)

├── services/          # Serviços isolados (ex: envio de e-mail)

├── database/          # Configuração do Prisma Client

├── types/             # Extensões de tipagem (ex: sessão)

├── prisma/

│   ├── schema.prisma  # Modelagem do banco

│   ├── seed.ts        # Dados iniciais + conta administrativa

│   └── migrations/    # Histórico de migrations

├── server.ts          # Entrada da aplicação

├── .env               # Variáveis de ambiente (não versionado)

├── .env.example       # Modelo das variáveis de ambiente (sem credenciais reais)

└── ERD.svg            # Diagrama ERD


## Como Instalar

```bash
cd backend
npm install
```

## Configurar o Banco e Variáveis de Ambiente

Crie um banco MySQL chamado `studio_pilates`. O arquivo `.env.example` documenta todas as variáveis necessárias; copie-o para `.env` e preencha com valores reais:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/studio_pilates"
SESSION_SECRET="uma-string-aleatoria-grande-aqui"
SEED_ADMIN_PASSWORD="senha-da-conta-administrativa-inicial"
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

- `DATABASE_URL` — conexão do Prisma com o MySQL.
- `SESSION_SECRET` — chave usada pelo `express-session` para assinar o cookie de sessão. Gere uma com:
```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- `SEED_ADMIN_PASSWORD` — senha em texto puro usada **apenas no momento do seed** para gerar o hash da conta administrativa inicial. O seed falha propositalmente se essa variável não estiver definida, para nunca criar uma senha padrão conhecida.
- `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` — configuração do servidor de e-mail. Se `SMTP_USER`/`SMTP_PASS` ficarem vazios, o `services/SendMail.ts` gera automaticamente uma conta de teste Ethereal a cada envio (nenhum e-mail real é enviado; um link de preview aparece no terminal). Para uma conta Ethereal fixa, gere uma com:
```bash
  node -e "const nm=require('nodemailer'); nm.createTestAccount().then(c=>console.log('SMTP_USER='+c.user+'\nSMTP_PASS='+c.pass))"
```

O `.env` nunca deve ser commitado — ele já está no `.gitignore`. O `.env.example` **é** versionado e serve apenas de referência, sem nenhum valor sensível real.

## Criar as Tabelas

```bash
npx prisma migrate dev --name init
```

## Popular o Banco

```bash
npx prisma db seed
```

Isso cria os dados iniciais do site **e** a conta administrativa única (usando `SEED_ADMIN_PASSWORD`, com a senha já hasheada via argon2 antes de ir para o banco). O seed é seguro para rodar mais de uma vez: o conteúdo do site só é criado na primeira execução (verifica se já existe antes de inserir), e o admin usa `upsert` pelo e-mail.

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
| `senhaHash` | String | hash **argon2** — a senha em texto puro nunca é armazenada |
| `resetTokenHash` | String? | hash SHA-256 do token de redefinição de senha (nulo fora da janela de redefinição) |
| `resetTokenExpiry` | DateTime? | expiração do token de redefinição (15 minutos) |
| `createdAt` / `updatedAt` | DateTime | controle de datas |

A tentativa de criar um e-mail duplicado é rejeitada pelo próprio MySQL (constraint `UNIQUE`); o Prisma traduz isso em um erro `P2002`, capturado pelo middleware de erros e convertido em `409 Conflict`.

### Fluxo de login e sessão

A sessão é mantida via `express-session` (cookie assinado com `SESSION_SECRET`, guardado em memória no processo do servidor).

A mensagem de erro é sempre a mesma para "usuário não existe" e "senha incorreta" — evita que a API revele se um e-mail está cadastrado.

### Validação de dados (Zod)

Toda entrada de `body`, `params` e `query` é validada por schemas Zod antes de chegar ao Controller:

- `schemas/authSchemas.ts` — `body` de login, cadastro, esqueci-senha e redefinir-senha (e-mail válido, senha mínima, token com formato correto).
- `schemas/comumSchemas.ts` — `params.id` (número inteiro positivo, reutilizado em todas as rotas com `:id`) e `query` de paginação opcional em `/depoimentos`.

O middleware genérico `middlewares/validate.ts` recebe `{ body?, params?, query? }`, roda `safeParse` em cada fonte informada e, em caso de falha, repassa o erro para o middleware de erros com `next(erro)` — os Controllers e Models não fazem nenhuma verificação manual de formato com `if`.

### Tratamento centralizado de erros

`middlewares/errorHandler.ts` é o único lugar que decide o status HTTP de erro, registrado como o último `app.use()` do `server.ts`:

| Status | Origem | Exemplo no projeto |
|---|---|---|
| `400 Bad Request` | `ZodError` (formato inválido) | e-mail mal formatado no login, senha curta no cadastro, `id` não numérico em `PUT /servicos/abc` |
| `404 Not Found` | Prisma `P2025` (registro inexistente) | `PUT /servicos/9999` |
| `409 Conflict` | Prisma `P2002` (violação de `UNIQUE`) | `POST /auth/registrar` com e-mail já cadastrado |
| `500 Internal Server Error` | qualquer erro não previsto | fallback, nunca expõe detalhe interno ao cliente |

A resposta de `400` sempre inclui uma lista `issues` com `path` (campo que falhou) e `message` (motivo), extraída diretamente do `ZodError`.

### Redefinição de senha (e envio de e-mail)
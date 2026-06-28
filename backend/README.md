# Estúdio Natália Araújo FisioPilates — Backend

Sistema web completo para gerenciamento do estúdio de fisioterapia e pilates.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MySQL
- tsx

## Estrutura do Projeto

backend/

├── controllers/       # Regras de negócio e respostas HTTP

├── models/            # Acesso ao banco via Prisma Client

├── routes/            # Definição dos endpoints

├── database/          # Configuração do Prisma Client

├── prisma/

│   ├── schema.prisma  # Modelagem do banco

│   ├── seed.ts        # Dados iniciais

│   └── migrations/    # Histórico de migrations

├── server.ts          # Entrada da aplicação

├── .env               # Variáveis de ambiente

└── ERD.svg            # Diagrama ERD


## Como Instalar

```bash
cd backend
npm install
```

## Configurar o Banco

Crie um banco MySQL chamado `studio_pilates` e configure o `.env`:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/studio_pilates"
```

## Criar as Tabelas

```bash
npx prisma migrate dev --name init
```

## Popular o Banco

```bash
npx prisma db seed
```

## Executar em Desenvolvimento

```bash
npm run dev
```

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /dados | Todos os dados do site |
| GET/PUT | /hero | Hero |
| GET/PUT | /estudio | Estúdio |
| GET/PUT | /sobre | Sobre |
| GET/POST/PUT/DELETE | /servicos | Serviços |
| GET/POST/PUT/DELETE | /planos | Planos |
| GET/POST/PUT | /planos-detalhados | Planos Detalhados |
| GET/POST/PUT/DELETE | /depoimentos | Depoimentos |
| GET/PUT | /footer | Footer |
| POST | /login | Autenticação |

## Autor

Desenvolvido por Ana Leticia
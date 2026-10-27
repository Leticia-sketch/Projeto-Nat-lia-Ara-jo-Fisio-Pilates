import express, { Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import path from "path"
import session from "express-session"

import estudioRoutes from "./routes/estudioRoutes"
import dadosRoutes from "./routes/dadosRoutes"
import planosDetalhadosRoutes from "./routes/planosDetalhadosRoutes"
import servicosRoutes from "./routes/servicosRoutes"
import planosRoutes from "./routes/planosRoutes"
import depoimentosRoutes from "./routes/depoimentosRoutes"
import heroRoutes from "./routes/heroRoutes"
import sobreRoutes from "./routes/sobreRoutes"
import footerRoutes from "./routes/footerRoutes"
import authRoutes from "./routes/authRoutes"
import authMiddleware from "./middlewares/authMiddleware"
import errorHandler from "./middlewares/errorHandler"

const app = express()

const PRODUCAO = process.env.NODE_ENV === "production"
const PORTA = Number(process.env.PORT) || 3000

// Pasta que contém "public" e "dashboard.html" (a pasta acima de "backend").
// O servidor deve ser iniciado de dentro de "backend" (npm run dev / npm start).
const RAIZ_DO_PROJETO = path.resolve(process.cwd(), "..")

const SEGREDO_SESSAO = process.env.SESSION_SECRET

if (!SEGREDO_SESSAO) {
  throw new Error("SESSION_SECRET não foi definido nas variáveis de ambiente")
}

// Em produção o Render fica na frente do servidor (proxy HTTPS)
if (PRODUCAO) {
  app.set("trust proxy", 1)
}

app.use(cors())
app.use(express.json())

app.use(
  session({
    secret: SEGREDO_SESSAO,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: PRODUCAO,
    },
  })
)

app.use(morgan(PRODUCAO ? "combined" : "dev"))

// Arquivos estáticos
app.use(express.static(path.join(RAIZ_DO_PROJETO, "public")))

// ROTAS
app.use("/estudio", estudioRoutes)
app.use("/dados", dadosRoutes)
app.use("/planos-detalhados", planosDetalhadosRoutes)
app.use("/servicos", servicosRoutes)
app.use("/planos", planosRoutes)
app.use("/depoimentos", depoimentosRoutes)
app.use("/hero", heroRoutes)
app.use("/sobre", sobreRoutes)
app.use("/footer", footerRoutes)
app.use("/auth", authRoutes)

// DASHBOARD (protegido pelo middleware)
app.get("/dashboard", authMiddleware, (req: Request, res: Response) => {
  res.sendFile(path.join(RAIZ_DO_PROJETO, "dashboard.html"))
})

// ERROR HANDLER — precisa ser o ÚLTIMO app.use(), depois de todas as rotas
app.use(errorHandler)

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`)
})
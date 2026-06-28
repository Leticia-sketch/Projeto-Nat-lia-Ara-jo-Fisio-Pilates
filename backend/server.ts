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

const app = express()

app.use(cors())
app.use(express.json())

app.use(
  session({
    secret: "studio-secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
)

app.use(morgan("dev"))

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")))

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

// LOGIN
app.post("/login", (req: Request, res: Response) => {
  const { email, senha } = req.body

  if (
    email === "nataliaaraujofisiopilates@gmail.com" &&
    senha === "123456"
  ) {
    ;(req.session as any).admin = true
    return res.json({ sucesso: true })
  }

  return res.status(401).json({
    erro: "Email ou senha inválidos",
  })
})

// DASHBOARD
app.get("/dashboard", (req: Request, res: Response) => {
  if (!(req.session as any).admin) {
    return res.redirect("/login.html")
  }

  res.sendFile(path.join(__dirname, "../dashboard.html"))
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
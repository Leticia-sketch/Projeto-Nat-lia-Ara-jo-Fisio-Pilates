const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const session = require("express-session")

const estudioRoutes = require("./routes/estudioRoutes")
const dadosRoutes = require("./routes/dadosRoutes") 

const app = express()

app.use(cors())

app.use(express.json())

app.use(session({
  secret: "studio-secreto",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}))

app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))

// ROTAS
app.use("/estudio", estudioRoutes)
app.use("/dados", dadosRoutes)

// LOGIN
app.post("/login", (req, res) => {

  const { email, senha } = req.body

  if (
    email === "nataliaaraujofisiopilates@gmail.com" &&
    senha === "123456"
  ) {

    req.session.admin = true

    return res.json({
      sucesso: true
    })

  }

  return res.status(401).json({
    erro: "Email ou senha inválidos"
  })

})

// DASHBOARD
app.get("/dashboard", (req, res) => {

  if (!req.session.admin) {
    return res.redirect("/login.html")
  }

  res.sendFile(path.join(__dirname, "../dashboard.html"))

})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
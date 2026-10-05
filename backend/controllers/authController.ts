import { Request, Response, NextFunction } from "express"
import argon2 from "argon2"
import crypto from "crypto"
import adminModel from "../models/adminModel"
import SendMail from "../services/SendMail"

async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, senha } = req.body

    const admin = await adminModel.buscarPorEmail(email)

    if (!admin) {
      res.status(401).json({ erro: "Email ou senha inválidos" })
      return
    }

    const senhaConfere = await argon2.verify(admin.senhaHash, senha)

    if (!senhaConfere) {
      res.status(401).json({ erro: "Email ou senha inválidos" })
      return
    }

    req.session.admin = { id: admin.id, nome: admin.nome, email: admin.email }

    res.json({ sucesso: true, admin: { id: admin.id, nome: admin.nome, email: admin.email } })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao autenticar" })
  }
}

async function logout(req: Request, res: Response): Promise<void> {
  req.session.destroy((erro) => {
    if (erro) {
      res.status(500).json({ erro: "Erro ao encerrar sessão" })
      return
    }
    res.clearCookie("connect.sid")
    res.json({ sucesso: true })
  })
}

async function me(req: Request, res: Response): Promise<void> {
  if (!req.session.admin) {
    res.status(401).json({ erro: "Não autenticado" })
    return
  }
  res.json({ admin: req.session.admin })
}

async function registrar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome, email, senha } = req.body

    const senhaHash = await argon2.hash(senha)
    const novoAdmin = await adminModel.criar({ nome, email, senhaHash })

    res.status(201).json({
      sucesso: true,
      admin: { id: novoAdmin.id, nome: novoAdmin.nome, email: novoAdmin.email },
    })

    // Disparado só depois do 201 já ter sido respondido — falha de SMTP nunca afeta o cadastro
    SendMail.enviarEmail({
      para: novoAdmin.email,
      assunto: "Bem-vinda ao painel administrativo - Estúdio Natália Araújo FisioPilates",
      texto: `Olá, ${novoAdmin.nome}! Sua conta administrativa foi criada com sucesso. Você já pode acessar o painel em http://localhost:3000/login.html`,
      html: `
        <p>Olá, ${novoAdmin.nome}!</p>
        <p>Sua conta administrativa no Estúdio Natália Araújo FisioPilates foi criada com sucesso.</p>
        <p>Você já pode acessar o painel administrativo: <a href="http://localhost:3000/login.html">clique aqui para entrar</a></p>
      `
    })
  } catch (erro) {
    next(erro)
  }
}

async function esqueciSenha(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body

    const admin = await adminModel.buscarPorEmail(email)

    // Sempre responde 200 com a mesma mensagem, exista ou não o e-mail —
    // evita revelar se um e-mail está cadastrado no sistema
    if (admin) {
      const tokenBruto = crypto.randomBytes(32).toString("hex")
      const tokenHash = crypto.createHash("sha256").update(tokenBruto).digest("hex")
      const expiraEm = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

      await adminModel.salvarTokenReset(admin.id, tokenHash, expiraEm)

      const linkRedefinicao = `http://localhost:3000/redefinir-senha.html?token=${tokenBruto}`

      // Falha de SMTP não deve derrubar a requisição — SendMail já trata isso internamente
      await SendMail.enviarEmail({
        para: admin.email,
        assunto: "Redefinição de senha - Estúdio Natália Araújo FisioPilates",
        texto: `Você solicitou a redefinição de senha. Acesse o link para continuar: ${linkRedefinicao} (válido por 15 minutos)`,
        html: `
          <p>Você solicitou a redefinição de senha do painel administrativo.</p>
          <p><a href="${linkRedefinicao}">Clique aqui para redefinir sua senha</a></p>
          <p>Este link é válido por 15 minutos. Se você não solicitou isso, ignore este e-mail.</p>
        `
      })
    }

    res.json({ sucesso: true, mensagem: "Se o e-mail existir em nosso sistema, você receberá instruções." })
  } catch (erro) {
    next(erro)
  }
}

async function redefinirSenha(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token, novaSenha } = req.body

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
    const admin = await adminModel.buscarPorTokenHash(tokenHash)

    if (!admin || !admin.resetTokenExpiry || admin.resetTokenExpiry < new Date()) {
      res.status(400).json({ erro: "Token inválido ou expirado" })
      return
    }

    const senhaHash = await argon2.hash(novaSenha)
    await adminModel.redefinirSenha(admin.id, senhaHash)

    res.json({ sucesso: true, mensagem: "Senha redefinida com sucesso" })
  } catch (erro) {
    next(erro)
  }
}

export default { login, logout, me, registrar, esqueciSenha, redefinirSenha }
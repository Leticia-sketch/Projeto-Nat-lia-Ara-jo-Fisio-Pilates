import { Request, Response } from "express"
import bcrypt from "bcrypt"
import adminModel from "../models/adminModel"

async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      res.status(400).json({ erro: "Email e senha são obrigatórios" })
      return
    }

    const admin = await adminModel.buscarPorEmail(email)

    if (!admin) {
      res.status(401).json({ erro: "Email ou senha inválidos" })
      return
    }

    const senhaConfere = await bcrypt.compare(senha, admin.senhaHash)

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

async function registrar(req: Request, res: Response): Promise<void> {
  try {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
      res.status(400).json({ erro: "Nome, email e senha são obrigatórios" })
      return
    }

    const senhaHash = await bcrypt.hash(senha, 10)
    const novoAdmin = await adminModel.criar({ nome, email, senhaHash })

    res.status(201).json({
      sucesso: true,
      admin: { id: novoAdmin.id, nome: novoAdmin.nome, email: novoAdmin.email },
    })
  } catch (erro: any) {
    if (erro.code === "P2002") {
      res.status(409).json({ erro: "Email já cadastrado" })
      return
    }
    res.status(500).json({ erro: "Erro ao registrar administrador" })
  }
}

export default { login, logout, me, registrar }
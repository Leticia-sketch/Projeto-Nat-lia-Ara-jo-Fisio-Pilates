import { Request, Response } from "express"
import planosModel from "../models/planosModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const planos = await planosModel.buscarPlanos()
    res.json(planos)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar planos" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    const { titulo, preco, beneficios } = req.body
    await planosModel.atualizarPlano(id, titulo, preco, beneficios)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar plano" })
  }
}

async function criar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, preco, beneficios } = req.body
    await planosModel.criarPlano(titulo, preco, beneficios)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar plano" })
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    await planosModel.deletarPlano(id)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar plano" })
  }
}

export default { buscar, atualizar, criar, deletar }
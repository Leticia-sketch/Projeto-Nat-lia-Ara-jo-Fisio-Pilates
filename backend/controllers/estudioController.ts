import { Request, Response } from "express"
import estudioModel from "../models/estudioModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const estudio = await estudioModel.buscarEstudio()
    res.json(estudio)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar estúdio" })
  }
}

async function criar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, texto } = req.body
    await estudioModel.criarEstudio(titulo, texto)
    res.json({ sucesso: true, mensagem: "Estúdio criado!" })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar estúdio" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, texto } = req.body
    await estudioModel.atualizarEstudio(titulo, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar estúdio" })
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  try {
    await estudioModel.deletarEstudio()
    res.json({ sucesso: true, mensagem: "Estúdio deletado!" })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar estúdio" })
  }
}

export default { buscar, criar, atualizar, deletar }
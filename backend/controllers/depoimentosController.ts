import { Request, Response } from "express"
import depoimentosModel from "../models/depoimentosModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const depoimentos = await depoimentosModel.buscarDepoimentos()
    res.json(depoimentos)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar depoimentos" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    const { nome, texto, estrelas } = req.body
    await depoimentosModel.atualizarDepoimento(id, nome, texto, estrelas)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar depoimento" })
  }
}

async function criar(req: Request, res: Response): Promise<void> {
  try {
    const { nome, texto, estrelas } = req.body
    await depoimentosModel.criarDepoimento(nome, texto, estrelas)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar depoimento" })
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    await depoimentosModel.deletarDepoimento(id)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar depoimento" })
  }
}

export default { buscar, atualizar, criar, deletar }
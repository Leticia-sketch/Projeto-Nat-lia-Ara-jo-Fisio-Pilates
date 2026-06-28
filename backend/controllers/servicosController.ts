import { Request, Response } from "express"
import servicosModel from "../models/servicosModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const servicos = await servicosModel.buscarServicos()
    res.json(servicos)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar serviços" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    const { titulo, img, texto } = req.body
    await servicosModel.atualizarServico(id, titulo, img, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar serviço" })
  }
}

async function criar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, img, texto } = req.body
    await servicosModel.criarServico(titulo, img, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar serviço" })
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    await servicosModel.deletarServico(id)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar serviço" })
  }
}

export default { buscar, atualizar, criar, deletar }
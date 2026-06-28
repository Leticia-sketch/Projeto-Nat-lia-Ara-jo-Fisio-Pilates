import { Request, Response } from "express"
import footerModel from "../models/footerModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const footer = await footerModel.buscarFooter()
    res.json(footer)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar footer" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, telefone, instagram, endereco, mapa } = req.body
    await footerModel.atualizarFooter(titulo, telefone, instagram, endereco, mapa)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar footer" })
  }
}

export default { buscar, atualizar }
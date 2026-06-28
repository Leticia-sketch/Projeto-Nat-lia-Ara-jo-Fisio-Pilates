import { Request, Response } from "express"
import heroModel from "../models/heroModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const hero = await heroModel.buscarHero()
    res.json(hero)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar hero" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, botao } = req.body
    await heroModel.atualizarHero(titulo, botao)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar hero" })
  }
}

export default { buscar, atualizar }
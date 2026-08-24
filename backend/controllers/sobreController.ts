import { Request, Response } from "express"
import sobreModel from "../models/sobreModel"

async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const sobre = await sobreModel.buscarSobre()
    res.json(sobre)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar sobre" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, texto } = req.body
    await sobreModel.atualizarSobre(titulo, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar sobre" })
  }
}

export default { buscar, atualizar }
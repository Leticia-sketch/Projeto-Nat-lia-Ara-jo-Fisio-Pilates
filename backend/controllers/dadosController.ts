import { Request, Response } from "express"
import dadosModel from "../models/dadosModel"

async function listar(req: Request, res: Response): Promise<void> {
  try {
    const dados = await dadosModel.buscarDados()
    res.status(200).json(dados)
  } catch (erro) {
    console.log(erro)
    res.status(500).json({ erro: "Erro ao buscar dados" })
  }
}

export default { listar }
import { Request, Response } from "express"
import planosDetalhadosModel from "../models/planosDetalhadosModel"

async function listar(req: Request, res: Response): Promise<void> {
  try {
    const dados = await planosDetalhadosModel.buscarPlanosDetalhados()
    res.status(200).json(dados)
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao buscar planos detalhados" })
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string
    const { titulo, opcoes } = req.body
    await planosDetalhadosModel.atualizarPlanoDetalhado(id, titulo, opcoes)
    res.status(200).json({ sucesso: true })
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao atualizar plano detalhado" })
  }
}

async function criar(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, opcoes } = req.body
    await planosDetalhadosModel.criarPlanoDetalhado(titulo, opcoes)
    res.status(201).json({ sucesso: true })
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao criar plano detalhado" })
  }
}

export default { listar, atualizar, criar }
const planosModel = require("../models/planosModel")

async function buscar(req, res) {
  try {
    const planos = await planosModel.buscarPlanos()
    res.json(planos)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar planos" })
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params
    const { titulo, preco, beneficios } = req.body
    await planosModel.atualizarPlano(id, titulo, preco, beneficios)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar plano" })
  }
}

async function criar(req, res) {
  try {
    const { titulo, preco, beneficios } = req.body
    await planosModel.criarPlano(titulo, preco, beneficios)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar plano" })
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params
    await planosModel.deletarPlano(id)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar plano" })
  }
}

module.exports = { buscar, atualizar, criar, deletar }
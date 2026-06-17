const depoimentosModel = require("../models/depoimentosModel")

async function buscar(req, res) {
  try {
    const depoimentos = await depoimentosModel.buscarDepoimentos()
    res.json(depoimentos)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar depoimentos" })
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params
    const { nome, texto, estrelas } = req.body
    await depoimentosModel.atualizarDepoimento(id, nome, texto, estrelas)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar depoimento" })
  }
}

async function criar(req, res) {
  try {
    const { nome, texto, estrelas } = req.body
    await depoimentosModel.criarDepoimento(nome, texto, estrelas)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar depoimento" })
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params
    await depoimentosModel.deletarDepoimento(id)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar depoimento" })
  }
}

module.exports = { buscar, atualizar, criar, deletar }
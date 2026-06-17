const servicosModel = require("../models/servicosModel")

async function buscar(req, res) {
  try {
    const servicos = await servicosModel.buscarServicos()
    res.json(servicos)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar serviços" })
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params
    const { titulo, img, texto } = req.body
    await servicosModel.atualizarServico(id, titulo, img, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar serviço" })
  }
}

async function criar(req, res) {
  try {
    const { titulo, img, texto } = req.body
    await servicosModel.criarServico(titulo, img, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar serviço" })
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params
    await servicosModel.deletarServico(id)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar serviço" })
  }
}

module.exports = { buscar, atualizar, criar, deletar }
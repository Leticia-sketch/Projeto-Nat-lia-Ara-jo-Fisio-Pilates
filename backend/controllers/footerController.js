const footerModel = require("../models/footerModel")

async function buscar(req, res) {
  try {
    const footer = await footerModel.buscarFooter()
    res.json(footer)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar footer" })
  }
}

async function atualizar(req, res) {
  try {
    const { titulo, telefone, instagram, endereco } = req.body
    await footerModel.atualizarFooter(titulo, telefone, instagram, endereco)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar footer" })
  }
}

module.exports = { buscar, atualizar }
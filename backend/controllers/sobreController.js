const sobreModel = require("../models/sobreModel")

async function buscar(req, res) {
  try {
    const sobre = await sobreModel.buscarSobre()
    res.json(sobre)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar sobre" })
  }
}

async function atualizar(req, res) {
  try {
    const { titulo, texto } = req.body
    await sobreModel.atualizarSobre(titulo, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar sobre" })
  }
}

module.exports = { buscar, atualizar }
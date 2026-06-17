const heroModel = require("../models/heroModel")

async function buscar(req, res) {
  try {
    const hero = await heroModel.buscarHero()
    res.json(hero)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar hero" })
  }
}

async function atualizar(req, res) {
  try {
    const { titulo, botao } = req.body
    await heroModel.atualizarHero(titulo, botao)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar hero" })
  }
}

module.exports = { buscar, atualizar }
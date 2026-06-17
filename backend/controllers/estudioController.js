const estudioModel = require("../models/estudioModel")

// READ
async function buscar(req, res) {
  try {
    const estudio = await estudioModel.buscarEstudio()
    res.json(estudio)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar estúdio" })
  }
}

//  CREATE
async function criar(req, res) {
  try {
    const { titulo, texto } = req.body
    await estudioModel.criarEstudio(titulo, texto)
    res.json({ sucesso: true, mensagem: "Estúdio criado!" })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar estúdio" })
  }
}

// UPDATE
async function atualizar(req, res) {
  try {
    const { titulo, texto } = req.body
    await estudioModel.atualizarEstudio(titulo, texto)
    res.json({ sucesso: true })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar estúdio" })
  }
}

//  DELETE
async function deletar(req, res) {
  try {
    await estudioModel.deletarEstudio()
    res.json({ sucesso: true, mensagem: "Estúdio deletado!" })
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar estúdio" })
  }
}

module.exports = {
  buscar,
  criar,      
  atualizar,
  deletar    
}
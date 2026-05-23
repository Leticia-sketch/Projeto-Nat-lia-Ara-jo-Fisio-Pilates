const dadosModel = require("../models/dadosModel")

async function listar(req, res) {

  try {

    const dados = await dadosModel.buscarDados()

    res.status(200).json(dados)

  } catch (erro) {

    console.log(erro)

    res.status(500).json({
      erro: "Erro ao buscar dados"
    })

  }

}

module.exports = {
  listar
}
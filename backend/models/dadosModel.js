const connect = require("../database/connection")

const dadosJson = require("../../public/data/dados.json")

async function buscarDados() {

  const db = await connect()

  const [rows] = await db.query(
    "SELECT * FROM estudio LIMIT 1"
  )

  const dados = { ...dadosJson }

  if (rows.length > 0) {

    dados.estudio = {
      titulo: rows[0].titulo,
      texto: rows[0].texto
    }

  }

  return dados
}

module.exports = {
  buscarDados
}
const connect = require("../database/connection")

async function buscarHero() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM hero LIMIT 1")
  return rows[0]
}

async function atualizarHero(titulo, botao) {
  const db = await connect()
  await db.query(
    "UPDATE hero SET titulo = ?, botao = ? WHERE id = 1",
    [titulo, botao]
  )
}

module.exports = { buscarHero, atualizarHero }
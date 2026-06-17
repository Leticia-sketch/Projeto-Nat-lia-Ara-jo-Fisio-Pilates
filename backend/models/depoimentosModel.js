const connect = require("../database/connection")

async function buscarDepoimentos() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM depoimentos")
  return rows
}

async function atualizarDepoimento(id, nome, texto, estrelas) {
  const db = await connect()
  await db.query(
    "UPDATE depoimentos SET nome = ?, texto = ?, estrelas = ? WHERE id = ?",
    [nome, texto, estrelas, id]
  )
}

async function criarDepoimento(nome, texto, estrelas) {
  const db = await connect()
  await db.query(
    "INSERT INTO depoimentos (nome, texto, estrelas) VALUES (?, ?, ?)",
    [nome, texto, estrelas]
  )
}

async function deletarDepoimento(id) {
  const db = await connect()
  await db.query("DELETE FROM depoimentos WHERE id = ?", [id])
}

module.exports = { buscarDepoimentos, atualizarDepoimento, criarDepoimento, deletarDepoimento }
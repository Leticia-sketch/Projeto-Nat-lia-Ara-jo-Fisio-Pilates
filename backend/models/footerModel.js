const connect = require("../database/connection")

async function buscarFooter() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM footer LIMIT 1")
  return rows[0]
}

async function atualizarFooter(titulo, telefone, instagram, endereco) {
  const db = await connect()
  await db.query(
    "UPDATE footer SET titulo = ?, telefone = ?, instagram = ?, endereco = ? WHERE id = 1",
    [titulo, telefone, instagram, endereco]
  )
}

module.exports = { buscarFooter, atualizarFooter }
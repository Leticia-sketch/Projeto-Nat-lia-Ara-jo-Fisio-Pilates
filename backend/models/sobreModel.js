const connect = require("../database/connection")

async function buscarSobre() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM sobre LIMIT 1")
  return rows[0]
}

async function atualizarSobre(titulo, texto) {
  const db = await connect()
  await db.query(
    "UPDATE sobre SET titulo = ?, texto = ? WHERE id = 1",
    [titulo, texto]
  )
}

module.exports = { buscarSobre, atualizarSobre }
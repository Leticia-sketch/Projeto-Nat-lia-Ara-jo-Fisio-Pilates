const connect = require("../database/connection")

async function buscarEstudio() {
  const db = await connect()
  // Garante que pega exatamente o id = 1 que o dashboard gerencia
  const [rows] = await db.query("SELECT * FROM estudio WHERE id = 1")
  return rows[0]
}

async function atualizarEstudio(titulo, texto) {
  const db = await connect()
  // Atualiza estritamente o id = 1
  await db.query(
    "UPDATE estudio SET titulo = ?, texto = ? WHERE id = 1",
    [titulo, texto]
  )
}

module.exports = {
  buscarEstudio,
  atualizarEstudio
}
const connect = require("../database/connection")

// READ
async function buscarEstudio() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM estudio LIMIT 1")
  return rows[0]
}

// CREATE
async function criarEstudio(titulo,texto) {
  const db = await connect()
  await db.query(
    "INSERT INTO estudio (titulo, texto) VALUES (?, ?)",
    [titulo, texto]
  )
}

// UPDATE
async function atualizarEstudio(titulo, texto) {
  const db = await connect()
  await db.query(
    "UPDATE estudio SET titulo = ?, texto = ? WHERE id = 1",
    [titulo, texto]
  )
}

//  DELETE
async function deletarEstudio() {
  const db = await connect()
  await db.query("DELETE FROM estudio WHERE id = 1")
}

module.exports = {
  buscarEstudio,
  criarEstudio,   
  atualizarEstudio,
  deletarEstudio  
}
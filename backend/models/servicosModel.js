const connect = require("../database/connection")

async function buscarServicos() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM servicos")
  return rows
}

async function atualizarServico(id, titulo, img, texto) {
  const db = await connect()
  await db.query(
    "UPDATE servicos SET titulo = ?, img = ?, texto = ? WHERE id = ?",
    [titulo, img, texto, id]
  )
}

async function criarServico(titulo, img, texto) {
  const db = await connect()
  await db.query(
    "INSERT INTO servicos (titulo, img, texto, link, plano_id) VALUES (?, ?, ?, '#', 1)",
    [titulo, img, texto]
  )
}

async function deletarServico(id) {
  const db = await connect()
  await db.query("DELETE FROM servicos WHERE id = ?", [id])
}

module.exports = { buscarServicos, atualizarServico, criarServico, deletarServico }
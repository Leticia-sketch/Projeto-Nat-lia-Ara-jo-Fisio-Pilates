const connect = require("../database/connection")

async function buscarPlanos() {
  const db = await connect()
  const [rows] = await db.query("SELECT * FROM planos")
  const planos = rows.map(p => ({
    ...p,
    beneficios: p.beneficios ? JSON.parse(p.beneficios) : []
  }))
  return planos
}

async function atualizarPlano(id, titulo, preco, beneficios) {
  const db = await connect()
  await db.query(
    "UPDATE planos SET titulo = ?, preco = ?, beneficios = ? WHERE id = ?",
    [titulo, preco, JSON.stringify(beneficios), id]
  )
}

async function criarPlano(titulo, preco, beneficios) {
  const db = await connect()
  await db.query(
    "INSERT INTO planos (titulo, preco, link, tipo, botao, beneficios) VALUES (?, ?, '#', 'secundario', 'Ver detalhes!', ?)",
    [titulo, preco, JSON.stringify(beneficios)]
  )
}

async function deletarPlano(id) {
  const db = await connect()
  await db.query("DELETE FROM planos WHERE id = ?", [id])
}

module.exports = { buscarPlanos, atualizarPlano, criarPlano, deletarPlano }
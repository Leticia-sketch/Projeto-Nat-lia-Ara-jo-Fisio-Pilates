const connect = require("../database/connection")

async function buscarPlanosDetalhados() {
  try {
    const db = await connect()
    const [rows] = await db.query("SELECT * FROM planos_detalhados")
    const planos = rows.map(p => ({
      ...p,
      opcoes: p.opcoes ? JSON.parse(p.opcoes) : []
    }))
    return { titulo: "Planos de Pilates", lista: planos }
  } catch (erro) {
    console.error("Erro ao buscar planos detalhados:", erro)
    throw erro
  }
}

async function atualizarPlanoDetalhado(id, titulo, opcoes) {
  try {
    const db = await connect()
    await db.execute(
      "UPDATE planos_detalhados SET titulo = ?, opcoes = ? WHERE id = ?",
      [titulo, JSON.stringify(opcoes), id]
    )
  } catch (erro) {
    console.error("Erro ao atualizar plano detalhado:", erro)
    throw erro
  }
}

async function criarPlanoDetalhado(titulo, opcoes) {
  try {
    const db = await connect()
    await db.execute(
      "INSERT INTO planos_detalhados (titulo, opcoes) VALUES (?, ?)",
      [titulo, JSON.stringify(opcoes)]
    )
  } catch (erro) {
    console.error("Erro ao criar plano detalhado:", erro)
    throw erro
  }
}

module.exports = { buscarPlanosDetalhados, atualizarPlanoDetalhado, criarPlanoDetalhado }
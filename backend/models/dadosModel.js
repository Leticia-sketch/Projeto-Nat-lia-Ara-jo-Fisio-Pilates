const connect = require("../database/connection")

async function buscarDados() {
  try {
    const db = await connect()

    const [heroRows]       = await db.query("SELECT * FROM hero LIMIT 1")
    const [estudioRows]    = await db.query("SELECT * FROM estudio WHERE id = 1")
    const [sobreRows]      = await db.query("SELECT * FROM sobre LIMIT 1")
    const [servicosRows]   = await db.query("SELECT * FROM servicos")
    const [planosRows]     = await db.query("SELECT * FROM planos")
    const [depoimentosRows]= await db.query("SELECT * FROM depoimentos")
    const [footerRows]     = await db.query("SELECT * FROM footer LIMIT 1")

    // SOBRE — converte lista de JSON para array
    const sobre = sobreRows[0] || {}
    sobre.lista = sobre.lista ? JSON.parse(sobre.lista) : []

    // PLANOS — converte beneficios de JSON para array
    const planos = planosRows.map(p => ({
      ...p,
      beneficios: p.beneficios ? JSON.parse(p.beneficios) : []
    }))

    const dadosGerais = {
      hero:        heroRows[0] || {},
      estudio:     estudioRows[0] || {},
      sobre,
      servicos:    servicosRows,
      planos,
      depoimentos: depoimentosRows,
      footer:      footerRows[0] || {}
    }

    return dadosGerais

  } catch (erro) {
    console.error("Erro ao buscar dados do banco:", erro)
    throw erro
  }
}

module.exports = { buscarDados }
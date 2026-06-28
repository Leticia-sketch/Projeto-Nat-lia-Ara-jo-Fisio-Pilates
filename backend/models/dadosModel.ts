import prisma from "../database/prismaClient"

async function buscarDados() {
  const hero        = await prisma.hero.findFirst()
  const estudio     = await prisma.estudio.findFirst({ where: { id: 1 } })
  const sobreRaw    = await prisma.sobre.findFirst()
  const servicos    = await prisma.servico.findMany()
  const planosRaw   = await prisma.plano.findMany()
  const depoimentos = await prisma.depoimento.findMany()
  const footer      = await prisma.footer.findFirst()

  const sobre = sobreRaw ? {
    ...sobreRaw,
    lista: sobreRaw.lista ? JSON.parse(sobreRaw.lista) : []
  } : {}

  const planos = planosRaw.map(p => ({
    ...p,
    beneficios: p.beneficios ? JSON.parse(p.beneficios) : []
  }))

  return { hero, estudio, sobre, servicos, planos, depoimentos, footer }
}

export default { buscarDados }
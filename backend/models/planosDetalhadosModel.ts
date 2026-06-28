import prisma from "../database/prismaClient"

async function buscarPlanosDetalhados() {
  const planos = await prisma.planoDetalhado.findMany()
  const lista = planos.map(p => ({
    ...p,
    opcoes: p.opcoes ? JSON.parse(p.opcoes) : []
  }))
  return { titulo: "Planos de Pilates", lista }
}

async function atualizarPlanoDetalhado(id: string, titulo: string, opcoes: any[]) {
  await prisma.planoDetalhado.update({
    where: { id: Number(id) },
    data: { titulo, opcoes: JSON.stringify(opcoes) }
  })
}

async function criarPlanoDetalhado(titulo: string, opcoes: any[]) {
  await prisma.planoDetalhado.create({
    data: { titulo, opcoes: JSON.stringify(opcoes) }
  })
}

export default { buscarPlanosDetalhados, atualizarPlanoDetalhado, criarPlanoDetalhado }
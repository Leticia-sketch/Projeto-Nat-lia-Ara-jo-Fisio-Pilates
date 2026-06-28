import prisma from "../database/prismaClient"

async function buscarPlanos() {
  const planos = await prisma.plano.findMany()
  return planos.map(p => ({
    ...p,
    beneficios: p.beneficios ? JSON.parse(p.beneficios) : []
  }))
}

async function atualizarPlano(id: string, titulo: string, preco: string, beneficios: any[]) {
  await prisma.plano.update({
    where: { id: Number(id) },
    data: { titulo, preco, beneficios: JSON.stringify(beneficios) }
  })
}

async function criarPlano(titulo: string, preco: string, beneficios: any[]) {
  await prisma.plano.create({
    data: { titulo, preco, link: "#", tipo: "secundario", botao: "Ver detalhes!", beneficios: JSON.stringify(beneficios) }
  })
}

async function deletarPlano(id: string) {
  await prisma.plano.delete({ where: { id: Number(id) } })
}

export default { buscarPlanos, atualizarPlano, criarPlano, deletarPlano }
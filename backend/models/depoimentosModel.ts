import prisma from "../database/prismaClient"

async function buscarDepoimentos() {
  return await prisma.depoimento.findMany()
}

async function atualizarDepoimento(id: string, nome: string, texto: string, estrelas: number) {
  await prisma.depoimento.update({
    where: { id: Number(id) },
    data: { nome, texto, estrelas }
  })
}

async function criarDepoimento(nome: string, texto: string, estrelas: number) {
  await prisma.depoimento.create({
    data: { nome, texto, estrelas }
  })
}

async function deletarDepoimento(id: string) {
  await prisma.depoimento.delete({ where: { id: Number(id) } })
}

export default { buscarDepoimentos, atualizarDepoimento, criarDepoimento, deletarDepoimento }
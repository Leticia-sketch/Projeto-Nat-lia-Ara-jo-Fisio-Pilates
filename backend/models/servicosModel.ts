import prisma from "../database/prismaClient"

async function buscarServicos() {
  return await prisma.servico.findMany()
}

async function atualizarServico(id: string, titulo: string, img: string, texto: string) {
  await prisma.servico.update({
    where: { id: Number(id) },
    data: { titulo, img, texto }
  })
}

async function criarServico(titulo: string, img: string, texto: string) {
  await prisma.servico.create({
    data: { titulo, img, texto, link: "#", planoId: 1 }
  })
}

async function deletarServico(id: string) {
  await prisma.servico.delete({ where: { id: Number(id) } })
}

export default { buscarServicos, atualizarServico, criarServico, deletarServico }
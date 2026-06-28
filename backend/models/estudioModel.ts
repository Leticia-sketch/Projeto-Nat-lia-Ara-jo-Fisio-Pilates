import prisma from "../database/prismaClient"

async function buscarEstudio() {
  return await prisma.estudio.findFirst({ where: { id: 1 } })
}

async function atualizarEstudio(titulo: string, texto: string) {
  await prisma.estudio.update({
    where: { id: 1 },
    data: { titulo, texto }
  })
}

async function criarEstudio(titulo: string, texto: string) {
  await prisma.estudio.create({
    data: { titulo, texto }
  })
}

async function deletarEstudio() {
  await prisma.estudio.delete({ where: { id: 1 } })
}

export default { buscarEstudio, atualizarEstudio, criarEstudio, deletarEstudio }
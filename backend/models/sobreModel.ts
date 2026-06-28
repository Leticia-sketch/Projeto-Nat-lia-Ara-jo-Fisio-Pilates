import prisma from "../database/prismaClient"

async function buscarSobre() {
  return await prisma.sobre.findFirst()
}

async function atualizarSobre(titulo: string, texto: string) {
  await prisma.sobre.update({
    where: { id: 1 },
    data: { titulo, texto }
  })
}

export default { buscarSobre, atualizarSobre }
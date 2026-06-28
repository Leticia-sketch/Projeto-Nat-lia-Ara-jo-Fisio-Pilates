import prisma from "../database/prismaClient"

async function buscarFooter() {
  return await prisma.footer.findFirst()
}

async function atualizarFooter(titulo: string, telefone: string, instagram: string, endereco: string, mapa: string) {
  await prisma.footer.update({
    where: { id: 1 },
    data: { titulo, telefone, instagram, endereco, mapa }
  })
}

export default { buscarFooter, atualizarFooter }
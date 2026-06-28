import prisma from "../database/prismaClient"

async function buscarHero() {
  return await prisma.hero.findFirst()
}

async function atualizarHero(titulo: string, botao: string) {
  await prisma.hero.update({
    where: { id: 1 },
    data: { titulo, botao }
  })
}

export default { buscarHero, atualizarHero }
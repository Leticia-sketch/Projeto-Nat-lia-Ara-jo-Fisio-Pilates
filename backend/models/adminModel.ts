import prisma from "../database/prismaClient"
import { Admin } from "@prisma/client"

async function buscarPorEmail(email: string): Promise<Admin | null> {
  return await prisma.admin.findUnique({ where: { email } })
}

async function buscarPorId(id: number): Promise<Admin | null> {
  return await prisma.admin.findUnique({ where: { id } })
}

async function criar(data: { nome: string; email: string; senhaHash: string }): Promise<Admin> {
  return await prisma.admin.create({ data })
}

export default { buscarPorEmail, buscarPorId, criar }
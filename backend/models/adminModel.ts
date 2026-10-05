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

async function salvarTokenReset(id: number, resetTokenHash: string, resetTokenExpiry: Date): Promise<void> {
  await prisma.admin.update({
    where: { id },
    data: { resetTokenHash, resetTokenExpiry }
  })
}

async function buscarPorTokenHash(resetTokenHash: string): Promise<Admin | null> {
  return await prisma.admin.findFirst({ where: { resetTokenHash } })
}

async function redefinirSenha(id: number, senhaHash: string): Promise<void> {
  await prisma.admin.update({
    where: { id },
    data: { senhaHash, resetTokenHash: null, resetTokenExpiry: null }
  })
}

export default { buscarPorEmail, buscarPorId, criar, salvarTokenReset, buscarPorTokenHash, redefinirSenha }
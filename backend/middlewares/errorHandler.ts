import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import { Prisma } from "@prisma/client"

function errorHandler(erro: unknown, req: Request, res: Response, next: NextFunction): void {
  // 400 — corpo/params/query com formato inválido (vindo do validate.ts)
  if (erro instanceof ZodError) {
    res.status(400).json({
      erro: "Dados inválidos",
      issues: erro.issues.map(i => ({
        path: i.path.join("."),
        message: i.message
      }))
    })
    return
  }

  if (erro instanceof Prisma.PrismaClientKnownRequestError) {
    // 409 — conflito, ex: e-mail já cadastrado (constraint @unique)
    if (erro.code === "P2002") {
      res.status(409).json({ erro: "Registro já existe" })
      return
    }
    // 404 — tentou atualizar/deletar um registro que não existe
    if (erro.code === "P2025") {
      res.status(404).json({ erro: "Recurso não encontrado" })
      return
    }
  }

  // 500 — qualquer coisa não prevista, nunca vaza detalhe interno pro cliente
  console.error(erro)
  res.status(500).json({ erro: "Erro interno do servidor" })
}

export default errorHandler
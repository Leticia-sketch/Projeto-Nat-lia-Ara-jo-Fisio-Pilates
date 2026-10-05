import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(1, "Senha é obrigatória")
})

export const registrarSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter ao menos 6 caracteres")
})

export const esqueciSenhaSchema = z.object({
  email: z.string().email("E-mail inválido")
})

export const redefinirSenhaSchema = z.object({
  token: z.string().length(64, "Token inválido"),
  novaSenha: z.string().min(6, "Senha deve ter ao menos 6 caracteres")
})
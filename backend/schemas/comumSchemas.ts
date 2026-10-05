import { z } from "zod"

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("O id deve ser um número inteiro positivo")
})

export const paginacaoQuerySchema = z.object({
  pagina: z.coerce.number().int().positive("A página deve ser um número inteiro positivo").optional(),
  limite: z.coerce.number().int().positive("O limite deve ser um número inteiro positivo").optional()
})
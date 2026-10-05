import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

interface SchemasPorFonte {
  body?: ZodSchema
  params?: ZodSchema
  query?: ZodSchema
}

function validate(schemas: SchemasPorFonte) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (schemas.body) {
      const resultado = schemas.body.safeParse(req.body)
      if (!resultado.success) {
        next(resultado.error)
        return
      }
      req.body = resultado.data
    }

    if (schemas.params) {
      const resultado = schemas.params.safeParse(req.params)
      if (!resultado.success) {
        next(resultado.error)
        return
      }
    }

    if (schemas.query) {
      const resultado = schemas.query.safeParse(req.query)
      if (!resultado.success) {
        next(resultado.error)
        return
      }
    }

    next()
  }
}

export default validate
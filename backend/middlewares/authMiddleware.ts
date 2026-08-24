import { Request, Response, NextFunction } from "express"

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.admin) {
    res.status(401).json({ erro: "Não autenticado" })
    return
  }
  next()
}

export default authMiddleware
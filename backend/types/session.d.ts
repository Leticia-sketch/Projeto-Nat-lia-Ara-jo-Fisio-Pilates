import "express-session"

declare module "express-session" {
  interface SessionData {
    admin?: {
      id: number
      nome: string
      email: string
    }
  }
}
import { Router } from "express"
import authController from "../controllers/authController"
import authMiddleware from "../middlewares/authMiddleware"
import validate from "../middlewares/validate"
import { loginSchema, registrarSchema, esqueciSenhaSchema, redefinirSenhaSchema } from "../schemas/authSchemas"

const router = Router()

router.post("/login", validate({ body: loginSchema }), authController.login)
router.post("/logout", authController.logout)
router.get("/me", authController.me)
router.post("/registrar", authMiddleware, validate({ body: registrarSchema }), authController.registrar)
router.post("/esqueci-senha", validate({ body: esqueciSenhaSchema }), authController.esqueciSenha)
router.post("/redefinir-senha", validate({ body: redefinirSenhaSchema }), authController.redefinirSenha)

export default router
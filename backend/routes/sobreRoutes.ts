import { Router } from "express"
import sobreController from "../controllers/sobreController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", sobreController.buscar)
router.put("/", authMiddleware, sobreController.atualizar)

export default router
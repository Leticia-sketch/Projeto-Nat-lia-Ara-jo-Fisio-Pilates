import { Router } from "express"
import footerController from "../controllers/footerController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", footerController.buscar)
router.put("/", authMiddleware, footerController.atualizar)

export default router
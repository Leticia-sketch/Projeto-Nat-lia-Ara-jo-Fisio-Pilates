import { Router } from "express"
import heroController from "../controllers/heroController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", heroController.buscar)
router.put("/", authMiddleware, heroController.atualizar)

export default router
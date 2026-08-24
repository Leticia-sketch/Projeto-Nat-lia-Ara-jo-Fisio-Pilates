import { Router } from "express"
import estudioController from "../controllers/estudioController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", estudioController.buscar)
router.post("/", authMiddleware, estudioController.criar)
router.put("/", authMiddleware, estudioController.atualizar)
router.delete("/", authMiddleware, estudioController.deletar)

export default router
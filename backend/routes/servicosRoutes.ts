import { Router } from "express"
import servicosController from "../controllers/servicosController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", servicosController.buscar)
router.post("/", authMiddleware, servicosController.criar)
router.put("/:id", authMiddleware, servicosController.atualizar)
router.delete("/:id", authMiddleware, servicosController.deletar)

export default router
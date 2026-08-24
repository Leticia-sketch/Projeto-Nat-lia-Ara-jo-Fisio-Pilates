import { Router } from "express"
import depoimentosController from "../controllers/depoimentosController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", depoimentosController.buscar)
router.post("/", authMiddleware, depoimentosController.criar)
router.put("/:id", authMiddleware, depoimentosController.atualizar)
router.delete("/:id", authMiddleware, depoimentosController.deletar)

export default router
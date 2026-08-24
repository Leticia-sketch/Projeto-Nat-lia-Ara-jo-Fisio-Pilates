import { Router } from "express"
import planosDetalhadosController from "../controllers/planosDetalhadosController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", planosDetalhadosController.listar)
router.post("/", authMiddleware, planosDetalhadosController.criar)
router.put("/:id", authMiddleware, planosDetalhadosController.atualizar)

export default router
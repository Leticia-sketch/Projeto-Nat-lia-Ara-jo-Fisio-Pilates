import { Router } from "express"
import planosDetalhadosController from "../controllers/planosDetalhadosController"

const router = Router()

router.get("/", planosDetalhadosController.listar)
router.post("/", planosDetalhadosController.criar)
router.put("/:id", planosDetalhadosController.atualizar)

export default router
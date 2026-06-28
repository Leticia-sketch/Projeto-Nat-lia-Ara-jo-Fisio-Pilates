import { Router } from "express"
import depoimentosController from "../controllers/depoimentosController"

const router = Router()

router.get("/", depoimentosController.buscar)
router.post("/", depoimentosController.criar)
router.put("/:id", depoimentosController.atualizar)
router.delete("/:id", depoimentosController.deletar)

export default router
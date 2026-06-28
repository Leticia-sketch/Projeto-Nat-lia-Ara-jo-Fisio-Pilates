import { Router } from "express"
import servicosController from "../controllers/servicosController"

const router = Router()

router.get("/", servicosController.buscar)
router.post("/", servicosController.criar)
router.put("/:id", servicosController.atualizar)
router.delete("/:id", servicosController.deletar)

export default router
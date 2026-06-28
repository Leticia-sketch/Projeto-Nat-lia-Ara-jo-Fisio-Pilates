import { Router } from "express"
import planosController from "../controllers/planosController"

const router = Router()

router.get("/", planosController.buscar)
router.post("/", planosController.criar)
router.put("/:id", planosController.atualizar)
router.delete("/:id", planosController.deletar)

export default router
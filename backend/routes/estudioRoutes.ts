import { Router } from "express"
import estudioController from "../controllers/estudioController"

const router = Router()

router.get("/", estudioController.buscar)
router.post("/", estudioController.criar)
router.put("/", estudioController.atualizar)
router.delete("/", estudioController.deletar)

export default router
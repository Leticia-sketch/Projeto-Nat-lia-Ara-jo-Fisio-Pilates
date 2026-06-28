import { Router } from "express"
import sobreController from "../controllers/sobreController"

const router = Router()

router.get("/", sobreController.buscar)
router.put("/", sobreController.atualizar)

export default router
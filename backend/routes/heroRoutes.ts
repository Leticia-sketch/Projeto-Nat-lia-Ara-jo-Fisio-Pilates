import { Router } from "express"
import heroController from "../controllers/heroController"

const router = Router()

router.get("/", heroController.buscar)
router.put("/", heroController.atualizar)

export default router
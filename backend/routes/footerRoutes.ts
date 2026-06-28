import { Router } from "express"
import footerController from "../controllers/footerController"

const router = Router()

router.get("/", footerController.buscar)
router.put("/", footerController.atualizar)

export default router
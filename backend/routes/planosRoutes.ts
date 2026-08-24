import { Router } from "express"
import planosController from "../controllers/planosController"
import authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.get("/", planosController.buscar)
router.post("/", authMiddleware, planosController.criar)
router.put("/:id", authMiddleware, planosController.atualizar)
router.delete("/:id", authMiddleware, planosController.deletar)

export default router
import { Router } from "express"
import planosController from "../controllers/planosController"
import authMiddleware from "../middlewares/authMiddleware"
import validate from "../middlewares/validate"
import { idParamSchema } from "../schemas/comumSchemas"

const router = Router()

router.get("/", planosController.buscar)
router.post("/", authMiddleware, planosController.criar)
router.put("/:id", authMiddleware, validate({ params: idParamSchema }), planosController.atualizar)
router.delete("/:id", authMiddleware, validate({ params: idParamSchema }), planosController.deletar)

export default router
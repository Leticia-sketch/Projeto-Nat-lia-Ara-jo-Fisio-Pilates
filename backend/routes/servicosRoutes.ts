import { Router } from "express"
import servicosController from "../controllers/servicosController"
import authMiddleware from "../middlewares/authMiddleware"
import validate from "../middlewares/validate"
import { idParamSchema } from "../schemas/comumSchemas"

const router = Router()

router.get("/", servicosController.buscar)
router.post("/", authMiddleware, servicosController.criar)
router.put("/:id", authMiddleware, validate({ params: idParamSchema }), servicosController.atualizar)
router.delete("/:id", authMiddleware, validate({ params: idParamSchema }), servicosController.deletar)

export default router
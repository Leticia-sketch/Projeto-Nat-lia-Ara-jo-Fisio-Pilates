import { Router } from "express"
import depoimentosController from "../controllers/depoimentosController"
import authMiddleware from "../middlewares/authMiddleware"
import validate from "../middlewares/validate"
import { idParamSchema, paginacaoQuerySchema } from "../schemas/comumSchemas"

const router = Router()

router.get("/", validate({ query: paginacaoQuerySchema }), depoimentosController.buscar)
router.post("/", authMiddleware, depoimentosController.criar)
router.put("/:id", authMiddleware, validate({ params: idParamSchema }), depoimentosController.atualizar)
router.delete("/:id", authMiddleware, validate({ params: idParamSchema }), depoimentosController.deletar)

export default router
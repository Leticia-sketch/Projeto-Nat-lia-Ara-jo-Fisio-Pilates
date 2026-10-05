import { Router } from "express"
import planosDetalhadosController from "../controllers/planosDetalhadosController"
import authMiddleware from "../middlewares/authMiddleware"
import validate from "../middlewares/validate"
import { idParamSchema } from "../schemas/comumSchemas"

const router = Router()

router.get("/", planosDetalhadosController.listar)
router.post("/", authMiddleware, planosDetalhadosController.criar)
router.put("/:id", authMiddleware, validate({ params: idParamSchema }), planosDetalhadosController.atualizar)
router.delete("/:id", authMiddleware, validate({ params: idParamSchema }), planosDetalhadosController.deletar)

export default router
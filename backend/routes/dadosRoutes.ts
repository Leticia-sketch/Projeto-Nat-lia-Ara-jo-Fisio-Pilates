import { Router } from "express"
import dadosController from "../controllers/dadosController"

const router = Router()

router.get("/", dadosController.listar)

export default router
const express = require("express")
const router = express.Router()
const planosDetalhadosController = require("../controllers/planosDetalhadosController")

router.get("/", planosDetalhadosController.listar)
router.post("/", planosDetalhadosController.criar)
router.put("/:id", planosDetalhadosController.atualizar)

module.exports = router
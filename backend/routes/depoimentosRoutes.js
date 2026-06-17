const express = require("express")
const router = express.Router()
const depoimentosController = require("../controllers/depoimentosController")

router.get("/", depoimentosController.buscar)
router.post("/", depoimentosController.criar)
router.put("/:id", depoimentosController.atualizar)
router.delete("/:id", depoimentosController.deletar)

module.exports = router
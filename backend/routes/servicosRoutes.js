const express = require("express")
const router = express.Router()
const servicosController = require("../controllers/servicosController")

router.get("/", servicosController.buscar)
router.post("/", servicosController.criar)
router.put("/:id", servicosController.atualizar)
router.delete("/:id", servicosController.deletar)

module.exports = router
const express = require("express")
const router = express.Router()
const planosController = require("../controllers/planosController")

router.get("/", planosController.buscar)
router.post("/", planosController.criar)
router.put("/:id", planosController.atualizar)
router.delete("/:id", planosController.deletar)

module.exports = router
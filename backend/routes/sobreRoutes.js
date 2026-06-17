const express = require("express")
const router = express.Router()
const sobreController = require("../controllers/sobreController")

router.get("/", sobreController.buscar)
router.put("/", sobreController.atualizar)

module.exports = router
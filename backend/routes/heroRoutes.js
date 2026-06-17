const express = require("express")
const router = express.Router()
const heroController = require("../controllers/heroController")

router.get("/", heroController.buscar)
router.put("/", heroController.atualizar)

module.exports = router
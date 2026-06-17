const express = require("express")
const router = express.Router()
const footerController = require("../controllers/footerController")

router.get("/", footerController.buscar)
router.put("/", footerController.atualizar)

module.exports = router
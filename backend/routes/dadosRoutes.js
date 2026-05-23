const express = require("express")

const router = express.Router()

const dadosController = require("../controllers/dadosController")

router.get("/", dadosController.listar)

module.exports = router
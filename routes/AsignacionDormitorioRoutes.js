const express = require("express");
const router = express.Router();
const AsignacionDormitorioController = require("../controllers/AsignacionDormitorioController");

router.post("/asignar", AsignacionDormitorioController.createAsignacionDormitorio);

module.exports = router;

const express = require("express");
const router = express.Router();
const AsignacionDormitorioController = require("../controllers/AsignacionDormitorioController");

router.get("/GestionInternacion", AsignacionDormitorioController.getAsignacionesActuales);

router.post("/asignar", AsignacionDormitorioController.createAsignacionDormitorio);

module.exports = router;

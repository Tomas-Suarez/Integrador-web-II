const express = require("express");
const router = express.Router();
const AsignacionDormitorioController = require("../controllers/AsignacionDormitorioController");

// Mostrar las asignaciones de dornmitorio activas (Internaciones)
router.get("/GestionInternacion", AsignacionDormitorioController.getAsignacionesActuales);

// Asignar un dormitorio
router.post("/asignar", AsignacionDormitorioController.createAsignacionDormitorio);

module.exports = router;

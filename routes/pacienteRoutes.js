const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/PacienteController");
const { validarPaciente } = require("../middlewares/pacienteValidator");
const { validationResult } = require("express-validator");

// Crear paciente
router.post(
  "/registro",
  validarPaciente,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("Pacientes/RegistrarPaciente", {
        errors: errors.array(),
        oldData: req.body,
      });
    }
    next();
  },
  pacienteController.createPaciente
);


// Actualizar paciente
router.post("/actualizar", pacienteController.updatePaciente);

// Mostrar todos los pacientes
router.get("/GestionPaciente", pacienteController.getAllPacientes);

module.exports = router;

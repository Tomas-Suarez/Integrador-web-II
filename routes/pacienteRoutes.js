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
router.put("/actualizar/:id", pacienteController.updatePaciente);

// Mostrar todos los pacientes
router.get("/GestionPaciente", pacienteController.getAllPacientes);

//Mostrar todos los pacientes activos en mi admision
router.get("/RegistrarAdmision", pacienteController.getAllPacientesActivos);

//Obtenemos el paciente por su documento(DNI)
router.get("/obtener-paciente", pacienteController.formAdmision);

//Obtenemos los datos para el funcionamiento del form de emergencia
router.get("/internacion-emergencia", pacienteController.formEmergencia);

// Cambiar el estado del paciente
router.patch("/cambiar-estado/:id", pacienteController.changeStatusPaciente);


module.exports = router;

const express = require("express");
const router = express.Router();
const pacientecontroller = require("../controllers/PacienteController");
const { validarPaciente } = require("../middlewares/pacienteValidator");
const { validationResult } = require("express-validator");

router.get("/GestionPaciente", pacientecontroller.getAllPacientes);

router.get("/registro", (req, res) => {
  res.render("Pacientes/RegistrarPaciente");
});

router.post(
  "/registro",
  validarPaciente,
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).render("Pacientes/RegistrarPaciente", {
        errors: errors.array(),
        oldData: req.body,
      });
    }
    next();
  },
  pacientecontroller.createPaciente
);

router.post("/actualizar", pacientecontroller.updatePaciente);

module.exports = router;
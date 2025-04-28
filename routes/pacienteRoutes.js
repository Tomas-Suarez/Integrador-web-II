const express = require('express');
const router = express.Router();
const pacientecontroller = require("../controllers/pacienteController");

router.get('/', pacientecontroller.getAllPacientes);
router.get('/:id', pacientecontroller.getPacienteById);

module.exports = router;

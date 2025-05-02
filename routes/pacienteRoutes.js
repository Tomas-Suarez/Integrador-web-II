const express = require('express');
const router = express.Router();
const pacientecontroller = require('../controllers/PacienteController');
const { validarPaciente } = require('../middlewares/pacienteValidator');
const { validationResult } = require('express-validator');

router.get('/registro', (req, res) => {
    res.render('Pacientes/RegistrarPaciente');
});

router.get('/', pacientecontroller.getAllPacientes);

router.post('/registro', validarPaciente, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('Pacientes/RegistrarPaciente', {
        errors: errors.array(),
        oldData: req.body
      });
    }
    next();
  }, pacientecontroller.createPaciente);

router.get('/:id', pacientecontroller.getPacienteById);

module.exports = router;

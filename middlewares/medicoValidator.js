const { body } = require('express-validator');

const validarMedico = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es un campo obligatorio!')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres.'),
  
  body('apellido')
    .notEmpty()
    .withMessage('El apellido es un campo obligatorio!')
    .isLength({ min: 2 })
    .withMessage('El apellido debe tener al menos 2 caracteres.'),

  body('genero')
    .notEmpty()
    .withMessage('Selecciona un género válido!'),
];

module.exports = { validarMedico };

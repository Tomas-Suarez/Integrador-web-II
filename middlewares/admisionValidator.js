const { body } = require('express-validator');

const validarAdmision = [
  body('id_paciente')
    .notEmpty()
    .withMessage('El paciente es obligatorio.')
    .isInt(),

  body('id_tipo')
    .notEmpty()
    .withMessage('Debe seleccionar un tipo de ingreso.')
    .isInt(),

  body('detalles')
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('La descripción debe tener máximo 50 caracteres.'),
];

module.exports = { validarAdmision };

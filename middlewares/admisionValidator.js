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

  body('fechaInternar')
    .notEmpty()
    .withMessage('Debe ingresar una fecha de internación.')
    .custom((value) => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fechaInput = new Date(value);
      
      if (isNaN(fechaInput.getTime())) {
        throw new Error('La fecha no es valida!.');
      }

      if (fechaInput < hoy) {
        throw new Error('La fecha de internación debe ser de hoy para adelante.');
      }

      return true;
    }),

  body('detalles')
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('La descripción debe tener máximo 50 caracteres.'),
];

module.exports = { validarAdmision };

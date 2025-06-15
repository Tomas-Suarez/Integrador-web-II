const { body } = require('express-validator');

const validarPaciente = [
  body('nombre')
    .trim()
    .isLength({ min: 3, max: 40 }).withMessage('El nombre debe tener entre 3 y 40 letras.')
    .notEmpty().withMessage('El nombre es un campo obligatorio!'),

  body('apellido')
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('El apellido debe tener entre 3 y 20 letras.')
    .notEmpty().withMessage('El apellido es un campo obligatorio!'),

  body('documento')
    .isLength({ min: 7, max: 10 }).withMessage('El DNI debe contener entre 7 y 10 números.')
    .isNumeric().withMessage('El campo DNI solo contiene números!'),

  body('telefono')
    .trim()
    .isLength({ min: 6, max: 20 }).withMessage('El teléfono debe tener entre 6 y 20 caracteres.')
    .optional({ checkFalsy: true }),

  body('domicilio')
    .trim()
    .isLength({ min: 5, max: 80 }).withMessage('El domicilio debe tener entre 5 y 80 caracteres.'),

  body('fecha_nacimiento')
    .notEmpty().withMessage('Debe ingresar la fecha de nacimiento!')
    .isISO8601().withMessage('La fecha de nacimiento no tiene un formato válido.')
    .custom((value) => {
      const fecha = new Date(value);
      if (fecha > new Date()) {
        throw new Error('La fecha de nacimiento no puede ser posterior a hoy.');
      }
      return true;
    }),

  body('genero')
    .notEmpty().withMessage('Seleccione un género!')
    .isIn(['Masculino', 'Femenino']).withMessage('Género inválido.'),

  body('estatura')
    .optional({ checkFalsy: true })
    .isFloat({ min: 50, max: 250 }).withMessage('La estatura debe estar entre 50 y 250 cm.'),

  body('peso')
    .optional({ checkFalsy: true })
    .isFloat({ min: 1, max: 300 }).withMessage('El peso debe estar entre 1 y 300 kg.'),

  body('id_seguro')
    .notEmpty().withMessage('Debe seleccionar un seguro médico!')
];

module.exports = { validarPaciente };

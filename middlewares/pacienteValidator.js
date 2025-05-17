const { body } = require('express-validator');

const validarPaciente = [
    body('nombre').notEmpty().withMessage('El nombre es un campo obligatorio!'),
    body('apellido').notEmpty().withMessage('El apellido es un campo obligatorio!'),
    body('documento')
        .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener entre 7 y 8 dígitos!')
        .isNumeric().withMessage('El campo DNI solo contiene números!'),
    body('telefono')
        .optional()
        .isNumeric().withMessage('El campo teléfono es inválido!'),
    body('domicilio')
        .isLength({ max: 80 }).withMessage('El campo domicilio puede tener como máximo 80 caracteres!'),
    body('fecha_nacimiento')
        .notEmpty().withMessage('Debe ingresar la fecha de nacimiento!'),
    body('genero')
        .notEmpty().withMessage('Seleccione un género!'),
    body('estatura')
        .notEmpty().isFloat({ min: 0 }).withMessage('El campo estatura es inválido!'),
    body('peso')
        .notEmpty().isFloat({ min: 0 }).withMessage('El campo peso es inválido!'),
    body('id_seguro')
        .notEmpty().withMessage('Debe seleccionar un seguro médico!'),
];

module.exports = { validarPaciente };

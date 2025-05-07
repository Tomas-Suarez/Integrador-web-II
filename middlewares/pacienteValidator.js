const { body } = require('express-validator');

const validarPaciente = [
    body('Nombre').notEmpty().withMessage('El nombre es un campo obligatorio!'),
    body('Apellido').notEmpty().withMessage('El apellido es un campo obligatorio!'),
    body('Documento').isLength({min: 7, max: 8}).withMessage('El DNI debe tener entre 7 y 8 digitos!')
    .isNumeric().withMessage('El campo DNI solo posee numeros!'),
    body('Telefono').optional().isNumeric().withMessage('El campo telefono es invalido!'),
    body('Domicilio').isLength({max: 80}).withMessage('El campo domicilio posee como maximo 80 letras!'),
    body('Edad').notEmpty().isInt({min: 0}).withMessage('Edad invalida!'),
    body('Genero').notEmpty().withMessage('Seleccione un genero!'),
    body('Estatura').notEmpty().isFloat({min: 0}).withMessage('El campo estatura es invalido'),
    body('Peso').notEmpty().isFloat({min: 0}).withMessage('El campo peso es invalido'),
    body('Contacto').optional(),
];

module.exports = { validarPaciente} ;
const { body } = require('express-validator');

const validarPaciente = [
    body('fnombre').notEmpty().withMessage('El nombre es un campo obligatorio!'),
    body('fapellido').notEmpty().withMessage('El apellido es un campo obligatorio!'),
    body('fdocumento').isLength({min: 7, max: 8}).withMessage('El DNI debe tener entre 7 y 8 digitos!')
    .isNumeric().withMessage('El campo DNI solo posee numeros!'),
    body('ftelefono').optional().isNumeric().withMessage('El campo telefono es invalido!'),
    body('fdomicilio').isLength({max: 80}).withMessage('El campo domicilio posee como maximo 80 letras!'),
    body('fedad').notEmpty().isInt({min: 0}).withMessage('Edad invalida!'),
    body('fgenero').notEmpty().withMessage('Seleccione un genero!'),
    body('festatura').notEmpty().isFloat({min: 0}).withMessage('El campo estatura es invalido'),
    body('fpeso').notEmpty().isFloat({min: 0}).withMessage('El campo peso es invalido'),
    body('fcontacto').optional(),
    body('fseguro').notEmpty().isIn(['true', 'false']).withMessage('Seguro medico invalido!'),
];

module.exports = { validarPaciente} ;
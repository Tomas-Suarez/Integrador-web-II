const { body } = require('express-validator');

const validarMedico = [
    body('Nombre').notEmpty().withMessage('El nombre es un campo obligatorio!'),
    body('Apellido').notEmpty().withMessage('El apellido es un campo obligatorio!'),
    body('Genero').notEmpty().withMessage('Selecciona un genero!'),
    body('Matricula').notEmpty().withMessage('El campo de la matricula es obligatorio!'),
    body('Especialidad').notEmpty().withMessage('El especialidad de la matricula es obligatorio!'),

];

module.exports = { validarMedico } ;
const Tipo_ingreso = require("../models/TipoIngresoModels");

// Obtenemos los ingresos (Turno, derivacion, emergencia)
const getAllIngreso = async () => {
  try {
    const ingresos = await Tipo_ingreso.findAll();
    return ingresos;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los ingresos: " + error.message
    );
  }
};

module.exports = {
    getAllIngreso,
}
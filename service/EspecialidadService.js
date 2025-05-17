const Especialidad = require("../models/EspecialidadModels");

const getAllEspecialidad = async () => {
  try {
    const especialidades = await Especialidad.findAll();
    return especialidades;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las especialidades: " + error.message
    );
  }
};

module.exports = {
    getAllEspecialidad,
}
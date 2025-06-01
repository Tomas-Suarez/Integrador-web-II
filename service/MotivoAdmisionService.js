const MotivoAdmision = require("../models/MotivoAdmisionModels");

// Obtenemos los motivos de admision
const getAllMotivos = async () => {
  try {
    const motivos = await MotivoAdmision.findAll();
    return motivos;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los motivos: " + error.message
    );
  }
};

module.exports = {
    getAllMotivos,
}
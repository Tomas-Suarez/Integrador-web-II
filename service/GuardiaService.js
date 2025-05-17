const Guardia = require("../models/GuardiaModels");

const getAllGuardia = async () => {
  try {
    const guardias = await Guardia.findAll();
    return guardias;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las guardias: " + error.message
    );
  }
};

module.exports = {
    getAllGuardia,
}
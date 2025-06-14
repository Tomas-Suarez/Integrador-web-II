const Cama = require("../models/CamaModels");

//Obtenemos todas las camas
const getAllCamas = async () => {
  try {
    const camas = await Cama.findAll();
    return camas;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las camas: " + error.message
    );
  }
};

module.exports = {
    getAllCamas,
}
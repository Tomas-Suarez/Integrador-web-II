const Ala = require("../models/AlaModels");

const getAllAlas = async () => {
  try {
    const alas = await Ala.findAll();
    return alas;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las alas: " + error.message
    );
  }
};

module.exports = {
    getAllAlas,
}
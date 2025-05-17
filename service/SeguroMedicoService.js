const SeguroMedico = require("../models/SeguroMedicoModels");

const getAllSegurosMedicos = async () => {
  try {
    const seguros = await SeguroMedico.findAll();
    return seguros;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los seguros medicos: " + error.message
    );
  }
};

module.exports = {
    getAllSegurosMedicos,
}
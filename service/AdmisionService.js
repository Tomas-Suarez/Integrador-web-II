const Admision = require("../models/AdmisionModels");
const Ingreso = require("../models/TipoIngresoModels");

// Obtiene todas las admisiones - incluyendo los datos de "Ingreso".
const getAllAdmisiones = async () => {
  try {
    const admisiones = await Admision.findAll({
      include: {
        model: Ingreso,
        attributes: ["id_tipo", "descripcion"],
      },
    });
    return admisiones;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al obtener las admisiones: " + error.message
    );
  }
};

// Crea la admision
const createAdmision = async (datos) => {
  try {
    const admision = await Admision.create({
      id_paciente: datos.id_paciente,
      id_tipo: datos.id_tipo,
      fecha_emision: new Date(), //Nos devuelve la fecha actual de nuestra "Base de datos"
      detalles: datos.detalles,
      estado: true, //El estado de la admision, esta iniciada en true, al crearla
    });

    return { admision, creado: true };
  } catch (error) {
    throw new Error("Ocurrió un error al crear la admision: " + error.message);
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
}
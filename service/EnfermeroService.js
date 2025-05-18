const Enfermero = require("../models/EnfermeroModels");
const Guardia = require("../models/GuardiaModels");

const getAllEnfermeros = async () => {
  try {
    const enfermeros = await Enfermero.findAll({
      include: [
        {
          model: Guardia,
          attributes: ["id_guardia", "nombre"],
        },
      ],
    });
    return enfermeros;
  } catch (error) {
    throw new Error("Ocurrió un error al obtener los enfermeros: " + error.message);
  }
};

const createEnfermero = async (datos) => {
  try {
    const existeMatricula = await Enfermero.findOne({
      where: { matricula: datos.matricula },
    });

    if (existeMatricula) {
      throw new Error("La matrícula ya está registrada.");
    }

    const existeDocumento = await Enfermero.findOne({
      where: { documento: datos.documento },
    });

    if (existeDocumento) {
      throw new Error("El documento ya está registrado.");
    }

    const enfermero = await Enfermero.create({
      nombre: datos.nombre,
      apellido: datos.apellido,
      genero: datos.genero,
      documento: datos.documento,
      matricula: datos.matricula,
      id_guardia: datos.id_guardia,
      estado: datos.estado,
    });

    return { enfermero, creado: true };
  } catch (error) {
    throw new Error("Ocurrió un error al crear el enfermero: " + error.message);
  }
};

const updateEnfermero = async (datos) => {
  try {
    const [actualizado] = await Enfermero.update(
      {
        nombre: datos.nombre,
        apellido: datos.apellido,
        genero: datos.genero,
        matricula: datos.matricula,
        id_guardia: datos.id_guardia,
      },
      {
        where: {
          id_enfermero: datos.id_enfermero,
        },
      }
    );
    if (actualizado === 0) {
      throw new Error("No se encontró ningún enfermero para actualizar.");
    }
  } catch (error) {
    throw new Error("Ocurrió un error al actualizar el enfermero: " + error.message);
  }
};

const changeStatusEnfermero = async (datos) => {
  try {
    const [actualizado] = await Enfermero.update(
      { estado: datos.estado },
      { where: { id_enfermero: datos.id_enfermero } }
    );
    if (actualizado === 0) {
      throw new Error("No se encontró ningún médico para cambiar el estado.");
    }
  } catch (error) {
    throw new Error("Ocurrió un error al cambiar el estado del médico: " + error.message);
  }
};

module.exports = {
  getAllEnfermeros,
  createEnfermero,
  updateEnfermero,
  changeStatusEnfermero,
};

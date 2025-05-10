const Enfermero = require("../models/EnfermeroModels");

const getAllEnfermero = async () => {
  try {
    const enfermeros = await Enfermero.findAll();
    return enfermeros;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los enfermeros: " + error.message
    );
  }
};

const createEnfermero = async (datos) => {
  try {
    const [enfermero, creado] = await Enfermero.findOrCreate({
      where: { Matricula: datos.Matricula },
      defaults: {
        Nombre: datos.Nombre,
        Apellido: datos.Apellido,
        Genero: datos.Genero,
        Turno: datos.Turno,
        Estado: datos.Estado,
      },
    });
    return { enfermero, creado };
  } catch (error) {
    throw new Error("Ocurrio un error al crear el enfermero" + error.message);
  }
};

const updateEnfermero = async (datos) => {
  try {
    const [EnfermeroActualizado] = await Enfermero.update(
      {
        Nombre: datos.Nombre,
        Apellido: datos.Apellido,
        Genero: datos.Genero,
        Matricula: datos.Matricula,
        Turno: datos.Turno,
      },
      {
        where: {
          id_Enfermero: datos.id_Enfermero,
        },
      }
    );
    if (EnfermeroActualizado === 0) {
      throw new Error("No se encontro ningun enfermero para actualizar!");
    }
  } catch (error) {
    throw new Error("Ocurrio un error al actualizar el enfermero" + error.message);
  }
};

const changeStatusEnfermero = async (datos) => {
  try {
    const [EnfermeroActualizado] = await Enfermero.update(
      { Estado: datos.Estado },
      { where: { id_Enfermero: datos.id_Enfermero } }
    );

    if (EnfermeroActualizado === 0) {
      throw new Error("No se encontro ningun enfermero para cambiar el estado!");
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al cambiar el estado del enfermero" + error.message
    );
  }
};

module.exports = {
  getAllEnfermero,
  createEnfermero,
  updateEnfermero,
  changeStatusEnfermero,
};

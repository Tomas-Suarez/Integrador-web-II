const Medico = require("../models/MedicoModels");

const getAllMedicos = async () => {
  try {
    const medicos = await Medico.findAll();
    return medicos;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los medicos: " + error.message
    );
  }
};

const createMedico = async (datos) => {
  try {
    const [medico, creado] = await Medico.findOrCreate({
      where: { Matricula: datos.Matricula },
      defaults: {
        Nombre: datos.Nombre,
        Apellido: datos.Apellido,
        Genero: datos.Genero,
        Especialidad: datos.Especialidad,
        Estado: datos.Estado,
      },
    });
    return { medico, creado };
  } catch (error) {
    throw new Error("Ocurrio un error al crear el medico" + error.message);
  }
};

const updateMedico = async (datos) => {
  try {
    const [MedicoActualizado] = await Medico.update(
      {
        Nombre: datos.Nombre,
        Apellido: datos.Apellido,
        Genero: datos.Genero,
        Matricula: datos.Matricula,
        Especialidad: datos.Especialidad,
      },
      {
        where: {
          id_Medico: datos.id_Medico,
        },
      }
    );
    if (MedicoActualizado === 0) {
      throw new Error("No se encontro ningun medico para actualizar!");
    }
  } catch (error) {
    throw new Error("Ocurrio un error al actualizar el medico" + error.message);
  }
};

const changeStatusMedico = async (datos) => {
  try {
    const [MedicoActualizado] = await Medico.update(
      { Estado: datos.Estado },
      { where: { id_Medico: datos.id_Medico } }
    );

    if (MedicoActualizado === 0) {
      throw new Error("No se encontro ningun medico para cambiar el estado!");
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al cambiar el estado del medico" + error.message
    );
  }
};

module.exports = {
  getAllMedicos,
  createMedico,
  updateMedico,
  changeStatusMedico,
};

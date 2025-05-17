const Medico = require("../models/MedicoModels");
const Guardia = require("../models/GuardiaModels");
const Especialidad = require("../models/EspecialidadModels");

const getAllMedicos = async () => {
  try {
    const medicos = await Medico.findAll({
      include: [
        {
          model: Especialidad,
          attributes: ["id_especialidad", "nombre"],
        },
        {
          model: Guardia,
          attributes: ["id_guardia", "nombre"],
        },
      ],
    });
    return medicos;
  } catch (error) {
    throw new Error("Ocurrió un error al obtener los médicos: " + error.message);
  }
};

const createMedico = async (datos) => {
  try {
    const existeMatricula = await Medico.findOne({
      where: { matricula: datos.matricula },
    });

    if (existeMatricula) {
      throw new Error("La matrícula ya está registrada.");
    }

    const existeDocumento = await Medico.findOne({
      where: { documento: datos.documento },
    });

    if (existeDocumento) {
      throw new Error("El documento ya está registrado.");
    }

    const medico = await Medico.create({
      nombre: datos.nombre,
      apellido: datos.apellido,
      genero: datos.genero,
      documento: datos.documento,
      matricula: datos.matricula,
      id_especialidad: datos.id_especialidad,
      id_guardia: datos.id_guardia,
      estado: datos.estado,
    });

    return { medico, creado: true };
  } catch (error) {
    throw new Error("Ocurrió un error al crear el médico: " + error.message);
  }
};

const updateMedico = async (datos) => {
  try {
    const [actualizado] = await Medico.update(
      {
        nombre: datos.nombre,
        apellido: datos.apellido,
        genero: datos.genero,
        matricula: datos.matricula,
        id_especialidad: datos.id_especialidad,
        id_guardia: datos.id_guardia,
      },
      {
        where: {
          id_medico: datos.id_medico,
        },
      }
    );
    if (actualizado === 0) {
      throw new Error("No se encontró ningún médico para actualizar.");
    }
  } catch (error) {
    throw new Error("Ocurrió un error al actualizar el médico: " + error.message);
  }
};

const changeStatusMedico = async (datos) => {
  try {
    const [actualizado] = await Medico.update(
      { estado: datos.estado },
      { where: { id_medico: datos.id_medico } }
    );
    if (actualizado === 0) {
      throw new Error("No se encontró ningún médico para cambiar el estado.");
    }
  } catch (error) {
    throw new Error("Ocurrió un error al cambiar el estado del médico: " + error.message);
  }
};

module.exports = {
  getAllMedicos,
  createMedico,
  updateMedico,
  changeStatusMedico,
};

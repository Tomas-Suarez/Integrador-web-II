const Paciente = require("../models/PacienteModels");
const SeguroMedico = require("../models/SeguroMedicoModels");

const getAllPacientes = async () => {
  try {
    const pacientes = await Paciente.findAll({
      include: {
        model: SeguroMedico,
        attributes: ["id_seguro", "nombre"],
      },
    });
    return pacientes;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al obtener los pacientes: " + error.message
    );
  }
};

const getAllPacientesActivos = async () => {
  try {
    const pacientes = await Paciente.findAll({
      where: { estado: true },
    });
    return pacientes;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al obtener los pacientes activos: " + error.message
    );
  }
};

const createPaciente = async (datos) => {
  try {
    const [paciente, creado] = await Paciente.findOrCreate({
      where: { documento: datos.documento },
      defaults: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        domicilio: datos.domicilio,
        fecha_nacimiento: datos.fecha_nacimiento,
        genero: datos.genero,
        estatura: datos.estatura,
        peso: datos.peso,
        id_seguro: datos.id_seguro,
        estado: true,
      },
    });
    return { paciente, creado };
  } catch (error) {
    throw new Error("Ocurrio un error al crear el paciente" + error.message);
  }
};

const updatePaciente = async (datos) => {
  try {
    const [pacienteActualizado] = await Paciente.update(
      {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        domicilio: datos.domicilio,
        documento: datos.documento,
        fecha_nacimiento: datos.fecha_nacimiento,
        genero: datos.genero,
        estatura: datos.estatura,
        peso: datos.peso,
        id_seguro: datos.id_seguro,
      },
      {
        where: {
          id_paciente: datos.id_paciente,
        },
      }
    );
    if (pacienteActualizado === 0) {
      throw new Error("No se encontro ningun paciente para actualizar!");
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al actualizar el paciente" + error.message
    );
  }
};

const changeStatusPaciente = async (datos) => {
  try {
    const [actualizado] = await Paciente.update(
      { estado: datos.estado },
      { where: { id_paciente: datos.id_paciente } }
    );
    if (actualizado === 0) {
      throw new Error("No se encontró ningún paciente para cambiar el estado.");
    }
  } catch (error) {
    throw new Error("Ocurrió un error al cambiar el estado del paciente: " + error.message);
  }
};

module.exports = {
  getAllPacientes,
  getAllPacientesActivos,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
};

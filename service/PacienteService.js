const Paciente = require("../models/PacienteModels");

const getAllPacientes = async () => {
  try {
    const pacientes = await Paciente.findAll();
    return pacientes;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener los pacientes: " + error.message
    );
  }
};

const createPaciente = async (datos) => {
  try {
    const [paciente, creado] = await Paciente.findOrCreate({
      where: { Documento: datos.Documento },
      defaults: {
        Nombre: datos.Nombre,
        Apellido: datos.Apellido,
        Telefono: datos.Telefono,
        Domicilio: datos.Domicilio,
        Edad: datos.Edad,
        Genero: datos.Genero,
        Estatura: datos.Estatura,
        Peso: datos.Peso,
        Contacto_emergencia: datos.Contacto_emergencia,
        Seguro_medico: datos.Seguro_medico,
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
        Nombre: datos.Nombre,
        Apellido: datos.Apellido,
        Telefono: datos.Telefono,
        Domicilio: datos.Domicilio,
        Documento: datos.Documento,
        Edad: datos.Edad,
        Genero: datos.Genero,
        Estatura: datos.Estatura,
        Peso: datos.Peso,
        Contacto_emergencia: datos.Contacto_emergencia,
        Seguro_medico: datos.Seguro_medico,
      },
      {
        where: {
          id_Paciente: datos.id_Paciente,
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

module.exports = {
  getAllPacientes,
  createPaciente,
  updatePaciente,
};

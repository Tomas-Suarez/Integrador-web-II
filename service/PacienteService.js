// Importamos modelos
const Paciente = require("../models/PacienteModels");
const SeguroMedico = require("../models/SeguroMedicoModels");
const { Op } = require("sequelize");


// Nos permite obtener todos los pacientes, incluyendo el seguro medico
const getAllPacientes = async () => {
  try {
    const pacientes = await Paciente.findAll({
      where: {
        id_paciente: { [Op.ne]: 1 }, // Traemos a todos pacientes menos al que tiene id 1, que seria el paciente NN
      },
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


// Nos permite obtener solamente los pacientes que se encuentran activos
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

// Nos permite crear un paciente, solamente si no existe otro paciente con el mismo DNI
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
        estado: true, // Se crea el paciente con el estado true por defecto
      },
    });
    return { paciente, creado }; //Retornamos el paciente. tambien Si fue creado o no
  } catch (error) {
    throw new Error("Ocurrio un error al crear el paciente" + error.message);
  }
};

// Nos permite actualizar un paciente mediante su ID
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

    return { actualizado: pacienteActualizado > 0 };
  } catch (error) {
    throw new Error(
      "Ocurrió un error al actualizar el paciente: " + error.message
    );
  }
};

// Nos permite cambiar el estado de un paciente (TRUE, FALSE)
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
    throw new Error(
      "Ocurrió un error al cambiar el estado del paciente: " + error.message
    );
  }
};

// Nos permite obtener un paciente mediante su documento(DNI)
const getPacienteByDNI = async (documento) => {
  try {
    const paciente = await Paciente.findOne({
      where: { documento: documento },
    });

    return paciente;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al encontrar el paciente. " + error.message
    );
  }
};

// Nos permite obtener un paciente mediante su ID
const getPacienteById = async (id_paciente) => {
  try {
    const paciente = await Paciente.findByPk(id_paciente, {
      include: {
        model: SeguroMedico,
        attributes: ["id_seguro", "nombre"],
      },
    });

    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }

    return paciente;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al buscar el paciente por ID: " + error.message
    );
  }
};

// Exportamos las funciones para poder utilizarlas en los controllers
module.exports = {
  getAllPacientes,
  getAllPacientesActivos,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
  getPacienteByDNI,
  getPacienteById,
};

const Admision = require("../models/AdmisionModels");
const TipoIngreso = require("../models/TipoIngresoModels");
const Paciente = require("../models/PacienteModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");

//Obtenemos todas las admisiones - incluyendo los datos de "Ingreso" y algunos de "Paciente"
const getAllAdmisiones = async () => {
  try {
    const admisiones = await Admision.findAll({
      include: [
        {
          model: TipoIngreso,
          attributes: ["id_tipo", "descripcion"],
        },
        {
          model: Paciente,
          attributes: ["id_paciente", "nombre", "apellido", "documento"],
        },
        {
          model: AsignacionDormitorio,
          required: false,
        },
      ],
    });

    // Filtrar solo las admisiones que no tienen ninguna asignación
    const sinAsignacion = admisiones.filter(admision => admision.AsignacionDormitorios.length === 0);

    return sinAsignacion;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al obtener las admisiones: " + error.message
    );
  }
};


// Control para ver si tenemos una admision activa, para evitar duplicados

//SE USA EN EL CODIGO DE ABAJO
const getAdmisionActivaByPaciente = async (id_paciente) => {
  try {
    const admisionActiva = await Admision.findOne({
      where: {
        id_paciente,
        estado: true,
      },
    });
    return admisionActiva;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener la admision activa");
  }
};

// Crea la admision
const createAdmision = async (datos) => {
  try {
    // REVISAR, Si un paciente es NN (Se salta la verificacion) - ANOTACION //

    //Si no es paciente NN, revisa si existe una admision activa
    if (datos.id_paciente !== 1) {
      //ID DEL NN
      const admisionExistente = await getAdmisionActivaByPaciente(
        datos.id_paciente
      );
      if (admisionExistente) {
        return { admision: null, creado: false };
      }
    }

    // Crear la admisión
    const admision = await Admision.create({
      id_paciente: datos.id_paciente,
      id_tipo: datos.id_tipo,
      id_motivo: datos.id_motivo,
      fecha_entrada: datos.fecha_entrada,
      detalles: datos.detalles,
      estado: true,
    });

    return { admision, creado: true };
  } catch (error) {
    throw new Error("Ocurrio un error al crear la admision");
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
};

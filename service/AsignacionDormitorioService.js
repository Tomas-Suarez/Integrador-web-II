const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Cama = require("../models/CamaModels");
const Paciente = require("../models/PacienteModels");
const Habitacion = require("../models/HabitacionModels");
const Ala = require("../models/AlaModels");
const Admision = require("../models/AdmisionModels");

const getAsignacionesActuales = async () => {
  try {
    const asignaciones = await AsignacionDormitorio.findAll({
      where: {
        fecha_fin: null,
      },
      include: [
        {
          model: Admision,
          where: {
            fecha_salida: null,
          },
          include: [
            {
              model: Paciente,
              attributes: ["documento", "nombre", "apellido"],
            },
          ],
        },
        {
          model: Cama,
          attributes: ["numero"],
          include: [
            {
              model: Habitacion,
              attributes: ["numero"],
              include: [
                {
                  model: Ala,
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
      ],
    });

    return asignaciones;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al obtener las asignaciones actuales: " + error.message
    );
  }
};

//Asignamos un dormitorio al paciente
const createAsignacionDormitorio = async (datos) => {
  try {
    // Buscamos la primera cama que este libre en la habitacion, si esta ocupada la primera, se le asignara la segunda
    console.log("Datos recibidos en createAsignacionDormitorio:", datos);
    const buscarCamaLibre = await Cama.findOne({
      where: {
        id_habitacion: datos.id_habitacion,
        libre: true,
        higienizada: true,
      },
    });

    console.log("Cama libre encontrada:", buscarCamaLibre);


    // Verificamos que se encuentre una cama libre
    if (!buscarCamaLibre) {
      throw new Error(
        "Ocurrio un error. No se encontraron camas libres e higienizadas en la habitacion"
      );
    }

    // Le asignamos un dormitorio a un paciente
    const Asignacion = await AsignacionDormitorio.create({
      id_admision: datos.id_admision,
      id_cama: buscarCamaLibre.id_cama,
      fecha_inicio: new Date(),
    });

    //Luego de asignar la habitacion, le actualizamos el estado a la cama
    await Cama.update(
      {
        libre: false,
      },
      {
        where: {
          id_cama: buscarCamaLibre.id_cama,
        },
      }
    );

    return { Asignacion, creado: true };
  } catch (error) {
    throw new Error(
      "Ocurrio un error al asignar el dormitorio: " + error.message
    );
  }
};

//Falta cambio de habitacion

module.exports = {
  createAsignacionDormitorio,
  getAsignacionesActuales,
};

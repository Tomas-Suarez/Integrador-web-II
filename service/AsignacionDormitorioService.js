const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Cama = require("../models/CamaModels");

//Asignamos un dormitorio al paciente
const createAsignacionDormitorio = async (datos) => {
  try {
    // ANOTACION PARA MI: FALTA VER LO DE LA CAMA LIMPIA TODAVIA

    // Buscamos la primera cama que este libre en la habitacion, si esta ocupada la primera, se le asignara la segunda
    const buscarCamaLibre = await Cama.findOne({
      where: {
        id_habitacion: datos.id_habitacion,
        libre: true,
      },
    });

    // Verificamos que se encuentre una cama libre
    if (!buscarCamaLibre) {
      throw new Error(
        "Ocurrio un error!. No se encontraron camas libres en la habitacion"
      );
    }

    // Le asignamos un dormitorio a un paciente
    const Asignacion = await AsignacionDormitorio.create({
      id_admision: datos.id_admision,
      id_cama: buscarCamaLibre.id_cama,
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
};

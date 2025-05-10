const Habitacion = require("../models/HabitacionModels");
const Cama = require("../models/CamaModels");

const getHabitacionesConCamas = async () => {
  try {
    const habitaciones = await Habitacion.findAll({
      attributes: ["Numero", "Ala", "Genero", "Capacidad"],
      include: [
        {
          model: Cama,
          as: "camas",
          attributes: ["Libre"],
        },
      ],
    });

    const resultado = habitaciones.map((habitacion) => {
      const camas = habitacion.camas.slice(0, 2);
      return {
        Numero: habitacion.Numero,
        Ala: habitacion.Ala,
        Genero: habitacion.Genero,
        Capacidad: habitacion.Capacidad,
        EstadoCama1: camas[0]?.Libre ?? null,
        EstadoCama2: camas[1]?.Libre ?? null,
      };
    });

    return resultado;
  } catch (error) {
    throw new Error("Error al obtener habitaciones y camas: " + error.message);
  }
};

//Estaria faltando, ver por cual paciente se encuentra ocupada la cama.


module.exports = {
  getHabitacionesConCamas,
};
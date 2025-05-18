const Habitacion = require("../models/HabitacionModels");
const Cama = require("../models/CamaModels");
const Ala = require("../models/AlaModels");

const getAllHabitaciones = async () => {
  try {
    const habitaciones = await Habitacion.findAll({
      attributes: ["numero", "genero", "capacidad"],
      include: [
        {
          model: Ala,
          attributes: ["nombre"],
        },
        {
          model: Cama,
          attributes: ["libre"],
        },
      ],
    });

    return habitaciones;
  } catch (error) {
    throw new Error("Error al obtener habitaciones: " + error.message);
  }
};

module.exports = {
  getAllHabitaciones,
};
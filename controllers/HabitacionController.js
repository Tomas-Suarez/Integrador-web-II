const HabitacionService = require("../service/HabitacionService");

const getHabitaciones = async (req, res) => {
  try {
    const habitaciones = await HabitacionService.getAllHabitaciones();
    res.render("Habitaciones/ListaHabitacion", { habitaciones });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al obtener las habitaciones: " + error.message);
  }
};

module.exports = {
  getHabitaciones,
};

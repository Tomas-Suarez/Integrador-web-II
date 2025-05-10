const habitacionService = require("../service/HabitacionService");

const getHabitacionesConCamas = async (req, res) => {
  try {
    const habitaciones = await habitacionService.getHabitacionesConCamas();
    res.render("Habitaciones/ListaHabitacion", { habitaciones });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener las habitaciones con las camas.."+ error.message);
  }
};

module.exports = {
    getHabitacionesConCamas,
};
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

const getHabitacionesPorAlaYGenero = async (req, res) => {
  const { alaId, pacienteId } = req.query;

  console.log('alaId:', alaId, 'pacienteId:', pacienteId);


  if (!alaId || !pacienteId) {
    return res
      .status(400)
      .json({ error: "Faltan datos: alaId y pacienteId son requeridos" });
  }

  try {
    const habitaciones =
      await HabitacionService.getHabitacionesFiltradasPorAlaYGenero(
        alaId,
        pacienteId
      );
    res.json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    res.status(500).json({ error: "Error al obtener habitaciones" });
  }
};

module.exports = {
  getHabitaciones,
  getHabitacionesPorAlaYGenero,
};

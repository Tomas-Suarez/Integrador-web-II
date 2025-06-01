const HabitacionService = require("../service/HabitacionService");

// Controlador para ovtener todas las habitaciones con sus camas
const getHabitaciones = async (req, res) => {
  try {
    const habitaciones = await HabitacionService.getAllHabitaciones();
    res.render("Habitaciones/ListaHabitacion", { habitaciones });
  } catch (error) {
    res
      .status(500)
      .render("Ocurrio un error al obtener las habitaciones", {
        message: error.message,
      });
  }
};

// Controlador para obtener las habitaciones filtradas por ala y genero del paciente ocupante y el ingresante
// Aca pasamos a JSON, porque hacemos un fetch para cuando se seleccione un ala en especifica filtre
const getHabitacionesPorAlaYGenero = async (req, res) => {
  const { alaId, pacienteId } = req.query;

  console.log("alaId:", alaId, "pacienteId:", pacienteId);

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

// Controlador para obtener las habitaciones de emergencia con su respectiva cama y luego renderizamos en la vista
const getHabitacionesEmergencia = async (req, res) => {
  try {
    const habitaciones = await HabitacionService.getHabitacionesEmergencia;
    res.render("Emergencia/RegistrarEmergencia", { habitaciones });
  } catch (error) {
    res
      .status(500)
      .render("Ocurrio un error al obtener las habitaciones de emergencia", {
        message: error.message,
      });
  }
};

module.exports = {
  getHabitaciones,
  getHabitacionesPorAlaYGenero,
  getHabitacionesEmergencia,
};

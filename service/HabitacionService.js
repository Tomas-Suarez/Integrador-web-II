const Habitacion = require("../models/HabitacionModels");
const Cama = require("../models/CamaModels");
const Ala = require("../models/AlaModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Admision = require("../models/AdmisionModels");
const Paciente = require("../models/PacienteModels");

const getAllHabitaciones = async () => {
  try {
    const habitaciones = await Habitacion.findAll({
      attributes: ["numero", "capacidad"],
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

// Filtramos las habitaciones segun el genero del paciente y el ala seleccionada.
const getHabitacionesFiltradasPorAlaYGenero = async (alaId, genero) => {
  try {
    const habitaciones = await Habitacion.findAll({
      where: { id_ala: alaId },
      attributes: ["id_habitacion", "numero", "capacidad"],
      include: [
        {
          model: Ala,
          attributes: ["nombre"],
        },
        {
          model: Cama,
          attributes: ["id_cama", "libre"],
          include: [
            {
              model: AsignacionDormitorio,
              include: [
                {
                  model: Admision,
                  where: { estado: true },
                  required: false,
                  include: [
                    {
                      model: Paciente,
                      attributes: ["genero"],
                      required: false,
                    },
                  ],
                },
              ],
              required: false,
            },
          ],
        },
      ],
    });

    // Filtramos las habitaciones
    const habitacionesFiltradas = habitaciones.filter((habitacion) => {
      const camas = habitacion.Camas || [];

      // Obtenemos las camas ocupadas
      const ocupadas = camas.filter((c) => !c.libre);

      //Verificamos si no tenemos camas ocupadas
      if (ocupadas.length === 0) {
        return true;
      }

      // Si posee una cama ocupada, verificamos si el genero del paciente coincide con el otro
      if (ocupadas.length === 1) {
        const camaOcupada = ocupadas[0];

        const asignacion = camaOcupada.AsignacionDormitorio?.[0];
        const pacienteAsignado = asignacion?.Admision?.Paciente;

        return pacienteAsignado?.genero === genero;
      }

      //Si tenemos mas de una cama ocupada, o si los pacientes no coinciden con el genero, descartamos
      return false;
    });

    return habitacionesFiltradas;
  } catch (error) {
    throw new Error(
      "Error al obtener habitaciones filtradas: " + error.message
    );
  }
};

module.exports = {
  getAllHabitaciones,
  getHabitacionesFiltradasPorAlaYGenero,
};

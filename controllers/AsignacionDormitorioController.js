const AsignacionDormitorioService = require("../service/AsignacionDormitorioService");

const getAsignacionesActuales = async (req, res) => {
  try {
    const internaciones = await AsignacionDormitorioService.getAsignacionesActuales();
    res.render("GestionarInternacion/GestionarInternacion", { internaciones });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener las internaciones.." + error.message);
  }
};

const createAsignacionDormitorio = async (req, res) => {
  try {
    const datos = {
      id_admision: req.body.id_admision,
      id_habitacion: req.body.id_habitacion,
    };

    const { asignacion, creado } = await AsignacionDormitorioService.createAsignacionDormitorio(datos);

    if (creado) {
      res.redirect("/pacientes/GestionPaciente");
    } else {
      res.status(404).render("Paciente/GestionPaciente", {
        error:
          "Error al asignar el dormitorio.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al asignar el dormitorio",
    });
  }
};

module.exports = {
    createAsignacionDormitorio,
    getAsignacionesActuales,
};
const AsignacionDormitorioService = require("../service/AsignacionDormitorioService");

// Controlador para obtener todas las asignaciones de dormitorio, de cierto paciente (Internados)
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

// Le asignamos un dormitorio a un paciente admitido 
const createAsignacionDormitorio = async (req, res) => {
  try {
    const datos = {
      id_admision: req.body.id_admision,
      id_habitacion: req.body.id_habitacion,
    };

    const { asignacion, creado } = await AsignacionDormitorioService.createAsignacionDormitorio(datos);

    if (creado) {
      res.redirect("/asignaciones/GestionInternacion");
    } else {
      res.status(404).render("GestionarInternacion/GestionarInternacion", {
        error:
          "Error al asignar el dormitorio.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("GestionarInternacion/GestionarInternacion", {
      error: "Error al asignar el dormitorio",
    });
  }
};

module.exports = {
    createAsignacionDormitorio,
    getAsignacionesActuales,
};
const AsignacionDormitorio = require("../service/AsignacionDormitorioService");

const createAsignacionDormitorio = async (req, res) => {
  try {
    const datos = {
      id_admision: req.body.id_admision,
      id_habitacion: req.body.id_habitacion,
    };

    const { asignacion, creado } = await AsignacionDormitorio.createAsignacionDormitorio(datos);

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
};
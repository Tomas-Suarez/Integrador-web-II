// Importamos los servicios en donde se maneja la logica

const AdmisionService = require("../service/AdmisionService");
const AlaService = require("../service/AlaService");
const MotivoService = require("../service/MotivoAdmisionService");
const PacienteService = require("../service/PacienteService");
const TipoIngresoService = require("../service/TipoIngresoService");

// Controlador para obtener las admisiones, ala y habitacion
const getAllAdmisiones = async (req, res) => {
  try {
    // Obtenemos los datos de las admisiones
    const admisiones = await AdmisionService.getAllAdmisiones();
    // Obtenemos los datos de las alas
    const alas = await AlaService.getAllAlas();
    res.render("Internacion/InternacionPaciente", { admisiones, alas });
  } catch (error) {
    res
      .status(500)
      .render("Ocurrio un error en obtener las admisiones.." + error.message);
  }
};

// Controlador para crear una admision
const createAdmision = async (req, res) => {
  try {
    // Obtenemos los datos del form - (Body)
    const datos = {
      id_paciente: req.body.id_paciente,
      id_tipo: req.body.id_tipo,
      id_motivo: req.body.id_motivo,
      fecha_entrada: req.body.fechaInternar,
      detalles: req.body.detalles,
    };

    const { admisiones, creado } = await AdmisionService.createAdmision(datos);

    if (creado) {
      return res.redirect("/admisiones/InternacionPaciente/");
    } else {
      // En caso de no ser creado por no encontrar el DNI, pasamos la notificacion de que no se encontro
      const paciente = await PacienteService.getPacienteById(
        req.body.id_paciente
      );
      const ingresos = await TipoIngresoService.getAllIngreso();
      const motivos = await MotivoService.getAllMotivos();

      return res.status(200).render("Admision/RegistrarAdmision", {
        paciente,
        ingresos,
        motivos,
        admisionActiva: true,
        documento: req.body.documento,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al crear la admisión: " + error.message);
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
};

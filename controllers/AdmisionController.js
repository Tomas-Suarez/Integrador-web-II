// Importamos los servicios en donde se maneja la logica

const AdmisionService = require("../service/AdmisionService");
const AlaService = require("../service/AlaService");
const MotivoService = require("../service/MotivoAdmisionService");
const PacienteService = require("../service/PacienteService");
const TipoIngresoService = require("../service/TipoIngresoService");
const AsignacionDormitorioService = require("../service/AsignacionDormitorioService");
const HabitacionService = require("../service/HabitacionService");

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

// Controlador para el paciente NN, Crea la admision y luego le asigna la habitacion(Interna)
const registrarYAsignar = async (req, res) => {
  try {

    const datosAdmision = {
      id_paciente: 11,
      id_tipo: req.body.id_tipo,
      id_motivo: req.body.id_motivo,
      fecha_entrada: new Date(),
      detalles: req.body.detalles,
    };

    const { admision, creado: creadoAdmision } = await AdmisionService.createAdmision(
      datosAdmision
    );

    if (!creadoAdmision) {
      const ingresos = await TipoIngresoService.getAllIngreso();
      const motivos = await MotivoService.getAllMotivos();
      const alas = await AlaService.getAllAlas();
      const habitaciones = await HabitacionService.getHabitacionesEmergencia(6);

      return res.status(400).render("Emergencia/RegistrarEmergencia", {
        ingresos,
        motivos,
        alas,
        habitaciones,
        error: "No se pudo crear la admisión",
      });
    }

    const datosAsignacion = {
      id_admision: admision.id_admision,
      id_habitacion: req.body.id_habitacion,
    };

    const { asignacion, creado: creadoAsignacion } =
      await AsignacionDormitorioService.createAsignacionDormitorio(
        datosAsignacion
      );
    
    if (!creadoAsignacion) {
      const ingresos = await TipoIngresoService.getAllIngreso();
      const motivos = await MotivoService.getAllMotivos();
      const alas = await AlaService.getAllAlas();
      const habitaciones = await HabitacionService.getHabitacionesEmergencia(6);

      return res.status(400).render("Emergencia/RegistrarEmergencia", {
        ingresos,
        motivos,
        alas,
        habitaciones,
        error: "No se pudo asignar la habitación.",
      });
    }

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    const ingresos = await TipoIngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();
    const habitaciones = await HabitacionService.getHabitacionesEmergencia(6);

    return res.status(500).render("Emergencia/RegistrarEmergencia", {
      ingresos,
      motivos,
      alas,
      habitaciones,
      error: "Ocurrió un error: " + error.message,
    });
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
  registrarYAsignar,
};

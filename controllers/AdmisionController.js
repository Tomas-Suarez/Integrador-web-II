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
    // Obtenemos ingresos y motivos
    const ingresos = await TipoIngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();

    // Obtenemos el paciente
    const paciente = await PacienteService.getPacienteById(req.body.id_paciente);

    if (!paciente) {
      // Si el paciente no existe, devolvemos el error
      return res.status(404).send("El paciente no existe.");
    }

    if (!paciente.estado) {
      // Si el paciente existe pero esta inactivo, mostramos el error
      return res.status(409).render("Admision/RegistrarAdmision", {
        paciente,
        ingresos,
        motivos,
        pacienteInactivo: true,
        documento: req.body.documento,
      });
    }

    // Si pasa las validaciones, seguimos creando la admisión
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
      // En caso de no ser creado, volvemos a cargar los datos para la vista
      return res.status(409).render("Admision/RegistrarAdmision", {
        paciente,
        ingresos,
        motivos,
        admisionActiva: true,
        documento: req.body.documento,
      });
    }
  } catch (error) {
    res.status(500).send("Ocurrió un error al crear la admisión: " + error.message);
  }
};

// Controlador para el paciente NN, Crea la admision y luego le asigna la habitacion(Interna)
const registrarYAsignar = async (req, res) => {
  try {
    
    const datosAdmision = {
      id_paciente: 1, // ID del paciente NN
      id_tipo: req.body.id_tipo,
      id_motivo: req.body.id_motivo,
      fecha_entrada: new Date(), // Fecha de hoy
      detalles: req.body.detalles,
    };

    // Creamos la admision
    const { admision, creado: creadoAdmision } = await AdmisionService.createAdmision(
      datosAdmision
    );

    // Si no fue creada, mostramos el error
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

    // Si fue creada la admision, agarramos los otros datos del form para la asignacion de dormitorio(Internacion)
    const datosAsignacion = {
      id_admision: admision.id_admision,
      id_habitacion: req.body.id_habitacion,
    };

    // Le asignamos el dormitorio
    const { asignacion, creado: creadoAsignacion } =
      await AsignacionDormitorioService.createAsignacionDormitorio(
        datosAsignacion
      );
    
    // Si tenemos error al asignar dormitorio, mostramos el error
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

    // Si fue creado con exito, redirigimos a la vista de listado de internaciones
    res.redirect("/asignaciones/GestionInternacion/");
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

// Controlador para cancelar una admision 
const darDeBajaAdmision = async (req, res) => {
  try {
    await AdmisionService.darDeBajaAdmision(req.params.id);
    res.redirect("/admisiones/InternacionPaciente/");
  } catch (error) {
    res.status(500).send("Error al cancelar una admisión: " + error.message);
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
  registrarYAsignar,
  darDeBajaAdmision,
};

const pacienteService = require("../service/PacienteService");
const SeguroService = require("../service/SeguroMedicoService");
const IngresoService = require("../service/TipoIngresoService");
const MotivoService = require("../service/MotivoAdmisionService");
const AlaService = require("../service/AlaService");

const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAllPacientes();
    const seguros = await SeguroService.getAllSegurosMedicos();
    res.render("Paciente/GestionPaciente", { pacientes, seguros });
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al mostrar pacientes",
    });
  }
};

//Para la admision
const getAllPacientesActivos = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAllPacientesActivos();
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();
    res.render("Recepcion/RegistrarAdmision", {
      pacientes,
      ingresos,
      motivos,
      alas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("Recepcion/RegistrarAdmision", {
      error: "Error al mostrar pacientes activos",
    });
  }
};

const createPaciente = async (req, res) => {
  try {
    const idSeguro =
      req.body.id_seguro === "null" || req.body.id_seguro === ""
        ? null
        : parseInt(req.body.id_seguro);

    const datos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      documento: req.body.documento,
      telefono: req.body.telefono,
      domicilio: req.body.domicilio,
      fecha_nacimiento: req.body.fecha_nacimiento,
      genero: req.body.genero,
      estatura: parseFloat(req.body.estatura),
      peso: parseFloat(req.body.peso),
      id_seguro: idSeguro,
      estado: true,
    };

    const { paciente, creado } = await pacienteService.createPaciente(datos);

    if (creado) {
      res.redirect("/pacientes/GestionPaciente");
    } else {
      res.status(404).render("Paciente/GestionPaciente", {
        error:
          "Error al crear un paciente, ya existe uno con el mismo documento",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al crear el paciente",
    });
  }
};

const updatePaciente = async (req, res) => {
  try {
    const id_paciente = parseInt(req.params.id);

    const idSeguro =
      req.body.id_seguro === "null" || req.body.id_seguro === ""
        ? null
        : parseInt(req.body.id_seguro);

    const datos = {
      id_paciente,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      documento: req.body.documento,
      telefono: req.body.telefono,
      domicilio: req.body.domicilio,
      fecha_nacimiento: req.body.fecha_nacimiento,
      genero: req.body.genero,
      estatura: parseFloat(req.body.estatura),
      peso: parseFloat(req.body.peso),
      id_seguro: idSeguro,
    };

    await pacienteService.updatePaciente(datos);

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al actualizar el paciente",
    });
  }
};

const changeStatusPaciente = async (req, res) => {
  try {
    const id_paciente = parseInt(req.params.id);
    const estado = req.body.estado === 'true';

    const datos = {
      id_paciente,
      estado,
    };

    await pacienteService.changeStatusPaciente(datos);

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al cambiar el estado del paciente: " + error.message,
    });
  }
};


module.exports = {
  getAllPacientes,
  getAllPacientesActivos,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
};

const pacienteService = require("../service/PacienteService");
const SeguroService = require("../service/SeguroMedicoService");

const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAllPacientes();
    const seguros = await SeguroService.getAllSegurosMedicos();
    res.render("Paciente/GestionPaciente", { pacientes, seguros });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los pacientes.." + error.message);
  }
};

//Para la admision
const getAllPacientesActivos = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAllPacientesActivos();
    res.render("Recepcion/RegistrarAdmision", { pacientes });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los pacientes.." + error.message);
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
      res
        .status(409)
        .send("Error. El paciente ya fue registrado anteriormente!");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al crear el paciente: " + error.message);
  }
};

const updatePaciente = async (req, res) => {
  try {
    const idSeguro =
      req.body.id_seguro === "null" || req.body.id_seguro === ""
        ? null
        : parseInt(req.body.id_seguro);

    const datos = {
      id_paciente: req.body.id_paciente,
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
    res
      .status(500)
      .send("Ocurrió un error al actualizar el paciente: " + error.message);
  }
};

const changeStatusPaciente = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const datos = {
      id_paciente: req.body.id_paciente,
      estado: req.body.estado === "true",
    };

    await pacienteService.changeStatusPaciente(datos);

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    res
      .status(500)
      .send(
        "Ocurrió un error al cambiar el estado del paciente: " + error.message
      );
  }
};

module.exports = {
  getAllPacientes,
  getAllPacientesActivos,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
};

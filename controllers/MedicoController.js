const MedicoService = require("../service/MedicoService");
const GuardiaService = require("../service/GuardiaService");
const EspecialidadService = require("../service/EspecialidadService");

const getAllMedico = async (req, res) => {
  try {
    const medicos = await MedicoService.getAllMedicos();
    const guardias = await GuardiaService.getAllGuardia();
    const especialidades = await EspecialidadService.getAllEspecialidad();
    res.render("Medicos/GestionMedicos", { medicos, guardias, especialidades });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los Medicos.." + error.message);
  }
};

const createMedico = async (req, res) => {
  try {
    const datos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      documento: req.body.documento,
      matricula: req.body.matricula,
      id_especialidad: parseInt(req.body.id_especialidad),
      id_guardia: parseInt(req.body.id_guardia),
      estado: true,
    };

    const { medico, creado } = await MedicoService.createMedico(datos);

    if (creado) {
      res.redirect("/medicos/GestionMedico/");
    } else {
      res.status(409).send("Error. El médico ya fue registrado anteriormente!");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al crear el médico: " + error.message);
  }
};

const updateMedico = async (req, res) => {
  try {
    const datos = {
      id_medico: req.body.id_medico,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      matricula: req.body.matricula,
      id_especialidad: req.body.id_especialidad,
      id_guardia: req.body.id_guardia,
    };

    await MedicoService.updateMedico(datos);

    res.redirect("/medicos/GestionMedico/");
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al actualizar el medico: " + error.message);
  }
};

const changeStatusMedico = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const datos = {
      id_medico: req.body.id_medico,
      estado: req.body.estado === "true",
    };

    await MedicoService.changeStatusMedico(datos);

    res.redirect("/medicos/GestionMedico/");
  } catch (error) {
    res
      .status(500)
      .send(
        "Ocurrió un error al cambiar el estado del medico: " + error.message
      );
  }
};

module.exports = {
  getAllMedico,
  createMedico,
  updateMedico,
  changeStatusMedico,
};

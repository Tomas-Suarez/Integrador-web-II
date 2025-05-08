const medicoService = require("../service/MedicoService");

const getAllMedico = async (req, res) => {
  try {
    const medicos = await medicoService.getAllMedicos();
    res.render("Medicos/ListaMedico", { medicos });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los Medicos.." + error.message);
  }
};

const createMedico = async (req, res) => {
  try {
    const datos = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Genero: req.body.Genero,
      Matricula: req.body.Matricula,
      Especialidad: req.body.Especialidad,
      Estado: true,
    };

    const { medico, creado } = await medicoService.createMedico(datos);

    if (creado) {
      res.redirect("/medicos/ListaMedico/");
    } else {
      res.status(409).send("Error. El medico ya fue registrado anteriormente!");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error al crear el medico: " + error.message);
  }
};

const updateMedico = async (req, res) => {
  try {
    const datos = {
      id_Medico: req.body.id_Medico,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Genero: req.body.Genero,
      Matricula: req.body.Matricula,
      Especialidad: req.body.Especialidad,
    };

    await medicoService.updateMedico(datos);

    res.redirect("/medicos/ListaMedico/");
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al actualizar el medico: " + error.message);
  }
};

const changeStatusMedico = async (req, res) => {
  try {
    const datos = {
      id_Medico: req.body.id_Medico,
      Estado: req.body.Estado === 'true'
    };

    await medicoService.changeStatusMedico(datos);

    res.redirect("/medicos/ListaMedico");
  } catch (error) {
    res.status(500).send("Ocurrió un error al cambiar el estado del medico: " + error.message);
  }
};

  module.exports = {
    getAllMedico,
    createMedico,
    updateMedico,
    changeStatusMedico,
  }
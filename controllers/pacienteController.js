const pacienteService = require("../service/PacienteService");

const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAllPacientes();
    res.render("Pacientes/ListaPaciente", { pacientes });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los pacientes.."+ error.message);
  }
};

const createPaciente = async (req, res) => {
  try {
    const datos = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Documento: req.body.Documento,
      Telefono: req.body.Telefono,
      Domicilio: req.body.Domicilio,
      Edad: parseInt(req.body.Edad),
      Genero: req.body.Genero,
      Estatura: parseFloat(req.body.Estatura),
      Peso: parseFloat(req.body.Peso),
      Contacto_emergencia: req.body.Contacto_emergencia,
      Seguro_medico: req.body.Seguro_medico === "true",
    };

    const { paciente, creado } = await pacienteService.createPaciente(datos);

    if (creado) {
      res.redirect("/pacientes/ListaPaciente/");
    } else {
      res
        .status(409)
        .send("Error. El paciente ya fue registrado anteriormente!");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error al crear el paciente: " + error.message);
  }
};


const updatePaciente = async (req, res) => {
  try {
    const datos = {
      id_Paciente: req.body.id_Paciente,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Documento: req.body.Documento,
      Telefono: req.body.Telefono,
      Domicilio: req.body.Domicilio,
      Edad: parseInt(req.body.Edad),
      Genero: req.body.Genero,
      Estatura: parseFloat(req.body.Estatura),
      Peso: parseFloat(req.body.Peso),
      Contacto_emergencia: req.body.Contacto_emergencia,
      Seguro_medico: req.body.Seguro_medico === "true",
    };

    await pacienteService.updatePaciente(datos);

    console.log("soy datos");
    console.log(datos);
    res.redirect("/pacientes/ListaPaciente/");
  } catch (error) {
    console.log("soy un error");
    res
      .status(500)
      .send("Ocurrió un error al actualizar el paciente: " + error.message);
  }
};

module.exports = {
  getAllPacientes,
  createPaciente,
  updatePaciente,
};

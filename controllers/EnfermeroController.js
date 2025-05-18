const EnfermeroService = require("../service/EnfermeroService");
const GuardiaService = require("../service/GuardiaService");

const getAllEnfermero = async (req, res) => {
  try {
    const enfermeros = await EnfermeroService.getAllEnfermeros();
    const guardias = await GuardiaService.getAllGuardia();
    res.render("Enfermeros/GestionEnfermeros", { enfermeros, guardias });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los Enfermeros.." + error.message);
  }
};

const createEnfermero = async (req, res) => {
  try {
    const datos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      documento: req.body.documento,
      matricula: req.body.matricula,
      id_guardia: parseInt(req.body.id_guardia),
      estado: true,
    };

    const { enfermeros, creado } = await EnfermeroService.createEnfermero(datos);

    if (creado) {
      res.redirect("/enfermeros/GestionEnfermero/");
    } else {
      res.status(409).send("Error. El enfermero ya fue registrado anteriormente!");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al crear el enfermero: " + error.message);
  }
};

const updateEnfermero = async (req, res) => {
  try {
    const datos = {
      id_enfermero: req.body.id_enfermero,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      genero: req.body.genero,
      matricula: req.body.matricula,
      id_guardia: req.body.id_guardia,
    };

    await EnfermeroService.updateEnfermero(datos);

    res.redirect("/enfermeros/GestionEnfermero/");
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al actualizar el enfermero: " + error.message);
  }
};

const changeStatusEnfermero = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const datos = {
      id_enfermero: req.body.id_enfermero,
      estado: req.body.estado === "true",
    };

    await EnfermeroService.changeStatusEnfermero(datos);

    res.redirect("/enfermeros/GestionEnfermero/");
  } catch (error) {
    res
      .status(500)
      .send(
        "Ocurrió un error al cambiar el estado del enfermero: " + error.message
      );
  }
};

module.exports = {
  getAllEnfermero,
  createEnfermero,
  updateEnfermero,
  changeStatusEnfermero,
};

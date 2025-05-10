const enfermeroService = require("../service/EnfermeroService");

const getAllEnfermero = async (req, res) => {
  try {
    const enfermeros = await enfermeroService.getAllEnfermero();
    res.render("Enfermeros/ListaEnfermero", { enfermeros });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener los Enfermeros.." + error.message);
  }
};

const createEnfermero = async (req, res) => {
  try {
    const datos = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Genero: req.body.Genero,
      Matricula: req.body.Matricula,
      Turno: req.body.Turno,
      Estado: true,
    };

    const { enfermero, creado } = await enfermeroService.createEnfermero(datos);

    if (creado) {
      res.redirect("/enfermeros/ListaEnfermero/");
    } else {
      res.status(409).send("Error. El enfermero ya fue registrado anteriormente!");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error al crear el enfermero: " + error.message);
  }
};

const updateEnfermero = async (req, res) => {
  try {
    const datos = {
      id_Enfermero: req.body.id_Enfermero,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Genero: req.body.Genero,
      Matricula: req.body.Matricula,
      Turno: req.body.Turno,
    };

    await enfermeroService.updateEnfermero(datos);

    res.redirect("/enfermeros/ListaEnfermero/");
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al actualizar el enfermero: " + error.message);
  }
};

const changeStatusEnfermero = async (req, res) => {
  try {
    const datos = {
      id_Enfermero: req.body.id_Enfermero,
      Estado: req.body.Estado === 'true'
    };

    await enfermeroService.changeStatusEnfermero(datos);

    res.redirect("/enfermeros/ListaEnfermero");
  } catch (error) {
    res.status(500).send("Ocurrió un error al cambiar el estado del enfermero: " + error.message);
  }
};

  module.exports = {
    getAllEnfermero,
    createEnfermero,
    updateEnfermero,
    changeStatusEnfermero,
  }
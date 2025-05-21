const AdmisionService = require("../service/AdmisionService");

const getAllAdmisiones = async (req, res) => {
  try {
    const admisiones = await AdmisionService.getAllAdmisiones();
    res.render("Admisiones/GestionAdmision", { admisiones });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener las admisiones.." + error.message);
  }
};

const createAdmision = async (req, res) => {
  try {
    const datos = { //Pasamos los datos del form
      id_paciente: req.body.id_paciente,
      id_tipo: req.body.id_tipo,
      detalles: req.body.detalles,
    };

    const { enfermeros, creado } = await AdmisionService.createAdmision(datos);

    if (creado) {
      res.redirect("/admisiones/GestionAdmision/");
    } else {
        res.status(400).send("No se pudo crear la admision.");
    }

  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al crear el enfermero: " + error.message);
  }
};

module.exports = {
    getAllAdmisiones,
    createAdmision,
}
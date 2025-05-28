const AdmisionService = require("../service/AdmisionService");
const AlaService = require("../service/AlaService");

const getAllAdmisiones = async (req, res) => {
  try {
    const admisiones = await AdmisionService.getAllAdmisiones();
    const alas = await AlaService.getAllAlas();
    res.render("Internacion/InternacionPaciente", { admisiones, alas });
  } catch (error) {
    res
      .status(500)
      .send("Ocurrio un error en obtener las admisiones.." + error.message);
  }
};

const createAdmision = async (req, res) => {
  try {
    console.log("BODY: ", req.body);

    const datos = {
      //Pasamos los datos del form
      id_paciente: req.body.id_paciente,
      id_tipo: req.body.id_tipo,
      id_motivo: req.body.id_motivo,
      fecha_entrada: req.body.fechaInternar,
      detalles: req.body.detalles,
    };

    const { admisiones, creado } = await AdmisionService.createAdmision(datos);

    if (creado) {
      res.redirect("/admisiones/InternacionPaciente/");
    } else {
      res
        .status(400)
        .send("No se pudo crear la admision. Ya existe un admision activa");
    }
  } catch (error) {
    res
      .status(500)
      .send("Ocurrió un error al crear la admision: " + error.message);
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
};

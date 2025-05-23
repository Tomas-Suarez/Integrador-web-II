const AdmisionService = require("../service/AdmisionService");
const TipoIngresoService = require("../service/TipoIngresoService");

const getAllAdmisiones = async (req, res) => {
  try {
    const admisiones = await AdmisionService.getAllAdmisiones();
    const ingresos = await TipoIngresoService.getAllIngreso();
    res.render("Admisiones/GestionAdmision", { admisiones, ingresos });
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
      res.redirect("/admisiones/GestionAdmision/");
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

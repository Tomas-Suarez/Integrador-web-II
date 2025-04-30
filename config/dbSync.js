const sequlize = require("../models/db");

require("../models/AdmisionModels");
require("../models/AltaHospitalariaModels");
require("../models/AnteMedicosModels");
require("../models/AsignDormitorioModels");
require("../models/CamaModels");
require("../models/EnfermeroModels");
require("../models/EvaluacionEnfermeriaModels");
require("../models/EvaluacionMedicaModels");
require("../models/HabitacionModels");
require("../models/HistorialMedicoModels");
require("../models/MedicoModels");
require("../models/PacienteModels");
require("../models/SignosVitalesModels");



(async () => {
  try {
    console.log("Conectando a la base de datos...");
    await sequlize.sync({ force: false }); //force, borra todos los datos de la bd y los vuelve a crear
    console.log("¡Las tablas fueron creadas con éxito!");
  } catch (error) {
    console.error("Error en la base de datos:", error);
  }
})();

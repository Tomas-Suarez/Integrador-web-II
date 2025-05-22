const sequelize = require("../models/db");

require("../models/AdmisionModels");
require("../models/AsignDormitorioModels");
require("../models/CamaModels");
require("../models/ContactoEmergenciaModels");
require("../models/EnfermeroModels");
require("../models/EvaluacionEnfermeriaModels");
require("../models/EvaluacionMedicaModels");
require("../models/EspecialidadModels");
require("../models/HabitacionModels");
require("../models/HistorialMedicoModels");
require("../models/MedicoModels");
require("../models/MotivoAdmisionModels");
require("../models/PacienteModels");
require("../models/PlanCuidadosModels");
require("../models/SeguroMedicoModels");
require("../models/TipoIngresoModels");
require("../models/TratamientoModels");
require("../models/AlaModels");
require("../models/GuardiaModels");


(async () => {
  try {
    console.log("Conectando a la base de datos...");
    await sequelize.sync({ force: false }); // true para reiniciar la BD
    console.log("¡Las tablas fueron creadas con exito!");
  } catch (error) {
    console.error("Error en la base de datos:", error);
  }
})();

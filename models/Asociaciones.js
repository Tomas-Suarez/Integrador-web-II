const Admision = require("./AdmisionModels");
const AltaHospitalaria = require("./AltaHospitalariaModels");
const AsignacionDormitorio = require("./AsignDormitorioModels");
const Cama = require("./CamaModels");
const Enfermero = require("./EnfermeroModels");
const EvaluacionEnfermeria = require("./EvaluacionEnfermeriaModels");
const EvaluacionMedica = require("./EvaluacionMedicaModels");
const Habitacion = require("./HabitacionModels");
const HistorialMedico = require("./HistorialMedicoModels");
const Medico = require("./MedicoModels");
const Paciente = require("./PacienteModels");
const SignosVitales = require("./SignosVitalesModels");

// Paciente - Admision
Paciente.hasMany(Admision, { foreignKey: "id_Paciente", as: "admisiones" });
Admision.belongsTo(Paciente, { foreignKey: "id_Paciente", as: "paciente" });

// Admision - AltaHospitalaria
Admision.hasOne(AltaHospitalaria, { foreignKey: "id_Admision", as: "altahospitalaria" });
AltaHospitalaria.belongsTo(Admision, { foreignKey: "id_Admision", as: "admision" });

// Admision - EvaluacionMedica
Admision.hasMany(EvaluacionMedica, { foreignKey: "id_Admision", as: "evaluacionesMedicas" });
EvaluacionMedica.belongsTo(Admision, { foreignKey: "id_Admision", as: "admision" });

// Medico - EvaluacionMedica
Medico.hasMany(EvaluacionMedica, { foreignKey: "id_Medico", as: "evaluaciones" });
EvaluacionMedica.belongsTo(Medico, { foreignKey: "id_Medico", as: "medico" });

// Admision - EvaluacionEnfermeria
Admision.hasMany(EvaluacionEnfermeria, { foreignKey: "id_Admision", as: "evaluacionesEnfermeria" });
EvaluacionEnfermeria.belongsTo(Admision, { foreignKey: "id_Admision", as: "admision" });

// Enfermero - EvaluacionEnfermeria
Enfermero.hasMany(EvaluacionEnfermeria, { foreignKey: "id_Enfermero", as: "evaluaciones" });
EvaluacionEnfermeria.belongsTo(Enfermero, { foreignKey: "id_Enfermero", as: "enfermero" });

// EvaluacionEnfermeria - SignosVitales
EvaluacionEnfermeria.hasMany(SignosVitales, { foreignKey: "id_Evaluacion_Enfermeria", as: "signos" });
SignosVitales.belongsTo(EvaluacionEnfermeria, { foreignKey: "id_Evaluacion_Enfermeria", as: "evaluacion" });

// Admision - AsignacionDormitorio
Admision.hasMany(AsignacionDormitorio, { foreignKey: "id_Admision", as: "asignaciones" });
AsignacionDormitorio.belongsTo(Admision, { foreignKey: "id_Admision", as: "admision" });

// Cama - AsignacionDormitorio
Cama.hasMany(AsignacionDormitorio, { foreignKey: "id_Cama", as: "asignaciones" });
AsignacionDormitorio.belongsTo(Cama, { foreignKey: "id_Cama", as: "cama" });

// Habitacion - Cama
Habitacion.hasMany(Cama, { foreignKey: "id_Habitacion", as: "camas" });
Cama.belongsTo(Habitacion, { foreignKey: "id_Habitacion", as: "habitacion" });

// Paciente - HistorialMedico
Paciente.hasMany(HistorialMedico, { foreignKey: "id_Paciente", as: "historial" });
HistorialMedico.belongsTo(Paciente, { foreignKey: "id_Paciente", as: "paciente" });

// Admision - Medico (relación opcional)
Medico.hasMany(Admision, { foreignKey: "id_Medico", as: "admisiones" });
Admision.belongsTo(Medico, { foreignKey: "id_Medico", as: "medico" });

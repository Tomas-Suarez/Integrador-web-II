const Admision = require("./AdmisionModels");
const AsignacionDormitorio = require("./AsignDormitorioModels");
const Cama = require("./CamaModels");
const Enfermero = require("./EnfermeroModels");
const EvaluacionEnfermeria = require("./EvaluacionEnfermeriaModels");
const EvaluacionMedica = require("./EvaluacionMedicaModels");
const Habitacion = require("./HabitacionModels");
const HistorialMedico = require("./HistorialMedicoModels");
const Medico = require("./MedicoModels");
const Paciente = require("./PacienteModels");
const PlanCuidados = require("./PlanCuidadosModels");
const Tratamiento = require("./TratamientoModels");
const TipoIngreso = require("./TipoIngresoModels");
const Especialidad = require("./EspecialidadModels");
const Guardia = require("./GuardiaModels");
const ContactoEmergencia = require("./ContactoEmergenciaModels");
const SeguroMedico = require("./SeguroMedicoModels");
const MotivoAdmision = require("./MotivoAdmisionModels");
const Ala = require("./AlaModels");

// Relación Paciente - Admision
Paciente.hasMany(Admision, { foreignKey: "id_paciente" });
Admision.belongsTo(Paciente, { foreignKey: "id_paciente" });

// Relación Paciente - ContactoEmergencia
Paciente.hasOne(ContactoEmergencia, { foreignKey: "id_paciente" });
ContactoEmergencia.belongsTo(Paciente, { foreignKey: "id_paciente" });

// Relación Paciente - SeguroMedico
SeguroMedico.hasMany(Paciente, { foreignKey: "id_seguro" });
Paciente.belongsTo(SeguroMedico, { foreignKey: "id_seguro" });

// Relación Paciente - Admision
Paciente.hasMany(Admision, { foreignKey: "id_paciente" });
Admision.belongsTo(Paciente, { foreignKey: "id_paciente" });

// Relación Admision - MotivoAdmision
MotivoAdmision.hasMany(Admision, { foreignKey: "id_motivo" });
Admision.belongsTo(MotivoAdmision, { foreignKey: "id_motivo" });

// Relación Admision - EvaluacionEnfermeria
Admision.hasMany(EvaluacionEnfermeria, { foreignKey: "id_admision" });
EvaluacionEnfermeria.belongsTo(Admision, { foreignKey: "id_admision" });

// Relación Enfermero - EvaluacionEnfermeria
Enfermero.hasMany(EvaluacionEnfermeria, { foreignKey: "id_enfermero" });
EvaluacionEnfermeria.belongsTo(Enfermero, { foreignKey: "id_enfermero" });

// Relación Enfermero - Guardia
Guardia.hasMany(Enfermero, { foreignKey: "id_guardia" });
Enfermero.belongsTo(Guardia, { foreignKey: "id_guardia" });

// Relación PlanCuidados - EvaluacionEnfermeria
PlanCuidados.hasMany(EvaluacionEnfermeria, { foreignKey: "id_plan" });
EvaluacionEnfermeria.belongsTo(PlanCuidados, { foreignKey: "id_plan" });

// Relación Admision - EvaluacionMedica
Admision.hasMany(EvaluacionMedica, { foreignKey: "id_admision" });
EvaluacionMedica.belongsTo(Admision, { foreignKey: "id_admision" });

// Relación Tratamiento - EvaluacionMedica
Tratamiento.hasMany(EvaluacionMedica, { foreignKey: "id_tratamiento" });
EvaluacionMedica.belongsTo(Tratamiento, { foreignKey: "id_tratamiento" });

// Relación Medico - EvaluacionMedica
Medico.hasMany(EvaluacionMedica, { foreignKey: "id_medico" });
EvaluacionMedica.belongsTo(Medico, { foreignKey: "id_medico" });

// Relación Admision - TipoIngreso
TipoIngreso.hasMany(Admision, { foreignKey: "id_tipo" });
Admision.belongsTo(TipoIngreso, { foreignKey: "id_tipo" });

// Relación Medico - Especialidad
Especialidad.hasMany(Medico, { foreignKey: "id_especialidad" });
Medico.belongsTo(Especialidad, { foreignKey: "id_especialidad" });

// Relación Medico - Guardia
Guardia.hasMany(Medico, { foreignKey: "id_guardia" });
Medico.belongsTo(Guardia, { foreignKey: "id_guardia" });

// Relación Habitacion - Cama
Habitacion.hasMany(Cama, { foreignKey: "id_habitacion" });
Cama.belongsTo(Habitacion, { foreignKey: "id_habitacion" });

// Relación Ala - Habitacion
Ala.hasMany(Habitacion, { foreignKey: "id_ala" });
Habitacion.belongsTo(Ala, { foreignKey: "id_ala" });

// Relación Admision - AsignacionDormitorio
Admision.hasMany(AsignacionDormitorio, { foreignKey: "id_admision" });
AsignacionDormitorio.belongsTo(Admision, { foreignKey: "id_admision" });

// Relación Cama - AsignacionDormitorio
Cama.hasMany(AsignacionDormitorio, { foreignKey: "id_cama" });
AsignacionDormitorio.belongsTo(Cama, { foreignKey: "id_cama" });

// Relación Paciente - HistorialMedico
Paciente.hasMany(HistorialMedico, { foreignKey: "id_paciente" });
HistorialMedico.belongsTo(Paciente, { foreignKey: "id_paciente" });

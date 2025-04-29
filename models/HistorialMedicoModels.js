const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");

class HistorialMedico extends Model {}

HistorialMedico.init(
  {
    id_historial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id_paciente",
      },
      onDelete: "CASCADE",
    },
    motivo_internacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sintomas_principales: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HistorialMedico",
    timestamps: false,
  }
);

module.exports = HistorialMedico;

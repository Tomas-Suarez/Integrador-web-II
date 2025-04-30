const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");

class HistorialMedico extends Model {}

HistorialMedico.init(
  {
    id_Historial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_Paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id_Paciente",
      },
      onDelete: "CASCADE",
    },
    Motivo_internacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Sintomas_principales: {
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

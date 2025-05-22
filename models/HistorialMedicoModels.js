const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");
const Tipo = require("./TipoIngresoModels");
const Motivo = require("./MotivoAdmisionModels");

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
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tipo,
        key: "id_tipo",
      },
      onDelete: "CASCADE",
    },
    id_motivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Motivo,
        key: "id_motivo",
      },
      onDelete: "CASCADE",
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HistorialMedico",
    tableName: "historial_medico",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = HistorialMedico;

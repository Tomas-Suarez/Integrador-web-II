const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Medico = require("./MedicoModels");
const Admision = require("./AdmisionModels");

class EvaluacionMedica extends Model {}

EvaluacionMedica.init(
  {
    id_Evaluacion_Medica: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_Admision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admision,
        key: "id_Admision",
      },
      onDelete: "CASCADE",
    },
    id_Medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_Medico",
      },
      onDelete: "CASCADE",
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "EvaluacionMedica",
    timestamps: false,
  }
);

module.exports = EvaluacionMedica;

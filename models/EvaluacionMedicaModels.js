const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Medico = require("./MedicoModels");
const Internacion = require("./InternacionModels");
const Tratamiento = require("./TratamientoModels");

class EvaluacionMedica extends Model {}

EvaluacionMedica.init(
  {
    id_evaluacion_medica: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_medico",
      },
      onDelete: "CASCADE",
    },
    id_internacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Internacion,
        key: "id_internacion",
      },
      onDelete: "CASCADE",
    },
    id_tratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tratamiento,
        key: "id_tratamiento",
      },
      onDelete: "CASCADE",
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "EvaluacionMedica",
    tableName: "evaluacion_medica",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = EvaluacionMedica;

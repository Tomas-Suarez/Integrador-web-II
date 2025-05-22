const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Enfermero = require("./EnfermeroModels");
const Plan = require("./PlanCuidadosModels");
const Admision = require("./AdmisionModels");

class EvaluacionEnfermeria extends Model {}

EvaluacionEnfermeria.init(
  {
    id_evaluacion_enfermeria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_enfermero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Enfermero,
        key: "id_enfermero",
      },
      onDelete: "CASCADE",
    },
    id_admision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admision,
        key: "id_admision",
      },
      onDelete: "CASCADE",
    },
    id_plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Plan,
        key: "id_plan",
      },
      onDelete: "CASCADE",
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "EvaluacionEnfermeria",
    tableName: "evaluacion_enfermeria",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = EvaluacionEnfermeria;

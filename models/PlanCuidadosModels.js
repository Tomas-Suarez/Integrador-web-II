const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Registro = require("./RegistroModels");
const Enfermero = require("./EnfermeroModels");

class PlanCuidados extends Model {}

PlanCuidados.init(
  {
    id_plan_cuidados: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_registro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Registro,
        key: "id_registro",
      },
      onDelete: "CASCADE",
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
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo_registro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PlanCuidados",
  }
);

module.exports = PlanCuidados;

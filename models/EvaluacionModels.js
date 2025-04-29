const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Registro = require("./RegistroModels");
const Medico = require("./MedicoModels");

class Evaluacion extends Model {}

Evaluacion.init(
  {
    id_evaluacion: {
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
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_medico",
      },
      onDelete: "CASCADE",
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Evaluacion",
    timestamps: false,
  }
);

module.exports = Evaluacion;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");
const Medico = require("./MedicoModels");

class Admision extends Model {}

Admision.init(
  {
    id_Admision: {
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
    id_Medico: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    Tipo_Ingreso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
  },
  {
    sequelize,
    modelName: "Admision",
    timestamps: false,
  }
);

module.exports = Admision;

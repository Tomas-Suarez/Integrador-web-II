const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");

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
    Fecha: {
      type: DataTypes.DATE,
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

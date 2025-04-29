const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");

class Registro extends Model {}

Registro.init(
  {
    id_registro: {
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
    modelName: "Registro",
    timestamps: false,
  }
);

module.exports = Registro;

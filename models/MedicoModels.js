const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Medico extends Model {}

Medico.init(
  {
    id_Medico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Medico",
    timestamps: false,
  }
);

module.exports = Medico;

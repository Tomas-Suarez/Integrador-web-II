const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Medico extends Model {}

Medico.init(
  {
    id_medico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidad: {
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

const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Enfermero extends Model {}

Enfermero.init(
  {
    id_enfermero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    turno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Enfermero",
    timestamps: false,
  }
);

module.exports = Enfermero;

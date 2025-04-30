const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Habitacion extends Model {}

Habitacion.init(
  {
    id_Habitacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Ala: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Habitacion",
    timestamps: false,
  }
);

module.exports = Habitacion;
